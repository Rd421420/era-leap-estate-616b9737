import { useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Phone, ChevronRight, ClipboardCheck, Calculator, Users, SearchX, TrendingDown, Megaphone, LineChart, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import EstimationForm from "@/components/EstimationForm";
import { trackEvent } from "@/lib/analytics";

const VacanceLocative = () => {
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    trackEvent("lp_view", { page: "vacance" });
  }, []);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const atouts = [
    { label: "Estimation locative offerte", icon: ClipboardCheck },
    { label: "GLI remboursée 12 mois", icon: Calculator },
    { label: "Locataires déjà pré-qualifiés", icon: Users },
  ];

  return (
    <>
      <Helmet>
        <title>Votre appartement ne se loue pas à Perpignan ? | ERA Dupont Romain</title>
        <meta name="description" content="Des semaines sans locataire sérieux à Perpignan ? On active notre vivier de locataires déjà pré-qualifiés. Estimation locative offerte, mise en location rapide." />
        <link rel="canonical" href="https://era-dupontromain.immo/logement-ne-se-loue-pas-perpignan" />
        <meta property="og:title" content="Votre appartement ne se loue pas à Perpignan ? | ERA Dupont Romain" />
        <meta property="og:description" content="Des semaines sans locataire sérieux à Perpignan ? On active notre vivier de locataires déjà pré-qualifiés." />
        <meta property="og:url" content="https://era-dupontromain.immo/logement-ne-se-loue-pas-perpignan" />
      </Helmet>

      <main className="min-h-screen pb-[52px] md:pb-0">
        {/* HERO */}
        <section className="relative bg-gradient-to-br from-background via-muted/30 to-background pt-12 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                Votre logement ne se loue pas ? On a déjà les locataires.
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                Pendant que les autres repartent de zéro à chaque recherche, nous arrivons avec une liste de candidats déjà filtrés — revenus vérifiés, garanties, dossier complet. Votre vacance se compte en jours, pas en mois.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                <Button size="lg" onClick={scrollToForm} className="shadow-era">
                  Recevoir mon analyse offerte
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="tel:+33468665718" className="gap-2">
                    <Phone className="h-4 w-4" />
                    04 68 66 57 18
                  </a>
                </Button>
              </div>

              {/* 3 atouts */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {atouts.map((a) => (
                  <div
                    key={a.label}
                    className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <a.icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-sm font-semibold text-foreground text-left">{a.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3 cartes */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-10">
              Vous êtes peut-être dans ce cas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <SearchX className="h-6 w-6 text-primary mb-4" />
                  <h3 className="font-heading text-lg font-bold mb-2">Peu de visites, aucun dossier sérieux</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Vous avez mis votre bien en ligne, mais les visites se font rares et les rares candidats n'ont pas un dossier solide. Le temps passe et votre loyer reste dans les starting-blocks.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <TrendingDown className="h-6 w-6 text-primary mb-4" />
                  <h3 className="font-heading text-lg font-bold mb-2">Le loyer est peut-être mal positionné</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Trop haut, il fait fuir. Trop bas, il attire des profils peu fiables. Vous n'avez pas les données précises du marché de votre rue pour ajuster au bon niveau.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <Megaphone className="h-6 w-6 text-primary mb-4" />
                  <h3 className="font-heading text-lg font-bold mb-2">L'annonce ne ressort pas</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Votre annonce est noyée dans la masse, mal référencée ou mal ciblée. Les bons candidats ne la voient tout simplement pas, et les mauvais s'accumulent.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* SECTION "Pourquoi on loue plus vite" */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-10">
              Pourquoi on loue plus vite
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="relative rounded-xl border bg-card p-6 shadow-sm">
                <span className="absolute -top-3 left-6 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  1
                </span>
                <h3 className="font-heading text-lg font-bold mt-4 mb-2">Vivier de locataires pré-qualifiés</h3>
                <Users className="h-5 w-5 text-primary mb-3" />
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Nous avons un vivier de candidats dont les revenus, les garanties et les dossiers ont déjà été vérifiés. Dès qu'un bien correspond, on contacte immédiatement les profils adaptés.
                </p>
              </div>
              <div className="relative rounded-xl border bg-card p-6 shadow-sm">
                <span className="absolute -top-3 left-6 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  2
                </span>
                <h3 className="font-heading text-lg font-bold mt-4 mb-2">Bon prix grâce à l'analyse du marché</h3>
                <LineChart className="h-5 w-5 text-primary mb-3" />
                <p className="text-muted-foreground text-sm leading-relaxed">
                  On croise les données de votre rue, votre quartier et les biens similaires pour fixer le loyer optimal. Ni trop cher, ni trop peu : le juste prix qui attire le bon locataire rapidement.
                </p>
              </div>
              <div className="relative rounded-xl border bg-card p-6 shadow-sm">
                <span className="absolute -top-3 left-6 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  3
                </span>
                <h3 className="font-heading text-lg font-bold mt-4 mb-2">Diffusion et visites prises en charge</h3>
                <ClipboardList className="h-5 w-5 text-primary mb-3" />
                <p className="text-muted-foreground text-sm leading-relaxed">
                  On rédige une annonce optimisée, on la diffuse sur les bons canaux et on organise les visites. Vous n'avez plus à gérer les appels, les annulations et les déplacements inutiles.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION FORMULAIRE */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4">
            <div ref={formRef}>
              <EstimationForm />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-10">
              Questions fréquentes
            </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="q1">
                <AccordionTrigger>En combien de temps pouvez-vous trouver un locataire ?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Grâce à notre vivier de candidats déjà pré-qualifiés, nous pouvons souvent présenter un dossier solide en moins d'une semaine. La mise en location complète se déroule généralement en quelques jours à quelques semaines, selon le bien et la période. Chaque situation est unique : faites une analyse offerte pour obtenir une estimation réaliste pour votre logement.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q2">
                <AccordionTrigger>Comment sont vérifiés les candidats ?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Nous vérifions les revenus (généralement 3 fois le montant du loyer), les garanties, l'absence d'impayés passés et la stabilité professionnelle. Nous contactons également les précédents bailleurs et analysons le dossier complet avant toute proposition. C'est cette rigueur qui nous permet de proposer des locataires fiables et de sécuriser votre rentrée locative.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q3">
                <AccordionTrigger>Faut-il baisser mon loyer ?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Pas forcément. Le problème vient souvent d'un loyer mal calibré par rapport au marché local, ou d'une visibilité insuffisante. Notre analyse offerte inclut une étude comparative précise de votre rue et de votre quartier. Si un ajustement est nécessaire, on vous l'explique avec des chiffres concrets. Dans de nombreux cas, le bon locataire existe déjà : il faut juste le toucher au bon endroit.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

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

        {/* Bandeau sticky mobile */}
        <a
          href="tel:+33468665718"
          className="md:hidden fixed bottom-0 left-0 right-0 z-50 h-[52px] bg-primary text-primary-foreground flex items-center justify-center gap-2 font-semibold shadow-lg"
          aria-label="Appeler ERA Dupont Romain Immobilier"
        >
          <Phone className="h-5 w-5" />
          <span>04 68 66 57 18</span>
        </a>
      </main>
    </>
  );
};

export default VacanceLocative;
