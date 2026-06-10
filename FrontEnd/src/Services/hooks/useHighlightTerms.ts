import { useQuery } from "@tanstack/react-query";
import { GLOSSARY_TERMS } from "@dummy/terminology";
import { termsService } from "@services/termsService";
import type { HighlightTerm } from "@website/helpers/termHighlightUtils";

export const HIGHLIGHT_TERMS_QUERY_KEY = ["highlight-terms"] as const;

function mapGlossaryToHighlight(): HighlightTerm[] {
  return GLOSSARY_TERMS.map((term) => ({
    word: term.title,
    meaning: term.description,
    category: term.category,
  }));
}

export function useHighlightTerms() {
  return useQuery({
    queryKey: HIGHLIGHT_TERMS_QUERY_KEY,
    queryFn: async (): Promise<HighlightTerm[]> => {
      try {
        const terms = await termsService.getAll();
        const active = terms
          .filter((term) => term.is_active)
          .map((term) => ({
            word: term.word,
            meaning: term.meaning,
            category: term.category,
          }));

        return active.length > 0 ? active : mapGlossaryToHighlight();
      } catch {
        return mapGlossaryToHighlight();
      }
    },
    staleTime: 5 * 60 * 1000,
  });
}
