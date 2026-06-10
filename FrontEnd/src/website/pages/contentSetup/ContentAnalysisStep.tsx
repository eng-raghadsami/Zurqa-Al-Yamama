import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { WEBSITE_ROUTES } from "@core/constants/routes";
import { useAuth } from "@core/context/AuthContext";
import { useContentSetup } from "@core/context/ContentSetupContext";
import { useSubmitContentForReview } from "@services";
import CriterionScoreBar from "@website/components/contentSetup/CriterionScoreBar";
import { CONTENT_TYPE_LABELS } from "@website/constants/contentSetup";

export default function ContentAnalysisStep() {
  const navigate = useNavigate();
  const { activeModeLabel } = useAuth();
  const { draft, markPendingReview } = useContentSetup();
  const submitReview = useSubmitContentForReview();
  const [submitNote, setSubmitNote] = useState<string | null>(null);

  useEffect(() => {
    document.title = "التحليل والمعاينة | إعداد المحتوى | زرقاء اليمامة";
    if (!draft.contentType) {
      navigate(WEBSITE_ROUTES.CONTENT_SETUP_NEW, { replace: true });
      return;
    }
    if (!draft.coverPreviewUrl || draft.coverRemoved) {
      navigate(WEBSITE_ROUTES.CONTENT_SETUP_COVER, { replace: true });
      return;
    }
    if (!draft.textAnalysis || draft.body.trim().length <= 20) {
      navigate(WEBSITE_ROUTES.CONTENT_SETUP_WRITE, { replace: true });
    }
  }, [draft, navigate]);

  if (
    !draft.contentType ||
    !draft.coverPreviewUrl ||
    draft.coverRemoved ||
    !draft.textAnalysis
  ) {
    return null;
  }

  const typeLabel = CONTENT_TYPE_LABELS[draft.contentType] ?? draft.contentType;
  const integrityScore = draft.textAnalysis.overallScore;

  const handleSubmitForReview = async () => {
    setSubmitNote(null);
    try {
      const submission = await submitReview.mutateAsync({
        contentType: draft.contentType!,
        title: draft.title || `مسودة ${typeLabel}`,
        body: draft.body,
        coverPreviewUrl: draft.coverPreviewUrl,
        coverBlurLevel: draft.coverBlurLevel,
        coverRemoved: draft.coverRemoved,
        textAnalysis: draft.textAnalysis,
        imageAnalysis: draft.imageAnalysis,
        integrityScore,
        contributorRole: activeModeLabel ?? "مساهم",
      });

      markPendingReview(submission.id);
      setSubmitNote(
        submission.apiContentId
          ? "تم إرسال المحتوى للمراجعة وحفظه على الخادم."
          : "تم إرسال المحتوى للمراجعة محلياً — سيُعرض للمحررين فوراً.",
      );
      navigate(WEBSITE_ROUTES.CONTENT_SETUP_PENDING);
    } catch {
      setSubmitNote("تعذّر إرسال الطلب. حاول مرة أخرى.");
    }
  };

  return (
    <div className="space-y-8 pb-28">
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <p className="text-xs font-label-bold text-secondary mb-2">الخطوة ٤ من ٥</p>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-2">
            المعاينة والتحليل الشامل
          </h1>
          <p className="text-on-surface-variant max-w-2xl">
            راجع نتائج تحليل النص والصورة قبل إرسال المحتوى لمراجعة المحررين.
          </p>
        </div>
        <Link
          to={WEBSITE_ROUTES.CONTENT_SETUP_WRITE}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-primary text-primary font-label-bold text-sm hover:bg-primary hover:text-on-primary transition-colors w-fit"
        >
          <span className="material-symbols-outlined text-[18px]">edit</span>
          الرجوع للتعديل
        </Link>
      </header>

      {submitNote && (
        <p className="text-sm rounded-lg p-3 bg-warning-amber/10 text-on-surface-variant">
          {submitNote}
        </p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-6">
          <article className="bg-white rounded-2xl shadow-lg border border-mist-grey/20 overflow-hidden">
            {draft.coverPreviewUrl && (
              <img
                src={draft.coverPreviewUrl}
                alt=""
                className="w-full h-56 object-cover"
                style={{ filter: `blur(${draft.coverBlurLevel}px)` }}
              />
            )}
            <div className="p-8 md:p-10">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs font-label-bold bg-surface-container px-3 py-1 rounded-full">
                  {typeLabel}
                </span>
                <span className="text-xs font-label-bold bg-gold-metallic-start/10 text-gold-metallic-start px-3 py-1 rounded-full">
                  نزاهة نصية: {integrityScore}%
                </span>
              </div>
              <h2 className="font-display-lg text-2xl md:text-3xl text-primary mb-6">
                {draft.title || `مسودة ${typeLabel} بدون عنوان`}
              </h2>
              <div className="font-body-lg text-on-surface-variant leading-[2] whitespace-pre-wrap">
                {draft.body}
              </div>
            </div>
          </article>

          <div className="glass-panel rounded-2xl p-6 border border-outline-variant/10">
            <h3 className="font-headline-sm text-headline-sm text-primary mb-4">
              نصائح واقتراحات التعديل
            </h3>
            <ul className="space-y-2">
              {draft.textAnalysis.suggestions.map((tip) => (
                <li key={tip} className="text-sm text-on-surface-variant flex gap-2">
                  <span className="material-symbols-outlined text-gold-metallic-start text-base shrink-0">
                    lightbulb
                  </span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-mist-grey/20 text-center">
            <h3 className="font-label-bold text-primary mb-4">مؤشر النزاهة الكلي</h3>
            <p className="font-stats-number text-5xl text-gold-metallic-start mb-1">
              {integrityScore}%
            </p>
            <p className="text-xs text-on-surface-variant">بناءً على تحليل النص والصورة</p>
          </div>

          <div className="glass-panel rounded-2xl p-6 border border-outline-variant/10 space-y-4">
            <h3 className="font-label-bold text-primary">معايير النص</h3>
            {draft.textAnalysis.criteria.map((c) => (
              <CriterionScoreBar key={c.id} criterion={c} />
            ))}
          </div>

          {draft.imageAnalysis && (
            <div className="glass-panel rounded-2xl p-6 border border-outline-variant/10 space-y-4">
              <h3 className="font-label-bold text-primary">معايير الصورة</h3>
              <p className="text-xs text-on-surface-variant">{draft.imageAnalysis.description}</p>
              {draft.imageAnalysis.criteria.map((c) => (
                <CriterionScoreBar key={c.id} criterion={c} />
              ))}
            </div>
          )}
        </aside>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-xl border-t border-mist-grey/30 py-4 lg:mr-72 xl:mr-80">
        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop flex flex-col sm:flex-row sm:justify-between gap-4">
          <Link
            to={WEBSITE_ROUTES.CONTENT_SETUP_WRITE}
            className="px-6 py-3 rounded-xl border border-mist-grey/30 font-label-bold text-center hover:bg-surface-container-low"
          >
            الرجوع للتعديل
          </Link>
          <button
            type="button"
            disabled={submitReview.isPending}
            onClick={() => void handleSubmitForReview()}
            className="px-8 py-3 rounded-xl font-label-bold bg-primary text-on-primary shadow-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {submitReview.isPending ? "جاري الإرسال..." : "تقديم للمراجعة النهائية"}
          </button>
        </div>
      </div>
    </div>
  );
}
