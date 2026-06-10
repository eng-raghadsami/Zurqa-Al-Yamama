import type { ApiContent } from "@services/api/types";
import { VERIFIED_NEWS_IMAGES } from "@website/constants/verifiedNewsImages";
import type { PublishedArticle } from "@website/helpers/publishedArticlesStore";
import { slugifyTitle } from "@website/helpers/slugify";
import type { ContentSubmission } from "@website/types/contentSubmission";
import type { ContentSetupType } from "@website/types/contentSetup";
import type { HumanitarianStory } from "@dummy/humanitarianStories";
import type { InvestigativeReport } from "@dummy/investigativeReports";
import type { VerifiedNewsArticle } from "@website/types/verifiedNews";

const DEFAULT_COVER = VERIFIED_NEWS_IMAGES.featuredList;

export function resolveCoverUrl(url: string | null): string {
  if (!url || url.startsWith("blob:")) return DEFAULT_COVER;
  return url;
}

export function buildExcerpt(body: string, max = 160): string {
  const trimmed = body.trim();
  if (trimmed.length <= max) return trimmed;
  return `${trimmed.slice(0, max).trim()}…`;
}

export function submissionToPublishedArticle(
  submission: ContentSubmission,
  authorName: string,
): PublishedArticle {
  return {
    id: submission.id,
    slug: submission.slug,
    contentType: submission.contentType,
    title: submission.title,
    body: submission.body,
    excerpt: buildExcerpt(submission.body),
    coverImage: resolveCoverUrl(submission.coverPreviewUrl),
    coverBlurLevel: submission.coverBlurLevel,
    integrityScore: submission.integrityScore,
    author: authorName,
    contributorRole: submission.contributorRole,
    publishedAt: new Date().toISOString(),
    submissionId: submission.id,
    apiContentId: submission.apiContentId ?? null,
    publishedRecordId: submission.publishedRecordId ?? null,
  };
}

export function publishedArticleToVerifiedNews(
  article: PublishedArticle,
): VerifiedNewsArticle {
  return {
    id: article.id,
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    category: "politics",
    publishedAt: new Date(article.publishedAt).toLocaleDateString("ar-SA"),
    relativeTime: "حديث",
    readMinutes: Math.max(3, Math.ceil(article.body.length / 900)),
    listImage: article.coverImage,
    detailImage: article.coverImage,
    trustScore: article.integrityScore,
    trustBadge: `موثق بنسبة ${article.integrityScore}%`,
    cardVariant: "standard",
    verifier: {
      name: article.author,
      avatar: VERIFIED_NEWS_IMAGES.verifierAvatar,
    },
    verification: {
      originalSource: `مساهمة ${article.contributorRole} — زرقاء اليمامة`,
      aiAnalysis: "اجتاز التحليل الآلي لمعايير النزاهة",
      humanReview: "اعتماد تحريري من فريق الخبراء",
    },
    body: [{ type: "paragraph", text: article.body }],
    relatedSlugs: [],
    apiContentId: article.apiContentId ?? null,
    publishedRecordId: article.publishedRecordId ?? null,
  };
}

export function publishedArticleToHumanitarianStory(
  article: PublishedArticle,
): HumanitarianStory {
  return {
    id: article.id,
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    tag: "إنساني",
    publishedAt: new Date(article.publishedAt).toLocaleDateString("ar-SA"),
    relativeTime: "حديث",
    integrityScore: article.integrityScore,
    heroImage: article.coverImage,
    heroAlt: article.title,
    author: article.author,
    originalSource: `مساهمة ${article.contributorRole}`,
    aiAnalysis: "تحليل نصي وصوري معتمد",
    humanReview: "مراجعة خبراء المنصة",
    body: [{ type: "paragraph", text: article.body }],
    relatedSlugs: [],
    apiContentId: article.apiContentId ?? null,
    publishedRecordId: article.publishedRecordId ?? null,
  };
}

export function publishedArticleToInvestigativeReport(
  article: PublishedArticle,
): InvestigativeReport {
  return {
    id: article.id,
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    category: "استقصائية",
    publishedAt: new Date(article.publishedAt).toLocaleDateString("ar-SA"),
    author: article.author,
    integrityScore: article.integrityScore,
    heroImage: article.coverImage,
    heroAlt: article.title,
    originalSource: `مساهمة ${article.contributorRole}`,
    aiAnalysis: "تحليل متعدد المعايير",
    humanReview: "اعتماد تحريري",
    body: [{ type: "paragraph", text: article.body }],
    relatedSlugs: [],
    apiContentId: article.apiContentId ?? null,
    publishedRecordId: article.publishedRecordId ?? null,
  };
}

export function apiContentToPublishedArticle(
  content: ApiContent,
  contentType: ContentSetupType = "verified_news",
): PublishedArticle {
  const suffix = String(content.id);
  return {
    id: `api-${content.id}`,
    slug: slugifyTitle(content.title, suffix),
    contentType,
    title: content.title,
    body: content.body,
    excerpt: buildExcerpt(content.body),
    coverImage: DEFAULT_COVER,
    coverBlurLevel: 0,
    integrityScore: 90,
    author: "مساهم المنصة",
    contributorRole: "صحفي",
    publishedAt: content.updated_at ?? content.created_at ?? new Date().toISOString(),
    submissionId: `api-${content.id}`,
    apiContentId: content.id,
    publishedRecordId: null,
  };
}
