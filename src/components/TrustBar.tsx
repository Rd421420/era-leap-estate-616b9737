import { ClipboardCheck, Users, Star, Phone, CalendarOff } from "lucide-react";
import { GOOGLE_RATING, GOOGLE_REVIEW_COUNT } from "@/lib/agency";


const items = [
  { label: "Estimation offerte", Icon: ClipboardCheck },
  { label: "Candidats déjà vérifiés", Icon: Users },
  { label: "Sans engagement de durée", Icon: CalendarOff },
];

const TrustBar = () => {
  return (
    <div className="w-full border-b border-border bg-card">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-6 px-4 py-6">
        {/* Note Google */}
        <div className="flex items-center gap-3">
          <span className="font-heading text-3xl text-primary">{GOOGLE_RATING}/5</span>
          <div className="flex flex-col">
            <div className="flex gap-0.5" aria-label={`Note ${GOOGLE_RATING} sur 5`}>
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              {GOOGLE_REVIEW_COUNT} avis Google
            </span>
          </div>

        </div>

        <span className="hidden h-8 w-px bg-border md:block" />

        {/* Engagements */}
        <ul className="flex flex-wrap items-center gap-5">
          {items.map(({ label, Icon }) => (
            <li key={label} className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <Icon className="h-4 w-4 text-primary" />
              </span>
              {label}
            </li>
          ))}
        </ul>

        <span className="hidden h-8 w-px bg-border md:block" />

        {/* Téléphone */}
        <a
          href="tel:+33468665718"
          className="flex flex-col text-navy transition-colors hover:text-primary"
        >
          <span className="flex items-center gap-2 font-heading text-lg">
            <Phone className="h-4 w-4" />
            04 68 66 57 18
          </span>
          <span className="text-xs uppercase tracking-wide text-muted-foreground">
            Agence Dupont Romain · Perpignan
          </span>
        </a>
      </div>
    </div>
  );
};

export default TrustBar;
