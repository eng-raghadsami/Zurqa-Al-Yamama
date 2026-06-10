import { Link } from "react-router-dom";
import { WEBSITE_ROUTES } from "@core/constants/routes";
import { usePendingSubmissions } from "@services";
import RequireStaffAccess from "@website/components/editor/RequireStaffAccess";
import { CONTENT_TYPE_LABELS } from "@website/constants/contentSetup";

export default function ExpertReviewQueue() {
  const { data: pending = [], isLoading } = usePendingSubmissions();

  return (
    <RequireStaffAccess>
    <div className="max-w-container-max mx-auto w-full" dir="rtl">
      <header className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <Link
            to={WEBSITE_ROUTES.EDITOR_DASHBOARD}
            className="text-sm text-secondary font-label-bold hover:underline mb-3 inline-flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            لوحة التحكم
          </Link>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-2">
            قائمة مراجعة الخبراء
          </h1>
          <p className="text-on-surface-variant">
            محتوى مُقدَّم من المساهمين بانتظار التأكيد النهائي قبل النشر.
          </p>
        </div>
        <span className="text-sm font-label-bold bg-gold-metallic-start/10 text-gold-metallic-start px-4 py-2 rounded-full">
          {pending.length} قيد المراجعة
        </span>
      </header>

      {isLoading ? (
        <div className="glass-panel rounded-2xl p-12 text-center">
          <span className="material-symbols-outlined animate-spin text-4xl text-gold-metallic-start">
            progress_activity
          </span>
        </div>
      ) : pending.length === 0 ? (
        <div className="glass-panel rounded-2xl p-12 text-center border border-dashed border-outline-variant/30">
          <span className="material-symbols-outlined text-5xl text-outline mb-4">inbox</span>
          <p className="text-on-surface-variant">لا توجد مساهمات معلقة حالياً.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pending.map((item) => (
            <Link
              key={item.id}
              to={WEBSITE_ROUTES.editorExpertReviewDetail(item.id)}
              className="block glass-panel rounded-xl p-5 md:p-6 border border-outline-variant/10 hover:border-gold-metallic-start/40 hover:shadow-md transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex gap-4 min-w-0">
                  {item.coverPreviewUrl && !item.coverRemoved && (
                    <img
                      src={item.coverPreviewUrl}
                      alt=""
                      className="w-20 h-20 rounded-lg object-cover shrink-0"
                      style={{ filter: `blur(${Math.min(item.coverBlurLevel, 8)}px)` }}
                    />
                  )}
                  <div className="min-w-0">
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="text-xs font-label-bold bg-surface-container px-2 py-0.5 rounded-full">
                        {CONTENT_TYPE_LABELS[item.contentType]}
                      </span>
                      <span className="text-xs text-on-surface-variant">
                        {item.contributorRole}
                      </span>
                      {item.apiContentId && (
                        <span className="text-xs text-success-teal font-label-bold">
                          متزامن مع API
                        </span>
                      )}
                    </div>
                    <h2 className="font-label-bold text-primary truncate">{item.title}</h2>
                    <p className="text-xs text-on-surface-variant mt-1">
                      {new Date(item.submittedAt).toLocaleDateString("ar-SA")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-center">
                    <p className="font-stats-number text-2xl text-gold-metallic-start">
                      {item.integrityScore}%
                    </p>
                    <p className="text-[10px] text-on-surface-variant">النزاهة</p>
                  </div>
                  <span className="material-symbols-outlined text-outline">chevron_left</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
    </RequireStaffAccess>
  );
}
