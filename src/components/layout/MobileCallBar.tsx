import { Phone } from "lucide-react";

const MobileCallBar = () => {
  return (
    <a
      href="tel:+33468665718"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 h-[52px] bg-primary text-primary-foreground flex items-center justify-center gap-2 font-semibold shadow-lg"
      aria-label="Appeler ERA Dupont Romain Immobilier"
    >
      <Phone className="h-5 w-5" />
      <span className="whitespace-pre-line">{"\n"}04 68 66 57 18</span>
    </a>
  );
};

export default MobileCallBar;