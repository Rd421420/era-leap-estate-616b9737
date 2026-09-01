// Gestion du consentement cookies (RGPD/CNIL) + chargement conditionnel de GA4/Ads
export const CONSENT_KEY = "era_cookie_consent";
export const GA_MEASUREMENT_ID = "G-JD27BBNDM5";
const SIX_MONTHS_MS = 1000 * 60 * 60 * 24 * 182;

export type ConsentValue = "granted" | "denied";
type StoredConsent = { value: ConsentValue; date: string };

export const CONSENT_EVENT = "era-consent-change";

export const readConsent = (): ConsentValue | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredConsent;
    if (parsed?.value !== "granted" && parsed?.value !== "denied") return null;
    const ts = Date.parse(parsed.date);
    if (!Number.isNaN(ts) && Date.now() - ts > SIX_MONTHS_MS) {
      window.localStorage.removeItem(CONSENT_KEY);
      return null;
    }
    return parsed.value;
  } catch {
    return null;
  }
};

export const hasConsent = () => readConsent() === "granted";

export const saveConsent = (value: ConsentValue) => {
  try {
    window.localStorage.setItem(
      CONSENT_KEY,
      JSON.stringify({ value, date: new Date().toISOString() } satisfies StoredConsent),
    );
  } catch {
    // stockage indisponible : on continue sans mémoriser
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
};

export const META_PIXEL_ID = "842356093139027";

// Forme canonique Google : fonction classique pour disposer de `arguments`.
function gtag(..._args: unknown[]) {
  window.dataLayer = window.dataLayer || [];
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
}

let analyticsLoaded = false;

/** Injecte gtag.js uniquement après consentement explicite. */
export const loadAnalytics = () => {
  if (typeof window === "undefined") return;
  if (!hasConsent()) return;

  if (!analyticsLoaded) {
    analyticsLoaded = true;
    window.gtag = gtag as typeof window.gtag;

    // Consent Mode v2 : tout refusé par défaut
    gtag("consent", "default", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
    });

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    gtag("js", new Date());
    gtag("config", GA_MEASUREMENT_ID);
  }

  gtag("consent", "update", {
    ad_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted",
    analytics_storage: "granted",
  });
};

export const denyAnalytics = () => {
  if (typeof window === "undefined" || !window.dataLayer) return;
  gtag("consent", "update", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
  });
};
