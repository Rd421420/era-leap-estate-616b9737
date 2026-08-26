import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
      // L'élément cible peut ne pas être monté au premier rendu : on réessaie.
      let raf = 0;
      const timer = window.setTimeout(() => {
        raf = window.requestAnimationFrame(() => {
          const retry = document.getElementById(id);
          if (retry) {
            retry.scrollIntoView({ behavior: "smooth" });
          } else {
            window.scrollTo({ top: 0, left: 0, behavior: "auto" });
          }
        });
      }, 120);
      return () => {
        window.clearTimeout(timer);
        if (raf) window.cancelAnimationFrame(raf);
      };
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
