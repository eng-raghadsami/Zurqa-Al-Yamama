import TermHighlightedText from "@website/components/TermHighlightedText";
import type { HighlightTerm } from "@website/helpers/termHighlightUtils";

export type ArticleBodySection =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string; author: string };

type TermHighlightedArticleBodyProps = {
  sections: ArticleBodySection[];
  terms: HighlightTerm[];
};

export default function TermHighlightedArticleBody({
  sections,
  terms,
}: TermHighlightedArticleBodyProps) {
  return (
    <div className="space-y-6 font-body-lg text-body-lg leading-relaxed text-on-surface">
      {sections.map((section, index) => {
        if (section.type === "paragraph") {
          return (
            <p key={index}>
              <TermHighlightedText text={section.text} terms={terms} />
            </p>
          );
        }
        if (section.type === "heading") {
          return (
            <h2
              key={index}
              className="pt-4 font-headline-md text-headline-md text-primary"
            >
              <TermHighlightedText text={section.text} terms={terms} />
            </h2>
          );
        }
        return (
          <blockquote
            key={index}
            className="relative my-10 rounded-lg border-r-4 border-gold-metallic-start bg-surface-container-low p-8"
          >
            <span className="material-symbols-outlined absolute -right-2 -top-4 text-5xl text-gold-metallic-start opacity-30">
              format_quote
            </span>
            <p className="font-headline-sm text-headline-sm italic leading-snug">
              <TermHighlightedText text={section.text} terms={terms} />
            </p>
            <footer className="mt-4 text-left font-label-bold text-label-bold text-on-surface-variant">
              — {section.author}
            </footer>
          </blockquote>
        );
      })}
    </div>
  );
}
