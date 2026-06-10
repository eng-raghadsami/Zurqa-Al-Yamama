export type NewsCategory =
  | "politics"
  | "economy"
  | "technology"
  | "environment"
  | "health"
  | "security";

export type NewsCategoryFilter = NewsCategory | "all";

export const NEWS_CATEGORY_LABELS: Record<NewsCategory, string> = {
  politics: "سياسة",
  economy: "اقتصاد",
  technology: "تكنولوجيا",
  environment: "بيئة",
  health: "صحة",
  security: "أمن",
};

export const NEWS_FILTERS: { id: NewsCategoryFilter; label: string }[] = [
  { id: "all", label: "الكل" },
  { id: "politics", label: "سياسة" },
  { id: "economy", label: "اقتصاد" },
  { id: "technology", label: "تكنولوجيا" },
  { id: "environment", label: "بيئة" },
  { id: "health", label: "صحة" },
  { id: "security", label: "أمن" },
];

export type VerifiedNewsBodySection =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | {
      type: "quote";
      text: string;
      author: string;
    };

export type VerifiedNewsArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: NewsCategory;
  publishedAt: string;
  relativeTime?: string;
  readMinutes?: number;
  listImage: string;
  detailImage: string;
  trustScore?: number;
  trustBadge?: string;
  cardVariant: "featured" | "standard" | "compact";
  compactIcon?: string;
  sourceLabel?: string;
  verifier?: {
    name: string;
    avatar: string;
  };
  verification: {
    originalSource: string;
    aiAnalysis: string;
    humanReview: string;
  };
  body: VerifiedNewsBodySection[];
  relatedSlugs: string[];
  apiContentId?: number | null;
  publishedRecordId?: number | null;
};

export {
  BREAKING_NEWS_TICKER,
  INTEGRITY_DAILY_STATS,
  LISTING_ARTICLE_SLUGS,
  VERIFIED_NEWS_ARTICLES,
} from "@dummy/verifiedNews";

import {
  LISTING_ARTICLE_SLUGS,
  VERIFIED_NEWS_ARTICLES,
} from "@dummy/verifiedNews";

export function getVerifiedNewsBySlug(slug: string): VerifiedNewsArticle | undefined {
  return VERIFIED_NEWS_ARTICLES.find((article) => article.slug === slug);
}

export function getRelatedArticles(article: VerifiedNewsArticle): VerifiedNewsArticle[] {
  return article.relatedSlugs
    .map((relatedSlug) => getVerifiedNewsBySlug(relatedSlug))
    .filter((item): item is VerifiedNewsArticle => item !== undefined);
}

export function filterVerifiedNews(
  articles: VerifiedNewsArticle[],
  category: NewsCategoryFilter,
): VerifiedNewsArticle[] {
  if (category === "all") return articles;
  return articles.filter((article) => article.category === category);
}

export function getListingArticles(): VerifiedNewsArticle[] {
  return LISTING_ARTICLE_SLUGS.map((slug) => getVerifiedNewsBySlug(slug)).filter(
    (article): article is VerifiedNewsArticle => article !== undefined,
  );
}

export function isFullBentoLayout(articles: VerifiedNewsArticle[]): boolean {
  if (articles.length < 5) return false;
  const slugs = new Set(articles.map((a) => a.slug));
  return LISTING_ARTICLE_SLUGS.every((slug) => slugs.has(slug));
}
