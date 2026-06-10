import { useAuth } from "@core/context/AuthContext";

type ContentEditorToolbarProps = {
  contentLabel: string;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function ContentEditorToolbar({
  contentLabel,
  onEdit,
  onDelete,
}: ContentEditorToolbarProps) {
  const { canManageContent, activeModeLabel } = useAuth();

  if (!canManageContent) return null;

  const handleEdit = () => {
    if (onEdit) {
      onEdit();
      return;
    }
    window.alert(
      `[${activeModeLabel ?? "محرر"}] فتح محرر ${contentLabel} — نموذج أولي`,
    );
  };

  const handleDelete = () => {
    if (
      !window.confirm(
        `هل تريد حذف ${contentLabel}؟ (إجراء تجريبي في النموذج الأولي)`,
      )
    ) {
      return;
    }
    if (onDelete) {
      onDelete();
      return;
    }
    window.alert(`تم حذف ${contentLabel} محلياً — النموذج الأولي`);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border border-gold-metallic-start/30 bg-gold-metallic-start/5 px-4 py-3">
      <span className="material-symbols-outlined text-gold-metallic-start text-lg">
        admin_panel_settings
      </span>
      <span className="text-sm font-label-bold text-primary">
        وضع {activeModeLabel ?? "المحرر"} — تحكم بالمحتوى
      </span>
      <div className="mr-auto flex gap-2">
        <button
          type="button"
          onClick={handleEdit}
          className="inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-label-bold text-on-primary hover:opacity-90"
        >
          <span className="material-symbols-outlined text-base">edit</span>
          تعديل
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="inline-flex items-center gap-1 rounded-lg border border-error/40 px-3 py-1.5 text-xs font-label-bold text-error hover:bg-error/5"
        >
          <span className="material-symbols-outlined text-base">delete</span>
          حذف
        </button>
      </div>
    </div>
  );
}
