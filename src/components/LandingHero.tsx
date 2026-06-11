import { type ReactNode } from "react";
import { Phone, ChevronRight, Star } from "lucide-react";
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
    <span className="text-muted-foreground">· sans engagement</span>
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
              <Button size="lg" onClick={onCta} className="shadow-era min-h-[44px]">
                Recevoir mon analyse offerte
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" asChild className="min-h-[44px]">
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
            {aside}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
