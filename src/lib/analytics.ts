// Wrapper pour Google Analytics / Google Ads (pixel G-JD27BBNDM5)
type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
    dataLayer?: unknown[];
  }
}

export const trackEvent = (
  name: string,
  params: Record<string, unknown> = {},
) => {
  try {
    if (typeof window === "undefined") return;
    if (typeof window.gtag === "function") {
      window.gtag("event", name, params);
    } else if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: name, ...params });
    }
  } catch {
    // silent
  }
};
