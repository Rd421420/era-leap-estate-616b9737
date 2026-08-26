import { useEffect, useState } from "react";
import { ClipboardCheck } from "lucide-react";

const MobileCallBar = () => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const target = document.getElementById("estimation-form");
    if (!target) return; // l'élément n'existe pas : la barre reste affichée

    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href="#estimation-form"
      className={`md:hidden fixed bottom-0 left-0 right-0 z-50 h-[52px] bg-primary text-primary-foreground flex items-center justify-center gap-2 font-semibold shadow-lg transition-all duration-300 ${
        hidden ? "opacity-0 translate-y-full pointer-events-none" : "opacity-100 translate-y-0"
      }`}
      aria-label="Demander mon estimation locative offerte"
    >
      <ClipboardCheck className="h-5 w-5" />
      <span>Estimer mon loyer - gratuit</span>
    </a>
  );
};

export default MobileCallBar;
