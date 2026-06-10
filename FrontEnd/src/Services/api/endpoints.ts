export const API_ENDPOINTS = {
  images: {
    analyze: "/api/images/analyze",
  },
  texts: {
    analyze: "/api/texts/analyze",
  },
  terms: {
    list: "/api/terms",
    byId: (id: number) => `/api/terms/${id}`,
    match: "/api/terms/match",
  },
  contents: {
    list: "/api/contents",
    byId: (id: number) => `/api/contents/${id}`,
  },
  published: {
    list: "/api/published",
    byId: (id: number) => `/api/published/${id}`,
  },
  reviews: {
    list: "/api/reviews",
    byId: (id: number) => `/api/reviews/${id}`,
  },
  categories: {
    list: "/api/categories",
  },
  broadcasts: {
    audio: (publishedId: number) =>
      `/api/published/${publishedId}/broadcast/audio`,
  },
} as const;
