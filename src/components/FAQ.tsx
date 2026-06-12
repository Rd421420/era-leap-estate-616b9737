import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQ = () => {
  const [showAll, setShowAll] = useState(false);
  const faqData = [
    {
      question: "Comment obtenir une estimation locative gratuite à Perpignan ?",
      answer: "Remplissez simplement notre formulaire en ligne en quelques minutes. Notre équipe ERA DUPONT ROMAIN IMMOBILIER analyse votre bien et vous envoie une estimation détaillée par email sous 24h. Cette estimation est totalement gratuite et sans engagement de durée."
    },
    {
      question: "Quelle est la différence entre une estimation en ligne et une visite sur place ?",
      answer: "L'estimation en ligne vous donne une première indication basée sur les données du marché local et les caractéristiques de votre bien. Une visite permet d'affiner cette estimation en tenant compte de l'état précis, de l'agencement et des spécificités uniques de votre propriété."
    },
    {
      question: "Qu'est-ce que la gestion locative complète ?",
      answer: "La gestion locative complète comprend la recherche de locataires, la rédaction du bail, les états des lieux, l'encaissement des loyers, la gestion des réparations et l'administration quotidienne de votre bien. ERA s'occupe de tout pour vous."
    },
    {
      question: "Combien coûte la gestion locative à Perpignan ?",
      answer: "Nos honoraires de gestion varient selon le type de bien et les services choisis, généralement entre 6% et 8% HT des loyers encaissés. Contactez-nous pour un devis personnalisé adapté à votre situation."
    },
    {
      question: "Qu'est-ce que la garantie loyers impayés (GLI) ?",
      answer: "La GLI est une assurance qui vous protège contre les impayés de loyers. Elle couvre également les dégradations locatives et les frais de contentieux. ERA propose cette garantie pour sécuriser votre investissement locatif et vous offre actuellement un remboursement sur 12 mois."
    },
    {
      question: "Comment fixer le bon loyer pour mon bien à Perpignan ?",
      answer: "Le loyer optimal se détermine en analysant les biens comparables dans votre quartier, la surface, l'état, les prestations et la demande locative actuelle. Notre expertise du marché perpignanais nous permet de vous conseiller le juste prix pour louer rapidement tout en optimisant votre rentabilité."
    },
    {
      question: "Quels sont les quartiers les plus recherchés à Perpignan pour la location ?",
      answer: "Le centre-ville, le quartier Saint-Martin, les abords de la gare et les zones proches des universités sont très prisés. Canet-en-Roussillon et Saint-Cyprien attirent également de nombreux locataires, notamment en saison estivale."
    },
    {
      question: "Combien de temps faut-il pour louer un bien à Perpignan ?",
      answer: "En moyenne, un bien bien présenté et correctement tarifé se loue en 2 à 4 semaines à Perpignan. Notre réseau ERA et notre visibilité sur les portails immobiliers accélèrent considérablement ce délai."
    },
    {
      question: "Puis-je confier mon bien en gestion sans engagement ?",
      answer: "Oui, ERA DUPONT ROMAIN IMMOBILIER propose des mandats de gestion sans engagement de durée minimale. Vous restez libre de reprendre la main à tout moment, sous réserve d'un préavis de 3 mois."
    },
    {
      question: "Quels documents dois-je fournir pour la mise en location ?",
      answer: "Vous devrez fournir le titre de propriété, le diagnostic de performance énergétique (DPE), les diagnostics obligatoires (amiante, plomb, électricité, gaz), votre RIB, et éventuellement le règlement de copropriété si applicable."
    },
    {
      question: "ERA propose-t-il la recherche de locataires uniquement ?",
      answer: "Oui, nous proposons un service de recherche locataire seule. Nous nous chargeons de diffuser l'annonce, organiser les visites, sélectionner le locataire et établir le bail. Vous gérez ensuite votre bien en direct."
    },
    {
      question: "Comment se déroule la sélection des locataires ?",
      answer: "Nous vérifions les revenus (taux d'effort inférieur à 33%), l'identité, les justificatifs professionnels et réalisons une enquête de solvabilité. Seuls les dossiers solides vous sont présentés pour validation finale."
    },
    {
      question: "Quel est le prix moyen au m² pour la location à Perpignan ?",
      answer: "En 2024, le prix moyen se situe entre 10€ et 13€/m² pour un appartement selon le quartier et l'état. Les maisons oscillent entre 9€ et 12€/m². Le centre-ville atteint des prix supérieurs, tandis que les quartiers périphériques restent plus accessibles."
    },
    {
      question: "Dois-je effectuer des travaux avant de mettre mon bien en location ?",
      answer: "Cela dépend de l'état du bien. Un logement décent et aux normes se louera mieux et plus cher. ERA peut vous conseiller sur les travaux prioritaires pour maximiser votre rentabilité et vous mettre en relation avec des artisans de confiance."
    },
    {
      question: "Qu'est-ce que le dépôt de garantie et à combien s'élève-t-il ?",
      answer: "Le dépôt de garantie est une somme versée par le locataire à la signature du bail pour couvrir d'éventuels impayés ou dégradations. Il est limité à 1 mois de loyer hors charges pour une location vide et 2 mois pour une location meublée."
    },
    {
      question: "Comment sont gérés les frais de réparation et d'entretien ?",
      answer: "Les petites réparations (inférieures à 100€) sont généralement prises en charge directement par notre service de gestion après votre validation. Pour les gros travaux, nous sollicitons plusieurs devis et vous soumettons notre recommandation."
    },
    {
      question: "Que faire en cas de litige avec un locataire ?",
      answer: "ERA vous accompagne dans la résolution amiable du litige. Si nécessaire, nous prenons en charge les démarches contentieuses (mise en demeure, procédure d'expulsion) en lien avec votre avocat. La GLI couvre les frais de contentieux."
    },
    {
      question: "Comment sont reversés les loyers ?",
      answer: "Les loyers sont reversés chaque mois sur votre compte bancaire, généralement entre le 5 et le 10 du mois, déduction faite de nos honoraires et des éventuelles charges de copropriété avancées."
    },
    {
      question: "Est-il possible de louer un bien meublé avec ERA ?",
      answer: "Absolument. La location meublée offre des avantages fiscaux intéressants (statut LMNP) et permet des loyers légèrement supérieurs. Nous gérons aussi bien les locations vides que meublées, courte ou longue durée."
    },
    {
      question: "Quelle est la durée d'un bail de location standard ?",
      answer: "Pour une location vide, le bail est de 3 ans renouvelable tacitement. Pour une location meublée, il est de 1 an (ou 9 mois pour un étudiant). Le locataire peut partir à tout moment avec un préavis de 1 ou 3 mois selon les cas."
    },
    {
      question: "ERA assure-t-il les états des lieux d'entrée et de sortie ?",
      answer: "Oui, nous réalisons systématiquement des états des lieux contradictoires détaillés avec photos à l'appui, conformément à la loi ALUR. Cela protège vos intérêts et évite les litiges en fin de bail."
    },
    {
      question: "Puis-je récupérer mon bien en cours de bail ?",
      answer: "Vous pouvez donner congé à votre locataire uniquement à l'échéance du bail et pour des motifs légaux : vente, reprise pour y habiter ou pour un proche. Un préavis de 6 mois est obligatoire."
    },
    {
      question: "Quels sont les avantages fiscaux de la location immobilière ?",
      answer: "Vous pouvez déduire de vos revenus fonciers les intérêts d'emprunt, les charges de copropriété, la taxe foncière, les frais de gestion et les travaux d'entretien. Le statut LMNP offre également des avantages en meublé."
    },
    {
      question: "Comment ERA DUPONT ROMAIN IMMOBILIER diffuse-t-il les annonces ?",
      answer: "Nous diffusons vos annonces sur les principaux portails immobiliers (SeLoger, Leboncoin, PAP, etc.), notre site ERA, nos réseaux sociaux et notre vitrine agence. Cette multi-diffusion garantit une visibilité maximale."
    },
    {
      question: "Quelle est la commission pour la recherche de locataire ?",
      answer: "Les frais d'agence pour la recherche locataire sont partagés entre le propriétaire et le locataire, dans la limite légale d'un mois de loyer hors charges. Nous vous détaillons ces frais lors de notre premier rendez-vous."
    },
    {
      question: "ERA peut-il gérer un immeuble de rapport complet ?",
      answer: "Oui, nous gérons des immeubles de rapport avec plusieurs logements. Nous assurons la gestion locative globale, les relations avec les locataires, le suivi des travaux et l'optimisation de votre rentabilité locative."
    },
    {
      question: "Comment puis-je suivre la gestion de mon bien à distance ?",
      answer: "Nous vous fournissons un espace propriétaire en ligne où vous pouvez consulter les quittances, les appels de charges, le suivi des interventions et communiquer avec votre gestionnaire. Un reporting mensuel vous est également envoyé."
    },
    {
      question: "Quelles sont les obligations légales du propriétaire bailleur ?",
      answer: "Vous devez fournir un logement décent, réaliser les diagnostics obligatoires, souscrire une assurance propriétaire non-occupant (PNO), assurer les grosses réparations et respecter les plafonds de loyers si applicable (zone tendue)."
    },
    {
      question: "Pourquoi choisir ERA DUPONT ROMAIN IMMOBILIER pour gérer mon bien ?",
      answer: "ERA cumule plus de 40 ans d'expertise immobilière, un réseau national reconnu et une connaissance approfondie du marché perpignanais. Nos clients propriétaires apprécient notre réactivité, notre transparence et notre accompagnement personnalisé. Consultez nos avis Google pour vous en convaincre."
    },
    {
      question: "Comment déposer un avis sur ERA DUPONT ROMAIN IMMOBILIER ?",
      answer: "Vous pouvez laisser votre avis directement sur notre fiche Google Business en suivant ce lien : https://g.page/r/Cf4uH0jFPZDSEBM/review. Votre retour d'expérience aide d'autres propriétaires à nous faire confiance et nous permet de nous améliorer continuellement."
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-foreground mb-3">
          Questions fréquentes
        </h2>
        <p className="text-center text-muted-foreground mb-10">
          Tout savoir sur la location et la gestion locative à Perpignan
        </p>

        <Card className="p-6 shadow-md">
          <Accordion type="single" collapsible className="w-full">
            {(showAll ? faqData : faqData.slice(0, 5)).map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-base font-semibold hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          {faqData.length > 5 && (
            <div className="mt-6 text-center">
              <Button
                variant="outline"
                onClick={() => setShowAll(!showAll)}
                className="gap-2"
              >
                {showAll ? (
                  <>
                    Voir moins
                    <ChevronUp className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    Voir les {faqData.length - 5} autres questions
                    <ChevronDown className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          )}
        </Card>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqData.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })}
        </script>
      </div>
    </section>
  );
};

export default FAQ;