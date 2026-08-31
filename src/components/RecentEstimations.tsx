import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { MapPin, Home, Maximize2, BedDouble, Calendar } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface Estimation {
  date: string;
  ville: string;
  type: string;
  pieces: string;
  surface: string;
  loyer: string;
}

const parseFrenchDate = (dateStr: string): Date | null => {
  if (!dateStr) return null;
  const parts = dateStr.trim().split('/');
  if (parts.length !== 3) return null;
  const [day, month, year] = parts.map((p) => parseInt(p, 10));
  if (!day || !month || !year) return null;
  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }
  return date;
};

const normalizeCityName = (city: string): string => {
  const LOWER = new Set([
    'de', 'du', 'des', 'd', 'le', 'la', 'les', 'l', 'en', 'sur', 'sous',
    'lès', 'aux', 'au', 'et', 'del',
  ]);
  let isFirstWord = true;
  return city
    .toLowerCase()
    .split(/([\s'-]+)/)
    .map((part) => {
      if (/[\s'-]+/.test(part) || !part) return part;
      const capitalized = part.charAt(0).toUpperCase() + part.slice(1);
      const result = !isFirstWord && LOWER.has(part) ? part : capitalized;
      isFirstWord = false;
      return result;
    })
    .join('');
};

const formatPieces = (pieces: string): string => {
  const value = pieces.trim();
  if (!value) return value;
  if (/^T?\d+$/i.test(value)) {
    return value.toUpperCase().startsWith('T') ? value.toUpperCase() : `T${value}`;
  }
  return value;
};

const RecentEstimations = () => {
  const [estimations, setEstimations] = useState<Estimation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEstimations = async () => {
      try {
        const response = await fetch(
          'https://docs.google.com/spreadsheets/d/1q0g4AqqlWZ01DgRF2kmKn7t_Te6jH3AuFPs41jPaCGY/gviz/tq?tqx=out:csv'
        );
        const csvText = await response.text();

        const lines = csvText.split('\n').slice(1); // Skip header
        const parsed = lines
          .map((line) => {
            const values = line.split(',').map((v) => v.replace(/"/g, '').trim());
            return {
              date: values[0] ?? '',
              ville: values[1] ?? '',
              type: values[2] ?? '',
              pieces: values[3] ?? '',
              surface: values[4] ?? '',
              loyer: values[5] ?? '',
              parsedDate: parseFrenchDate(values[0] ?? ''),
            };
          })
          // On n'affiche que les lignes réellement complètes du CSV
          .filter(
            (e) =>
              e.date && e.ville && e.type && e.pieces && e.surface && e.loyer &&
              /\d/.test(e.loyer) && /\d/.test(e.surface)
          )
          // Les plus récentes en premier ; dates invalides repoussées en fin
          .sort((a, b) => {
            if (a.parsedDate && b.parsedDate) {
              return b.parsedDate.getTime() - a.parsedDate.getTime();
            }
            if (a.parsedDate) return -1;
            if (b.parsedDate) return 1;
            return 0;
          })
          .slice(0, 5)
          .map(({ parsedDate, ...rest }) => rest);

        setEstimations(parsed);
      } catch (error) {
        console.error('Erreur chargement estimations:', error);
        setEstimations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEstimations();
  }, []);

  if (loading) {
    return (
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-foreground mb-8">
            Dernières estimations réalisées
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-40 bg-card rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Aucune donnée réelle disponible → on masque la section
  if (estimations.length === 0) return null;

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-foreground mb-3">
          Dernières estimations réalisées
        </h2>
        <p className="text-center text-muted-foreground mb-8">
          Des propriétaires nous ont fait confiance récemment
        </p>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent>
            {estimations.map((est, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Card className="p-5 hover:shadow-lg transition-shadow bg-gradient-to-br from-card to-muted/20">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <Calendar className="w-3 h-3" />
                    {est.date}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="font-semibold text-sm text-foreground truncate">
                        {normalizeCityName(est.ville)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Home className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        {est.type}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-1">
                        <BedDouble className="w-3 h-3 text-muted-foreground" />
                        <span>{formatPieces(est.pieces)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Maximize2 className="w-3 h-3 text-muted-foreground" />
                        <span>{est.surface}m²</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-border">
                      <div className="text-lg font-heading font-bold text-primary">
                        {(() => {
                          const n = parseInt(String(est.loyer).replace(/[^\d]/g, ""), 10);
                          const formatted = Number.isFinite(n)
                            ? n.toLocaleString("fr-FR")
                            : String(est.loyer);
                          return (
                            <>
                              {formatted} €<span className="text-xs text-muted-foreground">/mois</span>
                            </>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <p className="text-center text-xs text-muted-foreground mt-6 max-w-2xl mx-auto">
          💡 Ces estimations sont indicatives et basées sur les données du marché local. 
          Pour une estimation personnalisée de votre bien, remplissez le formulaire ci-dessus.
        </p>
      </div>
    </section>
  );
};

export default RecentEstimations;