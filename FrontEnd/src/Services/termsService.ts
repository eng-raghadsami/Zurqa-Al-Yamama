import { API_ENDPOINTS } from "@services/api/endpoints";
import { apiClient } from "@services/api/client";
import type {
  CreateMediaTermPayload,
  MatchTermsPayload,
  MatchedMediaTerm,
  MediaTerm,
  UpdateMediaTermPayload,
} from "@services/api/types";

export const termsService = {
  async getAll(): Promise<MediaTerm[]> {
    const { data } = await apiClient.get<MediaTerm[]>(API_ENDPOINTS.terms.list);
    return data;
  },

  async getById(id: number): Promise<MediaTerm> {
    const { data } = await apiClient.get<MediaTerm>(API_ENDPOINTS.terms.byId(id));
    return data;
  },

  async create(payload: CreateMediaTermPayload): Promise<MediaTerm> {
    const { data } = await apiClient.post<MediaTerm>(
      API_ENDPOINTS.terms.list,
      payload,
    );
    return data;
  },

  async update(id: number, payload: UpdateMediaTermPayload): Promise<MediaTerm> {
    const { data } = await apiClient.put<MediaTerm>(
      API_ENDPOINTS.terms.byId(id),
      payload,
    );
    return data;
  },

  async remove(id: number): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.terms.byId(id));
  },

  async match(payload: MatchTermsPayload): Promise<MatchedMediaTerm[]> {
    const { data } = await apiClient.post<MatchedMediaTerm[]>(
      API_ENDPOINTS.terms.match,
      payload,
    );
    return data;
  },
};
