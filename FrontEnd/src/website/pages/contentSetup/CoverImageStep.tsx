import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { WEBSITE_ROUTES } from "@core/constants/routes";
import { useContentSetup } from "@core/context/ContentSetupContext";
import CriterionScoreBar from "@website/components/contentSetup/CriterionScoreBar";
import { CONTENT_TYPE_LABELS } from "@website/constants/contentSetup";
import {
  clearCoverFile,
  getCoverFile,
  setCoverFile,
} from "@website/helpers/coverFileStore";
import { analyzeContentImage } from "@website/services/contentAnalysisService";

export default function CoverImageStep() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisNote, setAnalysisNote] = useState<string | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const {
    draft,
    setCoverPreviewUrl,
    setCoverBlurLevel,
    setCoverRemoved,
    setImageAnalysis,
  } = useContentSetup();

  useEffect(() => {
    document.title = "صورة الغلاف | إعداد المحتوى | زرقاء اليمامة";
    if (!draft.contentType) {
      navigate(WEBSITE_ROUTES.CONTENT_SETUP_NEW, { replace: true });
    }
  }, [draft.contentType, navigate]);

  const runImageAnalysis = async (file: File) => {
    setAnalyzing(true);
    setAnalysisNote(null);
    setAnalysisError(null);
    setCoverFile(file);

    try {
      const result = await analyzeContentImage(file);
      setImageAnalysis(result);
      setAnalysisNote(
        `تم التحليل عبر خادم زرقاء اليمامة — مستوى المخاطرة: ${result.overallRisk}%`,
      );
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "تعذّر تحليل الصورة عبر الخادم";
      setAnalysisError(message);
      setImageAnalysis(null);
      setAnalysisNote(null);
    } finally {
      setAnalyzing(false);
    }
  };

  useEffect(() => {
    const file = getCoverFile();
    if (
      file &&
      draft.coverPreviewUrl &&
      !draft.coverRemoved &&
      !draft.imageAnalysis &&
      !analyzing
    ) {
      void runImageAnalysis(file);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!draft.contentType) return null;

  const typeLabel = CONTENT_TYPE_LABELS[draft.contentType] ?? draft.contentType;

  const handleFile = (file: File | undefined) => {
    if (!file || !file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setCoverPreviewUrl(url, file.name);
    void runImageAnalysis(file);
  };

  const handleRemoveCover = () => {
    setCoverRemoved(true);
    clearCoverFile();
    setAnalysisNote(null);
    setAnalysisError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const showCover = draft.coverPreviewUrl && !draft.coverRemoved;

  return (
    <div className="space-y-8 pb-8">
      <header>
        <p className="text-xs font-label-bold text-secondary mb-2">الخطوة ٢ من ٥</p>
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-2">
          صورة غلاف {typeLabel}
        </h1>
        <p className="text-on-surface-variant max-w-2xl leading-relaxed">
          ارفع صورة الغلاف. يُحلَّل المحتوى البصري وفق معايير المنصة مع إمكانية التغبيش أو
          الاستبدال.
        </p>
        <Link
          to={WEBSITE_ROUTES.CONTENT_SETUP_NEW}
          className="inline-flex items-center gap-1 mt-3 text-sm text-secondary font-label-bold hover:underline"
        >
          <span className="material-symbols-outlined text-[16px]">swap_horiz</span>
          تغيير نوع المحتوى
        </Link>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />

          {!showCover ? (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                handleFile(e.dataTransfer.files[0]);
              }}
              className="w-full border-2 border-dashed border-outline-variant/40 rounded-2xl p-12 flex flex-col items-center text-center bg-mist-grey/20 hover:bg-gold-metallic-start/5 transition-colors cursor-pointer group"
            >
              <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center mb-6 group-hover:pulse-gold transition-all">
                <span className="material-symbols-outlined text-[40px] text-gold-metallic-start">
                  cloud_upload
                </span>
              </div>
              <p className="font-headline-sm text-xl mb-2">اسحب وأفلت الصورة هنا</p>
              <p className="text-on-surface-variant text-sm">PNG, JPG, WEBP — بحد أقصى 10 ميجابايت</p>
            </button>
          ) : (
            <div className="rounded-2xl border border-outline-variant/10 overflow-hidden bg-surface-container-lowest">
              <div className="relative">
                <img
                  src={draft.coverPreviewUrl!}
                  alt="معاينة الغلاف"
                  className="w-full max-h-80 object-cover transition-all"
                  style={{ filter: `blur(${draft.coverBlurLevel}px)` }}
                />
                {draft.coverBlurLevel > 0 && (
                  <span className="absolute top-4 right-4 bg-primary/80 text-white text-xs font-label-bold px-3 py-1 rounded-full">
                    تغبيش {draft.coverBlurLevel}px
                  </span>
                )}
                {analyzing && (
                  <div className="absolute inset-0 bg-primary/30 flex items-center justify-center">
                    <span className="text-white font-label-bold flex items-center gap-2">
                      <span className="material-symbols-outlined animate-spin">progress_activity</span>
                      جاري تحليل الصورة عبر الخادم...
                    </span>
                  </div>
                )}
              </div>
              <div className="p-4 flex flex-wrap gap-3 justify-between items-center border-t border-outline-variant/10">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-sm font-label-bold text-secondary hover:underline"
                >
                  تعديل الصورة
                </button>
                {getCoverFile() && (
                  <button
                    type="button"
                    disabled={analyzing}
                    onClick={() => {
                      const file = getCoverFile();
                      if (file) void runImageAnalysis(file);
                    }}
                    className="text-sm font-label-bold text-primary hover:underline disabled:opacity-50"
                  >
                    إعادة التحليل
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleRemoveCover}
                  className="text-sm font-label-bold text-error hover:underline flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-base">delete</span>
                  حذف الصورة
                </button>
              </div>
            </div>
          )}

          {analysisError && (
            <div className="rounded-xl border border-error/30 bg-error/5 p-4 text-sm text-error">
              <p className="font-label-bold mb-1">فشل التحليل عبر الخادم</p>
              <p>{analysisError}</p>
              <p className="text-xs mt-2 text-on-surface-variant">
                جرّب «إعادة التحليل» أو ارفع الصورة من جديد. إن استمر الخطأ قد يكون السيرفر نائماً
                (انتظر 30 ثانية).
              </p>
            </div>
          )}

          {showCover && draft.imageAnalysis && (
            <div className="glass-panel rounded-2xl p-6 border border-outline-variant/10 space-y-4">
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-label-bold text-primary">تغبيش الصورة</h3>
                <span className="text-xs text-on-surface-variant">
                  موصى به: {draft.imageAnalysis.recommendedBlur}px
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={24}
                value={draft.coverBlurLevel}
                onChange={(e) => setCoverBlurLevel(Number(e.target.value))}
                className="w-full accent-gold-metallic-start"
              />
              <div className="flex justify-between text-xs text-on-surface-variant">
                <span>بدون تغبيش</span>
                <span>تغبيش قوي</span>
              </div>
            </div>
          )}
        </div>

        <aside className="lg:col-span-5 space-y-4">
          <div className="glass-panel rounded-2xl p-6 border border-outline-variant/10">
            <h3 className="font-headline-sm text-headline-sm text-primary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-gold-metallic-start">image_search</span>
              تحليل الصورة
            </h3>

            {!draft.imageAnalysis ? (
              <p className="text-sm text-on-surface-variant">
                ارفع صورة لبدء التحليل وفق المعايير: عنصرية، عنف، محتوى حساس، دموي، تزييف،
                توليد ذكاء اصطناعي، وأخرى.
              </p>
            ) : (
              <div className="space-y-5">
                {analysisNote && (
                  <p className="text-xs rounded-lg p-3 bg-success-teal/10 text-on-surface-variant">
                    {analysisNote}
                  </p>
                )}
                <p className="text-sm text-on-surface-variant leading-relaxed bg-surface-container-low rounded-lg p-4">
                  <span className="font-label-bold text-primary block mb-1">وصف سريع:</span>
                  {draft.imageAnalysis.description}
                </p>
                <p className="text-xs text-on-surface-variant">
                  مستوى المخاطرة الإجمالي:{" "}
                  <span className="font-label-bold text-primary">
                    {draft.imageAnalysis.overallRisk}%
                  </span>
                  {draft.imageAnalysis.source === "api" && (
                    <span className="mr-2 text-success-teal font-label-bold">• API</span>
                  )}
                </p>
                <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
                  {draft.imageAnalysis.criteria.map((c) => (
                    <CriterionScoreBar key={c.id} criterion={c} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between gap-4 pt-4 border-t border-outline-variant/10">
        <Link
          to={WEBSITE_ROUTES.CONTENT_SETUP_NEW}
          className="px-6 py-3 rounded-lg border border-outline-variant text-primary font-label-bold text-center hover:bg-surface-container-low transition-colors"
        >
          رجوع
        </Link>
        <button
          type="button"
          disabled={!showCover || !draft.imageAnalysis || analyzing}
          onClick={() => navigate(WEBSITE_ROUTES.CONTENT_SETUP_WRITE)}
          className="px-8 py-3 rounded-lg font-label-bold bg-primary text-on-primary hover:bg-gold-metallic-start transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          متابعة إلى الكتابة
        </button>
      </div>
    </div>
  );
}
