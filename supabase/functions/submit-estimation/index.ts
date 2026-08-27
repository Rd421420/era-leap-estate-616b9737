import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";

const N8N_WEBHOOK_URL =
  "https://n8n.srv864634.hstgr.cloud/webhook/c15fe03b-332b-405e-b285-3c660fb06c0e";

// Allow-list of fields forwarded to n8n (defense-in-depth)
// NB: "website" (honeypot) et "form_started_at" servent uniquement au contrôle
// anti-robot et ne sont JAMAIS transmis à n8n.
const ALLOWED_FIELDS = new Set([
  "adresse", "type", "surface", "pieces", "chambres", "etat", "annee",
  "chauffage", "exterieur", "ville", "codePostal", "nbLogements",
  "typesLogements", "meuble", "parkingExterieur", "parkingInterieur",
  "garage", "dpe", "nom", "prenom", "telephone", "email", "gestion",
  "source", "gclid", "utm_source", "utm_medium", "utm_campaign",
  "utm_term", "utm_content", "landing_page", "referrer", "timestamp",
  "source_form", "lead_partiel",
]);

const MAX_LEN: Record<string, number> = { adresse: 300 };
const DEFAULT_MAX_LEN = 200;

const sanitize = (v: unknown, max: number): string => {
  if (typeof v !== "string") return "";
  return v
    .replace(/[<>]/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "")
    .slice(0, max);
};

const FRENCH_PHONE = /^(?:\+33|0033|0)[1-9][0-9]{8}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const TYPES = new Set(["appartement", "maison", "immeuble", "studio", "local", "autre"]);
const DPE = new Set(["A", "B", "C", "D", "E", "F", "G", "non-connu", "non-renseigne"]);
const OUI_NON = new Set(["oui", "non"]);
const GESTION = new Set(["complete", "partielle", "recherche", "pas-sur"]);

const MIN_FILL_MS = 3000;
const RATE_SHORT_WINDOW_MS = 10 * 60 * 1000;
const RATE_SHORT_MAX = 3;
const RATE_LONG_WINDOW_MS = 24 * 60 * 60 * 1000;
const RATE_LONG_MAX = 10;
const PURGE_AFTER_MS = 48 * 60 * 60 * 1000;

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const hashIp = async (ip: string, salt: string): Promise<string> => {
  const data = new TextEncoder().encode(`${salt}:${ip}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  try {
    const body = await req.json();

    // ---- Piège à robots ------------------------------------------------
    if (typeof body.website === "string" && body.website.trim() !== "") {
      return json({ error: "Requête invalide" }, 400);
    }

    // ---- Délai minimal de remplissage ----------------------------------
    const startedAt = typeof body.form_started_at === "string"
      ? Date.parse(body.form_started_at)
      : NaN;
    if (!Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_MS) {
      return json({ error: "Requête invalide" }, 400);
    }

    // ---- Filtrage + nettoyage ------------------------------------------
    const payload: Record<string, string> = {};
    for (const key of Object.keys(body)) {
      if (ALLOWED_FIELDS.has(key)) {
        payload[key] = sanitize(body[key], MAX_LEN[key] ?? DEFAULT_MAX_LEN);
      }
    }

    // ---- Validation serveur --------------------------------------------
    const isPartial = payload.lead_partiel === "true";
    const emailOk = EMAIL.test(payload.email ?? "");

    if (isPartial) {
      if (!emailOk) return json({ error: "Email invalide" }, 400);
    } else {
      if (!emailOk || !payload.nom || !payload.prenom) {
        return json({ error: "Champs requis manquants" }, 400);
      }
      const phone = (payload.telephone ?? "").replace(/[\s.\-]/g, "");
      if (!FRENCH_PHONE.test(phone)) {
        return json({ error: "Téléphone invalide" }, 400);
      }
      payload.telephone = phone;
      if (payload.type && !TYPES.has(payload.type)) {
        return json({ error: "Type de bien invalide" }, 400);
      }
      if (payload.dpe && !DPE.has(payload.dpe)) {
        return json({ error: "DPE invalide" }, 400);
      }
      if (payload.meuble && !OUI_NON.has(payload.meuble)) {
        return json({ error: "Champ meublé invalide" }, 400);
      }
      if (payload.gestion && !GESTION.has(payload.gestion)) {
        return json({ error: "Type de gestion invalide" }, 400);
      }
    }

    // ---- Limitation de débit côté serveur ------------------------------
    const forwarded = req.headers.get("x-forwarded-for") ?? "";
    const ip = forwarded.split(",")[0].trim() || "unknown";
    const salt = Deno.env.get("RATE_LIMIT_SALT") ?? "";
    const ipHash = await hashIp(ip, salt);

    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { persistSession: false } },
    );

    // Purge des lignes de plus de 48 h
    await admin
      .from("submission_rate_limit")
      .delete()
      .lt("created_at", new Date(Date.now() - PURGE_AFTER_MS).toISOString());

    const { data: recent, error: rlError } = await admin
      .from("submission_rate_limit")
      .select("created_at")
      .eq("ip_hash", ipHash)
      .gte("created_at", new Date(Date.now() - RATE_LONG_WINDOW_MS).toISOString());

    if (rlError) {
      console.error("rate limit read error:", rlError.message);
      return json({ error: "Service indisponible" }, 503);
    }

    const now = Date.now();
    const shortCount = (recent ?? []).filter(
      (r) => now - Date.parse(r.created_at as string) < RATE_SHORT_WINDOW_MS,
    ).length;

    if (shortCount >= RATE_SHORT_MAX || (recent ?? []).length >= RATE_LONG_MAX) {
      return json({ error: "Trop de demandes" }, 429);
    }

    const n8nRes = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-webhook-secret": Deno.env.get("N8N_WEBHOOK_SECRET") ?? "",
      },
      body: JSON.stringify(payload),
    });

    if (!n8nRes.ok) {
      console.error("n8n responded with", n8nRes.status);
      return json({ error: "Service indisponible" }, 502);
    }

    await admin.from("submission_rate_limit").insert({ ip_hash: ipHash });

    return json({ ok: true }, 200);
  } catch (err) {
    console.error("submit-estimation error:", err);
    return json({ error: "Requête invalide" }, 400);
  }
});
