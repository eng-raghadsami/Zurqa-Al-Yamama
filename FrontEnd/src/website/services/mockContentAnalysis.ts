import {
  IMAGE_ANALYSIS_CRITERIA,
  scoreToLevel,
  TEXT_ANALYSIS_CRITERIA,
} from "@website/constants/contentAnalysisCriteria";
import type {
  ImageAnalysisResult,
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

function hashSeed(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i += 1) {
    h = (h << 5) - h + input.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function seededScore(seed: number, base: number, cap = 95): number {
  return Math.min(cap, Math.max(0, base + (seed % 28)));
}

export function analyzeTextMock(title: string, body: string): TextAnalysisResult {
  const combined = `${title} ${body}`.toLowerCase();
  const seed = hashSeed(combined);

  const criteria = TEXT_ANALYSIS_CRITERIA.map((def) => {
    const signals = TEXT_SIGNALS[def.id];
    const hits = signals.filter((w) => combined.includes(w)).length;
    const base = hits * 22 + (seed % 12);
    const score = Math.min(100, hits > 0 ? base + 15 : seededScore(seed + def.id.length, 8, 35));
    return {
      id: def.id,
      label: def.label,
      score,
      level: scoreToLevel(score),
      note: hits > 0 ? `رُصدت ${hits} مؤشرات محتملة` : "لا مؤشرات واضحة",
    };
  });

  const flaggedPhrases = Object.values(TEXT_SIGNALS)
    .flat()
    .filter((w) => combined.includes(w))
    .slice(0, 4);

  const overallScore = Math.round(
    100 -
      criteria.reduce((sum, c) => sum + c.score, 0) / Math.max(criteria.length, 1) * 0.85,
  );

  const suggestions: string[] = [];
  const high = criteria.filter((c) => c.score >= 50);
  if (high.length === 0) {
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
  suggestions.push("أضف مصدراً أو اقتباساً عند الادعاءات الحساسة لتعزيز المصداقية.");

  return {
    analyzedAt: new Date().toISOString(),
    overallScore: Math.max(0, Math.min(100, overallScore)),
    criteria,
    suggestions: suggestions.slice(0, 5),
    flaggedPhrases,
    source: "mock",
  };
}

export function analyzeImageMock(fileName: string): ImageAnalysisResult {
  const seed = hashSeed(fileName || "cover");

  const criteria = IMAGE_ANALYSIS_CRITERIA.map((def, i) => {
    const score = seededScore(seed + i * 7, def.id === "other" ? 5 : 12, 88);
    return {
      id: def.id,
      label: def.label,
      score,
      level: scoreToLevel(score),
    };
  });

  const overallRisk = Math.round(
    criteria.reduce((max, c) => Math.max(max, c.score), 0),
  );

  const recommendedBlur =
    overallRisk >= 70 ? 24 : overallRisk >= 45 ? 14 : overallRisk >= 25 ? 6 : 0;

  const descriptions = [
    "صورة بيئية أو ميدانية بإضاءة طبيعية، دون مؤشرات تحريضية واضحة.",
    "مشهد حضري أو إعلامي مع عناصر بصرية محايدة.",
    "لقطة توثيقية قد تحتاج مراجعة سياقية قبل النشر.",
  ];

  return {
    analyzedAt: new Date().toISOString(),
    overallRisk,
    description: descriptions[seed % descriptions.length],
    criteria,
    recommendedBlur,
    source: "mock",
  };
}
