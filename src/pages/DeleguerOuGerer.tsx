import { useRef, useEffect } from "react";
import SeoHead from "@/components/SeoHead";
import { ShieldAlert, Home, FileWarning, Check, X, Minus } from "lucide-react";
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

const DeleguerOuGerer = () => {
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    trackEvent("lp_view", { page: "deleguer-vs-gerer" });
  }, []);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const comparisons = [
    {
      label: "Temps passé",
      self: "10 à 20 heures par mois (annonces, visites, relances, démarches)",
      selfScore: "negatif",
      era: "Zéro contrainte : vous suivez tout en temps réel depuis votre espace propriétaire",
      eraScore: "positif",
    },
    {
      label: "Coût direct",
      self: "Aucun frais d'agence",
      selfScore: "positif",
      era: "Honoraires de gestion (en % du loyer)",
      eraScore: "negatif",
    },
    {
      label: "Risque d'impayés",
      self: "Aucune garantie. Contentieux à votre charge",
      selfScore: "negatif",
      era: "GLI incluse : loyers payés même en cas de défaut de paiement",
      eraScore: "positif",
    },
    {
      label: "Vacance locative",
      self: "Dépend de votre réseau et de votre visibilité",
      selfScore: "neutre",
      era: "Vivier de locataires déjà vérifiés, délais réduits",
      eraScore: "positif",
    },
    {
      label: "Conformité du bail et diagnostics",
      self: "Vous êtes responsable des erreurs juridiques",
      selfScore: "negatif",
      era: "Bail rédigé par des professionnels, à jour des lois",
      eraScore: "positif",
    },
    {
      label: "Relation locataire",
      self: "Relation directe (mais conflits à gérer seul)",
      selfScore: "neutre",
      era: " Fini les sollicitations et les imprévus du locataire : nous nous occupons de tout.",
      eraScore: "positif",
    },
    {
      label: "Fiscalité et déclarations",
      self: "À faire vous-même ou avec un comptable (coût supplémentaire)",
      selfScore: "negatif",
      era: "Suivi fiscal inclus dans la gestion",
      eraScore: "positif",
    },
  ];

  const coutsCaches = [
    {
      icon: Home,
      title: "La vacance qui s'éternise",
      desc: "Un bien vacant 2 mois coûte déjà plus cher qu'une année d'honoraires d'agence. Sans vivier de candidats et sans visibilité optimisée, les trous locatifs s'allongent.",
    },
    {
      icon: ShieldAlert,
      title: "L'impayé qui tombe mal",
      desc: "Un seul locataire qui ne paie plus, et c'est des mois de tracas, de procédures et de pertes financières. Sans garantie loyers impayés, vous assumez seul le risque.",
    },
    {
      icon: FileWarning,
      title: "L'erreur juridique qui coûte cher",
      desc: "Un bail mal rédigé, un diagnostic oublié, une clause non conforme : une simple erreur peut invalider une procédure d'expulsion ou vous exposer à des sanctions.",
    },
  ];

  const faq = [
    {
      question: "Est-ce rentable de payer une agence ?",
      answer:
        "Cela dépend de votre situation. Si vous avez du temps, de l'expérience juridique et un réseau de locataires fiables, l'autogestion peut être économique. Mais pour la plupart des propriétaires, le coût caché (vacance, impayés, erreurs) dépasse largement les honoraires d'une agence. Notre analyse offerte vous donne les chiffres réels pour votre bien, sans langue de bois.",
    },
    {
      question: "Quels sont les frais de gestion ?",
      answer:
        "Nos honoraires de gestion locative sont calculés en pourcentage du loyer encaissé. Ils incluent la recherche de locataire, la rédaction du bail, l'état des lieux, l'encaissement, les relances, le suivi technique et la fiscalité. Nous vous proposons une estimation offerte qui détaille précisément les coûts pour votre bien spécifique.",
    },
    {
      question: "Puis-je déléguer seulement la recherche de locataire ?",
      answer:
        "Oui, tout à fait. Nous proposons un mandat de location simple qui couvre uniquement la mise en location : estimation, diffusion, visites, sélection du candidat et rédaction du bail. Vous reprenez ensuite la gestion courante en direct. C'est une bonne solution intermédiaire pour tester nos services sans vous engager sur la gestion complète.",
    },
  ];

  const renderScore = (score: string) => {
    if (score === "positif") return <Check className="h-5 w-5 text-green-600 shrink-0" />;
    if (score === "negatif") return <X className="h-5 w-5 text-red-500 shrink-0" />;
    return <Minus className="h-5 w-5 text-muted-foreground shrink-0" />;
  };

  return (
    <>
      <SeoHead
        title="Déléguer ou gérer son bien soi-même ? | ERA Dupont Romain"
        description="Autogestion ou agence à Perpignan ? Comparatif coût, temps, risque. Estimation offerte pour décider."
        path="/deleguer-ou-gerer-soi-meme"
        type="article"
        faq={faq}
      />

      <LandingHero
        eyebrow="DÉLÉGUER OU GÉRER · PERPIGNAN"
        title="Gérer seul ou déléguer ? Faisons le vrai calcul."
        subtitle="Le temps passé, le risque d'impayé et de vacance, les erreurs de bail : l'autogestion a un coût caché. On vous aide à comparer, chiffres en main."
        image="https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=900&q=80"
        imageAlt="Propriétaire comparant gestion locative et autogestion"
        onCta={scrollToForm}
      />
      <TrustBar />

      <section className="py-16 md:py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <SectionHeading title="Le comparatif honnête" />
          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-4 px-4 font-heading text-lg w-1/4">Critère</th>
                  <th className="text-left py-4 px-4 font-heading text-lg w-[37.5%]">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-bold">
                        1
                      </span>
                      Gérer soi-même
                    </div>
                  </th>
                  <th className="text-left py-4 px-4 font-heading text-lg w-[37.5%]">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                        2
                      </span>
                      Déléguer à ERA
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? "bg-card/50" : ""}>
                    <td className="py-4 px-4 font-semibold align-top">{row.label}</td>
                    <td className="py-4 px-4 align-top">
                      <div className="flex items-start gap-2">
                        {renderScore(row.selfScore)}
                        <span className="text-muted-foreground">{row.self}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 align-top">
                      <div className="flex items-start gap-2">
                        {renderScore(row.eraScore)}
                        <span className="text-muted-foreground">{row.era}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <SectionHeading title="Le coût caché de l'autogestion" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {coutsCaches.map((c) => (
              <Card key={c.title} className="h-full rounded-none border border-border bg-card shadow-sm transition-all group-hover:border-primary">
                <CardContent className="p-6">
                  <c.icon className="h-6 w-6 text-primary mb-4" />
                  <h3 className="font-heading text-lg font-bold mb-2">{c.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{c.desc}</p>
                </CardContent>
              </Card>
            ))}
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

      <section className="pb-16 md:pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <CtaBand
            title="Le calcul dépend de votre loyer. Commençons par le connaître."
            ctaText="Faire le calcul sur mon bien"
          />
          <RelatedLinks
            links={[
              { label: "Ce que comprend la gestion locative", to: "/gestion-locative-perpignan" },
              { label: "Le risque d'impayé quand on gère seul", to: "/loyers-impayes-perpignan" },
            ]}
          />
        </div>
      </section>
    </>
  );
};

export default DeleguerOuGerer;
