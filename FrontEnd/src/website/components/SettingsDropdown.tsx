import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ADMIN_ROUTES, WEBSITE_ROUTES } from "@core/constants/routes";
import {
  ACCOUNT_MODE_DEFINITIONS,
  CONTRIBUTOR_MODES,
  STAFF_MODES,
} from "@core/constants/accountModes";
import { useAuth } from "@core/context/AuthContext";
import RoleToggleSwitch from "@website/components/RoleToggleSwitch";

type SettingsItem = {
  id: string;
  label: string;
  icon: string;
  href?: string;
};

const SETTINGS_ITEMS: SettingsItem[] = [
  {
    id: "account",
    label: "إعدادات الحساب",
    icon: "manage_accounts",
    href: WEBSITE_ROUTES.MY_SPACE,
  },
  {
    id: "notifications",
    label: "تفضيلات الإشعارات",
    icon: "notifications_active",
    href: WEBSITE_ROUTES.MY_SPACE,
  },
  {
    id: "privacy",
    label: "الخصوصية والأمان",
    icon: "shield",
    href: "#",
  },
  {
    id: "help",
    label: "المساعدة",
    icon: "help",
    href: "#",
  },
];

type SettingsDropdownProps = {
  className?: string;
};

export default function SettingsDropdown({ className = "" }: SettingsDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    isLoggedIn,
    activeMode,
    activeModeLabel,
    toggleAccountMode,
    logout,
  } = useAuth();

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        aria-expanded={open}
        aria-label="الإعدادات"
        className="p-2 flex items-center justify-center text-on-surface-variant hover:text-gold-metallic-start transition-colors"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="material-symbols-outlined text-[24px] leading-none">settings</span>
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-2 w-72 bg-surface-container-lowest rounded-xl shadow-xl border border-outline-variant/30 overflow-hidden z-50">
          <div className="px-4 py-3 border-b border-outline-variant/20 bg-surface-container-low">
            <h3 className="font-label-bold text-primary text-sm">الإعدادات</h3>
            <p className="text-xs text-on-surface-variant mt-0.5">
              {activeModeLabel
                ? `الوضع النشط: ${activeModeLabel}`
                : "نموذج أولي — اختر وضعاً واحداً فقط"}
            </p>
          </div>

          <div className="border-b border-outline-variant/20 bg-surface-container-low/50">
            <p className="px-4 pt-3 pb-1 text-xs font-label-bold text-outline">
              أدوار المساهمة
            </p>
            {CONTRIBUTOR_MODES.map((mode) => {
              const def = ACCOUNT_MODE_DEFINITIONS[mode];
              return (
                <RoleToggleSwitch
                  key={mode}
                  label={def.toggleLabel}
                  icon={def.icon}
                  active={activeMode === mode}
                  onToggle={() => toggleAccountMode(mode)}
                  accent={def.accent}
                />
              );
            })}
          </div>

          <div className="border-b border-outline-variant/20 bg-surface-container-low/50">
            <p className="px-4 pt-3 pb-1 text-xs font-label-bold text-outline">
              صلاحيات المحتوى
            </p>
            {STAFF_MODES.map((mode) => {
              const def = ACCOUNT_MODE_DEFINITIONS[mode];
              return (
                <RoleToggleSwitch
                  key={mode}
                  label={def.toggleLabel}
                  icon={def.icon}
                  active={activeMode === mode}
                  onToggle={() => toggleAccountMode(mode)}
                  accent={def.accent}
                />
              );
            })}
            {(activeMode === "editor" || activeMode === "admin") && (
              <div className="px-4 pb-3 space-y-2">
                <Link
                  to={
                    activeMode === "admin"
                      ? ADMIN_ROUTES.DASHBOARD
                      : WEBSITE_ROUTES.EDITOR_DASHBOARD
                  }
                  className="flex items-center gap-2 text-sm text-primary font-label-bold hover:underline"
                  onClick={() => setOpen(false)}
                >
                  <span className="material-symbols-outlined text-base">dashboard</span>
                  لوحة التحكم
                </Link>
                <Link
                  to={WEBSITE_ROUTES.EDITOR_EXPERT_REVIEW}
                  className="flex items-center gap-2 text-xs text-secondary font-label-bold hover:underline"
                  onClick={() => setOpen(false)}
                >
                  مراجعة الخبراء ←
                </Link>
              </div>
            )}
          </div>

          <ul>
            {SETTINGS_ITEMS.map((item) => (
              <li key={item.id}>
                <Link
                  className="flex items-center gap-3 px-4 py-3 text-sm text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-colors border-b border-outline-variant/10 last:border-0"
                  to={item.href ?? "#"}
                  onClick={() => setOpen(false)}
                >
                  <span className="material-symbols-outlined text-xl">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {isLoggedIn && (
            <button
              type="button"
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-error hover:bg-error/5 border-t border-outline-variant/20"
              onClick={() => {
                logout();
                setOpen(false);
              }}
            >
              <span className="material-symbols-outlined text-xl">logout</span>
              تسجيل الخروج
            </button>
          )}
        </div>
      )}
    </div>
  );
}
