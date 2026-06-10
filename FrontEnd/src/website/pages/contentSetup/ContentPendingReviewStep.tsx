import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { WEBSITE_ROUTES } from "@core/constants/routes";
import { useContentSetup } from "@core/context/ContentSetupContext";
import { CONTENT_TYPE_LABELS } from "@website/constants/contentSetup";
import { getSubmission } from "@website/helpers/contentSubmissionsStore";

export default function ContentPendingReviewStep() {
  const navigate = useNavigate();
  const { draft } = useContentSetup();

  useEffect(() => {
    document.title = "قيد المراجعة | إعداد المحتوى | زرقاء اليمامة";
    if (draft.status !== "pending_review" || !draft.submissionId) {
      navigate(WEBSITE_ROUTES.CONTENT_SETUP_NEW, { replace: true });
    }
  }, [draft.status, draft.submissionId, navigate]);

  if (draft.status !== "pending_review" || !draft.submissionId) return null;

  const submission = getSubmission(draft.submissionId);
  const typeLabel = draft.contentType
    ? CONTENT_TYPE_LABELS[draft.contentType]
    : "محتوى";

  return (
    <div className="space-y-10 pb-8">
      <div className="text-center max-w-2xl mx-auto">
        <div className="w-20 h-20 rounded-full bg-gold-metallic-start/15 flex items-center justify-center mx-auto mb-6 pulse-gold">
          <span className="material-symbols-outlined text-gold-metallic-start text-4xl">
            hourglass_top
          </span>
        </div>
        <p className="text-xs font-label-bold text-secondary mb-2">الخطوة ٥ من ٥</p>
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-3">
          المحتوى قيد المراجعة
        </h1>
        <p className="text-on-surface-variant leading-relaxed mb-2">
          تم إرسال {typeLabel} بنجاح إلى فريق المحررين للتأكيد النهائي قبل النشر على المنصة.
        </p>
        {submission && (
          <p className="text-sm text-on-surface-variant">
            رقم التتبع:{" "}
            <span className="font-label-bold text-primary">#{submission.id.slice(-8)}</span>
          </p>
        )}
      </div>

      <div className="glass-panel rounded-2xl p-6 md:p-8 border border-outline-variant/10 max-w-3xl mx-auto">
        <h2 className="font-headline-sm text-headline-sm text-primary mb-6">مراحل المراجعة</h2>
        <ol className="space-y-4">
          {[
            { label: "تم التقديم", done: true, icon: "upload_file" },
            { label: "تحليل الذكاء الاصطناعي", done: true, icon: "psychology" },
            { label: "مراجعة المحررين", done: false, active: true, icon: "rate_review" },
            { label: "النشر على المنصة", done: false, icon: "public" },
          ].map((step) => (
            <li
              key={step.label}
              className={`flex items-center gap-4 p-4 rounded-xl border ${
                step.active
                  ? "border-gold-metallic-start/40 bg-gold-metallic-start/5"
                  : "border-outline-variant/10"
              }`}
            >
              <span
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step.done
                    ? "bg-primary text-on-primary"
                    : step.active
                      ? "bg-gold-metallic-start text-on-primary animate-pulse"
                      : "bg-mist-grey text-on-surface-variant"
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{step.icon}</span>
              </span>
              <span className="font-label-bold text-primary">{step.label}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <Link
          to={WEBSITE_ROUTES.MY_SPACE}
          className="px-8 py-3 rounded-lg font-label-bold bg-primary text-on-primary hover:bg-gold-metallic-start transition-colors"
        >
          العودة إلى مساحتي
        </Link>
        <Link
          to={WEBSITE_ROUTES.CONTENT_SETUP_NEW}
          className="px-8 py-3 rounded-lg font-label-bold border border-outline-variant hover:bg-surface-container-low transition-colors"
        >
          إعداد محتوى جديد
        </Link>
      </div>
    </div>
  );
}
