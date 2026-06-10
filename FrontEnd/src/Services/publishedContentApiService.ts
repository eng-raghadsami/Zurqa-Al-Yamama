import { API_ENDPOINTS } from "@services/api/endpoints";
import { apiClient } from "@services/api/client";
import type {
  ApiPublishedContent,
  CreatePublishedPayload,
} from "@services/api/types";

type CreatePublishedResponse = {
  success?: boolean;
  published?: ApiPublishedContent;
};

export const publishedContentApiService = {
  async list(): Promise<ApiPublishedContent[]> {
    const { data } = await apiClient.get<ApiPublishedContent[]>(
      API_ENDPOINTS.published.list,
    );
    return Array.isArray(data) ? data : [];
  },

  async create(payload: CreatePublishedPayload): Promise<ApiPublishedContent> {
    const { data } = await apiClient.post<CreatePublishedResponse | ApiPublishedContent>(
      API_ENDPOINTS.published.list,
      payload,
    );
    if ("published" in data && data.published) return data.published;
    return data as ApiPublishedContent;
  },
};
