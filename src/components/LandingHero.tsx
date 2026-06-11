import type { ReactNode } from "react";
import { Phone, ChevronRight, ClipboardCheck, Calculator, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LandingHeroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  onCta: () => void;
  image?: string;
  imageAlt?: string;
  aside?: ReactNode;
}

const atouts = [
  { label: "Estimation locative offerte", icon: ClipboardCheck },
  { label: "GLI remboursée 12 mois", icon: Calculator },
  { label: "Locataires pré-qualifiés", icon: Users },
];

const SocialProof = () => (
  <div className="flex flex-wrap items-center gap-2 text-sm">
    <div className="flex items-center gap-0.5" aria-label="Note 4,6 sur 5">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      ))}
    </div>
    <a
      href="https://g.page/r/Cf4uH0jFPZDSEBM/review"
      target="_blank"
      rel="noopener noreferrer"
      className="font-semibold text-foreground hover:text-primary transition-colors"
    >
      4,6/5 · 136 avis Google
    </a>
  </div>
);

const LandingHero = ({ eyebrow, title, subtitle, onCta, image, imageAlt, aside }: LandingHeroProps) => {
  return (
    <section className="relative bg-gradient-to-br from-background via-muted/30 to-background pt-10 pb-12 md:pt-16 md:pb-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center max-w-6xl mx-auto">
          {/* Left column */}
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold uppercase tracking-wide">
              {eyebrow}
            </span>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground leading-tight">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" onClick={onCta} className="shadow-era">
                Recevoir mon analyse offerte
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:+33468665718" className="gap-2">
                  <Phone className="h-4 w-4" />
                  04 68 66 57 18
                </a>
              </Button>
            </div>
            <SocialProof />
          </div>

          {/* Right column */}
          <div className="space-y-4">
            {image && (
              // TODO: remplacer par une vraie photo ERA Dupont Romain (devanture, équipe, bien loué)
              <img
                src={image}
                alt={imageAlt || "Agence ERA Dupont Romain à Perpignan"}
                className="w-full h-[220px] object-cover rounded-lg shadow-md"
                loading="lazy"
              />
            )}
            {aside ? (
              aside
            ) : (
            <div className="rounded-lg border border-border bg-card shadow-lg p-6 md:p-8">
            <div className="mb-6">
              <h2 className="font-heading text-2xl font-bold text-foreground">
                Estimation locative offerte
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Gratuit · réponse sous 24 h
              </p>
            </div>
            <ul className="space-y-4 mb-6">
              {atouts.map((a) => (
                <li key={a.label} className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <a.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">{a.label}</span>
                </li>
              ))}
            </ul>
            <Button size="lg" onClick={onCta} className="w-full shadow-era">
              Recevoir mon analyse
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
