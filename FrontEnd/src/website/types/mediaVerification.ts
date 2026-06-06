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

export const DEFAULT_PREVIEW_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBiT6q18F9H2l79fWehuoew-RrRANHUFK-hoCI5TEwUR1PY-yxsm_HBxKIho53Uk1wEcaB3dUGKxVoSeoRb9FYMbctTNshgyIoPpd8DvaCe2_lRooayd1ND9qsKwZe4XGdephyU6Xpz6oW3jdK6X5iWXzZ7065ScCf3ZtZAALsFfm6NUcSuuPCu6l5GqVBbkWoq58gaJhwHXYm7tjN0TS9LmgSErl-TTPEUBkKD3hEAwkB7_-Ynde0gtX2EeCxInSHZjeGcX47irn8t";

export const REVIEW_PREVIEW_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCVz19AqJZkdrrenhDcSKj2Jmp8hWF7tYzGFrxSHjwGDbr94uLob9-hGf7aE7bn7NBr97AWWMkyKihud5j1EmF6VQk8Qj6Vr2eXB67lHENVvQBT823GE--bKdikykM35AY--LJApWlaSzqI41iAAudULBzsb5NC7LqgksT2gR0G1ULINHrM4H6k6JGi-2mUkp5CSaF6zhLUn9se_kzoUizTKfOC_DH5xg96ni_m1EPLZ-anGn1ZRDrHsR3WUW-En8vrMN9kPQY7d8EM";
