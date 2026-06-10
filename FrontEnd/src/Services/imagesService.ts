import { API_ENDPOINTS } from "@services/api/endpoints";
import { apiClient } from "@services/api/client";
import type { ImageAnalysisResult } from "@services/api/types";

export const imagesService = {
  async analyze(image: File): Promise<ImageAnalysisResult> {
    const formData = new FormData();
    formData.append("image", image);

    const { data } = await apiClient.post<ImageAnalysisResult>(
      API_ENDPOINTS.images.analyze,
      formData,
    );
    return data;
  },
};
