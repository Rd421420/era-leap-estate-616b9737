import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { sendMetaEvent } from "../_shared/metaCapi.ts";

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const isAllowedOrigin = (origin: string): boolean => {
  if (origin === "https://era-dupontromain.immo" || origin === "https://www.era-dupontromain.immo") {
    return true;
  }
  try {
    const u = new URL(origin);
    return u.protocol === "https:" &&
      (u.hostname.endsWith(".lovableproject.com") || u.hostname.endsWith(".lovable.app"));
  } catch {
    return false;
  }
};

const clean = (v: unknown): string => (typeof v === "string" ? v.slice(0, 200) : "");

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);
  if (!isAllowedOrigin(req.headers.get("origin") ?? "")) return json({ error: "Forbidden" }, 403);

  try {
    const body = await req.json();
    const eventName = clean(body.event_name);
    const eventId = clean(body.event_id);
    if (eventName === "PageView" && eventId) {
      await sendMetaEvent({
        eventName,
        eventId,
        eventSourceUrl: clean(body.event_source_url) || undefined,
        userData: { fbp: clean(body.fbp) || undefined, fbc: clean(body.fbc) || undefined },
        req,
      });
    }
  } catch (err) {
    console.error("meta-event error:", err);
  }
  return json({ ok: true }, 200);
});
