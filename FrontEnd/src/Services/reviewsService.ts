import { API_ENDPOINTS } from "@services/api/endpoints";
import { apiClient } from "@services/api/client";
import type { ApiReview, CreateReviewPayload } from "@services/api/types";

type CreateReviewResponse = { success?: boolean; review?: ApiReview };

export const reviewsService = {
  async create(payload: CreateReviewPayload): Promise<ApiReview> {
    const { data } = await apiClient.post<CreateReviewResponse | ApiReview>(
      API_ENDPOINTS.reviews.list,
      payload,
    );
    if ("review" in data && data.review) return data.review;
    return data as ApiReview;
  },
};
