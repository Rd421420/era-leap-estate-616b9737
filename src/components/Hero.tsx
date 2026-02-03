import eraLogo from "@/assets/era-logo.png";
import { Button } from "@/components/ui/button";
import { ArrowDown, Phone } from "lucide-react";

interface HeroProps {
  onScrollToForm: () => void;
}

const Hero = ({ onScrollToForm }: HeroProps) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left space-y-6">
            <div className="inline-block mb-4">
              <img
                src={eraLogo}
                alt="ERA DUPONT ROMAIN IMMOBILIER"
                className="h-16 md:h-20 object-contain"
              />
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-tight">
              Estimation locative{" "}
              <span className="text-gradient">offerte</span> à Perpignan
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              ERA DUPONT ROMAIN IMMOBILIER — votre expert local en gestion locative. 
              Recevez votre estimation en quelques minutes.
            </p>

            {/* Special Offer Banner */}
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-l-4 border-primary rounded-lg p-4 max-w-2xl mx-auto lg:mx-0">
              <p className="text-sm md:text-base font-semibold text-foreground flex items-center gap-2">
                🎁 <span>Offre spéciale : Remboursement de la prime GLI sur 12 mois pour tout mandat de gestion, sans engagement</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                onClick={onScrollToForm}
                className="bg-primary hover:bg-primary-dark text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all text-base md:text-lg px-8 py-6 hover:scale-[1.02]"
              >
                Recevoir mon estimation offerte
                <ArrowDown className="ml-2 h-5 w-5 animate-bounce" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold shadow-md hover:shadow-lg transition-all text-base md:text-lg px-8 py-6 hover:scale-[1.02]"
              >
                <a href="tel:0468665718" className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  04 68 66 57 18
                </a>
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              ✓ Sans engagement • ✓ Réponse sous 24h • ✓ 100% gratuit
            </p>
          </div>

          {/* Right Column - Video */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video bg-muted">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/UlXohzlvmMc?controls=1&rel=0&modestbranding=1"
                title="ERA DUPONT ROMAIN IMMOBILIER - Gestion Locative à Perpignan"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;