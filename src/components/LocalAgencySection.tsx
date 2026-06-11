import { Button } from "@/components/ui/button";
import { ChevronRight, MapPin } from "lucide-react";

interface LocalAgencySectionProps {
  onCta: () => void;
  image?: string;
  imageAlt?: string;
}

// TODO: remplacer par une vraie photo ERA Dupont Romain (devanture de l'agence ou équipe)
const DEFAULT_AGENCY_PHOTO =
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80";

const LocalAgencySection = ({ onCta, image, imageAlt }: LocalAgencySectionProps) => {
  const photo = image || DEFAULT_AGENCY_PHOTO;
  const alt = imageAlt || "L'agence ERA Dupont Romain Immobilier à Perpignan";
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center max-w-6xl mx-auto">
          <div className="order-2 lg:order-1">
            <img
              src={photo}
              alt={alt}
              className="w-full h-[320px] md:h-[420px] object-cover rounded-lg shadow-lg"
              loading="lazy"
            />
          </div>
          <div className="order-1 lg:order-2 space-y-5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold uppercase tracking-wide">
              <MapPin className="h-3.5 w-3.5" />
              Perpignan & Pyrénées-Orientales
            </span>
            <h2 className="font-heading text-2xl md:text-4xl font-bold text-foreground leading-tight">
              Votre agence locale à Perpignan
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              ERA Dupont Romain est implantée au cœur de Perpignan depuis des
              années. On connaît chaque quartier, du centre historique au
              Moulin-à-Vent, en passant par Saint-Assiscle et la Réal — et
              surtout, on sait à quels loyers les biens se louent vraiment.
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Vous êtes accompagné par une équipe joignable, qui visite vos
              biens, rencontre vos locataires, et vous parle franchement.
            </p>
            <Button size="lg" onClick={onCta} className="shadow-era">
              Recevoir mon analyse
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocalAgencySection;
