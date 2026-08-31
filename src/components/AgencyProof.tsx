import romainDupont from "@/assets/romain-dupont.jpg";
import { GOOGLE_RATING, GOOGLE_REVIEW_COUNT, GOOGLE_REVIEW_URL } from "@/lib/agency";


const AgencyProof = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-2xl md:text-4xl uppercase tracking-tight mb-4">
          Derrière votre estimation, une agence de Perpignan
        </h2>
        <span className="aida-rule mb-10 md:mb-12" aria-hidden />

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
          <img
            src={romainDupont}
            alt="Romain Dupont, directeur de l'agence ERA Dupont Romain Immobilier à Perpignan"
            className="w-full max-w-[220px] aspect-square object-cover rounded-2xl shadow-md"
            loading="lazy"
          />

          <div className="flex-1 text-center md:text-left">
            <blockquote className="text-lg md:text-xl leading-relaxed text-foreground/90 italic">
              « Je m'appelle Romain Dupont. C'est moi qui vous rappelle après votre estimation, et c'est mon équipe qui gère votre bien au quotidien. Pas un centre d'appel, pas un formulaire dans le vide : une agence du centre-ville qui connaît vos rues. »
            </blockquote>
            <p className="mt-4 text-sm text-muted-foreground">
              Romain Dupont — ERA Dupont Romain Immobilier, 2 rue Pierre Rameil, Perpignan
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border bg-card border border-border">
          <div className="p-6 text-center">
            <span className="block font-heading text-4xl text-primary">76</span>
            <span className="block mt-1 text-sm text-muted-foreground">
              communes couvertes dans les P.-O.
            </span>
          </div>
          <div className="p-6 text-center">
            <span className="block font-heading text-4xl text-primary">près de 3 000</span>
            <span className="block mt-1 text-sm text-muted-foreground">
              références de loyers analysées
            </span>
          </div>
          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 text-center group"
          >
            <span className="block font-heading text-4xl text-primary group-hover:text-primary-dark transition-colors">
              {GOOGLE_RATING}/5
            </span>
            <span className="block mt-1 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              sur {GOOGLE_REVIEW_COUNT} avis Google
            </span>
          </a>

        </div>

        <p className="mt-8 text-base md:text-lg leading-relaxed text-muted-foreground max-w-4xl">
          Votre loyer n'est pas une fourchette au doigt mouillé. On compare votre bien aux loyers réellement pratiqués dans votre commune, pour le même type de logement et une surface équivalente. Le volume de références varie d'une commune à l'autre : quand il est faible, on vous le dit, et je reprends le dossier à la main.
        </p>
      </div>
    </section>
  );
};

export default AgencyProof;
