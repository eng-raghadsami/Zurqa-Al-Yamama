import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { contentSubmissionService } from "@services/contentSubmissionService";
import { certificatesService } from "@services/certificatesService";
import { humanitarianStoriesService } from "@services/humanitarianStoriesService";
import { investigativeReportsService } from "@services/investigativeReportsService";
import { VERIFIED_NEWS_QUERY_KEY } from "@services/hooks/useVerifiedNews";

export const PENDING_SUBMISSIONS_KEY = ["content-submissions", "pending"] as const;
export const CERTIFICATES_QUERY_KEY = ["integrity-certificates"] as const;
export const HUMANITARIAN_STORIES_KEY = ["humanitarian-stories"] as const;
export const INVESTIGATIVE_REPORTS_KEY = ["investigative-reports"] as const;

export function usePendingSubmissions() {
  return useQuery({
    queryKey: PENDING_SUBMISSIONS_KEY,
    queryFn: () => contentSubmissionService.listPending(),
    staleTime: 30_000,
  });
}

export function useContentSubmission(id: string | undefined) {
  return useQuery({
    queryKey: ["content-submissions", "detail", id],
    queryFn: () =>
      id ? contentSubmissionService.getById(id) : Promise.resolve(undefined),
    enabled: Boolean(id),
    staleTime: 15_000,
  });
}

export function useSubmitContentForReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: contentSubmissionService.submitForReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PENDING_SUBMISSIONS_KEY });
    },
  });
}

export function useApproveContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: contentSubmissionService.approveAndPublish,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PENDING_SUBMISSIONS_KEY });
      queryClient.invalidateQueries({ queryKey: VERIFIED_NEWS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: HUMANITARIAN_STORIES_KEY });
      queryClient.invalidateQueries({ queryKey: INVESTIGATIVE_REPORTS_KEY });
      queryClient.invalidateQueries({ queryKey: CERTIFICATES_QUERY_KEY });
    },
  });
}

export function useIntegrityCertificates() {
  return useQuery({
    queryKey: CERTIFICATES_QUERY_KEY,
    queryFn: () => certificatesService.listForContributor(),
    staleTime: 60_000,
  });
}

export function useIntegrityCertificate(id: string | undefined) {
  return useQuery({
    queryKey: [...CERTIFICATES_QUERY_KEY, id],
    queryFn: () => (id ? certificatesService.getById(id) : Promise.resolve(undefined)),
    enabled: Boolean(id),
    staleTime: 60_000,
  });
}

export function useHumanitarianStories() {
  return useQuery({
    queryKey: HUMANITARIAN_STORIES_KEY,
    queryFn: () => humanitarianStoriesService.getAll(),
    staleTime: 10 * 60 * 1000,
  });
}

export function useHumanitarianStory(slug: string | undefined) {
  return useQuery({
    queryKey: [...HUMANITARIAN_STORIES_KEY, slug],
    queryFn: () =>
      slug ? humanitarianStoriesService.getBySlug(slug) : Promise.resolve(undefined),
    enabled: Boolean(slug),
    staleTime: 10 * 60 * 1000,
  });
}

export function useInvestigativeReports() {
  return useQuery({
    queryKey: INVESTIGATIVE_REPORTS_KEY,
    queryFn: () => investigativeReportsService.getAll(),
    staleTime: 10 * 60 * 1000,
  });
}

export function useInvestigativeReport(slug: string | undefined) {
  return useQuery({
    queryKey: [...INVESTIGATIVE_REPORTS_KEY, slug],
    queryFn: () =>
      slug ? investigativeReportsService.getBySlug(slug) : Promise.resolve(undefined),
    enabled: Boolean(slug),
    staleTime: 10 * 60 * 1000,
  });
}
