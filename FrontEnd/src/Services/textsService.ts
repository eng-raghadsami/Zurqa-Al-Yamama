import { API_ENDPOINTS } from "@services/api/endpoints";
import { apiClient } from "@services/api/client";
import type {
  AnalyzeTextPayload,
  TextAnalysisResult,
} from "@services/api/types";

export const textsService = {
  async analyze(payload: AnalyzeTextPayload): Promise<TextAnalysisResult> {
    const { data } = await apiClient.post<TextAnalysisResult>(
      API_ENDPOINTS.texts.analyze,
      payload,
    );
    return data;
  },
};
