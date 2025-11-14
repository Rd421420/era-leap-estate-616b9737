import { Button } from "@/components/ui/button";
import { ArrowDown, Play } from "lucide-react";

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
                src="https://drive.google.com/uc?export=view&id=1i2cANrQpr6_eKXrR98tZF6RwRYXJ3Q-R"
                alt="ERA DUPONT ROMAIN IMMOBILIER"
                className="h-16 md:h-20 object-contain"
                onError={(e) => {
                  e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 60'%3E%3Ctext x='10' y='40' font-family='Arial' font-size='24' fill='%23C8102E' font-weight='bold'%3EERA%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-tight">
              Estimation locative{" "}
              <span className="text-gradient">gratuite</span> à Perpignan
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
                className="bg-primary hover:bg-primary-dark text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all text-base md:text-lg px-8 py-6"
              >
                Recevoir mon estimation gratuite
                <ArrowDown className="ml-2 h-5 w-5 animate-bounce" />
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              ✓ Sans engagement • ✓ Réponse sous 24h • ✓ 100% gratuit
            </p>
          </div>

          {/* Right Column - Video */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video bg-muted">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
                poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 450'%3E%3Crect fill='%23E9E9E9' width='800' height='450'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='48' fill='%23C8102E'%3EERA%3C/text%3E%3C/svg%3E"
              >
                <source 
                  src="https://drive.google.com/uc?export=download&id=1NgQ10xsKDB5pej_PRY097haVtnsf3k_s" 
                  type="video/mp4" 
                />
                Votre navigateur ne supporte pas la lecture de vidéos.
              </video>
              
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                  <Play className="w-8 h-8 text-primary ml-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;