import { useMediaVerification } from "@website/context/MediaVerificationContext";

export default function SuccessStep() {
  const { trackingId, reset } = useMediaVerification();

  return (
    <section className="p-12 md:p-20 text-center">
      <div className="w-24 h-24 bg-success-teal/10 rounded-full flex items-center justify-center mx-auto mb-8">
        <span
          className="material-symbols-outlined text-5xl text-success-teal"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          check_circle
        </span>
      </div>
      <h2 className="font-headline-md text-headline-md mb-4">
        تم استلام ملفك بنجاح
      </h2>
      <p className="text-body-lg text-on-surface-variant max-w-md mx-auto mb-10 leading-relaxed">
        فريق زرقاء اليمامة وأنظمة الذكاء الاصطناعي يبدأون العمل الآن على فحص
        الملف بدقة.
      </p>
      <div className="bg-surface-container rounded-xl p-6 inline-block mb-10 border border-mist-grey">
        <p className="text-xs text-on-surface-variant mb-2">رقم تتبع المعاملة</p>
        <p className="font-stats-number text-2xl tracking-widest text-primary">
          {trackingId}
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <button
          type="button"
          className="px-8 py-3 bg-primary text-white font-label-bold rounded-lg hover:opacity-90 transition-opacity"
        >
          متابعة حالة الملف
        </button>
        <button
          type="button"
          className="px-8 py-3 border border-primary text-primary font-label-bold rounded-lg hover:bg-mist-grey/20 transition-all"
          onClick={reset}
        >
          إرسال ملف جديد
        </button>
      </div>
    </section>
  );
}
