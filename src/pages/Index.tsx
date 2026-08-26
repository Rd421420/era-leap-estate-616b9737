import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, Ban, Home, ClipboardList, GitCompare, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import LandingHero from "@/components/LandingHero";
import TrustBar from "@/components/TrustBar";
import EstimationForm from "@/components/EstimationForm";
import RecentEstimations from "@/components/RecentEstimations";
import FAQ from "@/components/FAQ";
import SeoHead from "@/components/SeoHead";
import AgencyProof from "@/components/AgencyProof";


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
        title="Combien votre bien peut-il se louer à Perpignan ou dans le 66 ?"
        subtitle="Un loyer trop haut, et votre appartement reste vide plusieurs semaines. Trop bas, et vous laissez des centaines d'euros par an sur la table. Recevez le loyer réellement pratiqué dans votre quartier, par email en quelques minutes, puis un point avec votre expert ERA sous 24 h."
        onCta={scrollToForm}
        ville={ville}
        codePostal={codePostal}
        onVilleChange={setVille}
        onCodePostalChange={setCodePostal}
      />
      <TrustBar />

      {/* SECTION "Quelle est votre situation ?" */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="font-heading text-2xl md:text-4xl uppercase tracking-tight mb-4">
              Vous vous reconnaissez dans l'une de ces <span className="text-primary">situations</span> ?
            </h2>
            <span className="aida-rule" aria-hidden />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to="/louer-bien-dpe-f-g-perpignan" className="group">
              <Card className="h-full rounded-none border border-border bg-card shadow-sm transition-all group-hover:border-primary">
                <CardContent className="p-8 flex flex-col h-full">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center bg-muted transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <span className="font-heading text-lg">01</span>
                  </div>
                  <AlertTriangle className="mb-4 h-5 w-5 text-primary" aria-hidden />
                  <h3 className="font-heading text-base uppercase leading-tight mb-2 group-hover:text-primary transition-colors">
                    Mon bien est classé F ou G, je ne pourrai bientôt plus le louer
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
                    Mon locataire ne paie plus, je ne sais plus quoi faire
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
                    Mon logement ne trouve pas preneur depuis des semaines
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Peu de visites, aucun dossier sérieux : on active notre vivier de locataires déjà vérifiés.
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
                    Je passe mes soirées à gérer mon locataire
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
                    Je me demande si déléguer vaut vraiment le coup
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

      <AgencyProof />

      {/* ACTION */}
      <div className="bg-navy py-14 text-center text-navy-foreground">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-2xl md:text-4xl uppercase tracking-tight">
            Votre estimation en <span className="text-primary">3 minutes</span>
          </h2>
          <p className="mt-4 text-navy-muted">Pas de visite obligatoire, pas d'engagement. Vous recevez votre fourchette de loyer par email, et vous décidez de la suite.</p>
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