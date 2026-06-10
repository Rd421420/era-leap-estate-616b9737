import { useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Phone, ChevronRight, ClipboardCheck, Calculator, Users, AlertTriangle, Wallet, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import EstimationForm from "@/components/EstimationForm";
import { trackEvent } from "@/lib/analytics";

const LouerDpeFG = () => {
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    trackEvent("lp_view", { page: "dpe-f-g" });
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
        <title>Louer un bien classé F ou G à Perpignan — que faire ? | ERA Dupont Romain</title>
        <meta name="description" content="Logement classé F ou G (DPE) à Perpignan ? On fait le point sur les travaux et la mise en location, et on a déjà des locataires pré-qualifiés. Étude gratuite." />
        <link rel="canonical" href="https://era-dupontromain.immo/louer-bien-dpe-f-g-perpignan" />
        <meta property="og:title" content="Louer un bien classé F ou G à Perpignan — que faire ? | ERA Dupont Romain" />
        <meta property="og:description" content="Logement classé F ou G (DPE) à Perpignan ? On fait le point sur les travaux et la mise en location. Étude gratuite." />
        <meta property="og:url" content="https://era-dupontromain.immo/louer-bien-dpe-f-g-perpignan" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/4ed00f5d-8f60-4af1-ba2a-221a65ba1201/id-preview-b38a2727--d2b7d6f3-4b53-49ba-9635-0bcc23729d43.lovable.app-1781102155449.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Louer un bien classé F ou G à Perpignan — que faire ? | ERA Dupont Romain" />
        <meta name="twitter:description" content="Logement classé F ou G (DPE) à Perpignan ? On fait le point sur les travaux et la mise en location. Étude gratuite." />
        <meta name="twitter:image" content="https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/4ed00f5d-8f60-4af1-ba2a-221a65ba1201/id-preview-b38a2727--d2b7d6f3-4b53-49ba-9635-0bcc23729d43.lovable.app-1781102155449.png" />
      </Helmet>

      <main className="min-h-screen">
        {/* HERO */}
        <section className="relative bg-gradient-to-br from-background via-muted/30 to-background pt-12 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                Votre bien est classé F ou G ? Voici quoi faire avant l'interdiction de louer.
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                Calendrier qui se resserre, devis de travaux qui s'envolent, locataire à reloger… On fait le point clair et, dès que c'est louable, on a déjà des locataires sérieux prêts à emménager.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                <Button size="lg" onClick={scrollToForm} className="shadow-era">
                  Recevoir mon étude gratuite
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

        {/* SECTION "Vous êtes peut-être dans ce cas" */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-10">
              Vous êtes peut-être dans ce cas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <AlertTriangle className="h-6 w-6 text-primary mb-4" />
                  <h3 className="font-heading text-lg font-bold mb-2">Je ne pourrai bientôt plus le louer</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Les interdictions de location avancent année après année. Un bien G est déjà concerné, un F le sera bientôt. On vous aide à anticiper sans paniquer.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <Wallet className="h-6 w-6 text-primary mb-4" />
                  <h3 className="font-heading text-lg font-bold mb-2">Les travaux coûtent trop cher</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Isolation, fenêtres, chauffage… les devis s'accumulent vite. On vous aide à prioriser les travaux à fort impact et à identifier les aides disponibles.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <Home className="h-6 w-6 text-primary mb-4" />
                  <h3 className="font-heading text-lg font-bold mb-2">Je pense tout revendre</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Revendre est une option, mais pas la seule. Avant de vous décider, on fait le point sur la valeur après travaux et sur la rentabilité locative possible.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* SECTION "Notre méthode pour les passoires thermiques" */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-10">
              Notre méthode pour les passoires thermiques
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="relative rounded-xl border bg-card p-6 shadow-sm">
                <span className="absolute -top-3 left-6 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  1
                </span>
                <h3 className="font-heading text-lg font-bold mt-4 mb-2">Diagnostic de situation</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  On établit la classe réelle de votre bien, les échéances qui vous concernent et la marge d'amélioration réaliste avec un budget maîtrisé.
                </p>
              </div>
              <div className="relative rounded-xl border bg-card p-6 shadow-sm">
                <span className="absolute -top-3 left-6 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  2
                </span>
                <h3 className="font-heading text-lg font-bold mt-4 mb-2">Plan d'action chiffré</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  On privilégie les travaux à fort impact (isolation, ventilation, chauffage) et on recense les aides mobilisables : MaPrimeRénov', éco-prêt, aides locales.
                </p>
              </div>
              <div className="relative rounded-xl border bg-card p-6 shadow-sm">
                <span className="absolute -top-3 left-6 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  3
                </span>
                <h3 className="font-heading text-lg font-bold mt-4 mb-2">Mise en location avec nos candidats</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Dès que votre bien est louable, on active notre base de locataires pré-qualifiés. Dossiers complets, visites ciblées, location sécurisée.
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
                <AccordionTrigger>Puis-je encore louer un bien classé G aujourd'hui ?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Depuis 2025, les logements classés G sont interdits à la location sur le parc privé existant. Si votre bien est classé G, il ne peut plus être loué en l'état. La seule solution est de réaliser des travaux pour améliorer le DPE. On peut ensemble faire le point sur les travaux nécessaires et leur coût. Demandez une étude gratuite.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q2">
                <AccordionTrigger>Combien coûtent les travaux pour gagner une classe ?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Le coût dépend fortement de l'état actuel du bien et des équipements. En moyenne, compter entre 300 et 800 € TTC par m² pour passer d'un G à un E ou D. Mais avec les bonnes priorités (isolation des combles, remplacement du chauffage, ventilation), on peut parfois viser une grosse amélioration sans tout changer. On vous aide à chiffrer étape par étape dans notre étude gratuite.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q3">
                <AccordionTrigger>Et si je préfère vendre ?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Vendre est tout à fait envisageable. Notez cependant qu'un DPE G ou F pèse sur le prix de vente et peut réduire le nombre d'acheteurs éligibles. En réalisant des travaux ciblés avant la vente, vous augmentez la valeur de votre bien et la rapidité de la transaction. On peut estimer les deux scénarios ensemble : vente en l'état vs vente après travaux.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

      </main>
    </>
  );
};

export default LouerDpeFG;
