import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-8">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-4">
          <img
            src="https://drive.google.com/uc?export=view&id=1i2cANrQpr6_eKXrR98tZF6RwRYXJ3Q-R"
            alt="ERA"
            className="h-12 mx-auto opacity-80 invert"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
        <p className="text-sm mb-2">
          ERA DUPONT ROMAIN IMMOBILIER - Votre expert en gestion locative à Perpignan
        </p>
        <p className="text-xs opacity-75 mb-3">
          © {new Date().getFullYear()} Tous droits réservés |
          <a href="/mentions-legales" className="hover:underline ml-1">Mentions légales</a> |
          <a href="/confidentialite" className="hover:underline ml-1">Politique de confidentialité</a> |
          <a href="https://media.immo-facile.com/segments/immo/catalog/images/manufacturers_bareme/265286.pdf" className="hover:underline ml-1" target="_blank" rel="noopener noreferrer">Honoraires</a>
        </p>
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs opacity-75">
          <Link to="/louer-bien-dpe-f-g-perpignan" className="hover:underline">Bien F ou G</Link>
          <span className="opacity-50">·</span>
          <Link to="/loyers-impayes-perpignan" className="hover:underline">Loyers impayés</Link>
          <span className="opacity-50">·</span>
          <Link to="/logement-ne-se-loue-pas-perpignan" className="hover:underline">Logement vacant</Link>
          <span className="opacity-50">·</span>
          <Link to="/gestion-locative-perpignan" className="hover:underline">Gestion locative</Link>
          <span className="opacity-50">·</span>
          <Link to="/deleguer-ou-gerer-soi-meme" className="hover:underline">Déléguer ou gérer</Link>
          <span className="opacity-50">·</span>
          <Link to="/blog" className="hover:underline">Conseils</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;