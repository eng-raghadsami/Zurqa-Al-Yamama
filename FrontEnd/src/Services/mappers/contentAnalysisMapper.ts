import type {
  ImageAnalysisResult as ApiImageAnalysisResult,
  ImageCriteriaScores,
  TextAnalysisResult as ApiTextAnalysisResult,
} from "@services/api/types";
import {
  IMAGE_ANALYSIS_CRITERIA,
  scoreToLevel,
  TEXT_ANALYSIS_CRITERIA,
} from "@website/constants/contentAnalysisCriteria";
import type {
  ImageAnalysisResult,
  ImageCriterionId,
  TextAnalysisResult,
  TextCriterionId,
} from "@website/types/contentAnalysis";

const TEXT_SIGNALS: Record<TextCriterionId, string[]> = {
  hate_speech: ["كراهية", "نبذ", "طرد", "حقير", "أقل قيمة"],
  racism: ["عنصري", "عرق", "تعميم", "شعب كامل", "أقلية"],
  gender_fairness: ["النساء دائماً", "الرجال لا", "ضعيفات", "لا يصلحن"],
  group_bias: ["دائماً يفعلون", "كلهم", "مؤامرة", "خبيثة"],
  profanity: ["لعنة", "قذر", "سافل", "بذيء"],
  violence_incitement: ["اقتل", "اضرب", "انتقام", "عنف", "دم"],
};

const TEXT_TOXIC_WEIGHTS: Record<TextCriterionId, number> = {
  hate_speech: 0.9,
  racism: 0.75,
  gender_fairness: 0.45,
  group_bias: 0.6,
  profanity: 0.85,
  violence_incitement: 0.8,
};

const IMAGE_SCORE_KEYS: Record<ImageCriterionId, keyof ImageCriteriaScores | null> = {
  racism: "racism_percentage",
  violence_hate: "violence_or_hate_percentage",
  sensitive_nsfw: "sensitive_content_percentage",
  gore: "blood_gore_percentage",
  manipulated: "forged_percentage",
  ai_generated: "ai_generated_percentage",
  other: null,
};

function countKeywordHits(text: string, keywords: string[]): number {
  const lower = text.toLowerCase();
  return keywords.filter((word) => lower.includes(word)).length;
}

function extractToxicPercentage(api: ApiTextAnalysisResult): number {
  const attrs = api.perspective?.attributeScores;
  if (!attrs) return 0;

  const toxic =
    attrs.toxic?.summary_score?.percentage ??
    attrs.TOXICITY?.summary_score?.percentage ??
    attrs.SEVERE_TOXICITY?.summary_score?.percentage;

  if (typeof toxic === "number") return Math.min(100, Math.max(0, toxic));

  const values = Object.entries(attrs)
    .filter(([key]) => key !== "neutral")
    .map(([, score]) => score.summary_score?.percentage ?? 0);

  return values.length > 0 ? Math.max(...values) : 0;
}

function buildTextSuggestions(
  criteria: TextAnalysisResult["criteria"],
  flaggedPhrases: string[],
  geminiSummary?: string | null,
): string[] {
  const suggestions: string[] = [];

  if (geminiSummary?.trim()) {
    suggestions.push(geminiSummary.trim());
  }

  const high = criteria.filter((c) => c.score >= 50);
  if (high.length === 0 && suggestions.length === 0) {
    suggestions.push("النص يبدو متوازناً. راجع المصادر قبل التقديم النهائي.");
  }
  if (criteria.find((c) => c.id === "hate_speech" && c.score >= 40)) {
    suggestions.push("استبدل العبارات الموجهة للهوية بناقش للأفكار أو السلوكيات.");
  }
  if (criteria.find((c) => c.id === "group_bias" && c.score >= 40)) {
    suggestions.push("تجنب التعميمات؛ حدّد الأفراد أو الأحداث بدقة مع ذكر السياق.");
  }
  if (criteria.find((c) => c.id === "gender_fairness" && c.score >= 35)) {
    suggestions.push("استخدم لغة محايدة جندرياً وامتنع عن التنميط بين النساء والرجال.");
  }
  if (criteria.find((c) => c.id === "violence_incitement" && c.score >= 40)) {
    suggestions.push("أعد صياغة أي دعوة للعنف لتصبح تغطية أو تحليلاً لا تحريضاً.");
  }
  if (flaggedPhrases.length > 0) {
    suggestions.push(`راجع العبارات المُشار إليها: «${flaggedPhrases.join("»، «")}».`);
  }
  if (suggestions.length < 3) {
    suggestions.push("أضف مصدراً أو اقتباساً عند الادعاءات الحساسة لتعزيز المصداقية.");
  }

  return suggestions.slice(0, 5);
}

export function mapApiTextAnalysis(
  api: ApiTextAnalysisResult,
  title: string,
  body: string,
): TextAnalysisResult {
  const combined = `${title}\n${body}`.trim();
  const toxicBase = extractToxicPercentage(api);

  const criteria = TEXT_ANALYSIS_CRITERIA.map((def) => {
    const hits = countKeywordHits(combined, TEXT_SIGNALS[def.id]);
    const keywordBoost = hits > 0 ? Math.min(55, hits * 18 + 12) : 0;
    const score = Math.min(
      100,
      Math.round(toxicBase * TEXT_TOXIC_WEIGHTS[def.id] + keywordBoost),
    );

    return {
      id: def.id,
      label: def.label,
      score,
      level: scoreToLevel(score),
      note:
        hits > 0
          ? `رُصدت ${hits} مؤشرات محتملة`
          : toxicBase > 0
            ? "مستوى سام عام من التحليل الآلي"
            : "لا مؤشرات واضحة",
    };
  });

  const flaggedPhrases = Object.values(TEXT_SIGNALS)
    .flat()
    .filter((word) => combined.toLowerCase().includes(word))
    .slice(0, 4);

  const overallScore = Math.round(
    100 -
      criteria.reduce((sum, c) => sum + c.score, 0) / Math.max(criteria.length, 1) * 0.85,
  );

  return {
    analyzedAt: new Date().toISOString(),
    overallScore: Math.max(0, Math.min(100, overallScore)),
    criteria,
    suggestions: buildTextSuggestions(criteria, flaggedPhrases, api.gemini_summary),
    flaggedPhrases,
    source: "api",
  };
}

function blurFromRisk(overallRisk: number): number {
  if (overallRisk >= 70) return 24;
  if (overallRisk >= 45) return 14;
  if (overallRisk >= 25) return 6;
  return 0;
}

function boolToPercent(value: boolean | undefined, explicit?: number): number | undefined {
  if (typeof explicit === "number") return explicit;
  if (value === true) return 100;
  if (value === false) return 0;
  return undefined;
}

/** يوحّد الشكل الجديد (جذر) والقديم (analysis) حسب Swagger */
export function normalizeApiImagePayload(api: ApiImageAnalysisResult): {
  criteria_scores: ImageCriteriaScores;
  description?: string | null;
  actions?: string[];
  errors?: Record<string, string>;
  blurred_image_url?: string | null;
} {
  const nested = api.analysis;
  const rawScores = api.criteria_scores ?? nested?.criteria_scores ?? {};

  const criteria_scores: ImageCriteriaScores = {
    racism_percentage:
      rawScores.racism_percentage ??
      (typeof api.racism === "number" ? api.racism : undefined),
    violence_or_hate_percentage:
      rawScores.violence_or_hate_percentage ??
      (typeof api.violence === "number" ? api.violence : undefined),
    sensitive_content_percentage:
      rawScores.sensitive_content_percentage ??
      (typeof api.sensitive_content === "number" ? api.sensitive_content : undefined),
    blood_gore_percentage:
      rawScores.blood_gore_percentage ??
      (typeof api.blood === "number" ? api.blood : undefined),
    forged_percentage:
      rawScores.forged_percentage ??
      boolToPercent(api.forged, api.forged_percentage),
    ai_generated_percentage:
      rawScores.ai_generated_percentage ??
      boolToPercent(api.ai_generated, api.ai_generated_percentage),
  };

  return {
    criteria_scores,
    description: api.description ?? nested?.description,
    actions: api.actions ?? nested?.actions,
    errors: api.errors ?? nested?.errors,
    blurred_image_url: api.blurred_image_url,
  };
}

export function mapApiImageAnalysis(api: ApiImageAnalysisResult): ImageAnalysisResult {
  const normalized = normalizeApiImagePayload(api);
  const scores = normalized.criteria_scores;

  const mappedScores = IMAGE_ANALYSIS_CRITERIA.map((def) => {
    const key = IMAGE_SCORE_KEYS[def.id];
    let score = 0;

    if (key && scores[key] != null) {
      score = Math.min(100, Math.max(0, Math.round(Number(scores[key]))));
    } else if (def.id === "other") {
      const known = IMAGE_ANALYSIS_CRITERIA.filter((c) => c.id !== "other")
        .map((c) => {
          const scoreKey = IMAGE_SCORE_KEYS[c.id];
          return scoreKey && scores[scoreKey] != null
            ? Number(scores[scoreKey])
            : 0;
        });
      score = known.length > 0 ? Math.round(known.reduce((a, b) => a + b, 0) / known.length * 0.15) : 0;
    }

    return {
      id: def.id,
      label: def.label,
      score,
      level: scoreToLevel(score),
    };
  });

  const overallRisk = Math.round(
    mappedScores.reduce((max, c) => Math.max(max, c.score), 0),
  );

  const geminiError = normalized.errors?.gemini;
  const description =
    normalized.description?.trim() ||
    (geminiError && !normalized.description
      ? "تم تحليل معايير الأمان الأساسية. الوصف التفصيلي غير متاح مؤقتاً (حصة Gemini)."
      : overallRisk >= 45
        ? "الصورة تحتاج مراجعة تحريرية قبل النشر."
        : "صورة بإضاءة طبيعية، دون مؤشرات تحريضية واضحة في التحليل الآلي.");

  const recommendedBlur = blurFromRisk(overallRisk);

  return {
    analyzedAt: new Date().toISOString(),
    overallRisk,
    description,
    criteria: mappedScores,
    recommendedBlur,
    source: "api",
  };
}
