import { useRef, useEffect } from "react";
import SeoHead from "@/components/SeoHead";
import {
  Phone,
  ChevronRight,
  ClipboardCheck,
  Calculator,
  Users,
  UserCheck,
  FileText,
  SearchCheck,
  Receipt,
  Bell,
  Wrench,
  BadgeCheck,
  Shield,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import EstimationForm from "@/components/EstimationForm";
import LandingHero from "@/components/LandingHero";
import LocalAgencySection from "@/components/LocalAgencySection";
import GoogleReviews from "@/components/GoogleReviews";
import TrustBar from "@/components/TrustBar";
import SectionHeading from "@/components/SectionHeading";
import { trackEvent } from "@/lib/analytics";

const GestionLocative = () => {
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    trackEvent("lp_view", { page: "gestion" });
  }, []);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const atouts = [
    { label: "Estimation locative offerte", icon: ClipboardCheck },
    { label: "GLI remboursée 12 mois", icon: Calculator },
    { label: "Locataires déjà pré-qualifiés", icon: Users },
  ];

  const services = [
    {
      icon: UserCheck,
      title: "Recherche et sélection des locataires",
      desc: "Nous diffusons votre bien, organisons les visites et filtrons les dossiers pour ne vous présenter que des candidats solvables et sérieux.",
    },
    {
      icon: FileText,
      title: "Rédaction du bail",
      desc: "Bail conforme à la législation en vigueur, clauses adaptées à votre bien et à votre situation. Zéro risque juridique.",
    },
    {
      icon: SearchCheck,
      title: "État des lieux",
      desc: "Inventaire détaillé à l'entrée et à la sortie du locataire, avec photos et constat contradictoire. Votre patrimoine est protégé.",
    },
    {
      icon: Receipt,
      title: "Encaissement et quittances",
      desc: "Paiement mensuel sécurisé, quittances automatiques et suivi de vos revenus locatifs en temps réel. Vous encaissez sans vous en occuper.",
    },
    {
      icon: Bell,
      title: "Relances et impayés",
      desc: "Suivi des paiements, relances préventives et gestion des contentieux si besoin. Nous sommes votre bouclier contre les impayés.",
    },
    {
      icon: Wrench,
      title: "Suivi technique et fiscal",
      desc: "Entretien courant, dépannages, déclarations fiscales et accompagnement annuel. Vous ne perdez plus de temps dans les démarches administratives.",
    },
  ];

  const faq = [
    {
      question: "Combien coûte la gestion locative ?",
      answer:
        "Nos honoraires de gestion locative sont transparents et sans surprise. Ils se calculent en pourcentage du loyer encaissé et incluent la totalité des services : recherche de locataire, rédaction du bail, état des lieux, encaissement, relances et suivi technique. Nous vous proposons une estimation offerte qui détaille précisément les coûts pour votre bien. Consultez notre barème d'honoraires pour plus de détails.",
    },
    {
      question: "Suis-je engagé sur la durée ?",
      answer:
        "Non. Chez ERA DUPONT ROMAIN IMMOBILIER, nous ne croyons pas aux engagements forcés. Notre contrat de gestion locative ne comporte pas de clause de durée minimale. Vous pouvez reprendre la gestion de votre bien à tout moment, avec un préavis simple et raisonnable. Nous préférons vous convaincre par la qualité de notre service plutôt que par une clause contractuelle.",
    },
    {
      question: "Que comprend la garantie loyers impayés ?",
      answer:
        "La Garantie Loyers Impayés (GLI) couvre vos loyers en cas de défaut de paiement du locataire. Elle prend généralement en charge les loyers impayés, les charges locatives et parfois les frais juridiques liés à une procédure d'expulsion. Chez ERA DUPONT ROMAIN IMMOBILIER, cette garantie est remboursée pendant 12 mois sur tout nouveau mandat de gestion. C'est une tranquillité d'esprit essentielle pour tout propriétaire bailleur.",
    },
  ];

  return (
    <>
      <SeoHead
        title="Gestion locative à Perpignan | ERA Dupont Romain"
        description="Gestion locative à Perpignan : quittances, états des lieux, relances, fiscalité. Estimation offerte."
        path="/gestion-locative-perpignan"
        type="article"
        faq={faq}
      />

      <LandingHero
        eyebrow="Gestion locative · Perpignan"
        title="Déléguez la gestion de votre bien à Perpignan. On s'occupe de tout."
        subtitle="Quittances, états des lieux, relances, suivi, fiscalité : vous gardez la décision, on porte la charge mentale. Et on arrive avec des locataires déjà pré-qualifiés."
        image="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=80"
        imageAlt="Conseiller en gestion locative accueillant un propriétaire"
        onCta={scrollToForm}
      />
      <TrustBar />

      <section className="py-16 md:py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <SectionHeading title="Ce qu'on prend en charge" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {services.map((s) => (
              <Card key={s.title} className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <s.icon className="h-6 w-6 text-primary mb-4" />
                  <h3 className="font-heading text-lg font-bold mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto rounded-lg border-2 border-primary/20 bg-card p-8 text-center shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex flex-col items-center">
                <Users className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-heading text-base font-bold mb-1">Locataires pré-qualifiés</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Dossiers complets, revenus vérifiés, garanties validées avant même la première visite.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <Shield className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-heading text-base font-bold mb-1">GLI remboursée 12 mois</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  La garantie loyers impayés est remboursée pendant 12 mois sur tout nouveau mandat de gestion.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <RotateCcw className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-heading text-base font-bold mb-1">Sans engagement</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Pas de clause de durée minimale. Vous restez libre de reprendre la gestion quand vous le souhaitez.
                </p>
              </div>
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

      <LocalAgencySection onCta={scrollToForm} />

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

export default GestionLocative;
