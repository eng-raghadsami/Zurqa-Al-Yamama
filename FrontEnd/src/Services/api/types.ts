/** Media term from GET/POST /api/terms */
export type MediaTerm = {
  id: number;
  word: string;
  meaning: string;
  category: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
};

export type CreateMediaTermPayload = {
  word: string;
  meaning: string;
  category?: string;
  is_active?: boolean;
};

export type UpdateMediaTermPayload = Partial<CreateMediaTermPayload>;

export type MatchTermsPayload = {
  text: string;
};

export type MatchedMediaTerm = MediaTerm & {
  matched_text?: string;
};

export type AnalyzeTextPayload = {
  text: string;
};

export type PerspectiveScore = {
  label_ar?: string;
  summary_score?: {
    value: number;
    percentage: number;
  };
};

export type TextAnalysisResult = {
  gemini_summary?: string | null;
  perspective?: {
    source?: string;
    model?: string;
    api_url?: string;
    note_ar?: string;
    attributeScores?: Record<string, PerspectiveScore>;
    raw?: unknown;
  };
  errors?: Record<string, string>;
};

export type ImageCriteriaScores = {
  racism_percentage?: number;
  violence_or_hate_percentage?: number;
  sensitive_content_percentage?: number;
  blood_gore_percentage?: number;
  forged_percentage?: number;
  ai_generated_percentage?: number;
};

/** رد POST /api/images/analyze — الحقول في الجذر (Swagger الحالي) */
export type ImageAnalysisResult = {
  racism?: number;
  violence?: number;
  sensitive_content?: number;
  blood?: number;
  ai_generated?: boolean;
  forged?: boolean;
  ai_generated_percentage?: number;
  forged_percentage?: number;
  description?: string | null;
  actions?: string[];
  criteria_scores?: ImageCriteriaScores;
  errors?: Record<string, string>;
  blurred_image_url?: string | null;
  /** شكل قديم — يُدعم للتوافق */
  analysis?: {
    criteria_scores?: ImageCriteriaScores;
    description?: string | null;
    recommended_action?: string;
    actions?: string[];
    errors?: Record<string, string>;
  };
};

export type ApiContentStatus = "draft" | "submitted" | "reviewed" | "published";

export type ApiContent = {
  id: number;
  user_id: number;
  category_id: number;
  title: string;
  body: string;
  status: ApiContentStatus;
  updated_by?: number | null;
  created_at?: string;
  updated_at?: string;
};

export type CreateContentPayload = {
  title: string;
  body: string;
  user_id: number;
  category_id: number;
  status?: ApiContentStatus;
};

export type UpdateContentPayload = Partial<
  Pick<CreateContentPayload, "title" | "body" | "category_id" | "status">
>;

export type ApiPublishedContent = {
  id: number;
  content_id: number;
  journalist_id: number;
  editor_id: number;
  published_at?: string | null;
  updated_by?: number | null;
  content?: ApiContent;
};

export type CreatePublishedPayload = {
  content_id: number;
  journalist_id: number;
  editor_id: number;
  published_at?: string;
};

export type ApiReview = {
  id: number;
  content_id: number;
  editor_id: number;
  decision: "accepted" | "rejected";
  comments?: string | null;
};

export type CreateReviewPayload = {
  content_id: number;
  editor_id: number;
  decision: "accepted" | "rejected";
  comments?: string;
};

export type ApiCategory = {
  id: number;
  name: string;
  slug?: string;
};

export type GenerateBroadcastAudioPayload = {
  voice_id?: string;
  model_id?: string;
};

export type BroadcastAudioApiResponse = {
  audio_url?: string;
  url?: string;
  audio?: string;
  audio_base64?: string;
  mime_type?: string;
  cached?: boolean;
  message?: string;
};
