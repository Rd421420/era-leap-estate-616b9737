import { ClipboardCheck } from "lucide-react";

const MobileCallBar = () => {
  return (
    <a
      href="#estimation-form"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 h-[52px] bg-primary text-primary-foreground flex items-center justify-center gap-2 font-semibold shadow-lg"
      aria-label="Demander mon estimation locative offerte"
    >
      <ClipboardCheck className="h-5 w-5" />
      <span>Demander mon estimation offerte</span>
    </a>
  );
};

export default MobileCallBar;
