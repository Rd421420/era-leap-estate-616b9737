export interface BlogFaq {
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  date: string; // ISO
  updated?: string; // ISO
  category: string;
  image?: string;
  body: string; // Markdown
  faq?: BlogFaq[];
  relatedSlugs?: string[];
  ctaText?: string;
}
