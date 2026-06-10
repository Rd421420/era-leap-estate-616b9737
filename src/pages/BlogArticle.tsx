import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SeoHead from "@/components/SeoHead";
import CtaBand from "@/components/CtaBand";
import NotFound from "./NotFound";
import { getPostBySlug, posts } from "@/data/blog";
import { trackEvent } from "@/lib/analytics";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SITE = "https://era-dupontromain.immo";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

const BlogArticle = () => {
  const { slug = "" } = useParams<{ slug: string }>();
  const post = getPostBySlug(slug);

  useEffect(() => {
    if (post) trackEvent("blog_view", { slug: post.slug });
  }, [post]);

  if (!post) return <NotFound />;

  const url = `${SITE}/blog/${post.slug}`;
  const related = (post.relatedSlugs ?? [])
    .map((s) => posts.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    image: post.image ? [post.image] : undefined,
    author: { "@type": "Organization", name: "ERA DUPONT ROMAIN IMMOBILIER" },
    publisher: {
      "@type": "Organization",
      name: "ERA DUPONT ROMAIN IMMOBILIER",
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  const faqJsonLd = post.faq && post.faq.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faq.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }
    : null;

  return (
    <>
      <SeoHead
        title={post.metaTitle}
        description={post.metaDescription}
        path={`/blog/${post.slug}`}
        type="article"
        image={post.image}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>
        {faqJsonLd && (
          <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        )}
      </Helmet>

      <article className="container mx-auto px-4 py-10 md:py-14 max-w-3xl">
        <header className="mb-8">
          <Link to="/blog" className="text-sm text-primary hover:underline">
            ← Tous les articles
          </Link>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-primary">
            {post.category}
          </p>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2 mb-3">
            {post.title}
          </h1>
          <p className="text-sm text-muted-foreground">
            {post.updated ? `Mis à jour le ${formatDate(post.updated)}` : `Publié le ${formatDate(post.date)}`}
          </p>
        </header>

        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="w-full rounded-lg mb-8 object-cover"
          />
        )}

        <div className="prose prose-neutral max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
        </div>

        {post.faq && post.faq.length > 0 && (
          <section className="mt-12">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
              Questions fréquentes
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {post.faq.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left">{f.question}</AccordionTrigger>
                  <AccordionContent>{f.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        )}

        <CtaBand ctaText={post.ctaText} />

        {related.length > 0 && (
          <section className="mt-12 border-t pt-8">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">À lire aussi</h2>
            <ul className="space-y-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link to={`/blog/${r.slug}`} className="text-primary hover:underline">
                    {r.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </>
  );
};

export default BlogArticle;
