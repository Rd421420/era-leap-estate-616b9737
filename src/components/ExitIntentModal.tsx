import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { trackEvent } from "@/lib/analytics";

const SESSION_KEY = "era_exit_intent_shown";
const DRAFT_KEY = "era_estimation_draft";

const PROPERTY_FIELDS = [
  "adresse",
  "type",
  "surface",
  "pieces",
  "chambres",
  "etat",
  "annee",
  "chauffage",
  "exterieur",
  "ville",
  "codePostal",
  "meuble",
  "dpe",
] as const;

interface Draft {
  data?: Record<string, unknown>;
}

const readDraft = (): Record<string, string> => {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Draft;
    const out: Record<string, string> = {};
    for (const key of PROPERTY_FIELDS) {
      const value = parsed.data?.[key];
      if (typeof value === "string" && value.trim()) out[key] = value.trim();
    }
    return out;
  } catch {
    return {};
  }
};

const hasStartedForm = (): boolean => {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw) as Draft;
    return Object.values(parsed.data ?? {}).some(
      (v) => typeof v === "string" && v.trim().length > 0,
    );
  } catch {
    return false;
  }
};

const ExitIntentModal = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Desktop uniquement
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.innerWidth < 1024) return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const handleMouseOut = (e: MouseEvent) => {
      if (e.relatedTarget || e.clientY > 0) return;
      if (sessionStorage.getItem(SESSION_KEY)) return;
      if (!hasStartedForm()) return;
      sessionStorage.setItem(SESSION_KEY, "1");
      setOpen(true);
    };

    document.addEventListener("mouseout", handleMouseOut);
    return () => document.removeEventListener("mouseout", handleMouseOut);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError("Merci d'indiquer une adresse email valide.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const { error: fnError } = await supabase.functions.invoke("submit-estimation", {
        body: {
          email: value,
          lead_partiel: "true",
          source_form: "exit-intent",
          timestamp: new Date().toISOString(),
          ...readDraft(),
        },
      });
      if (fnError) throw fnError;
      trackEvent("form_abandon_captured");
      setSent(true);
      setTimeout(() => setOpen(false), 2500);
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Vous partez sans votre estimation ?</DialogTitle>
          <DialogDescription>Laissez votre email, on vous l'envoie.</DialogDescription>
        </DialogHeader>

        {sent ? (
          <p className="text-sm font-medium text-primary">
            Merci ! Votre estimation vous sera envoyée par email.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="votre@email.fr"
              maxLength={255}
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              aria-label="Adresse email"
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Envoi..." : "Recevoir mon estimation"}
            </Button>
            <p className="text-xs text-muted-foreground">
              En envoyant votre email, vous acceptez d'être recontacté par ERA Dupont Romain.{" "}
              <Link to="/confidentialite" className="underline hover:text-primary">
                Politique de confidentialité
              </Link>
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentModal;
