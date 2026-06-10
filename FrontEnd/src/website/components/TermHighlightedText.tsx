import { useMemo } from "react";
import type { HighlightTerm } from "@website/helpers/termHighlightUtils";
import { segmentTextWithTerms } from "@website/helpers/termHighlightUtils";

type TermHighlightedTextProps = {
  text: string;
  terms: HighlightTerm[];
  className?: string;
};

export default function TermHighlightedText({
  text,
  terms,
  className = "",
}: TermHighlightedTextProps) {
  const segments = useMemo(
    () => segmentTextWithTerms(text, terms),
    [text, terms],
  );

  return (
    <span className={className}>
      {segments.map((segment, index) => {
        if (segment.type === "text") {
          return <span key={index}>{segment.content}</span>;
        }

        return (
          <span
            key={index}
            className="term-highlight group/term relative inline cursor-help"
            tabIndex={0}
          >
            {segment.content}
            <span
              className="term-highlight-tooltip pointer-events-none absolute bottom-[calc(100%+10px)] right-0 z-50 w-64 rounded-xl border border-gold-metallic-start/30 bg-primary px-4 py-3 text-right text-sm text-white opacity-0 shadow-xl transition-all duration-200 group-hover/term:translate-y-0 group-hover/term:opacity-100 group-focus-within/term:translate-y-0 group-focus-within/term:opacity-100 translate-y-1"
              role="tooltip"
            >
              {segment.category && (
                <span className="mb-1 block text-[10px] font-label-bold text-gold-metallic-start">
                  {segment.category}
                </span>
              )}
              <span className="mb-1 block font-label-bold text-gold-metallic-end">
                {segment.content}
              </span>
              <span className="block text-xs leading-relaxed text-white/85">
                {segment.meaning}
              </span>
            </span>
          </span>
        );
      })}
    </span>
  );
}
