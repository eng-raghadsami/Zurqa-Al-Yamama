import { useMediaVerification } from "@website/context/MediaVerificationContext";
import CriterionScoreBar from "@website/components/contentSetup/CriterionScoreBar";

export default function SuccessStep() {
  const { trackingId, analysisResult, analysisError, reset } = useMediaVerification();

  const hasAnalysis = Boolean(analysisResult);

  return (
    <section className="p-8 md:p-16">
      <div className="text-center mb-10">
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-success-teal/10">
          <span
            className="material-symbols-outlined text-5xl text-success-teal"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {hasAnalysis ? "verified" : "check_circle"}
          </span>
        </div>
        <h2 className="font-headline-md text-headline-md mb-4 text-primary">
          {hasAnalysis ? "اكتمل تحليل الصورة" : "تم استلام ملفك"}
        </h2>
        <p className="mx-auto max-w-md text-body-lg leading-relaxed text-on-surface-variant">
          {hasAnalysis
            ? "فيما يلي نتائج التحليل الآلي عبر خادم زرقاء اليمامة. يمكن لفريق التحقق مراجعة الطلب لاحقاً."
            : "فريق زرقاء اليمامة سيراجع الطلب يدوياً."}
        </p>
      </div>

      {analysisError && (
        <p className="mx-auto mb-8 max-w-lg rounded-lg border border-error/30 bg-error/5 p-4 text-center text-sm font-label-bold text-error" role="alert">
          {analysisError}
        </p>
      )}

      {analysisResult && (
        <div className="mx-auto mb-10 max-w-2xl space-y-6 rounded-2xl border border-mist-grey bg-white p-6 md:p-8 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-mist-grey pb-4">
            <div>
              <p className="text-xs text-on-surface-variant mb-1">مستوى المخاطرة الإجمالي</p>
              <p className="font-stats-number text-3xl text-primary">{analysisResult.overallRisk}%</p>
            </div>
            {analysisResult.source === "api" && (
              <span className="rounded-full bg-success-teal/10 px-3 py-1 text-xs font-label-bold text-success-teal">
                تحليل عبر API
              </span>
            )}
          </div>

          <p className="text-sm leading-relaxed text-on-surface-variant">{analysisResult.description}</p>

          <div className="space-y-4">
            <h3 className="font-label-bold text-primary">معايير التحليل</h3>
            {analysisResult.criteria.map((criterion) => (
              <CriterionScoreBar key={criterion.id} criterion={criterion} />
            ))}
          </div>

          {analysisResult.recommendedBlur > 0 && (
            <p className="rounded-lg bg-warning-amber/10 p-3 text-sm text-on-surface-variant">
              يُوصى بتطبيق ضبابية بمقدار {analysisResult.recommendedBlur}px قبل النشر العام.
            </p>
          )}
        </div>
      )}

      <div className="text-center">
        <div className="mb-10 inline-block rounded-xl border border-mist-grey bg-surface-container p-6">
          <p className="mb-2 text-xs text-on-surface-variant">رقم تتبع المعاملة</p>
          <p className="font-stats-number text-2xl tracking-widest text-primary">{trackingId}</p>
        </div>

        <div className="flex flex-col justify-center gap-4 md:flex-row">
          <button
            type="button"
            className="rounded-lg bg-primary px-8 py-3 font-label-bold text-white transition-opacity hover:opacity-90"
          >
            متابعة حالة الملف
          </button>
          <button
            type="button"
            className="rounded-lg border border-primary px-8 py-3 font-label-bold text-primary transition-all hover:bg-mist-grey/20"
            onClick={reset}
          >
            تحليل صورة جديدة
          </button>
        </div>
      </div>
    </section>
  );
}
