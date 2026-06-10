import { WEBSITE_ROUTES } from "@core/constants/routes";
import type {
  ContentSetupStep,
  ContentSetupStepId,
  ContentTypeOption,
} from "@website/types/contentSetup";

export const CONTENT_SETUP_STEPS: ContentSetupStep[] = [
  { id: "type", label: "اختيار النوع", shortLabel: "النوع", icon: "category" },
  { id: "cover", label: "صورة الغلاف", shortLabel: "الغلاف", icon: "image" },
  { id: "write", label: "كتابة المحتوى", shortLabel: "الكتابة", icon: "edit_note" },
  { id: "analysis", label: "التحليل والمعاينة", shortLabel: "التحليل", icon: "psychology" },
  { id: "pending", label: "قيد المراجعة", shortLabel: "المراجعة", icon: "hourglass_top" },
];

export const CONTENT_TYPE_OPTIONS: ContentTypeOption[] = [
  {
    id: "report",
    label: "تقرير",
    description: "تقرير استقصائي أو تحليلي مع مصادر وحقائق قابلة للتحقق.",
    icon: "analytics",
    accent: "gold",
    available: true,
  },
  {
    id: "story",
    label: "قصة",
    description: "قصة إنسانية أو مجتمعية تُروى بأسلوب صحفي مسؤول.",
    icon: "auto_stories",
    accent: "teal",
    available: true,
  },
  {
    id: "verified_news",
    label: "خبر موثّق",
    description: "خبر قصير يخضع لمعايير التحقق والتوثيق على المنصة.",
    icon: "verified",
    accent: "primary",
    available: true,
    journalistOnly: true,
  },
  {
    id: "article",
    label: "مقال",
    description: "مقال رأي أو تحليل مطول — قريباً على المنصة.",
    icon: "article",
    accent: "gold",
    available: false,
    comingSoon: true,
  },
];

export const CONTENT_SETUP_STEP_ROUTES: Record<ContentSetupStepId, string> = {
  type: WEBSITE_ROUTES.CONTENT_SETUP_NEW,
  cover: WEBSITE_ROUTES.CONTENT_SETUP_COVER,
  write: WEBSITE_ROUTES.CONTENT_SETUP_WRITE,
  analysis: WEBSITE_ROUTES.CONTENT_SETUP_ANALYSIS,
  pending: WEBSITE_ROUTES.CONTENT_SETUP_PENDING,
};

export const CONTENT_TYPE_LABELS: Record<string, string> = {
  report: "تقرير",
  story: "قصة",
  verified_news: "خبر موثّق",
  article: "مقال",
};
