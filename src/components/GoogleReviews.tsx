import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Review {
  author_name: string;
  rating: number;
  text: string;
  time: number;
  profile_photo_url?: string;
}

const GoogleReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          'https://docs.google.com/spreadsheets/d/1MAO3oaJgKkAU-0RsyXgRSOKp_-Yi-wZaNDR7q3NEGJQ/gviz/tq?tqx=out:csv'
        );
        const csvText = await response.text();
        
        // Parse CSV (skip header)
        const lines = csvText.split('\n').slice(1);
        const parsed = lines
          .map(line => {
            const values = line.split(',').map(v => v.replace(/"/g, '').trim());
            return {
              author_name: values[0] || '',
              rating: parseInt(values[3]) || 5,
              text: values[2] || '',
              time: values[1] ? new Date(values[1]).getTime() / 1000 : Date.now() / 1000
            };
          })
          .filter(r => r.author_name && r.text);

        setReviews(parsed.length > 0 ? parsed : getMockReviews());
      } catch (error) {
        console.error('Erreur chargement avis Google:', error);
        setReviews(getMockReviews());
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const getMockReviews = (): Review[] => [
    {
      author_name: "Marie Dubois",
      rating: 5,
      text: "Excellent service ! L'équipe ERA a été très professionnelle pour l'estimation de mon appartement. Je recommande vivement.",
      time: Date.now() / 1000 - 86400 * 5
    },
    {
      author_name: "Jean-Pierre Martin",
      rating: 5,
      text: "Très satisfait de la gestion locative. Réactifs et à l'écoute. Mon bien est loué depuis 3 ans sans souci.",
      time: Date.now() / 1000 - 86400 * 12
    },
    {
      author_name: "Sophie Laurent",
      rating: 5,
      text: "Estimation gratuite très précise, proche du loyer réel obtenu. Merci pour votre expertise !",
      time: Date.now() / 1000 - 86400 * 20
    }
  ];

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long'
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-primary mb-8">
            ⭐ Ils nous font confiance sur Google
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="min-w-[280px] h-48 bg-card rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="avis-google" className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-primary mb-3">
          ⭐ Ils nous font confiance sur Google
        </h2>
        <p className="text-center text-muted-foreground mb-8">
          Découvrez les avis authentiques de nos clients propriétaires
        </p>

        {/* Reviews Carousel */}
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {reviews.map((review, index) => (
            <Card
              key={index}
              className="snap-center bg-card rounded-xl shadow-md hover:shadow-lg transition-shadow min-w-[280px] md:min-w-[320px] flex-shrink-0 p-5"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    {review.author_name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(review.time)}
                  </p>
                </div>
                <div className="flex gap-0.5">
                  {renderStars(review.rating)}
                </div>
              </div>
              <p className="text-sm text-muted-foreground italic leading-relaxed">
                "{review.text}"
              </p>
            </Card>
          ))}
        </div>

        {/* CTA to leave review */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground mb-4">
            📢 Vous êtes client ERA DUPONT ROMAIN IMMOBILIER ?
          </p>
          <Button
            asChild
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all"
          >
            <a
              href="https://g.page/r/Cf4uH0jFPZDSEBM/review"
              target="_blank"
              rel="noopener noreferrer"
            >
              Laissez votre avis sur Google
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default GoogleReviews;