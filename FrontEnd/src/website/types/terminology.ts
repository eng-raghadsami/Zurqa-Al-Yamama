export type GlossaryTerm = {
  id: string;
  title: string;
  english: string;
  category: string;
  icon: string;
  description: string;
  verificationContext: string;
  indexLetter: string;
};

/** جميع أشكال حرف الألف */
export const ALIF_FORMS = ["ا", "أ", "إ", "آ"] as const;
export const ALIF_FILTER = "ا";

export const ARABIC_ALPHABET =
  "ابتثجحخدذرزسشصضطظعغفقكلمنهوي".split("");

export { FEATURED_TERM, GLOSSARY_TERMS } from "@dummy/terminology";

export function normalizeIndexLetter(letter: string): string {
  return ALIF_FORMS.includes(letter as (typeof ALIF_FORMS)[number])
    ? ALIF_FILTER
    : letter;
}

export function getTermFirstLetter(title: string): string {
  const withoutArticle = title.replace(
    /^ال(?=[\u0627\u0623\u0625\u0622-\u064A])/,
    "",
  );
  return withoutArticle.charAt(0) || title.charAt(0) || ALIF_FILTER;
}

function termStartsWithLetter(title: string, letter: string): boolean {
  if (letter === ALIF_FILTER) {
    return ALIF_FORMS.some(
      (form) => title.startsWith(form) || title.startsWith(`ال${form}`),
    );
  }
  return title.startsWith(letter) || title.startsWith(`ال${letter}`);
}

export function filterGlossaryTerms(
  terms: GlossaryTerm[],
  query: string,
  letter: string | null,
): GlossaryTerm[] {
  const normalizedQuery = query.trim().toLowerCase();
  const filterLetter = letter ? normalizeIndexLetter(letter) : null;

  return terms.filter((term) => {
    const matchesLetter =
      !filterLetter ||
      filterLetter === "الكل" ||
      normalizeIndexLetter(term.indexLetter) === filterLetter ||
      normalizeIndexLetter(getTermFirstLetter(term.title)) === filterLetter ||
      (letter !== null && termStartsWithLetter(term.title, filterLetter));
    if (!matchesLetter) return false;
    if (!normalizedQuery) return true;
    return (
      term.title.toLowerCase().includes(normalizedQuery) ||
      term.english.toLowerCase().includes(normalizedQuery) ||
      term.description.toLowerCase().includes(normalizedQuery) ||
      term.category.toLowerCase().includes(normalizedQuery)
    );
  });
}
