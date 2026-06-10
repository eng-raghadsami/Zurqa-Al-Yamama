import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { WEBSITE_ROUTES } from "@core/constants/routes";
import { useContentSetup } from "@core/context/ContentSetupContext";
import CriterionScoreBar from "@website/components/contentSetup/CriterionScoreBar";
import { CONTENT_TYPE_LABELS } from "@website/constants/contentSetup";
import { analyzeContentText } from "@website/services/contentAnalysisService";

export default function ContentWriteStep() {
  const navigate = useNavigate();
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisNote, setAnalysisNote] = useState<string | null>(null);
  const { draft, setTitle, setBody, setTextAnalysis } = useContentSetup();

  useEffect(() => {
    document.title = "كتابة المحتوى | إعداد المحتوى | زرقاء اليمامة";
    if (!draft.contentType) {
      navigate(WEBSITE_ROUTES.CONTENT_SETUP_NEW, { replace: true });
      return;
    }
    if (!draft.coverPreviewUrl || draft.coverRemoved) {
      navigate(WEBSITE_ROUTES.CONTENT_SETUP_COVER, { replace: true });
    }
  }, [draft.contentType, draft.coverPreviewUrl, draft.coverRemoved, navigate]);

  if (!draft.contentType || !draft.coverPreviewUrl || draft.coverRemoved) return null;

  const typeLabel = CONTENT_TYPE_LABELS[draft.contentType] ?? draft.contentType;
  const canAnalyze = draft.body.trim().length > 20;

  const handleAnalyze = async () => {
    if (!canAnalyze) return;
    setAnalyzing(true);
    setAnalysisNote(null);
    try {
      const result = await analyzeContentText(draft.title, draft.body);
      setTextAnalysis(result);
      setAnalysisNote("تم التحليل عبر خادم زرقاء اليمامة.");
    } catch (error) {
      setAnalysisNote(
        error instanceof Error
          ? error.message
          : "حدث خطأ أثناء التحليل. حاول مرة أخرى.",
      );
      setTextAnalysis(null);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8 pb-24">
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <p className="text-xs font-label-bold text-secondary mb-2">الخطوة ٣ من ٥</p>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-2">
            كتابة {typeLabel}
          </h1>
          <p className="text-on-surface-variant max-w-2xl">
            اكتب المحتوى ثم شغّل التحليل النصي. يمكنك الرجوع للتعديل أو المتابعة للمعاينة.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            to={WEBSITE_ROUTES.CONTENT_SETUP_NEW}
            className="px-4 py-2 rounded-lg border border-outline-variant text-sm font-label-bold hover:bg-surface-container-low transition-colors"
          >
            تغيير النوع
          </Link>
          <Link
            to={WEBSITE_ROUTES.CONTENT_SETUP_COVER}
            className="px-4 py-2 rounded-lg border border-outline-variant text-sm font-label-bold hover:bg-surface-container-low transition-colors"
          >
            تعديل الغلاف
          </Link>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className="glass-panel rounded-2xl p-6 md:p-8 border border-outline-variant/10">
            <input
              type="text"
              value={draft.title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={`عنوان ${typeLabel}...`}
              className="w-full text-2xl font-bold text-primary border-none focus:ring-0 p-0 mb-6 bg-transparent placeholder:text-outline-variant/50"
            />
            <textarea
              value={draft.body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="ابدأ بكتابة المحتوى هنا..."
              className="w-full min-h-[300px] p-4 bg-surface-container-low/50 border border-outline-variant/20 rounded-xl focus:ring-2 focus:ring-gold-metallic-start text-body-lg leading-relaxed resize-y"
            />
            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                className="px-6 py-2 border border-primary rounded-lg font-label-bold hover:bg-surface-container transition-colors"
              >
                حفظ كمسودة
              </button>
              <button
                type="button"
                disabled={!canAnalyze || analyzing}
                onClick={() => void handleAnalyze()}
                className="px-8 py-2 gold-gradient-bg text-on-primary rounded-lg font-label-bold shadow-md hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {analyzing ? "progress_activity" : "auto_awesome"}
                </span>
                {analyzing ? "جاري التحليل عبر الخادم..." : "تحليل النص"}
              </button>
            </div>
          </div>

          {draft.textAnalysis && (
            <div className="glass-panel rounded-2xl p-6 border border-outline-variant/10 space-y-4">
              {analysisNote && (
                <p className="text-xs rounded-lg p-3 bg-success-teal/10 text-on-surface-variant">
                  {analysisNote}
                </p>
              )}
              <h3 className="font-label-bold text-primary flex items-center gap-2">
                <span className="material-symbols-outlined text-gold-metallic-start">tips_and_updates</span>
                نصائح واقتراحات التعديل
              </h3>
              <ul className="space-y-2">
                {draft.textAnalysis.suggestions.map((tip) => (
                  <li key={tip} className="flex gap-2 text-sm text-on-surface-variant">
                    <span className="text-gold-metallic-start">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                disabled
                title="قريباً"
                className="text-xs text-outline font-label-bold cursor-not-allowed"
              >
                إعادة صياغة النص بالذكاء الاصطناعي — قريباً
              </button>
            </div>
          )}
        </div>

        <aside className="lg:col-span-4 space-y-4">
          {draft.coverPreviewUrl && (
            <div className="rounded-2xl overflow-hidden border border-outline-variant/10 shadow-sm">
              <img
                src={draft.coverPreviewUrl}
                alt="غلاف المحتوى"
                className="w-full h-40 object-cover"
                style={{ filter: `blur(${draft.coverBlurLevel}px)` }}
              />
            </div>
          )}

          <div className="glass-panel rounded-2xl p-6 border border-outline-variant/10">
            <h3 className="font-label-bold text-primary mb-4">معايير النص</h3>
            {!draft.textAnalysis ? (
              <p className="text-sm text-on-surface-variant">
                شغّل التحليل لعرض نسب كل معيار: كراهية، عنصرية، جندرية، تحيز، ألفاظ غير لائقة،
                تحريض على العنف.
              </p>
            ) : (
              <div className="space-y-4">
                <div className="text-center p-4 bg-primary text-on-primary rounded-xl">
                  <p className="text-xs opacity-80 mb-1">مؤشر النزاهة النصية</p>
                  <p className="font-stats-number text-3xl">{draft.textAnalysis.overallScore}%</p>
                </div>
                {draft.textAnalysis.criteria.map((c) => (
                  <CriterionScoreBar key={c.id} criterion={c} />
                ))}
              </div>
            )}
          </div>
        </aside>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between gap-4 pt-4 border-t border-outline-variant/10">
        <Link
          to={WEBSITE_ROUTES.CONTENT_SETUP_COVER}
          className="px-6 py-3 rounded-lg border border-outline-variant font-label-bold text-center hover:bg-surface-container-low"
        >
          رجوع للغلاف
        </Link>
        <button
          type="button"
          disabled={!draft.textAnalysis}
          onClick={() => navigate(WEBSITE_ROUTES.CONTENT_SETUP_ANALYSIS)}
          className="px-8 py-3 rounded-lg font-label-bold bg-primary text-on-primary hover:bg-gold-metallic-start disabled:opacity-40 disabled:cursor-not-allowed"
        >
          متابعة للمعاينة والتحليل
        </button>
      </div>
    </div>
  );
}
