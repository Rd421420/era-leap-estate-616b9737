// Microsoft Clarity : événements, consentement et source (script chargé dans index.html)
declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void;
  }
}

export const clarity = (...args: unknown[]) => {
  try {
    if (typeof window !== "undefined" && typeof window.clarity === "function") {
      window.clarity(...args);
    }
  } catch {
    // silencieux
  }
};

export const clarityEvent = (name: string) => clarity("event", name);

export const clarityConsent = (granted: boolean) =>
  granted ? clarity("consent") : clarity("consent", false);

let initialized = false;
export const initClarity = () => {
  if (initialized || typeof window === "undefined") return;
  initialized = true;
  try {
    const source = new URLSearchParams(window.location.search).get("utm_source");
    if (source) clarity("set", "source", source.slice(0, 100));
  } catch {
    // silencieux
  }
  document.addEventListener(
    "click",
    (e) => {
      const link = (e.target as Element | null)?.closest?.('a[href^="tel:"]');
      if (link) clarityEvent("clic_telephone");
    },
    true,
  );
};
