export interface AppEnv {
  readonly VITE_APP_NAME?: string;
  readonly VITE_API_BASE_URL?: string;
}

export const env = {
  apiBaseUrl:
    import.meta.env.VITE_API_BASE_URL ??
    "https://zurqa-al-yamama.onrender.com",
  isProd: import.meta.env.PROD,
  isDev: import.meta.env.DEV,
} as const;

export const APP_NAME =
  (import.meta.env.VITE_APP_NAME as string | undefined) ?? "زرقاء اليمامة";

/**
 * core/config/env.ts
 * Typed accessors for environment variables.
 * Add new variables here as the project grows.
 */
