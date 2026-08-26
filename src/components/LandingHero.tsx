import { useState, type ReactNode } from "react";
import { Phone, ChevronRight, Star, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CommuneAutocomplete } from "@/components/CommuneAutocomplete";
import { GOOGLE_RATING, GOOGLE_REVIEW_COUNT, GOOGLE_REVIEW_URL } from "@/lib/agency";


interface LandingHeroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  onCta: () => void;
  image?: string;
  imageAlt?: string;
  aside?: ReactNode;
  ville?: string;
  codePostal?: string;
  onVilleChange?: (v: string) => void;
  onCodePostalChange?: (v: string) => void;
}

const SocialProof = () => (
  <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
    <div className="flex items-center gap-0.5" aria-label="Note 4,6 sur 5">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      ))}
    </div>
    <a
      href="https://g.page/r/Cf4uH0jFPZDSEBM/review"
      target="_blank"
      rel="noopener noreferrer"
      className="font-semibold text-navy-foreground hover:text-primary transition-colors"
    >
      4,6/5 · 136 avis Google
    </a>
    <span className="text-navy-muted">· sans engagement de durée</span>
  </div>
);


interface DefaultAsideProps {
  onCta: () => void;
  ville?: string;
  codePostal?: string;
  onVilleChange?: (v: string) => void;
  onCodePostalChange?: (v: string) => void;
}

const DefaultAside = ({
  onCta,
  ville,
  codePostal,
  onVilleChange,
  onCodePostalChange,
}: DefaultAsideProps) => {
  // Mode non contrôlé : état local de secours
  const [localVille, setLocalVille] = useState("");
  const [localCp, setLocalCp] = useState("");

  const villeValue = ville ?? localVille;
  const cpValue = codePostal ?? localCp;
  const setVille = onVilleChange ?? setLocalVille;
  const setCp = onCodePostalChange ?? setLocalCp;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCta();
  };

  return (
    <Card className="shadow-era border-primary/20">
      <CardContent className="p-6 md:p-8 space-y-5">
        <div>
          <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground">
            Estimez le loyer de votre bien
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Gratuit · réponse par email en quelques minutes
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <CommuneAutocomplete
              ville={villeValue}
              codePostal={cpValue}
              onVilleChange={setVille}
              onCodePostalChange={setCp}
            />
          </div>
          <Button type="submit" size="lg" className="w-full shadow-era min-h-[44px]">
            Estimer mon loyer gratuitement
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </form>
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Lock className="h-3 w-3" />
          Vos données ne sont jamais revendues · sans engagement
        </p>
      </CardContent>
    </Card>
  );
};

const LandingHero = ({
  eyebrow,
  title,
  subtitle,
  onCta,
  aside,
  ville,
  codePostal,
  onVilleChange,
  onCodePostalChange,
}: LandingHeroProps) => {
  return (
    <section className="relative w-full overflow-hidden bg-navy text-navy-foreground py-16 md:py-20">
      <div
        aria-hidden
        className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-black/25 to-transparent"
      />
      <div className="container relative z-10 mx-auto px-4">
        {/* ATTENTION */}
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="mb-6 inline-block bg-primary px-4 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground">
            {eyebrow}
          </span>
          <h1 className="font-heading text-3xl uppercase leading-[1.05] tracking-tight md:text-5xl">
            {title}
          </h1>
          <p className="mt-6 text-lg text-navy-muted md:text-xl">{subtitle}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              variant="outline"
              asChild
              className="min-h-[48px] border-white/30 bg-transparent text-navy-foreground hover:bg-white/10 hover:text-navy-foreground"
            >
              <a href="tel:+33468665718" className="gap-2">
                <Phone className="h-4 w-4" />
                Parler à un conseiller - 04 68 66 57 18
              </a>
            </Button>
          </div>
          <div className="mt-6">
            <SocialProof />
          </div>
        </div>

        {/* Carte de capture */}
        <div className="mx-auto mt-12 max-w-xl">
          {aside ?? (
            <DefaultAside
              onCta={onCta}
              ville={ville}
              codePostal={codePostal}
              onVilleChange={onVilleChange}
              onCodePostalChange={onCodePostalChange}
            />
          )}
        </div>
      </div>
    </section>
  );
};


export default LandingHero;
