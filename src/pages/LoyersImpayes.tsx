import { useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Phone, ChevronRight, ClipboardCheck, Calculator, Users, MessageCircle, Shield, RefreshCw, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import EstimationForm from "@/components/EstimationForm";
import { trackEvent } from "@/lib/analytics";

const LoyersImpayes = () => {
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    trackEvent("lp_view", { page: "impayes" });
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
        <title>Locataire qui ne paie pas à Perpignan — que faire ? | ERA Dupont Romain</title>
        <meta name="description" content="Loyers impayés à Perpignan ? On vous aide à reprendre la main et à sécuriser vos loyers à venir (garantie loyers impayés). Conseil gratuit sous 24h." />
        <link rel="canonical" href="https://era-dupontromain.immo/loyers-impayes-perpignan" />
        <meta property="og:title" content="Locataire qui ne paie pas à Perpignan — que faire ? | ERA Dupont Romain" />
        <meta property="og:description" content="Loyers impayés à Perpignan ? On vous aide à reprendre la main et à sécuriser vos loyers à venir. Conseil gratuit sous 24h." />
        <meta property="og:url" content="https://era-dupontromain.immo/loyers-impayes-perpignan" />
      </Helmet>

      <main className="min-h-screen">
        {/* HERO */}
        <section className="relative bg-gradient-to-br from-background via-muted/30 to-background pt-12 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                Votre locataire ne paie plus ? Reprenez la main sereinement.
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                Relances, procédure, garanties : on reprend votre dossier et on sécurise vos loyers futurs. Et pour la suite, on a déjà des locataires sérieux et solvables.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                <Button size="lg" onClick={scrollToForm} className="shadow-era">
                  Être recontacté sous 24h
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
                  <MessageCircle className="h-6 w-6 text-primary mb-4" />
                  <h3 className="font-heading text-lg font-bold mb-2">Les relances ne suffisent plus</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Vous avez déjà envoyé des mails, fait des appels, peut-être même mis en demeure… et le loyer n'arrive toujours pas. C'est usant et vous perdez du temps.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <Shield className="h-6 w-6 text-primary mb-4" />
                  <h3 className="font-heading text-lg font-bold mb-2">La procédure m'angoisse</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Assignation en justice, huissier, expulsion… vous ne savez pas par où commencer ni combien ça prend. Vous avez besoin d'un interlocuteur qui connaît le terrain.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <RefreshCw className="h-6 w-6 text-primary mb-4" />
                  <h3 className="font-heading text-lg font-bold mb-2">Je veux éviter que ça recommence</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Vous vous demandez comment sécuriser vos futurs loyers et éviter de revivre cette situation. La garantie loyers impayés est peut-être la solution.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* SECTION "Comment on vous aide" */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-10">
              Comment on vous aide
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="relative rounded-xl border bg-card p-6 shadow-sm">
                <span className="absolute -top-3 left-6 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  1
                </span>
                <h3 className="font-heading text-lg font-bold mt-4 mb-2">Point de situation gratuit</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  On échange en toute confidentialité sur votre situation : arriérés, bail en cours, état du dossier. Pas de jugement, juste un diagnostic clair.
                </p>
              </div>
              <div className="relative rounded-xl border bg-card p-6 shadow-sm">
                <span className="absolute -top-3 left-6 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  2
                </span>
                <h3 className="font-heading text-lg font-bold mt-4 mb-2">On structure la suite</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Selon votre cas, on vous oriente vers la bonne procédure, on active les garanties en place et on prépare le relogement si nécessaire. Vous n'êtes pas seul.
                </p>
              </div>
              <div className="relative rounded-xl border bg-card p-6 shadow-sm">
                <span className="absolute -top-3 left-6 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  3
                </span>
                <h3 className="font-heading text-lg font-bold mt-4 mb-2">Gestion sécurisée avec GLI</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Pour la suite, on vous propose une gestion locative avec garantie loyers impayés incluse. Vos loyers sont protégés, même si le locataire ne paie plus.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ENCART GLI */}
        <section className="py-10 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto rounded-xl border-2 border-primary/20 bg-card p-8 text-center shadow-sm">
              <BadgeCheck className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-heading text-xl font-bold mb-2">
                GLI remboursée pendant 12 mois
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Pour tout nouveau mandat de gestion signé chez ERA DUPONT ROMAIN IMMOBILIER, la garantie loyers impayés est remboursée pendant 12 mois. Sans engagement de durée, sans surprise.
              </p>
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
                <AccordionTrigger>Combien de temps dure une procédure d'impayés ?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Une procédure classique d'impayés de loyers dure en moyenne entre 6 et 18 mois, selon la réactivité des tribunaux et la situation du locataire. La mise en demeure dure 1 mois, puis l'assignation au tribunal et l'obtention d'un titre exécutoire peuvent prendre plusieurs mois. L'expulsion elle-même dépend du calendrier des forces de l'ordre. On vous accompagne à chaque étape pour gagner du temps et réduire le stress.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q2">
                <AccordionTrigger>C'est quoi la garantie loyers impayés (GLI) ?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground leading-relaxed">
                    La Garantie Loyers Impayés (GLI) est une assurance qui couvre vos loyers en cas de défaut de paiement du locataire. Elle prend généralement en charge les loyers impayés, les charges et parfois les frais juridiques. Chez ERA DUPONT ROMAIN IMMOBILIER, on vous offre le remboursement de cette garantie pendant 12 mois sur tout nouveau mandat de gestion. C'est la tranquillité d'esprit pour votre rentrée locative.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q3">
                <AccordionTrigger>Pouvez-vous reprendre un dossier déjà en cours ?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Oui, tout à fait. Que vous soyez en phase de relance, de procédure judiciaire ou même en attente d'expulsion, on peut reprendre le suivi de votre dossier. On fait le point avec vous, on contacte les parties en présence si besoin, et on vous proposons un plan pour sécuriser la suite. Contactez-nous pour un premier échange gratuit et sans engagement.
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

export default LoyersImpayes;
