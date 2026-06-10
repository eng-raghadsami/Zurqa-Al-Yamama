import type {
  CriterionScore,
  ImageCriterionId,
  TextCriterionId,
} from "@website/types/contentAnalysis";

export type TextCriterionDef = {
  id: TextCriterionId;
  label: string;
  description: string;
  icon: string;
};

export type ImageCriterionDef = {
  id: ImageCriterionId;
  label: string;
  description: string;
  icon: string;
};

export const TEXT_ANALYSIS_CRITERIA: TextCriterionDef[] = [
  {
    id: "hate_speech",
    label: "التحريض على الكراهية",
    description: "عبارات تهاجم أو تحقر فرداً أو جماعة بناءً على الهوية أو الانتماء.",
    icon: "campaign",
  },
  {
    id: "racism",
    label: "العنصرية",
    description: "تمييز أو إساءة ضد أشخاص أو جماعات بناءً على الأصل أو العرق أو الجنسية.",
    icon: "diversity_3",
  },
  {
    id: "gender_fairness",
    label: "مراعاة الجندرية",
    description: "عدالة التمثيل واللغة تجاه النساء والرجال وجميع الفئات.",
    icon: "wc",
  },
  {
    id: "group_bias",
    label: "التحيز لفئة",
    description: "انحياز واضح ضد فئة أو جماعة أو تقديم رأي كحقيقة مطلقة.",
    icon: "balance",
  },
  {
    id: "profanity",
    label: "كلمات غير أخلاقية",
    description: "ألفاظ بذيئة أو مهينة أو غير لائقة للنشر المهني.",
    icon: "block",
  },
  {
    id: "violence_incitement",
    label: "التحريض على العنف",
    description: "دعوة أو تبرير أو تمجيد العنف أو الإيذاء.",
    icon: "gavel",
  },
];

export const IMAGE_ANALYSIS_CRITERIA: ImageCriterionDef[] = [
  {
    id: "racism",
    label: "عنصرية",
    description: "رموز أو مشاهد تمييزية ضد فئة أو جماعة.",
    icon: "diversity_3",
  },
  {
    id: "violence_hate",
    label: "عنف أو كراهية",
    description: "مشاهد تحريضية أو عنيفة أو تحمل رسائل كراهية.",
    icon: "warning",
  },
  {
    id: "sensitive_nsfw",
    label: "محتوى حساس +18",
    description: "محتوى غير لائق أو حساس للجمهور العام.",
    icon: "no_adult_content",
  },
  {
    id: "gore",
    label: "دامي",
    description: "وجود دماء أو إصابات صريحة.",
    icon: "bloodtype",
  },
  {
    id: "manipulated",
    label: "مفبركة",
    description: "أدلة على تعديل بالتصميم أو التلاعب الرقمي.",
    icon: "brush",
  },
  {
    id: "ai_generated",
    label: "مولّدة بالذكاء الاصطناعي",
    description: "مؤشرات على توليد أو تركيب بالذكاء الاصطناعي.",
    icon: "smart_toy",
  },
  {
    id: "other",
    label: "أخرى",
    description: "ملاحظات إضافية لا تندرج تحت المعايير السابقة.",
    icon: "more_horiz",
  },
];

export function scoreToLevel(score: number): CriterionScore["level"] {
  if (score >= 75) return "critical";
  if (score >= 50) return "high";
  if (score >= 25) return "medium";
  return "low";
}
