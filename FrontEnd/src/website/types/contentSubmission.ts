import type {
  ImageAnalysisResult,
  TextAnalysisResult,
} from "@website/types/contentAnalysis";
import type { ContentSetupType } from "@website/types/contentSetup";

export type ContentSubmission = {
  id: string;
  slug: string;
  contentType: ContentSetupType;
  title: string;
  body: string;
  coverPreviewUrl: string | null;
  coverBlurLevel: number;
  coverRemoved: boolean;
  textAnalysis: TextAnalysisResult | null;
  imageAnalysis: ImageAnalysisResult | null;
  integrityScore: number;
  submittedAt: string;
  contributorRole: string;
  contributorName: string;
  apiContentId?: number | null;
  publishedRecordId?: number | null;
  publishedAt?: string | null;
  status: "pending_review" | "approved" | "rejected" | "returned";
};
