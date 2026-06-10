import { API_ENDPOINTS } from "@services/api/endpoints";
import { apiClient } from "@services/api/client";
import type {
  ApiContent,
  CreateContentPayload,
  UpdateContentPayload,
} from "@services/api/types";

type CreateContentResponse = { success?: boolean; content?: ApiContent };

export const contentsService = {
  async list(): Promise<ApiContent[]> {
    const { data } = await apiClient.get<ApiContent[]>(API_ENDPOINTS.contents.list);
    return Array.isArray(data) ? data : [];
  },

  async getById(id: number): Promise<ApiContent> {
    const { data } = await apiClient.get<ApiContent>(API_ENDPOINTS.contents.byId(id));
    return data;
  },

  async create(payload: CreateContentPayload): Promise<ApiContent> {
    const { data } = await apiClient.post<CreateContentResponse | ApiContent>(
      API_ENDPOINTS.contents.list,
      payload,
    );
    if ("content" in data && data.content) return data.content;
    return data as ApiContent;
  },

  async update(id: number, payload: UpdateContentPayload): Promise<ApiContent> {
    const { data } = await apiClient.put<{ content?: ApiContent } | ApiContent>(
      API_ENDPOINTS.contents.byId(id),
      payload,
    );
    if ("content" in data && data.content) return data.content;
    return data as ApiContent;
  },
};
