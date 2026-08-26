import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface RelatedLink {
  label: string;
  to: string;
}

interface RelatedLinksProps {
  links: RelatedLink[];
  title?: string;
}

const RelatedLinks = ({ links, title = "Sur le même sujet" }: RelatedLinksProps) => {
  return (
    <nav aria-label={title} className="border-t border-border pt-6">
      <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
        {title}
      </h2>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.to + link.label}>
            <Link
              to={link.to}
              className="group inline-flex items-center gap-2 text-sm text-foreground underline-offset-4 hover:text-primary hover:underline"
            >
              <ArrowRight className="h-3.5 w-3.5 text-primary transition-transform group-hover:translate-x-0.5" />
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default RelatedLinks;
