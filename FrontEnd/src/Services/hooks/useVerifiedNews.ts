import { useQuery } from "@tanstack/react-query";
import { verifiedNewsService } from "@services/verifiedNewsService";
import type { NewsCategoryFilter } from "@website/types/verifiedNews";

export const VERIFIED_NEWS_QUERY_KEY = ["verified-news"] as const;

export function useVerifiedNewsArticles(category: NewsCategoryFilter = "all") {
  return useQuery({
    queryKey: [...VERIFIED_NEWS_QUERY_KEY, category],
    queryFn: () => verifiedNewsService.filterByCategory(category),
    staleTime: 10 * 60 * 1000,
  });
}

export function useVerifiedNewsArticle(slug: string | undefined) {
  return useQuery({
    queryKey: [...VERIFIED_NEWS_QUERY_KEY, "detail", slug],
    queryFn: () =>
      slug ? verifiedNewsService.getBySlug(slug) : Promise.resolve(undefined),
    enabled: Boolean(slug),
    staleTime: 10 * 60 * 1000,
  });
}

export function useVerifiedNewsListing() {
  return useQuery({
    queryKey: [...VERIFIED_NEWS_QUERY_KEY, "listing"],
    queryFn: () => verifiedNewsService.getListingArticles(),
    staleTime: 10 * 60 * 1000,
  });
}

export function useVerifiedNewsIntegrityStats() {
  return useQuery({
    queryKey: [...VERIFIED_NEWS_QUERY_KEY, "integrity-stats"],
    queryFn: () => verifiedNewsService.getIntegrityStats(),
    staleTime: 10 * 60 * 1000,
  });
}
