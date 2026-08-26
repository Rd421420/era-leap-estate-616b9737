import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Phone, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SeoHead from "@/components/SeoHead";

const situations = [
  { label: "Mon bien est classé F ou G", to: "/louer-bien-dpe-f-g-perpignan" },
  { label: "Mon locataire ne paie plus", to: "/loyers-impayes-perpignan" },
  { label: "Mon logement ne trouve pas preneur", to: "/logement-ne-se-loue-pas-perpignan" },
  { label: "Déléguer la gestion de mon bien", to: "/gestion-locative-perpignan" },
  { label: "Déléguer ou gérer soi-même ?", to: "/deleguer-ou-gerer-soi-meme" },
];

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <SeoHead
        title="Page introuvable | ERA Dupont Romain"
        description="Cette page n'existe pas ou plus. Retrouvez l'estimation locative et nos conseils gestion locative à Perpignan."
        path="/404"
        noindex
      />
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <span className="block font-heading text-6xl md:text-7xl text-primary">404</span>
          <h1 className="mt-4 font-heading text-2xl md:text-4xl uppercase tracking-tight">
            Cette page n'existe pas (ou plus)
          </h1>
          <span className="aida-rule mb-8" aria-hidden />
          <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
            Le lien que vous avez suivi est peut-être ancien, ou comporte une erreur. Voici par où reprendre.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild className="min-h-[48px] shadow-era">
              <a href="/#estimation-form">
                Estimer mon loyer
                <ChevronRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="min-h-[48px]">
              <a href="tel:+33468665718" className="gap-2">
                <Phone className="h-4 w-4" />
                04 68 66 57 18
              </a>
            </Button>
          </div>

          <ul className="mt-12 divide-y divide-border border-t border-b border-border">
            {situations.map(({ label, to }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="flex items-center justify-between gap-4 py-4 text-sm font-semibold text-foreground transition-colors hover:text-primary"
                >
                  {label}
                  <ChevronRight className="h-4 w-4 text-primary" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default NotFound;
