import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, Star, Home, Calendar } from "lucide-react";

const ThankYou = () => {
  const location = useLocation();
  const prenom = location.state?.prenom || "Cher propriétaire";

  useEffect(() => {
    window.scrollTo(0, 0);
    // Track GA4 conversion
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        'send_to': 'G-JD27BBNDM5',
        'value': 1.0,
        'currency': 'EUR'
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        <div className="bg-card rounded-2xl shadow-era p-8 md:p-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-primary" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            🎉 Merci {prenom} !
          </h1>
          
          <p className="text-lg text-muted-foreground mb-6">
            Votre demande d'estimation a bien été envoyée. Vous allez recevoir votre estimation par e-mail dans quelques instants.
          </p>

          <div className="border-2 border-primary/20 rounded-xl p-6 mb-8 bg-primary/5">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Calendar className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-heading font-bold text-foreground">
                Prenez rendez-vous avec un conseiller
              </h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Pour une évaluation personnalisée de votre bien, réservez un créneau téléphonique avec l'un de nos experts ERA.
            </p>
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-primary-foreground font-semibold shadow-md hover:shadow-lg transition-all"
            >
              <a
                href="https://calendar.app.google/viMBcNbADyEeM4de6"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Réserver un appel
              </a>
            </Button>
          </div>


          <div className="bg-muted rounded-xl p-6 mb-8">
            <p className="text-sm text-foreground font-semibold mb-2">
              📞 Un conseiller ERA vous contactera sous 24h
            </p>
            <p className="text-xs text-muted-foreground">
              ℹ️ Cette estimation est indicative. Pour une évaluation plus précise et personnalisée, nous vous recommandons un rendez-vous avec l'un de nos experts.
            </p>
          </div>

          <div className="border-2 border-primary/20 rounded-xl p-6 mb-8 bg-primary/5">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              <h2 className="text-xl font-heading font-bold text-foreground">
                Votre avis compte beaucoup !
              </h2>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">
              Partagez votre expérience avec ERA DUPONT ROMAIN IMMOBILIER sur Google. 
              Cela aide d'autres propriétaires à nous faire confiance.
            </p>
            
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-primary-foreground font-semibold shadow-md hover:shadow-lg transition-all"
            >
              <a 
                href="https://g.page/r/Cf4uH0jFPZDSEBM/review" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                ⭐ Laisser un avis Google
              </a>
            </Button>
          </div>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            <Link to="/">
              <Home className="w-4 h-4 mr-2" />
              Retour à l'accueil
            </Link>
          </Button>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Des questions ? Contactez-nous directement au{" "}
          <a href="tel:0468665718" className="text-primary font-semibold hover:underline">
            04 68 66 57 18
          </a>
        </p>
      </div>
    </div>
  );
};

export default ThankYou;