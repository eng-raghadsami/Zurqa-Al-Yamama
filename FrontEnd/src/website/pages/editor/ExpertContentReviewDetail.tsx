import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { WEBSITE_ROUTES } from "@core/constants/routes";
import { useApproveContent, useContentSubmission } from "@services";
import RequireStaffAccess from "@website/components/editor/RequireStaffAccess";
import CriterionScoreBar from "@website/components/contentSetup/CriterionScoreBar";
import { CONTENT_TYPE_LABELS } from "@website/constants/contentSetup";
import { updateSubmission } from "@website/helpers/contentSubmissionsStore";

const ETHICS_CHECKLIST = [
  "نبرة حيادية وموضوعية",
  "مصادر موثقة ومتقاطعة",
  "خالٍ من التحيز الجندري",
  "خالٍ من الكراهية أو التحريض",
] as const;

export default function ExpertContentReviewDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: submission, isLoading } = useContentSubmission(id);
  const approveContent = useApproveContent();
  const [integrityScore, setIntegrityScore] = useState(0);
  const [notes, setNotes] = useState("");
  const [checks, setChecks] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(ETHICS_CHECKLIST.map((c) => [c, true])),
  );

  useEffect(() => {
    if (submission) {
      setIntegrityScore(submission.integrityScore);
    }
  }, [submission]);

  if (isLoading) {
    return (
      <RequireStaffAccess>
        <div className="py-16 text-center">
          <span className="material-symbols-outlined animate-spin text-4xl text-gold-metallic-start">
            progress_activity
          </span>
        </div>
      </RequireStaffAccess>
    );
  }

  if (!submission || submission.status !== "pending_review") {
    return (
      <RequireStaffAccess>
      <div className="max-w-lg mx-auto text-center py-16">
        <p className="text-on-surface-variant mb-4">المساهمة غير موجودة أو تمت مراجعتها.</p>
        <Link
          to={WEBSITE_ROUTES.EDITOR_EXPERT_REVIEW}
          className="text-secondary font-label-bold hover:underline"
        >
          العودة للقائمة
        </Link>
      </div>
      </RequireStaffAccess>
    );
  }

  const typeLabel = CONTENT_TYPE_LABELS[submission.contentType];

  const handleApprove = async () => {
    try {
      await approveContent.mutateAsync({
        submissionId: submission.id,
        integrityScore,
        notes,
        authorName: submission.contributorName,
      });
      navigate(WEBSITE_ROUTES.EDITOR_EXPERT_REVIEW);
    } catch {
      window.alert("تعذّر اعتماد المحتوى. حاول مرة أخرى.");
    }
  };

  const handleReturn = () => {
    updateSubmission(submission.id, { status: "returned" });
    window.alert("أُعيد المحتوى للمساهم للتعديل (نموذج أولي)");
    navigate(WEBSITE_ROUTES.EDITOR_EXPERT_REVIEW);
  };

  const handleReject = () => {
    updateSubmission(submission.id, { status: "rejected" });
    navigate(WEBSITE_ROUTES.EDITOR_EXPERT_REVIEW);
  };

  return (
    <RequireStaffAccess>
    <div className="max-w-container-max mx-auto w-full pb-32" dir="rtl">
      <header className="mb-10">
        <Link
          to={WEBSITE_ROUTES.EDITOR_EXPERT_REVIEW}
          className="text-sm text-secondary font-label-bold hover:underline mb-4 inline-flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          قائمة المراجعة
        </Link>
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-3">
          واجهة مراجعة الخبراء
        </h1>
        <div className="flex flex-wrap gap-3 text-sm text-on-surface-variant">
          <span className="flex items-center gap-1 bg-surface-container px-3 py-1 rounded-full font-label-bold">
            <span className="material-symbols-outlined text-sm">article</span>
            {typeLabel}: {submission.title}
          </span>
          <span className="flex items-center gap-1 bg-surface-container px-3 py-1 rounded-full font-label-bold">
            <span className="material-symbols-outlined text-sm">person</span>
            {submission.contributorRole}
          </span>
          <span className="flex items-center gap-1 bg-surface-container px-3 py-1 rounded-full font-label-bold">
            <span className="material-symbols-outlined text-sm">calendar_today</span>
            {new Date(submission.submittedAt).toLocaleDateString("ar-SA")}
          </span>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-gutter">
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-panel p-6 rounded-xl">
              <h3 className="font-headline-sm text-lg text-primary mb-4">المحتوى المُقدَّم</h3>
              {submission.coverPreviewUrl && !submission.coverRemoved && (
                <div className="aspect-video rounded-lg overflow-hidden mb-4 bg-black">
                  <img
                    src={submission.coverPreviewUrl}
                    alt=""
                    className="w-full h-full object-cover"
                    style={{ filter: `blur(${submission.coverBlurLevel}px)` }}
                  />
                </div>
              )}
              <p className="text-body-md text-on-surface leading-relaxed whitespace-pre-wrap">
                {submission.body}
              </p>
            </div>

            <div className="glass-panel p-6 rounded-xl border-gold-metallic-start/20">
              <h3 className="font-headline-sm text-lg text-primary mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-gold-metallic-start">auto_awesome</span>
                تحليل النزاهة الذكي
              </h3>
              {submission.textAnalysis ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-primary text-white rounded-lg">
                    <div>
                      <p className="text-xs opacity-70">مؤشر النزاهة النصية</p>
                      <p className="font-headline-sm">{submission.textAnalysis.overallScore}%</p>
                    </div>
                    <span className="material-symbols-outlined text-4xl text-gold-metallic-start">
                      verified
                    </span>
                  </div>
                  {submission.textAnalysis.flaggedPhrases.length > 0 && (
                    <div className="p-3 bg-warning-amber/10 rounded border-r-2 border-warning-amber text-sm">
                      عبارات مُشار إليها: {submission.textAnalysis.flaggedPhrases.join("، ")}
                    </div>
                  )}
                  {submission.textAnalysis.suggestions.slice(0, 3).map((s) => (
                    <p key={s} className="text-xs text-on-surface-variant flex gap-2">
                      <span className="text-gold-metallic-start">•</span>
                      {s}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-on-surface-variant">لا تحليل نصي مرفق.</p>
              )}
            </div>
          </div>

          <div className="glass-panel p-6 rounded-xl space-y-6">
            <h3 className="font-headline-sm text-lg text-primary">تفاصيل معايير النص</h3>
            {submission.textAnalysis?.criteria.map((c) => (
              <CriterionScoreBar key={c.id} criterion={c} />
            ))}
          </div>

          {submission.imageAnalysis && (
            <div className="glass-panel p-6 rounded-xl space-y-4">
              <h3 className="font-headline-sm text-lg text-primary">تحليل الصورة</h3>
              <p className="text-sm text-on-surface-variant">{submission.imageAnalysis.description}</p>
              {submission.imageAnalysis.criteria.map((c) => (
                <CriterionScoreBar key={c.id} criterion={c} />
              ))}
            </div>
          )}
        </div>

        <aside className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-primary text-white p-6 rounded-xl shadow-xl relative overflow-hidden">
            <h3 className="font-label-bold mb-4 opacity-80">تأكيد درجة النزاهة النهائية</h3>
            <div className="flex items-end gap-2 mb-4">
              <input
                type="number"
                min={0}
                max={100}
                value={integrityScore}
                onChange={(e) => setIntegrityScore(Number(e.target.value))}
                className="bg-transparent border-b-2 border-gold-metallic-start text-3xl font-bold w-24 focus:outline-none"
              />
              <span className="text-2xl">%</span>
            </div>
            <p className="text-xs opacity-70">
              يعتمد الخبير هذه الدرجة كتقييم نهائي بعد مراجعة التحليل الآلي.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-xl">
            <h3 className="font-headline-sm text-lg text-primary mb-4">قائمة التحقق الأخلاقي</h3>
            <div className="space-y-3">
              {ETHICS_CHECKLIST.map((item) => (
                <label
                  key={item}
                  className="flex flex-row-reverse items-center justify-between cursor-pointer gap-3"
                >
                  <span className="text-sm">{item}</span>
                  <input
                    type="checkbox"
                    checked={checks[item]}
                    onChange={(e) =>
                      setChecks((prev) => ({ ...prev, [item]: e.target.checked }))
                    }
                    className="rounded border-outline text-primary focus:ring-gold-metallic-start h-5 w-5"
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="glass-panel p-6 rounded-xl">
            <h3 className="font-headline-sm text-lg text-primary mb-4">ملاحظات فنية</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="ملاحظاتك للمساهم أو فريق التحرير..."
              className="w-full h-36 bg-surface-container border-none rounded-lg p-4 text-sm focus:ring-2 focus:ring-gold-metallic-start resize-none"
            />
          </div>
        </aside>
      </div>

      <div className="fixed bottom-0 left-0 right-0 lg:mr-80 h-auto min-h-[5rem] bg-white/90 backdrop-blur-xl border-t border-mist-grey shadow-2xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 px-4 md:px-margin-desktop py-4 z-50">
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            disabled={approveContent.isPending}
            onClick={() => void handleApprove()}
            className="gold-gradient-bg px-6 md:px-8 py-3 text-on-primary font-label-bold rounded-full shadow-lg flex items-center gap-2 disabled:opacity-60"
          >
            {approveContent.isPending ? "جاري الاعتماد..." : "اعتماد للنشر"}
            <span className="material-symbols-outlined">check_circle</span>
          </button>
          <button
            type="button"
            onClick={handleReturn}
            className="bg-surface-container px-6 py-3 text-primary font-label-bold rounded-full hover:bg-mist-grey transition-colors"
          >
            إعادة للتعديل
          </button>
        </div>
        <button
          type="button"
          onClick={handleReject}
          className="px-6 py-3 text-error font-label-bold rounded-full border border-error/20 hover:bg-error/10 flex items-center gap-2 justify-center"
        >
          رفض المساهمة
          <span className="material-symbols-outlined">cancel</span>
        </button>
      </div>
    </div>
    </RequireStaffAccess>
  );
}
