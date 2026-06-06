import { useState } from "react";
import { useMediaVerification } from "@website/context/MediaVerificationContext";
import {
  DECEPTION_TYPES,
  REVIEW_PREVIEW_IMAGE,
} from "@website/types/mediaVerification";

export default function ReviewStep() {
  const { mediaType, form, goPrev, submit } = useMediaVerification();
  const [confirmed, setConfirmed] = useState(false);
  const [shake, setShake] = useState(false);
  const [loading, setLoading] = useState(false);

  const deceptionLabel =
    DECEPTION_TYPES.find((d) => d.value === form.deceptionType)?.label ??
    form.deceptionType;

  const previewSrc = form.filePreviewUrl ?? REVIEW_PREVIEW_IMAGE;
  const fileLabel =
    form.file?.name ??
    (mediaType === "video" ? "video_sample_01.mp4" : "image_sample_01.jpg");

  const handleSubmit = () => {
    if (!confirmed) {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      submit();
      setLoading(false);
    }, 1500);
  };

  return (
    <>
      <section className="p-8 md:p-12">
        <div className="text-center mb-10">
          <div className="inline-block p-4 bg-surface-bright rounded-full mb-4 shadow-sm">
            <span className="material-symbols-outlined text-5xl text-gold-metallic-start ai-pulse">
              verified
            </span>
          </div>
          <h2 className="font-headline-md text-headline-md text-primary mb-2">
            مراجعة الطلب النهائية
          </h2>
          <p className="font-body-lg text-on-surface-variant max-w-lg mx-auto">
            راجع البيانات أدناه قبل الإرسال إلى خوارزميات الذكاء الاصطناعي
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          <div className="rounded-xl shadow-md overflow-hidden bg-white border border-mist-grey group">
            <div className="aspect-video w-full relative bg-mist-grey overflow-hidden">
              {mediaType === "image" ? (
                <img
                  alt="معاينة الصورة"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  src={previewSrc}
                />
              ) : (
                <video
                  className="w-full h-full object-cover"
                  src={previewSrc}
                  muted
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30">
                  <span className="material-symbols-outlined text-white text-sm">
                    {mediaType === "video" ? "movie" : "image"}
                  </span>
                  <span className="text-white text-xs font-label-bold">
                    {mediaType === "video" ? "فيديو" : "صورة"} • {fileLabel}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-headline-sm text-headline-sm text-primary mb-2">
                معاينة الوسائط
              </h3>
              <p className="font-body-md text-on-surface-variant">
                {mediaType === "video"
                  ? "تم الكشف عن ملامح وجه بشرية وعناصر صوتية جاهزة للتحليل العميق."
                  : "تم تحليل البيانات الوصفية للصورة وجاهزة للفحص العميق."}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-gutter">
            <div className="rounded-xl shadow-md p-6 bg-white border border-mist-grey">
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-primary">source</span>
                <h3 className="font-label-bold text-primary">معلومات المصدر</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-mist-grey">
                  <span className="text-on-surface-variant font-body-md">نوع المصدر</span>
                  <span className="text-primary font-label-bold">
                    {form.sourceType || "—"}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-mist-grey">
                  <span className="text-on-surface-variant font-body-md">الناشر</span>
                  <span className="text-primary font-label-bold">
                    {form.publisherName || "—"}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-mist-grey">
                  <span className="text-on-surface-variant font-body-md">التاريخ</span>
                  <span className="text-primary font-label-bold">
                    {form.publishDate || "—"}
                  </span>
                </div>
                {form.sourceUrl && (
                  <div className="flex justify-between items-center">
                    <span className="text-on-surface-variant font-body-md">الرابط</span>
                    <span className="text-gold-metallic-start font-label-bold underline truncate max-w-[180px]">
                      {form.sourceUrl}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-xl shadow-md p-6 bg-white border border-mist-grey">
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-primary">category</span>
                <h3 className="font-label-bold text-primary">السياق والنوع</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-2 px-3 py-1 bg-primary text-white rounded-full text-xs">
                  <span className="material-symbols-outlined text-xs">psychology</span>
                  <span>{deceptionLabel}</span>
                </div>
                {form.categories.map((cat) => (
                  <div
                    key={cat}
                    className="flex items-center gap-2 px-3 py-1 bg-surface-container-high text-primary rounded-full text-xs border border-outline-variant"
                  >
                    <span className="material-symbols-outlined text-xs">public</span>
                    <span>{cat}</span>
                  </div>
                ))}
                {form.urgent && (
                  <div className="flex items-center gap-2 px-3 py-1 bg-error/10 border border-error text-error rounded-full text-xs">
                    <span
                      className="material-symbols-outlined text-xs"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      priority_high
                    </span>
                    <span className="font-label-bold">أولوية مرتفعة</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 glass-panel p-8 rounded-2xl border border-mist-grey shadow-sm">
          <label
            className={`flex items-start gap-4 mb-8 cursor-pointer group ${shake ? "animate-shake" : ""}`}
          >
            <input
              checked={confirmed}
              className="w-6 h-6 mt-1 rounded border-mist-grey text-primary focus:ring-gold-metallic-start"
              type="checkbox"
              onChange={(e) => setConfirmed(e.target.checked)}
            />
            <span className="font-body-md text-on-surface-variant group-hover:text-primary transition-colors">
              أقر بصحة المعلومات المقدمة وأوافق على معالجة هذا الملف ضمن نظام
              &quot;زرقاء اليمامة&quot; للنزاهة الإعلامية.
            </span>
          </label>
          <div className="flex flex-col sm:flex-row-reverse gap-4">
            <button
              type="button"
              disabled={loading}
              className="flex-1 bg-primary text-white py-4 px-8 rounded-lg font-headline-sm hover:bg-zinc-800 transition-all shadow-lg flex items-center justify-center gap-3 group disabled:opacity-80"
              onClick={handleSubmit}
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined animate-spin">
                    progress_activity
                  </span>
                  جاري الإرسال...
                </>
              ) : (
                <>
                  <span>تقديم ملف للتحقق</span>
                  <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">
                    send
                  </span>
                </>
              )}
            </button>
            <button
              type="button"
              className="px-8 py-4 border border-primary text-primary rounded-lg font-label-bold hover:bg-mist-grey/20 transition-all"
              onClick={goPrev}
            >
              العودة للتعديل
            </button>
          </div>
        </div>
      </section>

      <footer className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl z-50 pointer-events-none">
        <div className="glass-panel px-6 py-4 rounded-full border border-gold-metallic-start/30 shadow-2xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-3 h-3 bg-gold-metallic-start rounded-full ai-pulse" />
              <div className="absolute inset-0 bg-gold-metallic-start rounded-full animate-ping opacity-30" />
            </div>
            <span className="font-label-bold text-primary hidden sm:inline">
              المساعد الذكي جاهز للمعالجة:
            </span>
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            {[
              { icon: "face", label: "Deepfake" },
              { icon: "settings_voice", label: "Voice Cloning" },
              { icon: "data_object", label: "Meta-data" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 whitespace-nowrap">
                <span className="material-symbols-outlined text-gold-metallic-start text-sm">
                  {item.icon}
                </span>
                <span className="text-xs font-label-bold text-on-surface-variant hidden md:inline">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
