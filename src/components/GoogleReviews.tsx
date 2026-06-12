import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Star, ExternalLink, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Review {
  author_name: string;
  rating: number;
  text: string;
  time: number;
  profile_photo_url?: string;
}

const REVIEW_URL = "https://g.page/r/Cf4uH0jFPZDSEBM/review";
const RATING_VALUE = "4,6/5";
const RATING_COUNT = 136;

/**
 * Robust CSV parser that handles quoted fields containing commas, newlines,
 * and escaped quotes (RFC 4180 style with "" as escaped quote).
 */
const parseCSV = (text: string): string[][] => {
  const rows: string[][] = [];
  let field = '';
  let row: string[] = [];
  let inQuotes = false;
  let i = 0;

  while (i < text.length) {
    const char = text[i];

    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i++;
        continue;
      }
      field += char;
      i++;
      continue;
    }

    if (char === '"') {
      inQuotes = true;
      i++;
      continue;
    }
    if (char === ',') {
      row.push(field);
      field = '';
      i++;
      continue;
    }
    if (char === '\r') {
      i++;
      continue;
    }
    if (char === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
      i++;
      continue;
    }
    field += char;
    i++;
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows.filter(r => r.some(c => c.trim() !== ''));
};

const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const GoogleReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedReviews, setExpandedReviews] = useState<Set<number>>(new Set());

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          'https://docs.google.com/spreadsheets/d/1MAO3oaJgKkAU-0RsyXgRSOKp_-Yi-wZaNDR7q3NEGJQ/gviz/tq?tqx=out:csv'
        );
        const csvText = await response.text();

        const rows = parseCSV(csvText).slice(1); // Skip header
        const parsed = rows
          .map(values => {
            const rawDate = (values[1] || '').trim();
            const parsedDate = rawDate ? new Date(rawDate) : null;
            const validTime = parsedDate && !isNaN(parsedDate.getTime())
              ? parsedDate.getTime() / 1000
              : 0;
            return {
              author_name: (values[0] || '').trim(),
              rating: parseInt(values[3]) || 5,
              text: (values[2] || '').trim(),
              time: validTime,
            };
          })
          .filter(r => r.author_name && r.text);

        setReviews(parsed);
      } catch (error) {
        console.error('Erreur chargement avis Google:', error);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long'
    });
  };

  const toggleExpanded = (index: number) => {
    const newExpanded = new Set(expandedReviews);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedReviews(newExpanded);
  };

  const truncateText = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const renderStars = (rating: number, size = "w-4 h-4") => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`${size} ${
          i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
        }`}
      />
    ));
  };

  // Hide entirely if no real reviews and not loading
  if (!loading && reviews.length === 0) {
    return null;
  }

  return (
    <section id="avis-google" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Score header */}
        <div className="max-w-3xl mx-auto mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
            Ils nous font confiance
          </h2>
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 rounded-2xl border border-border bg-card px-6 py-5 shadow-sm">
            <div className="flex items-baseline gap-2">
              <span className="font-heading text-5xl font-bold text-primary leading-none">
                {RATING_VALUE}
              </span>
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <div className="flex gap-0.5 mb-1">
                {renderStars(5, "w-5 h-5")}
              </div>
              <p className="text-sm font-semibold text-foreground">
                {RATING_COUNT} avis Google
              </p>
              <a
                href={REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline inline-flex items-center gap-1 mt-1"
              >
                Voir les avis
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex gap-4 overflow-x-auto pb-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="min-w-[280px] h-48 bg-card rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          <Carousel
            opts={{ align: "start", loop: true }}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent>
              {reviews.map((review, index) => {
                const isExpanded = expandedReviews.has(index);
                const shouldTruncate = review.text.length > 150;

                return (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <Card className="bg-card rounded-xl shadow-md hover:shadow-lg transition-shadow h-full p-5">
                      <div className="flex justify-between items-start mb-3 gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            aria-hidden
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm"
                          >
                            {getInitials(review.author_name)}
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-foreground text-sm truncate">
                              {review.author_name}
                            </p>
                            {review.time > 0 && (
                              <p className="text-xs text-muted-foreground">
                                {formatDate(review.time)}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-0.5 shrink-0">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground italic leading-relaxed">
                          "{isExpanded ? review.text : truncateText(review.text)}"
                        </p>
                        {shouldTruncate && (
                          <button
                            onClick={() => toggleExpanded(index)}
                            className="text-primary text-xs mt-2 hover:underline flex items-center gap-1"
                          >
                            {isExpanded ? "Voir moins" : "Voir plus"}
                            <ChevronDown className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                          </button>
                        )}
                      </div>
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        )}

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
            <a href={REVIEW_URL} target="_blank" rel="noopener noreferrer">
              Laissez votre avis sur Google
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GoogleReviews;
