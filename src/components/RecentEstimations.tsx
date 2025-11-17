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
        
        // Parse CSV (simple parsing for demo)
        const lines = csvText.split('\n').slice(1); // Skip header
        const parsed = lines
          .slice(0, 5)
          .map(line => {
            const values = line.split(',').map(v => v.replace(/"/g, '').trim());
            return {
              date: values[0] || new Date().toLocaleDateString('fr-FR'),
              ville: values[1] || 'Perpignan',
              type: values[2] || 'Appartement',
              pieces: values[3] || 'T3',
              surface: values[4] || '75',
              loyer: values[5] || '800'
            };
          })
          .filter(e => e.ville);

        setEstimations(parsed.length > 0 ? parsed : getMockEstimations());
      } catch (error) {
        console.error('Erreur chargement estimations:', error);
        setEstimations(getMockEstimations());
      } finally {
        setLoading(false);
      }
    };

    fetchEstimations();
  }, []);

  const getMockEstimations = (): Estimation[] => [
    {
      date: new Date(Date.now() - 86400000 * 2).toLocaleDateString('fr-FR'),
      ville: "Perpignan",
      type: "Appartement",
      pieces: "T3",
      surface: "75",
      loyer: "850"
    },
    {
      date: new Date(Date.now() - 86400000 * 3).toLocaleDateString('fr-FR'),
      ville: "Canet-en-Roussillon",
      type: "Maison",
      pieces: "T4",
      surface: "110",
      loyer: "1250"
    },
    {
      date: new Date(Date.now() - 86400000 * 5).toLocaleDateString('fr-FR'),
      ville: "Perpignan",
      type: "Studio",
      pieces: "T1",
      surface: "28",
      loyer: "480"
    },
    {
      date: new Date(Date.now() - 86400000 * 7).toLocaleDateString('fr-FR'),
      ville: "Saint-Cyprien",
      type: "Appartement",
      pieces: "T2",
      surface: "52",
      loyer: "720"
    },
    {
      date: new Date(Date.now() - 86400000 * 10).toLocaleDateString('fr-FR'),
      ville: "Perpignan",
      type: "Appartement",
      pieces: "T4",
      surface: "95",
      loyer: "1100"
    }
  ];

  if (loading) {
    return (
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-foreground mb-8">
            📊 Dernières estimations réalisées
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

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-foreground mb-3">
          📊 Dernières estimations réalisées
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
                        {est.ville}
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
                        <span>{est.pieces}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Maximize2 className="w-3 h-3 text-muted-foreground" />
                        <span>{est.surface}m²</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-border">
                      <div className="text-lg font-heading font-bold text-primary">
                        {est.loyer} €<span className="text-xs text-muted-foreground">/mois</span>
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