// Envoi serveur vers l'API Conversions de Meta. Ne lève jamais d'erreur.
const PIXEL_ID = "842356093139027";
const GRAPH_URL = `https://graph.facebook.com/v23.0/${PIXEL_ID}/events`;

type UserInput = {
  email?: string;
  telephone?: string;
  prenom?: string;
  nom?: string;
  ville?: string;
  codePostal?: string;
  fbp?: string;
  fbc?: string;
};

type SendArgs = {
  eventName: string;
  eventId: string;
  eventSourceUrl?: string;
  userData?: UserInput;
  customData?: Record<string, unknown>;
  req: Request;
};

const sha256 = async (value: string): Promise<string> => {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
};

const normPhone = (raw: string): string => {
  let d = raw.replace(/\D/g, "");
  if (d.startsWith("0033")) d = d.slice(2);
  else if (d.startsWith("0")) d = "33" + d.slice(1);
  return d;
};

export const sendMetaEvent = async ({
  eventName, eventId, eventSourceUrl, userData = {}, customData, req,
}: SendArgs): Promise<void> => {
  try {
    const token = Deno.env.get("META_CAPI_TOKEN");
    if (!token) return;

    const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim();
    const ua = req.headers.get("user-agent") ?? "";

    const user_data: Record<string, unknown> = {};
    if (ip) user_data.client_ip_address = ip;
    if (ua) user_data.client_user_agent = ua;
    if (userData.fbp) user_data.fbp = userData.fbp;
    if (userData.fbc) user_data.fbc = userData.fbc;

    const add = async (key: string, v: string | undefined) => {
      if (v) user_data[key] = [await sha256(v)];
    };
    await add("em", userData.email?.toLowerCase().replace(/\s/g, ""));
    await add("ph", userData.telephone ? normPhone(userData.telephone) : undefined);
    await add("fn", userData.prenom?.toLowerCase().replace(/\s/g, ""));
    await add("ln", userData.nom?.toLowerCase().replace(/\s/g, ""));
    await add("ct", userData.ville?.toLowerCase().replace(/[\s-]/g, ""));
    await add("zp", userData.codePostal?.replace(/\s/g, ""));
    if (userData.email || userData.telephone) await add("country", "fr");

    const event: Record<string, unknown> = {
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      event_id: eventId,
      action_source: "website",
      user_data,
    };
    if (eventSourceUrl) event.event_source_url = eventSourceUrl;
    if (customData) event.custom_data = customData;

    const body: Record<string, unknown> = { data: [event] };
    const testCode = Deno.env.get("META_TEST_EVENT_CODE");
    if (testCode) body.test_event_code = testCode;

    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 3000);
    try {
      const res = await fetch(`${GRAPH_URL}?access_token=${encodeURIComponent(token)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: ctrl.signal,
      });
      if (!res.ok) console.error("meta capi status", res.status, await res.text());
    } finally {
      clearTimeout(timer);
    }
  } catch (err) {
    console.error("meta capi error:", err);
  }
};
