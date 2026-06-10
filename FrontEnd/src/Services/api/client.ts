import axios from "axios";
import { env } from "@core/config/env";

export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  headers: {
    Accept: "application/json",
  },
  timeout: 120_000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const message =
        (error.response?.data as { message?: string } | undefined)?.message ??
        error.message;
      return Promise.reject(new Error(message || "فشل الاتصال بالخادم"));
    }
    return Promise.reject(error);
  },
);
