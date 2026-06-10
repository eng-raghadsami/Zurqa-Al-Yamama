import type { ContentSetupType } from "@website/types/contentSetup";

const STORAGE_KEY = "zurqa-published-articles";

export type PublishedArticle = {
  id: string;
  slug: string;
  contentType: ContentSetupType;
  title: string;
  body: string;
  excerpt: string;
  coverImage: string;
  coverBlurLevel: number;
  integrityScore: number;
  author: string;
  contributorRole: string;
  publishedAt: string;
  submissionId: string;
  apiContentId?: number | null;
  publishedRecordId?: number | null;
};

function readAll(): PublishedArticle[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as PublishedArticle[];
  } catch {
    return [];
  }
}

function writeAll(items: PublishedArticle[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function listPublishedArticles(): PublishedArticle[] {
  return readAll().sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getPublishedArticleBySlug(slug: string): PublishedArticle | undefined {
  return readAll().find((item) => item.slug === slug);
}

export function addPublishedArticle(article: PublishedArticle) {
  const items = readAll().filter((item) => item.slug !== article.slug);
  writeAll([article, ...items]);
}

export function listPublishedByType(type: ContentSetupType): PublishedArticle[] {
  return listPublishedArticles().filter((item) => item.contentType === type);
}
