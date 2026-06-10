import type { AccountModeAccent } from "@core/constants/accountModes";

type RoleToggleSwitchProps = {
  label: string;
  icon: string;
  active: boolean;
  onToggle: () => void;
  accent?: AccountModeAccent;
};

const ACCENT_ACTIVE_CLASS: Record<AccountModeAccent, string> = {
  journalist: "bg-primary",
  practitioner: "bg-secondary",
  editor: "bg-secondary",
  admin: "bg-gold-metallic-start",
};

export default function RoleToggleSwitch({
  label,
  icon,
  active,
  onToggle,
  accent = "editor",
}: RoleToggleSwitchProps) {
  const activeClass = ACCENT_ACTIVE_CLASS[accent];

  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-outline-variant/10">
      <div className="flex items-center gap-3 min-w-0">
        <span
          className={`material-symbols-outlined text-xl shrink-0 ${
            active ? "text-gold-metallic-start" : "text-outline"
          }`}
        >
          {icon}
        </span>
        <span
          className={`text-sm truncate ${
            active ? "font-label-bold text-primary" : "text-on-surface-variant"
          }`}
        >
          {label}
        </span>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={active}
        aria-label={label}
        onClick={onToggle}
        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
          active ? activeClass : "bg-outline-variant/40"
        }`}
      >
        <span
          className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
            active ? "left-0.5" : "right-0.5"
          }`}
        />
      </button>
    </div>
  );
}
