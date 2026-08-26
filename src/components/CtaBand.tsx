import { Button } from "@/components/ui/button";
import { BarChart3 } from "lucide-react";

interface CtaBandProps {
  title?: string;
  ctaText?: string;
}

const CtaBand = ({
  title = "Vous voulez savoir ce que vaut votre bien en location à Perpignan ou dans le 66?",
  ctaText = "Recevoir mon estimation de loyer",
}: CtaBandProps) => {
  return (
    <section className="my-12 rounded-lg bg-primary/5 border border-primary/20 p-6 md:p-8 text-center">
      <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-4">{title}</h2>
      <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
        <a href="/#estimation-form">
          <BarChart3 className="h-4 w-4 mr-1.5" />
          {ctaText}
        </a>
      </Button>
      <p className="text-xs text-muted-foreground mt-3">Estimation locative offerte · Réponse sous 24 h</p>
    </section>
  );
};

export default CtaBand;
