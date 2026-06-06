import { useMediaVerification } from "@website/context/MediaVerificationContext";
import {
  CONTENT_CATEGORIES,
  DECEPTION_TYPES,
} from "@website/types/mediaVerification";

const inputClass =
  "w-full bg-surface-container-low/50 border border-mist-grey rounded-lg p-3 focus:ring-gold-metallic-start focus:border-gold-metallic-start";

export default function ContextStep() {
  const { form, updateForm } = useMediaVerification();

  const toggleCategory = (category: string) => {
    const next = form.categories.includes(category)
      ? form.categories.filter((c) => c !== category)
      : [...form.categories, category];
    updateForm({ categories: next.length ? next : [category] });
  };

  return (
    <section className="p-8 md:p-12">
      <header className="mb-10 text-right">
        <h2 className="font-headline-md text-headline-md text-primary mb-2">
          السياق الإضافي للمادة
        </h2>
        <p className="font-body-md text-on-surface-variant">
          ساعدنا في فهم الظروف المحيطة بهذه المادة لزيادة دقة التحليل
        </p>
      </header>

      <div className="space-y-10">
        <div className="space-y-4">
          <label className="font-label-bold text-label-bold text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-gold-metallic-start">
              category
            </span>
            تصنيف محتوى الوسائط
          </label>
          <div className="flex flex-wrap gap-3">
            {CONTENT_CATEGORIES.map((category) => {
              const selected = form.categories.includes(category);
              return (
                <button
                  key={category}
                  type="button"
                  className={`px-6 py-2 rounded-full border font-label-bold transition-all ${
                    selected
                      ? "bg-primary text-white border-primary"
                      : "border-mist-grey bg-white text-on-surface-variant hover:border-gold-metallic-start"
                  }`}
                  onClick={() => toggleCategory(category)}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <label className="font-label-bold text-label-bold text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-gold-metallic-start">
              error_outline
            </span>
            نوع التزييف المشتبه به
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DECEPTION_TYPES.map((type) => (
              <label
                key={type.value}
                className="relative flex items-center p-4 rounded-lg border border-mist-grey bg-white/50 cursor-pointer hover:border-gold-metallic-start transition-colors"
              >
                <input
                  checked={form.deceptionType === type.value}
                  className="w-4 h-4 text-primary focus:ring-gold-metallic-start border-mist-grey"
                  name="deception_type"
                  type="radio"
                  value={type.value}
                  onChange={() => updateForm({ deceptionType: type.value })}
                />
                <span className="mr-3 font-body-md text-primary">{type.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="p-6 bg-warning-amber/5 border border-warning-amber/20 rounded-xl flex gap-4">
          <span className="material-symbols-outlined text-warning-amber shrink-0">
            lightbulb
          </span>
          <p className="text-sm text-warning-amber font-medium">
            تقديم تفاصيل حول سبب شكوكك يساعد خوارزميات الذكاء الاصطناعي على
            التركيز على جوانب مثل التزييف العميق أو التلاعب الصوتي.
          </p>
        </div>

        <div className="space-y-4">
          <label
            className="font-label-bold text-label-bold text-primary flex items-center gap-2"
            htmlFor="contextDetails"
          >
            <span className="material-symbols-outlined text-gold-metallic-start">
              description
            </span>
            السياق التفصيلي
          </label>
          <textarea
            id="contextDetails"
            className={`${inputClass} p-4 font-body-md`}
            placeholder="اشرح بالتفصيل أين وجدت المادة ولماذا تشك في صحتها..."
            rows={4}
            value={form.contextDetails}
            onChange={(e) => updateForm({ contextDetails: e.target.value })}
          />
        </div>

        <div className="space-y-4">
          <label className="block font-label-bold mb-2" htmlFor="relatedLinks">
            روابط ذات صلة بالحدث
          </label>
          <input
            id="relatedLinks"
            className={inputClass}
            placeholder="روابط لأخبار رسمية أو تكذيبات سابقة..."
            type="text"
            value={form.relatedLinks}
            onChange={(e) => updateForm({ relatedLinks: e.target.value })}
          />
        </div>

        <div
          className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
            form.urgent
              ? "bg-error/5 border-error/30"
              : "bg-primary-fixed/30 border-outline-variant"
          }`}
        >
          <div className="flex items-center gap-3">
            <span
              className={`material-symbols-outlined ${form.urgent ? "text-error" : "text-on-surface-variant"}`}
              style={form.urgent ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              priority_high
            </span>
            <div>
              <p className="font-label-bold text-primary">طلب عاجل</p>
              <p className="text-[12px] text-on-surface-variant">
                يضع الطلب في أولوية المعالجة العالية
              </p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              checked={form.urgent}
              className="sr-only peer"
              type="checkbox"
              onChange={(e) => updateForm({ urgent: e.target.checked })}
            />
            <div className="w-11 h-6 bg-mist-grey rounded-full peer peer-checked:bg-error relative after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:-translate-x-full" />
          </label>
        </div>
      </div>
    </section>
  );
}
