export { apiClient } from "./api/client";
export { API_ENDPOINTS } from "./api/endpoints";
export type * from "./api/types";

export { termsService } from "./termsService";
export { imagesService } from "./imagesService";
export { textsService } from "./textsService";

export { verifiedNewsService } from "./verifiedNewsService";
export { contentsService } from "./contentsService";
export { publishedContentApiService } from "./publishedContentApiService";
export { reviewsService } from "./reviewsService";
export { contentSubmissionService } from "./contentSubmissionService";
export { certificatesService } from "./certificatesService";
export { humanitarianStoriesService } from "./humanitarianStoriesService";
export { investigativeReportsService } from "./investigativeReportsService";
export { broadcastsService } from "./broadcastsService";

export {
  useMediaTerms,
  useMatchTermsInText,
  useCreateMediaTerm,
  useUpdateMediaTerm,
  useDeleteMediaTerm,
  useAnalyzeImage,
  useAnalyzeText,
  TERMS_QUERY_KEY,
} from "./hooks/useApiServices";

export {
  useHighlightTerms,
  HIGHLIGHT_TERMS_QUERY_KEY,
} from "./hooks/useHighlightTerms";

export {
  useVerifiedNewsArticles,
  useVerifiedNewsArticle,
  useVerifiedNewsListing,
  useVerifiedNewsIntegrityStats,
  VERIFIED_NEWS_QUERY_KEY,
} from "./hooks/useVerifiedNews";

export {
  usePendingSubmissions,
  useContentSubmission,
  useSubmitContentForReview,
  useApproveContent,
  useIntegrityCertificates,
  useIntegrityCertificate,
  useHumanitarianStories,
  useHumanitarianStory,
  useInvestigativeReports,
  useInvestigativeReport,
  PENDING_SUBMISSIONS_KEY,
  CERTIFICATES_QUERY_KEY,
  HUMANITARIAN_STORIES_KEY,
  INVESTIGATIVE_REPORTS_KEY,
} from "./hooks/useContentWorkflow";

export { mapMediaTermToGlossary, mapMediaTermsToGlossary } from "./mappers/termsMapper";
