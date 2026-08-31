import { Link } from "react-router-dom";
import eraLogo from "@/assets/era-logo.png";
import { openCookieBanner } from "@/components/CookieConsent";

const Footer = () => {
  return (
    <footer className="bg-navy text-navy-foreground py-10 border-t-8 border-primary">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-4">
          <img
            src={eraLogo}
            alt="ERA DUPONT ROMAIN IMMOBILIER logo"
            className="h-12 mx-auto opacity-80 invert"
            loading="lazy"
          />
        </div>
        <p className="text-sm mb-2">ERA DUPONT ROMAIN IMMOBILIER — Votre expert en gestion locative à Perpignan</p>
        <p className="text-xs opacity-75 mb-3">
          © {new Date().getFullYear()} Tous droits réservés |
          <Link to="/mentions-legales" className="hover:underline ml-1">
            Mentions légales
          </Link>{" "}
          |
          <Link to="/confidentialite" className="hover:underline ml-1">
            Politique de confidentialité
          </Link>{" "}
          |
          <button type="button" onClick={openCookieBanner} className="hover:underline ml-1 underline-offset-2">
            Gérer mes cookies
          </button>{" "}
          |
          <a
            href="https://media.immo-facile.com/segments/immo/catalog/images/manufacturers_bareme/265286.pdf"
            className="hover:underline ml-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            Honoraires
          </a>
        </p>

        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs opacity-75">
          <Link to="/louer-bien-dpe-f-g-perpignan" className="hover:underline">
            Bien F ou G
          </Link>
          <span className="opacity-50">·</span>
          <Link to="/loyers-impayes-perpignan" className="hover:underline">
            Loyers impayés
          </Link>
          <span className="opacity-50">·</span>
          <Link to="/logement-ne-se-loue-pas-perpignan" className="hover:underline">
            Logement vacant
          </Link>
          <span className="opacity-50">·</span>
          <Link to="/gestion-locative-perpignan" className="hover:underline">
            Gestion locative
          </Link>
          <span className="opacity-50">·</span>
          <Link to="/deleguer-ou-gerer-soi-meme" className="hover:underline">
            Déléguer ou gérer
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
