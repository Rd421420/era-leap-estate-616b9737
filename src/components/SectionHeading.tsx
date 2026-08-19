interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}

const SectionHeading = ({ eyebrow, title, subtitle, align = "center" }: SectionHeadingProps) => {
  const alignment = align === "center" ? "text-center mx-auto items-center" : "text-left items-start";
  return (
    <div className={`flex max-w-3xl flex-col ${alignment} mb-10 md:mb-12`}>
      {eyebrow && (
        <span className="mb-4 inline-block bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground">
          {eyebrow}
        </span>
      )}
      <h2 className="font-heading text-2xl uppercase leading-tight tracking-tight text-foreground md:text-4xl">
        {title}
      </h2>
      <span className="aida-rule mt-4" aria-hidden />
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
};


export default SectionHeading;
