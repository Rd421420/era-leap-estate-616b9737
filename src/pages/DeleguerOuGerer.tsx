import { useRef, useEffect } from "react";
import SeoHead from "@/components/SeoHead";
import {
  Phone,
  ChevronRight,
  ClipboardCheck,
  Calculator,
  Users,
  Clock,
  ShieldAlert,
  Home,
  FileWarning,
  Check,
  X,
  Minus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import EstimationForm from "@/components/EstimationForm";
import { trackEvent } from "@/lib/analytics";

const DeleguerOuGerer = () => {
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    trackEvent("lp_view", { page: "deleguer-vs-gerer" });
  }, []);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const atouts = [
    { label: "Estimation locative offerte", icon: ClipboardCheck },
    { label: "GLI remboursée 12 mois", icon: Calculator },
    { label: "Locataires déjà pré-qualifiés", icon: Users },
  ];

  const comparisons = [
    {
      label: "Temps passé",
      self: "10 à 20 heures par mois (annonces, visites, relances, démarches)",
      selfScore: "negatif",
      era: "Quelques minutes pour consulter votre tableau de bord",
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
      era: "GLI incluse : loyers payés même en cas de défaut",
      eraScore: "positif",
    },
    {
      label: "Vacance locative",
      self: "Dépend de votre réseau et de votre visibilité",
      selfScore: "neutre",
      era: "Vivier de locataires pré-qualifiés, délais réduits",
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
      era: "On porte la charge mentale, vous gardez le lien si vous le souhaitez",
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

  const renderScore = (score: string) => {
    if (score === "positif") return <Check className="h-5 w-5 text-green-600 shrink-0" />;
    if (score === "negatif") return <X className="h-5 w-5 text-red-500 shrink-0" />;
    return <Minus className="h-5 w-5 text-muted-foreground shrink-0" />;
  };

  return (
    <>
      <SeoHead
        title="Déléguer ou gérer son bien soi-même ? | ERA Perpignan"
        description="Autogestion ou agence à Perpignan ? Le comparatif honnête coût / temps / risque, sans langue de bois. Estimation locative offerte pour décider avec des chiffres."
        path="/deleguer-ou-gerer-soi-meme"
        type="article"
      />

      <>
        {/* HERO */}
        <section className="relative bg-gradient-to-br from-background via-muted/30 to-background pt-12 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                Gérer seul ou déléguer ? Faisons le vrai calcul.
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                Le temps passé, le risque d'impayé et de vacance, les erreurs de bail : l'autogestion a un coût caché. On vous aide à comparer, chiffres en main.
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

        {/* SECTION Tableau comparatif */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-10">
              Le comparatif honnête
            </h2>
            <div className="max-w-4xl mx-auto overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="text-left py-4 px-4 font-heading text-lg w-1/4">Critère</th>
                    <th className="text-left py-4 px-4 font-heading text-lg w-[37.5%]">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-bold">1</span>
                        Gérer soi-même
                      </div>
                    </th>
                    <th className="text-left py-4 px-4 font-heading text-lg w-[37.5%]">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">2</span>
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

        {/* SECTION "Le coût caché de l'autogestion" */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-10">
              Le coût caché de l'autogestion
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {coutsCaches.map((c) => (
                <Card key={c.title} className="border-l-4 border-l-primary">
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
                <AccordionTrigger>Est-ce rentable de payer une agence ?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Cela dépend de votre situation. Si vous avez du temps, de l'expérience juridique et un réseau de locataires fiables, l'autogestion peut être économique. Mais pour la plupart des propriétaires, le coût caché (vacance, impayés, erreurs) dépasse largement les honoraires d'une agence. Notre analyse offerte vous donne les chiffres réels pour votre bien, sans langue de bois.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q2">
                <AccordionTrigger>Quels sont les frais de gestion ?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Nos honoraires de gestion locative sont calculés en pourcentage du loyer encaissé. Ils incluent la recherche de locataire, la rédaction du bail, l'état des lieux, l'encaissement, les relances, le suivi technique et la fiscalité. Nous vous proposons une estimation offerte qui détaille précisément les coûts pour votre bien spécifique.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q3">
                <AccordionTrigger>Puis-je déléguer seulement la recherche de locataire ?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Oui, tout à fait. Nous proposons un mandat de location simple qui couvre uniquement la mise en location : estimation, diffusion, visites, sélection du candidat et rédaction du bail. Vous reprenez ensuite la gestion courante en direct. C'est une bonne solution intermédiaire pour tester nos services sans vous engager sur la gestion complète.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

      </>
    </>
  );
};

export default DeleguerOuGerer;
