import { useRef, useEffect } from "react";
import SeoHead from "@/components/SeoHead";
import { Users, SearchX, TrendingDown, Megaphone, LineChart, ClipboardList } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import EstimationForm from "@/components/EstimationForm";
import LandingHero from "@/components/LandingHero";
import TrustBar from "@/components/TrustBar";
import SectionHeading from "@/components/SectionHeading";
import GoogleReviews from "@/components/GoogleReviews";
import { trackEvent } from "@/lib/analytics";

const VacanceLocative = () => {
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    trackEvent("lp_view", { page: "vacance" });
  }, []);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const faq = [
    {
      question: "En combien de temps pouvez-vous trouver un locataire ?",
      answer:
        "Grâce à notre vivier de candidats déjà vérifiés, nous pouvons souvent présenter un dossier solide en moins d'une semaine. La mise en location complète se déroule généralement en quelques jours à quelques semaines, selon le bien et la période. Chaque situation est unique : faites une analyse offerte pour obtenir une estimation réaliste pour votre logement.",
    },
    {
      question: "Comment sont vérifiés les candidats ?",
      answer:
        "Nous vérifions les revenus (généralement 3 fois le montant du loyer), les garanties, l'absence d'impayés passés et la stabilité professionnelle. Nous contactons également les précédents bailleurs et analysons le dossier complet avant toute proposition. C'est cette rigueur qui nous permet de proposer des locataires fiables et de sécuriser votre rentrée locative.",
    },
    {
      question: "Faut-il baisser mon loyer ?",
      answer:
        "Pas forcément. Le problème vient souvent d'un loyer mal calibré par rapport au marché local, ou d'une visibilité insuffisante. Notre analyse offerte inclut une étude comparative précise de votre rue et de votre quartier. Si un ajustement est nécessaire, on vous l'explique avec des chiffres concrets. Dans de nombreux cas, le bon locataire existe déjà : il faut juste le toucher au bon endroit.",
    },
  ];

  return (
    <>
      <SeoHead
        title="Votre appartement ne se loue pas ? | ERA Dupont Romain"
        description="Des semaines sans locataire sérieux à Perpignan ? On active notre vivier de locataires déjà vérifiés. Estimation locative offerte, mise en location rapide."
        path="/logement-ne-se-loue-pas-perpignan"
        type="article"
        faq={faq}
      />

      <LandingHero
        eyebrow="MISE EN LOCATION · PERPIGNAN"
        title="Votre logement ne se loue pas ? On a déjà les locataires."
        subtitle="Pendant que les autres repartent de zéro à chaque recherche, nous arrivons avec une liste de candidats déjà filtrés — revenus vérifiés, garanties, dossier complet. Votre vacance se compte en jours, pas en mois."
        image="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=80"
        imageAlt="Salon lumineux d'un appartement prêt à louer à Perpignan"
        onCta={scrollToForm}
      />
      <TrustBar />

      <section className="py-16 md:py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <SectionHeading title="Vous êtes peut-être dans ce cas" />
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

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <SectionHeading title="Pourquoi on loue plus vite" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="relative rounded-lg border bg-card p-6 shadow-sm">
              <span className="absolute -top-3 left-6 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">1</span>
              <h3 className="font-heading text-lg font-bold mt-4 mb-2">Vivier de locataires déjà vérifiés</h3>
              <Users className="h-5 w-5 text-primary mb-3" />
              <p className="text-muted-foreground text-sm leading-relaxed">
                Nous avons un vivier de candidats dont les revenus, les garanties et les dossiers ont déjà été vérifiés. Dès qu'un bien correspond, on contacte immédiatement les profils adaptés.
              </p>
            </div>
            <div className="relative rounded-lg border bg-card p-6 shadow-sm">
              <span className="absolute -top-3 left-6 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">2</span>
              <h3 className="font-heading text-lg font-bold mt-4 mb-2">Bon prix grâce à l'analyse du marché</h3>
              <LineChart className="h-5 w-5 text-primary mb-3" />
              <p className="text-muted-foreground text-sm leading-relaxed">
                On croise les données de votre rue, votre quartier et les biens similaires pour fixer le loyer optimal. Ni trop cher, ni trop peu : le juste prix qui attire le bon locataire rapidement.
              </p>
            </div>
            <div className="relative rounded-lg border bg-card p-6 shadow-sm">
              <span className="absolute -top-3 left-6 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">3</span>
              <h3 className="font-heading text-lg font-bold mt-4 mb-2">Diffusion et visites prises en charge</h3>
              <ClipboardList className="h-5 w-5 text-primary mb-3" />
              <p className="text-muted-foreground text-sm leading-relaxed">
                On rédige une annonce optimisée, on la diffuse sur les bons canaux et on organise les visites. Vous n'avez plus à gérer les appels, les annulations et les déplacements inutiles.
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

      <GoogleReviews />

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
    </>
  );
};

export default VacanceLocative;
