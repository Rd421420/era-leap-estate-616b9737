// Wrapper pour Google Analytics / Google Ads (pixel G-JD27BBNDM5)
// Silencieux tant que le consentement n'est pas accordé.
import { hasConsent } from "./consent";

type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

export const trackEvent = (
  name: string,
  params: Record<string, unknown> = {},
) => {
  try {
    if (typeof window === "undefined") return;
    if (!hasConsent()) return;
    if (typeof window.gtag === "function") {
      window.gtag("event", name, params);
    } else if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: name, ...params });
    }

    // Meta : uniquement les deux événements de conversion suivis
    if (typeof window.fbq === "function") {
      if (name === "form_start") window.fbq("trackCustom", "FormStart");
      else if (name === "form_submit") window.fbq("track", "Lead");
    }
  } catch {
    // silent
  }
};
