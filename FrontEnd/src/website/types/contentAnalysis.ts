export type TextCriterionId =
  | "hate_speech"
  | "racism"
  | "gender_fairness"
  | "group_bias"
  | "profanity"
  | "violence_incitement";

export type ImageCriterionId =
  | "racism"
  | "violence_hate"
  | "sensitive_nsfw"
  | "gore"
  | "manipulated"
  | "ai_generated"
  | "other";

export type CriterionScore = {
  id: string;
  label: string;
  score: number;
  level: "low" | "medium" | "high" | "critical";
  note?: string;
};

export type AnalysisSource = "api" | "mock";

export type TextAnalysisResult = {
  analyzedAt: string;
  overallScore: number;
  criteria: CriterionScore[];
  suggestions: string[];
  flaggedPhrases: string[];
  source?: AnalysisSource;
};

export type ImageAnalysisResult = {
  analyzedAt: string;
  overallRisk: number;
  description: string;
  criteria: CriterionScore[];
  recommendedBlur: number;
  source?: AnalysisSource;
};

export type ContentSubmissionStatus = "draft" | "pending_review" | "approved" | "rejected";
