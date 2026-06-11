import { ClipboardCheck, ShieldCheck, Users } from "lucide-react";

const items = [
  { label: "Estimation offerte", Icon: ClipboardCheck },
  { label: "GLI remboursée 12 mois", Icon: ShieldCheck },
  { label: "Locataires pré-qualifiés", Icon: Users },
];

const TrustBar = () => {
  return (
    <div className="border-y border-border bg-muted/30">
      <div className="container mx-auto px-4 py-4">
        <ul className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10">
          {items.map(({ label, Icon }) => (
            <li key={label} className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <Icon className="h-4 w-4 text-primary" />
              </span>
              {label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TrustBar;
