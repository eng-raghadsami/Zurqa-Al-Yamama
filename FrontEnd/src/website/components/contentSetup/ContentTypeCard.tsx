import type { ContentTypeOption } from "@website/types/contentSetup";

const ACCENT_STYLES = {
  gold: {
    border: "border-gold-metallic-start/40 hover:border-gold-metallic-start",
    icon: "text-gold-metallic-start",
    ring: "ring-gold-metallic-start/30",
    badge: "bg-gold-metallic-start/10 text-gold-metallic-start",
  },
  primary: {
    border: "border-primary/20 hover:border-primary/50",
    icon: "text-primary",
    ring: "ring-primary/20",
    badge: "bg-primary/10 text-primary",
  },
  teal: {
    border: "border-success-teal/30 hover:border-success-teal/60",
    icon: "text-success-teal",
    ring: "ring-success-teal/25",
    badge: "bg-success-teal/10 text-success-teal",
  },
} as const;

type ContentTypeCardProps = {
  option: ContentTypeOption;
  selected: boolean;
  disabled: boolean;
  disabledReason?: string;
  onSelect: () => void;
};

export default function ContentTypeCard({
  option,
  selected,
  disabled,
  disabledReason,
  onSelect,
}: ContentTypeCardProps) {
  const accent = ACCENT_STYLES[option.accent];

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onSelect}
      className={`relative w-full text-right rounded-2xl border p-6 transition-all ${
        disabled
          ? "opacity-55 cursor-not-allowed border-outline-variant/20 bg-surface-container-low/50"
          : selected
            ? `bg-white shadow-lg ring-2 ${accent.ring} ${accent.border}`
            : `glass-panel hover:shadow-md ${accent.border}`
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <span
          className={`material-symbols-outlined text-[32px] ${disabled ? "text-outline" : accent.icon}`}
          style={selected ? { fontVariationSettings: "'FILL' 1" } : undefined}
        >
          {option.icon}
        </span>
        <div className="flex flex-wrap gap-2 justify-end">
          {option.comingSoon && (
            <span className="text-[10px] font-label-bold px-2 py-0.5 rounded-full bg-surface-container-high text-outline">
              قريباً
            </span>
          )}
          {option.journalistOnly && (
            <span
              className={`text-[10px] font-label-bold px-2 py-0.5 rounded-full ${accent.badge}`}
              title="متاح للصحفي فقط"
            >
              للصحفي فقط
            </span>
          )}
          {selected && (
            <span className="text-[10px] font-label-bold px-2 py-0.5 rounded-full bg-gold-metallic-start text-on-primary">
              مختار
            </span>
          )}
        </div>
      </div>

      <h3 className="font-headline-sm text-lg text-primary mb-2">{option.label}</h3>
      <p className="text-sm text-on-surface-variant leading-relaxed">{option.description}</p>

      {disabled && disabledReason && (
        <p className="mt-4 pt-4 border-t border-outline-variant/10 text-xs text-warning-amber font-label-bold">
          {disabledReason}
        </p>
      )}
    </button>
  );
}
