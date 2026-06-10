export type HighlightTerm = {
  word: string;
  meaning: string;
  category?: string;
};

export type TextSegment =
  | { type: "text"; content: string }
  | {
      type: "term";
      content: string;
      meaning: string;
      category?: string;
    };

type TermMatch = HighlightTerm & { start: number; end: number };

const ARABIC_LETTER = /[\u0621-\u064A\u0640\u0660-\u0669]/;

function stripDefiniteArticle(word: string): string {
  return word.replace(/^ال(?=[\u0627-\u064A])/, "");
}

function wordWithArticleVariants(word: string): string[] {
  const base = stripDefiniteArticle(word.trim());
  if (!base) return [];
  return [...new Set([base, `ال${base}`])];
}

/** كل تركيبات «مع/بدون ال» لعبارة من عدة كلمات */
export function phraseArticleVariants(phrase: string): string[] {
  const words = phrase.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];

  const perWord = words.map(wordWithArticleVariants);
  const variants: string[] = [];

  const build = (index: number, parts: string[]) => {
    if (index === perWord.length) {
      variants.push(parts.join(" "));
      return;
    }
    for (const candidate of perWord[index]) {
      build(index + 1, [...parts, candidate]);
    }
  };

  build(0, []);
  return [...new Set(variants)];
}

function isWordBoundaryBefore(text: string, index: number): boolean {
  if (index <= 0) return true;
  return !ARABIC_LETTER.test(text[index - 1]!);
}

function isWordBoundaryAfter(text: string, index: number): boolean {
  if (index >= text.length) return true;
  return !ARABIC_LETTER.test(text[index]!);
}

function isWholeWordMatch(text: string, start: number, end: number): boolean {
  return isWordBoundaryBefore(text, start) && isWordBoundaryAfter(text, end);
}

function findWholePhraseOccurrences(
  text: string,
  phrase: string,
): Array<{ start: number; end: number }> {
  const hits: Array<{ start: number; end: number }> = [];
  if (!phrase) return hits;

  let searchFrom = 0;
  while (searchFrom < text.length) {
    const index = text.indexOf(phrase, searchFrom);
    if (index === -1) break;

    const end = index + phrase.length;
    if (isWholeWordMatch(text, index, end)) {
      hits.push({ start: index, end });
    }

    searchFrom = index + 1;
  }

  return hits;
}

export function findTermMatches(text: string, terms: HighlightTerm[]): TermMatch[] {
  const all: TermMatch[] = [];

  for (const term of terms) {
    const trimmed = term.word.trim();
    if (stripDefiniteArticle(trimmed).length < 2) continue;

    const variants = phraseArticleVariants(trimmed);

    for (const variant of variants) {
      for (const { start, end } of findWholePhraseOccurrences(text, variant)) {
        all.push({
          ...term,
          start,
          end,
        });
      }
    }
  }

  all.sort(
    (a, b) =>
      b.end - b.start - (a.end - a.start) || a.start - b.start,
  );

  const selected: TermMatch[] = [];
  for (const match of all) {
    const overlaps = selected.some(
      (existing) =>
        !(match.end <= existing.start || match.start >= existing.end),
    );
    if (!overlaps) selected.push(match);
  }

  return selected.sort((a, b) => a.start - b.start);
}

export function segmentTextWithTerms(
  text: string,
  terms: HighlightTerm[],
): TextSegment[] {
  if (!text || terms.length === 0) {
    return [{ type: "text", content: text }];
  }

  const matches = findTermMatches(text, terms);
  if (matches.length === 0) {
    return [{ type: "text", content: text }];
  }

  const segments: TextSegment[] = [];
  let cursor = 0;

  for (const match of matches) {
    if (match.start > cursor) {
      segments.push({ type: "text", content: text.slice(cursor, match.start) });
    }

    segments.push({
      type: "term",
      content: text.slice(match.start, match.end),
      meaning: match.meaning,
      category: match.category,
    });

    cursor = match.end;
  }

  if (cursor < text.length) {
    segments.push({ type: "text", content: text.slice(cursor) });
  }

  return segments;
}
