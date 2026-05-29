import { useRef } from "react";
import { Phone } from "lucide-react";
import Hero from "@/components/Hero";
import GoogleReviews from "@/components/GoogleReviews";
import EstimationForm from "@/components/EstimationForm";
import RecentEstimations from "@/components/RecentEstimations";
import FAQ from "@/components/FAQ";

const Index = () => {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="min-h-screen pb-[52px] md:pb-0">
      <Hero onScrollToForm={scrollToForm} />
      <GoogleReviews />
      <div ref={formRef}>
        <EstimationForm />
      </div>
      <RecentEstimations />
      <FAQ />
      
      {/* Footer */}
      <footer className="bg-foreground text-background py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4">
            <img
              src="https://drive.google.com/uc?export=view&id=1i2cANrQpr6_eKXrR98tZF6RwRYXJ3Q-R"
              alt="ERA"
              className="h-12 mx-auto opacity-80 invert"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <p className="text-sm mb-2">
            ERA DUPONT ROMAIN IMMOBILIER - Votre expert en gestion locative à Perpignan
          </p>
          <p className="text-xs opacity-75">
            © {new Date().getFullYear()} Tous droits réservés | 
            <a href="/mentions-legales" className="hover:underline ml-1">Mentions légales</a> | 
            <a href="/confidentialite" className="hover:underline ml-1">Politique de confidentialité</a> |
            <a href="https://media.immo-facile.com/segments/immo/catalog/images/manufacturers_bareme/265286.pdf" className="hover:underline ml-1" target="_blank" rel="noopener noreferrer">Honoraires</a>
          </p>
        </div>
      </footer>

      {/* Bandeau sticky mobile : appel direct */}
      <a
        href="tel:+33468665718"
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 h-[52px] bg-primary text-primary-foreground flex items-center justify-center gap-2 font-semibold shadow-lg"
        aria-label="Appeler ERA Dupont Romain Immobilier"
      >
        <Phone className="h-5 w-5" />
        <span>04 68 66 57 18</span>
      </a>
    </main>
  );
};

export default Index;