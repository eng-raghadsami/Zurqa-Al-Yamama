import { API_ENDPOINTS } from "@services/api/endpoints";
import { apiClient } from "@services/api/client";
import type {
  BroadcastAudioApiResponse,
  GenerateBroadcastAudioPayload,
} from "@services/api/types";
import { env } from "@core/config/env";

export type BroadcastAudioResult = {
  audioUrl: string;
  mimeType: string;
  cached?: boolean;
  revokeOnClose?: boolean;
};

function resolveAbsoluteUrl(url: string): string {
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("blob:")) {
    return url;
  }
  const base = env.apiBaseUrl.replace(/\/$/, "");
  return `${base}${url.startsWith("/") ? url : `/${url}`}`;
}

function parseJsonBroadcastPayload(
  payload: BroadcastAudioApiResponse,
): BroadcastAudioResult | null {
  const directUrl = payload.audio_url ?? payload.url;
  if (directUrl) {
    return {
      audioUrl: resolveAbsoluteUrl(directUrl),
      mimeType: payload.mime_type ?? "audio/mpeg",
      cached: payload.cached,
      revokeOnClose: false,
    };
  }

  const base64 = payload.audio_base64 ?? payload.audio;
  if (base64) {
    const mimeType = payload.mime_type ?? "audio/mpeg";
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) {
      bytes[i] = binary.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: mimeType });
    return {
      audioUrl: URL.createObjectURL(blob),
      mimeType,
      cached: payload.cached,
      revokeOnClose: true,
    };
  }

  return null;
}

export const broadcastsService = {
  async generateAudio(
    publishedId: number,
    payload: GenerateBroadcastAudioPayload = {},
  ): Promise<BroadcastAudioResult> {
    const response = await apiClient.post<Blob>(
      API_ENDPOINTS.broadcasts.audio(publishedId),
      payload,
      {
        responseType: "blob",
        headers: {
          Accept: "application/json, audio/*",
        },
      },
    );

    const blob = response.data;
    const rawContentType = response.headers["content-type"];
    const contentType =
      (typeof rawContentType === "string" ? rawContentType : blob.type) ?? "";

    if (contentType.includes("application/json") || blob.type.includes("json")) {
      const text = await blob.text();
      let json: BroadcastAudioApiResponse;
      try {
        json = JSON.parse(text) as BroadcastAudioApiResponse;
      } catch {
        throw new Error("رد غير متوقع من خادم البث الصوتي");
      }

      const parsed = parseJsonBroadcastPayload(json);
      if (!parsed) {
        throw new Error(json.message ?? "تعذّر الحصول على ملف الصوت من الخادم");
      }
      return parsed;
    }

    const mimeType = contentType.split(";")[0] || blob.type || "audio/mpeg";
    return {
      audioUrl: URL.createObjectURL(blob),
      mimeType,
      revokeOnClose: true,
    };
  },
};
