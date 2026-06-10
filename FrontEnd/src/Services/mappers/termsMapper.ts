import type { GlossaryTerm } from "@website/types/terminology";
import {
  getTermFirstLetter,
  normalizeIndexLetter,
} from "@website/types/terminology";
import type { MediaTerm } from "@services/api/types";

const CATEGORY_ICONS: Record<string, string> = {
  "مصطلحات الأخبار": "newspaper",
  "تحقق إعلامي": "verified",
  "أمن سيبراني": "security",
  "تقنية": "memory",
  "علم النفس": "psychology",
  "تحليل البيانات": "insights",
};

function resolveIndexLetter(word: string): string {
  return normalizeIndexLetter(getTermFirstLetter(word));
}

export function mapMediaTermToGlossary(term: MediaTerm): GlossaryTerm {
  return {
    id: String(term.id),
    title: term.word,
    english: "",
    category: term.category,
    icon: CATEGORY_ICONS[term.category] ?? "article",
    description: term.meaning,
    verificationContext: term.category,
    indexLetter: resolveIndexLetter(term.word),
  };
}

export function mapMediaTermsToGlossary(terms: MediaTerm[]): GlossaryTerm[] {
  return terms
    .filter((term) => term.is_active)
    .map(mapMediaTermToGlossary);
}
