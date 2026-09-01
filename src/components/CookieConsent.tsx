import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  CONSENT_EVENT,
  denyAnalytics,
  denyMetaPixel,
  loadAnalytics,
  loadMetaPixel,
  readConsent,
  saveConsent,
} from "@/lib/consent";

export const OPEN_COOKIE_BANNER_EVENT = "era-open-cookie-banner";

export const openCookieBanner = () => {
  window.dispatchEvent(new Event(OPEN_COOKIE_BANNER_EVENT));
};

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (readConsent() === "granted") {
      loadAnalytics();
      loadMetaPixel();
    }
    if (readConsent() === null) setVisible(true);

    const open = () => setVisible(true);
    window.addEventListener(OPEN_COOKIE_BANNER_EVENT, open);
    return () => window.removeEventListener(OPEN_COOKIE_BANNER_EVENT, open);
  }, []);

  useEffect(() => {
    const onChange = (e: Event) => {
      const value = (e as CustomEvent).detail;
      if (value === "granted") loadAnalytics();
      else denyAnalytics();
    };
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  if (!visible) return null;

  const choose = (value: "granted" | "denied") => {
    saveConsent(value);
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Gestion des cookies"
      className="fixed inset-x-0 bottom-0 z-[60] border-t-4 border-primary bg-navy text-navy-foreground shadow-2xl"
    >
      <div className="container mx-auto px-4 py-4 md:py-5 flex flex-col md:flex-row md:items-center gap-4">
        <p className="text-sm leading-relaxed flex-1">
          Nous utilisons des cookies pour mesurer l'audience et améliorer nos campagnes
          publicitaires. Vous pouvez accepter ou refuser librement.{" "}
          <Link to="/confidentialite" className="underline hover:no-underline">
            Politique de confidentialité
          </Link>
          .
        </p>
        <div className="flex gap-3 shrink-0">
          <Button
            type="button"
            size="lg"
            className="flex-1 md:flex-none min-w-[150px] bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
            onClick={() => choose("granted")}
          >
            Tout accepter
          </Button>
          <Button
            type="button"
            size="lg"
            variant="outline"
            className="flex-1 md:flex-none min-w-[150px] border-navy-foreground/60 bg-transparent text-navy-foreground hover:bg-navy-foreground/10 font-semibold"
            onClick={() => choose("denied")}
          >
            Tout refuser
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
