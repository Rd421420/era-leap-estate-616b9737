import { Link, useNavigate, useLocation } from "react-router-dom";
import { Phone, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import eraLogo from "@/assets/era-logo.png";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleAnalysisClick = () => {
    if (location.pathname === "/") {
      const formEl = document.getElementById("estimation-form");
      if (formEl) {
        formEl.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      }
    } else {
      navigate("/");
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img
            src={eraLogo}
            alt="ERA Dupont Romain Immobilier"
            className="h-8 w-auto"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
        </Link>

        <div className="flex items-center gap-3">
          <a
            href="tel:+33468665718"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-primary transition-colors"
          >
            <Phone className="h-4 w-4" />
            04 68 66 57 18
          </a>
          <Button
            size="sm"
            onClick={handleAnalysisClick}
            className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
          >
            <BarChart3 className="h-4 w-4 mr-1.5" />
            Analyse offerte
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;