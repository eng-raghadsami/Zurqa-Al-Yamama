import type { ArticleBodySection } from "@website/components/TermHighlightedArticleBody";

export function extractPlainTextFromSections(
  title: string,
  sections: ArticleBodySection[],
): string {
  const parts = [title.trim()];

  for (const section of sections) {
    if (section.type === "quote") {
      parts.push(`${section.text} — ${section.author}`);
      continue;
    }
    parts.push(section.text.trim());
  }

  return parts.filter(Boolean).join("\n\n");
}
