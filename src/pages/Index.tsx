import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, Ban, Home, ClipboardList, GitCompare, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import LandingHero from "@/components/LandingHero";
import TrustBar from "@/components/TrustBar";
import GoogleReviews from "@/components/GoogleReviews";
import EstimationForm from "@/components/EstimationForm";
import RecentEstimations from "@/components/RecentEstimations";
import FAQ from "@/components/FAQ";
import SeoHead from "@/components/SeoHead";

const Index = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const [ville, setVille] = useState("");
  const [codePostal, setCodePostal] = useState("");

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <SeoHead
        title="Agence immobilière Perpignan | ERA Dupont Romain"
        description="Estimation locative offerte à Perpignan et dans le 66. Gestion locative, location et conseil patrimoine par ERA Dupont Romain."
        path="/"
      />
      <LandingHero
        eyebrow="ESTIMATION LOCATIVE GRATUITE · PERPIGNAN ET LE 66"
        title="Combien pouvez-vous louer votre bien à Perpignan ou en dans le 66 ?"
        subtitle="Recevez gratuitement l'estimation du loyer de votre bien, basée sur le marché réel de votre rue. Réponse sous 24 h par votre expert local ERA Dupont Romain."
        onCta={scrollToForm}
        ville={ville}
        codePostal={codePostal}
        onVilleChange={setVille}
        onCodePostalChange={setCodePostal}
      />
      <TrustBar />

      {/* DÉSIR — preuve sociale */}
      <div className="bg-card">
        <GoogleReviews />
      </div>

      {/* Vidéo de présentation */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-video bg-muted">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/UlXohzlvmMc?controls=1&rel=0&modestbranding=1"
              title="ERA DUPONT ROMAIN IMMOBILIER - Gestion Locative à Perpignan"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* SECTION "Quelle est votre situation ?" */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="font-heading text-2xl md:text-4xl uppercase tracking-tight mb-4">
              Quelle est votre <span className="text-primary">situation locative</span> ?
            </h2>
            <span className="aida-rule" aria-hidden />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <Link to="/louer-bien-dpe-f-g-perpignan" className="group">
              <Card className="h-full rounded-none border border-border bg-card shadow-sm transition-all group-hover:border-primary">
                <CardContent className="p-8 flex flex-col h-full">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center bg-muted transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <span className="font-heading text-lg">01</span>
                  </div>
                  <AlertTriangle className="mb-4 h-5 w-5 text-primary" aria-hidden />
                  <h3 className="font-heading text-base uppercase leading-tight mb-2 group-hover:text-primary transition-colors">
                    Mon bien est classé F ou G
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Votre logement est une passoire thermique ? On fait le point sur les travaux et la mise en location.
                  </p>
                  <div className="mt-auto pt-4 flex items-center text-sm font-medium text-primary">
                    En savoir plus <ChevronRight className="h-4 w-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link to="/loyers-impayes-perpignan" className="group">
              <Card className="h-full rounded-none border border-border bg-card shadow-sm transition-all group-hover:border-primary">
                <CardContent className="p-8 flex flex-col h-full">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center bg-muted transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <span className="font-heading text-lg">02</span>
                  </div>
                  <Ban className="mb-4 h-5 w-5 text-primary" aria-hidden />
                  <h3 className="font-heading text-base uppercase leading-tight mb-2 group-hover:text-primary transition-colors">
                    Mon locataire ne paie pas
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Loyers impayés, relances sans réponse : on vous aide à reprendre la main sereinement.
                  </p>
                  <div className="mt-auto pt-4 flex items-center text-sm font-medium text-primary">
                    En savoir plus <ChevronRight className="h-4 w-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link to="/logement-ne-se-loue-pas-perpignan" className="group">
              <Card className="h-full rounded-none border border-border bg-card shadow-sm transition-all group-hover:border-primary">
                <CardContent className="p-8 flex flex-col h-full">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center bg-muted transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <span className="font-heading text-lg">03</span>
                  </div>
                  <Home className="mb-4 h-5 w-5 text-primary" aria-hidden />
                  <h3 className="font-heading text-base uppercase leading-tight mb-2 group-hover:text-primary transition-colors">
                    Mon logement ne se loue pas
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Peu de visites, aucun dossier sérieux : on active notre vivier de locataires pré-qualifiés.
                  </p>
                  <div className="mt-auto pt-4 flex items-center text-sm font-medium text-primary">
                    En savoir plus <ChevronRight className="h-4 w-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link to="/gestion-locative-perpignan" className="group">
              <Card className="h-full rounded-none border border-border bg-card shadow-sm transition-all group-hover:border-primary">
                <CardContent className="p-8 flex flex-col h-full">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center bg-muted transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <span className="font-heading text-lg">04</span>
                  </div>
                  <ClipboardList className="mb-4 h-5 w-5 text-primary" aria-hidden />
                  <h3 className="font-heading text-base uppercase leading-tight mb-2 group-hover:text-primary transition-colors">
                    J'en ai marre de tout gérer
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Quittances, états des lieux, relances : déléguez la gestion et encaissez en paix.
                  </p>
                  <div className="mt-auto pt-4 flex items-center text-sm font-medium text-primary">
                    En savoir plus <ChevronRight className="h-4 w-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link to="/deleguer-ou-gerer-soi-meme" className="group">
              <Card className="h-full rounded-none border border-border bg-card shadow-sm transition-all group-hover:border-primary">
                <CardContent className="p-8 flex flex-col h-full">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center bg-muted transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <span className="font-heading text-lg">05</span>
                  </div>
                  <GitCompare className="mb-4 h-5 w-5 text-primary" aria-hidden />
                  <h3 className="font-heading text-base uppercase leading-tight mb-2 group-hover:text-primary transition-colors">
                    Déléguer ou gérer moi-même ?
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Le comparatif honnête : coût, temps, risque. Décidez avec des chiffres.
                  </p>
                  <div className="mt-auto pt-4 flex items-center text-sm font-medium text-primary">
                    En savoir plus <ChevronRight className="h-4 w-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* ACTION */}
      <div className="bg-navy py-14 text-center text-navy-foreground">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-2xl md:text-4xl uppercase tracking-tight">
            Votre estimation en <span className="text-primary">3 étapes</span>
          </h2>
          <p className="mt-4 text-navy-muted">
            Gratuit, sans engagement de durée · réponse sous 24 h
          </p>
          <div className="mt-8 flex justify-center gap-3" aria-hidden>
            <span className="h-2 w-12 bg-primary" />
            <span className="h-2 w-12 bg-white/20" />
            <span className="h-2 w-12 bg-white/20" />
          </div>
        </div>
      </div>

      <div ref={formRef} id="estimation-form">
        <EstimationForm initialVille={ville} initialCodePostal={codePostal} />
      </div>
      <RecentEstimations />

      <FAQ />
    </>
  );
};

export default Index;
