import { useRef, useEffect } from "react";
import SeoHead from "@/components/SeoHead";
import { AlertTriangle, Wallet, Home } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import EstimationForm from "@/components/EstimationForm";
import LandingHero from "@/components/LandingHero";
import TrustBar from "@/components/TrustBar";
import SectionHeading from "@/components/SectionHeading";
import GoogleReviews from "@/components/GoogleReviews";
import { trackEvent } from "@/lib/analytics";
import CtaBand from "@/components/CtaBand";
import RelatedLinks from "@/components/RelatedLinks";

const LouerDpeFG = () => {
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    trackEvent("lp_view", { page: "dpe-f-g" });
  }, []);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const faq = [
    {
      question: "Puis-je encore louer un bien classé G aujourd'hui ?",
      answer:
        "Depuis le 1er janvier 2025, un logement classé G ne peut plus faire l'objet d'un nouveau bail ni d'un renouvellement, mais les baux en cours se poursuivent jusqu'à leur échéance. Les logements G+ (>450 kWh/m²/an) sont interdits depuis 2023, les F le seront en 2028 et les E en 2034. Pas de panique : si votre bien est concerné, on fait le point ensemble sur les travaux nécessaires et on vous accompagne. Demandez une étude gratuite.",
    },
    {
      question: "Combien coûtent les travaux pour gagner une classe ?",
      answer:
        "Le coût dépend fortement de l'état actuel du bien et des équipements. En moyenne, compter entre 300 et 800 € TTC par m² pour passer d'un G à un E ou D. Mais avec les bonnes priorités (isolation des combles, remplacement du chauffage, ventilation), on peut parfois viser une grosse amélioration sans tout changer. On vous aide à chiffrer étape par étape dans notre étude gratuite.",
    },
    {
      question: "Et si je préfère vendre ?",
      answer:
        "Vendre est tout à fait envisageable. Notez cependant qu'un DPE G ou F pèse sur le prix de vente et peut réduire le nombre d'acheteurs éligibles. En réalisant des travaux ciblés avant la vente, vous augmentez la valeur de votre bien et la rapidité de la transaction. On peut estimer les deux scénarios ensemble : vente en l'état vs vente après travaux.",
    },
  ];

  return (
    <>
      <SeoHead
        title="Louer un bien DPE F ou G à Perpignan | ERA Dupont Romain"
        description="Logement classé F ou G (DPE) à Perpignan ? On fait le point sur les travaux et la mise en location, et on a déjà des locataires déjà vérifiés. Étude gratuite."
        path="/louer-bien-dpe-f-g-perpignan"
        type="article"
        faq={faq}
      />

      <LandingHero
        eyebrow="DPE F/G · PERPIGNAN"
        title="Votre bien est classé F ou G ? Voici quoi faire avant l'interdiction de louer."
        subtitle="Calendrier qui se resserre, devis de travaux qui s'envolent, locataire à reloger… On fait le point clair et, dès que c'est louable, on a déjà des locataires sérieux prêts à emménager."
        image="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80"
        imageAlt="Appartement à rénover dans les Pyrénées-Orientales"
        onCta={scrollToForm}
      />
      <TrustBar />

      <section className="py-16 md:py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <SectionHeading title="Vous êtes peut-être dans ce cas" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="h-full rounded-none border border-border bg-card shadow-sm transition-all group-hover:border-primary">
              <CardContent className="p-6">
                <AlertTriangle className="h-6 w-6 text-primary mb-4" />
                <h3 className="font-heading text-lg font-bold mb-2">Je ne pourrai bientôt plus le louer</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Les interdictions de location avancent année après année. Un bien G est déjà concerné, un F le sera bientôt. On vous aide à anticiper sans paniquer.
                </p>
              </CardContent>
            </Card>
            <Card className="h-full rounded-none border border-border bg-card shadow-sm transition-all group-hover:border-primary">
              <CardContent className="p-6">
                <Wallet className="h-6 w-6 text-primary mb-4" />
                <h3 className="font-heading text-lg font-bold mb-2">Les travaux coûtent trop cher</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Isolation, fenêtres, chauffage… les devis s'accumulent vite. On vous aide à prioriser les travaux à fort impact et à identifier les aides disponibles.
                </p>
              </CardContent>
            </Card>
            <Card className="h-full rounded-none border border-border bg-card shadow-sm transition-all group-hover:border-primary">
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

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <SectionHeading title="Notre méthode pour les passoires thermiques" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="relative rounded-lg border bg-card p-6 shadow-sm">
              <span className="absolute -top-3 left-6 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">1</span>
              <h3 className="font-heading text-lg font-bold mt-4 mb-2">Diagnostic de situation</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                On établit la classe réelle de votre bien, les échéances qui vous concernent et la marge d'amélioration réaliste avec un budget maîtrisé.
              </p>
            </div>
            <div className="relative rounded-lg border bg-card p-6 shadow-sm">
              <span className="absolute -top-3 left-6 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">2</span>
              <h3 className="font-heading text-lg font-bold mt-4 mb-2">Plan d'action chiffré</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                On privilégie les travaux à fort impact (isolation, ventilation, chauffage) et on recense les aides mobilisables : MaPrimeRénov', éco-prêt, aides locales.
              </p>
            </div>
            <div className="relative rounded-lg border bg-card p-6 shadow-sm">
              <span className="absolute -top-3 left-6 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">3</span>
              <h3 className="font-heading text-lg font-bold mt-4 mb-2">Mise en location avec nos candidats</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Dès que votre bien est louable, on active notre base de locataires déjà vérifiés. Dossiers complets, visites ciblées, location sécurisée.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="estimation-form" className="py-16 md:py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div ref={formRef}>
            <EstimationForm />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <SectionHeading title="Questions fréquentes" />
          <Accordion type="single" collapsible className="w-full">
            {faq.map((f, i) => (
              <AccordionItem key={i} value={`q${i + 1}`}>
                <AccordionTrigger>{f.question}</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground leading-relaxed">{f.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <CtaBand
            title="Avant d'engager des travaux, sachez ce que votre bien peut rapporter une fois louable."
            ctaText="Estimer mon loyer après travaux"
          />
          <RelatedLinks
            links={[
              { label: "Mon logement ne trouve pas preneur", to: "/logement-ne-se-loue-pas-perpignan" },
              { label: "Déléguer la gestion de mon bien", to: "/gestion-locative-perpignan" },
            ]}
          />
        </div>
      </section>
    </>
  );
};

export default LouerDpeFG;
