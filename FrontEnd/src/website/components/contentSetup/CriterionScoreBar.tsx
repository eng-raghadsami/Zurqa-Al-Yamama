import type { CriterionScore } from "@website/types/contentAnalysis";

const LEVEL_BAR_STYLES: Record<CriterionScore["level"], string> = {
  low: "bg-success-teal",
  medium: "bg-secondary-fixed",
  high: "bg-tertiary",
  critical: "bg-error",
};

const LEVEL_BADGE_STYLES: Record<CriterionScore["level"], string> = {
  low: "bg-success-teal text-white",
  medium: "bg-secondary-fixed text-primary",
  high: "bg-tertiary text-white",
  critical: "bg-error text-white",
};

const LEVEL_LABELS: Record<CriterionScore["level"], string> = {
  low: "منخفض",
  medium: "متوسط",
  high: "مرتفع",
  critical: "حرج",
};

type CriterionScoreBarProps = {
  criterion: CriterionScore;
  invert?: boolean;
};

export default function CriterionScoreBar({ criterion, invert = false }: CriterionScoreBarProps) {
  const displayScore = invert ? 100 - criterion.score : criterion.score;
  const barClass = invert
    ? criterion.score <= 25
      ? "bg-success-teal"
      : criterion.score <= 50
        ? "bg-secondary-fixed"
        : criterion.score <= 75
          ? "bg-tertiary"
          : "bg-error"
    : LEVEL_BAR_STYLES[criterion.level];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-label-bold text-primary">{criterion.label}</span>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-label-bold text-on-surface-variant">
            {displayScore}%
          </span>
          <span
            className={`text-[10px] font-label-bold px-2 py-0.5 rounded-full ${LEVEL_BADGE_STYLES[criterion.level]}`}
          >
            {LEVEL_LABELS[criterion.level]}
          </span>
        </div>
      </div>
      <div className="w-full h-2 bg-mist-grey rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${barClass}`}
          style={{ width: `${criterion.score}%` }}
        />
      </div>
      {criterion.note && (
        <p className="text-xs text-on-surface-variant">{criterion.note}</p>
      )}
    </div>
  );
}
