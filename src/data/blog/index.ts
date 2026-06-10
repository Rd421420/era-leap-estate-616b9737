import type { BlogPost } from "./types";
import fraisGestion from "./posts/frais-gestion-locative-perpignan-prix";

const allPosts: BlogPost[] = [fraisGestion];

export const posts: BlogPost[] = [...allPosts].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

export const getPostBySlug = (slug: string): BlogPost | undefined =>
  posts.find((p) => p.slug === slug);

export type { BlogPost } from "./types";
