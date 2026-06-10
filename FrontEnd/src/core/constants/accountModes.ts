/**
 * أوضاع الحساب التجريبية — مود واحد نشط فقط في كل مرة.
 * الأسماء قابلة للتعديل لاحقاً دون تغيير المعرّفات التقنية.
 */

export type AccountMode =
  | "journalist"
  | "media_practitioner"
  | "editor"
  | "admin";

export type AccountModeGroup = "contributor" | "staff";

export type AccountModeAccent =
  | "journalist"
  | "practitioner"
  | "editor"
  | "admin";

export type AccountModeDefinition = {
  id: AccountMode;
  label: string;
  toggleLabel: string;
  description: string;
  icon: string;
  accent: AccountModeAccent;
  group: AccountModeGroup;
};

export const ACCOUNT_MODE_DEFINITIONS: Record<AccountMode, AccountModeDefinition> = {
  journalist: {
    id: "journalist",
    label: "صحفي",
    toggleLabel: "الدخول كصحفي",
    description: "نشر وتحرير المحتوى بصلاحيات الصحفي المعتمد على المنصة.",
    icon: "newspaper",
    accent: "journalist",
    group: "contributor",
  },
  media_practitioner: {
    id: "media_practitioner",
    label: "ممارس إعلامي",
    toggleLabel: "الدخول كممارس إعلامي",
    description:
      "للمساهمين تحت الإشراف التحريري — مناسب للهواة والمتدربين قبل الاعتماد الكامل.",
    icon: "cast_for_education",
    accent: "practitioner",
    group: "contributor",
  },
  editor: {
    id: "editor",
    label: "محرر",
    toggleLabel: "الدخول كمحرر",
    description: "مراجعة المحتوى وإدارته ضمن مساحة التحرير.",
    icon: "edit_note",
    accent: "editor",
    group: "staff",
  },
  admin: {
    id: "admin",
    label: "مدير",
    toggleLabel: "الدخول كمدير",
    description: "صلاحيات إدارية كاملة على المنصة.",
    icon: "admin_panel_settings",
    accent: "admin",
    group: "staff",
  },
};

export const CONTRIBUTOR_MODES: AccountMode[] = ["journalist", "media_practitioner"];
export const STAFF_MODES: AccountMode[] = ["editor", "admin"];

export function getAccountModeLabel(mode: AccountMode | null): string | null {
  if (!mode) return null;
  return ACCOUNT_MODE_DEFINITIONS[mode].label;
}
