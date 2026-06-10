import { useRef } from "react";
import { Link } from "react-router-dom";
import { Phone, AlertTriangle, Ban, Home, ClipboardList, GitCompare, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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

      {/* SECTION "Quelle est votre situation ?" */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-10">
            Quelle est votre situation ?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            <Link to="/louer-bien-dpe-f-g-perpignan" className="group">
              <Card className="h-full transition-colors group-hover:border-primary group-hover:bg-primary/5">
                <CardContent className="p-6 flex flex-col h-full">
                  <AlertTriangle className="h-6 w-6 text-primary mb-4" />
                  <h3 className="font-heading text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                    Mon bien est classé F ou G
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Votre logement est une passoire thermique ? On fait le point sur les travaux et la mise en location.
                  </p>
                  <div className="mt-auto pt-4 flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    En savoir plus <ChevronRight className="h-4 w-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link to="/loyers-impayes-perpignan" className="group">
              <Card className="h-full transition-colors group-hover:border-primary group-hover:bg-primary/5">
                <CardContent className="p-6 flex flex-col h-full">
                  <Ban className="h-6 w-6 text-primary mb-4" />
                  <h3 className="font-heading text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                    Mon locataire ne paie pas
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Loyers impayés, relances sans réponse : on vous aide à reprendre la main sereinement.
                  </p>
                  <div className="mt-auto pt-4 flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    En savoir plus <ChevronRight className="h-4 w-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link to="/logement-ne-se-loue-pas-perpignan" className="group">
              <Card className="h-full transition-colors group-hover:border-primary group-hover:bg-primary/5">
                <CardContent className="p-6 flex flex-col h-full">
                  <Home className="h-6 w-6 text-primary mb-4" />
                  <h3 className="font-heading text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                    Mon logement ne se loue pas
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Peu de visites, aucun dossier sérieux : on active notre vivier de locataires pré-qualifiés.
                  </p>
                  <div className="mt-auto pt-4 flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    En savoir plus <ChevronRight className="h-4 w-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link to="/gestion-locative-perpignan" className="group">
              <Card className="h-full transition-colors group-hover:border-primary group-hover:bg-primary/5">
                <CardContent className="p-6 flex flex-col h-full">
                  <ClipboardList className="h-6 w-6 text-primary mb-4" />
                  <h3 className="font-heading text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                    J'en ai marre de tout gérer
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Quittances, états des lieux, relances : déléguez la gestion et encaissez en paix.
                  </p>
                  <div className="mt-auto pt-4 flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    En savoir plus <ChevronRight className="h-4 w-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link to="/deleguer-ou-gerer-soi-meme" className="group">
              <Card className="h-full transition-colors group-hover:border-primary group-hover:bg-primary/5">
                <CardContent className="p-6 flex flex-col h-full">
                  <GitCompare className="h-6 w-6 text-primary mb-4" />
                  <h3 className="font-heading text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                    Déléguer ou gérer moi-même ?
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Le comparatif honnête : coût, temps, risque. Décidez avec des chiffres.
                  </p>
                  <div className="mt-auto pt-4 flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    En savoir plus <ChevronRight className="h-4 w-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

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