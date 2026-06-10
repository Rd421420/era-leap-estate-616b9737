import { Link } from "react-router-dom";
import SeoHead from "@/components/SeoHead";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { posts } from "@/data/blog";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

const BlogIndex = () => {
  return (
    <>
      <SeoHead
        title="Conseils aux bailleurs à Perpignan | ERA Dupont Romain"
        description="Conseils, guides et actualités pour les propriétaires bailleurs à Perpignan : gestion locative, DPE, loyers impayés, fiscalité."
        path="/blog"
        type="website"
      />
      <section className="container mx-auto px-4 py-12 md:py-16">
        <header className="mb-10 text-center max-w-2xl mx-auto">
          <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-2">Le blog</p>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
            Conseils aux bailleurs à Perpignan
          </h1>
          <p className="text-muted-foreground">
            Guides pratiques, fiscalité, DPE, gestion locative : tout ce qu'il faut savoir pour louer
            sereinement dans les Pyrénées-Orientales.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="group">
              <Card className="h-full transition-shadow group-hover:shadow-md">
                {post.image && (
                  <div className="aspect-video w-full overflow-hidden rounded-t-lg bg-muted">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
                <CardHeader>
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {post.category}
                  </p>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription>{formatDate(post.date)}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default BlogIndex;
