import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const N8N_WEBHOOK_URL =
  "https://n8n.srv864634.hstgr.cloud/webhook/c15fe03b-332b-405e-b285-3c660fb06c0e";

// Allow-list of fields forwarded to n8n (defense-in-depth)
const ALLOWED_FIELDS = new Set([
  "adresse", "type", "surface", "pieces", "chambres", "etat", "annee",
  "chauffage", "exterieur", "ville", "codePostal", "nbLogements",
  "typesLogements", "meuble", "parkingExterieur", "parkingInterieur",
  "garage", "dpe", "nom", "prenom", "telephone", "email", "gestion",
  "source", "gclid", "utm_source", "utm_medium", "utm_campaign",
  "utm_term", "utm_content", "landing_page", "referrer", "timestamp",
  "source_form",
]);

const sanitize = (v: unknown): string => {
  if (typeof v !== "string") return "";
  return v
    .replace(/[<>]/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "")
    .slice(0, 1000);
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();

    // Filter + sanitize incoming payload
    const payload: Record<string, string> = {};
    for (const key of Object.keys(body)) {
      if (ALLOWED_FIELDS.has(key)) {
        payload[key] = sanitize(body[key]);
      }
    }

    // Minimal server-side validation
    if (!payload.email || !payload.telephone || !payload.nom || !payload.prenom) {
      return new Response(JSON.stringify({ error: "Champs requis manquants" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const n8nRes = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!n8nRes.ok) {
      console.error("n8n responded with", n8nRes.status);
      return new Response(JSON.stringify({ error: "Upstream error" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("submit-estimation error:", err);
    return new Response(JSON.stringify({ error: "Bad request" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
