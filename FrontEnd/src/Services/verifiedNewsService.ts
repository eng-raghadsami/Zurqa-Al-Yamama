import { contentsService } from "@services/contentsService";
import {
  apiContentToPublishedArticle,
  publishedArticleToVerifiedNews,
} from "@services/mappers/publishedContentMapper";
import {
  BREAKING_NEWS_TICKER,
  INTEGRITY_DAILY_STATS,
  LISTING_ARTICLE_SLUGS,
  VERIFIED_NEWS_ARTICLES,
} from "@dummy/verifiedNews";
import { PUBLISHED_CONTRIBUTIONS_DUMMY } from "@dummy/publishedContributions";
import {
  getPublishedArticleBySlug,
  listPublishedByType,
} from "@website/helpers/publishedArticlesStore";
import type {
  NewsCategoryFilter,
  VerifiedNewsArticle,
} from "@website/types/verifiedNews";

function mergeArticles(items: VerifiedNewsArticle[]): VerifiedNewsArticle[] {
  const map = new Map<string, VerifiedNewsArticle>();
  for (const article of items) {
    map.set(article.slug, article);
  }
  return Array.from(map.values());
}

async function loadApiArticles(): Promise<VerifiedNewsArticle[]> {
  try {
    const contents = await contentsService.list();
    return contents
      .filter((item) => item.status === "published")
      .map((item) =>
        publishedArticleToVerifiedNews(apiContentToPublishedArticle(item, "verified_news")),
      );
  } catch {
    return [];
  }
}

function loadLocalArticles(): VerifiedNewsArticle[] {
  const local = listPublishedByType("verified_news").map(publishedArticleToVerifiedNews);
  const dummyPublished = PUBLISHED_CONTRIBUTIONS_DUMMY.filter(
    (item) => item.contentType === "verified_news",
  ).map(publishedArticleToVerifiedNews);
  return [...local, ...dummyPublished];
}

export const verifiedNewsService = {
  async getAllArticles(): Promise<VerifiedNewsArticle[]> {
    const api = await loadApiArticles();
    const local = loadLocalArticles();
    return mergeArticles([...api, ...local, ...VERIFIED_NEWS_ARTICLES]);
  },

  async getBySlug(slug: string): Promise<VerifiedNewsArticle | undefined> {
    const localArticle = getPublishedArticleBySlug(slug);
    if (localArticle?.contentType === "verified_news") {
      return publishedArticleToVerifiedNews(localArticle);
    }

    const articles = await this.getAllArticles();
    return articles.find((article) => article.slug === slug);
  },

  async getListingArticles(): Promise<VerifiedNewsArticle[]> {
    const articles = await this.getAllArticles();
    const listing = LISTING_ARTICLE_SLUGS.map((slug) =>
      articles.find((article) => article.slug === slug),
    ).filter((article): article is VerifiedNewsArticle => article !== undefined);

    const listingSet = new Set<string>(LISTING_ARTICLE_SLUGS);
    const contributed = articles.filter((article) => !listingSet.has(article.slug));

    return [...contributed.slice(0, 2), ...listing];
  },

  async getRelatedArticles(
    article: VerifiedNewsArticle,
  ): Promise<VerifiedNewsArticle[]> {
    const related = await Promise.all(
      article.relatedSlugs.map((slug) => this.getBySlug(slug)),
    );
    return related.filter(
      (item): item is VerifiedNewsArticle => item !== undefined,
    );
  },

  async filterByCategory(
    category: NewsCategoryFilter,
  ): Promise<VerifiedNewsArticle[]> {
    const articles = await this.getAllArticles();
    if (category === "all") return articles;
    return articles.filter((article) => article.category === category);
  },

  async getBreakingTicker(): Promise<string[]> {
    return [...BREAKING_NEWS_TICKER];
  },

  async getIntegrityStats() {
    return INTEGRITY_DAILY_STATS;
  },
};
