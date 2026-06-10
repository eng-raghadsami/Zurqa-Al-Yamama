import {
  DEFAULT_PREVIEW_IMAGE as DEFAULT_PREVIEW_IMAGE_DUMMY,
  REVIEW_PREVIEW_IMAGE as REVIEW_PREVIEW_IMAGE_DUMMY,
} from "@dummy/mediaVerification";

export type MediaVerificationType = "image" | "video";

export type MediaVerificationFormData = {
  file: File | null;
  filePreviewUrl: string | null;
  sourceType: string;
  publishDate: string;
  sourceUrl: string;
  publisherName: string;
  sourceNotes: string;
  categories: string[];
  deceptionType: string;
  contextDetails: string;
  relatedLinks: string;
  urgent: boolean;
};

export const INITIAL_VERIFICATION_FORM: MediaVerificationFormData = {
  file: null,
  filePreviewUrl: null,
  sourceType: "",
  publishDate: "",
  sourceUrl: "",
  publisherName: "",
  sourceNotes: "",
  categories: ["اجتماعي"],
  deceptionType: "fact_manipulation",
  contextDetails: "",
  relatedLinks: "",
  urgent: false,
};

export const VERIFICATION_STEPS = [
  { id: 1, label: "رفع الملف" },
  { id: 2, label: "معلومات المصدر" },
  { id: 3, label: "السياق الإضافي" },
  { id: 4, label: "المراجعة والإرسال" },
] as const;

export const SOURCE_TYPES = [
  "وسائل التواصل الاجتماعي",
  "موقع إخباري",
  "رسالة خاصة (واتساب/تلجرام)",
  "أخرى",
] as const;

export const CONTENT_CATEGORIES = [
  "سياسي",
  "اقتصادي",
  "اجتماعي",
  "تقني",
  "صحي",
] as const;

export const DECEPTION_TYPES = [
  { value: "deepfake", label: "تزييف عميق (Deepfake)" },
  { value: "fact_manipulation", label: "تلاعب بالحقائق" },
  { value: "image_fabrication", label: "فبركة صور" },
  { value: "impersonation", label: "انتحال شخصية" },
] as const;

export const DEFAULT_PREVIEW_IMAGE = DEFAULT_PREVIEW_IMAGE_DUMMY;
export const REVIEW_PREVIEW_IMAGE = REVIEW_PREVIEW_IMAGE_DUMMY;
