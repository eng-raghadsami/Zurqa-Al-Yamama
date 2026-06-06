import { useMediaVerification } from "@website/context/MediaVerificationContext";
import { SOURCE_TYPES } from "@website/types/mediaVerification";

const inputClass =
  "w-full bg-surface-container-low border border-mist-grey rounded-lg p-3 focus:ring-gold-metallic-start focus:border-gold-metallic-start";

export default function SourceDetailsStep() {
  const { form, updateForm } = useMediaVerification();

  return (
    <section className="p-8 md:p-12">
      <div className="text-center mb-10">
        <h2 className="font-headline-md text-headline-md mb-2">معلومات المصدر</h2>
        <p className="text-on-surface-variant">
          ساعدنا في تتبع أصل هذه الوسائط للتحقق منها بدقة
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-label-bold mb-2" htmlFor="sourceType">
              نوع المصدر <span className="text-error">*</span>
            </label>
            <select
              id="sourceType"
              className={inputClass}
              value={form.sourceType}
              onChange={(e) => updateForm({ sourceType: e.target.value })}
            >
              <option value="">اختر النوع</option>
              {SOURCE_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-label-bold mb-2" htmlFor="publishDate">
              تاريخ النشر <span className="text-error">*</span>
            </label>
            <input
              id="publishDate"
              className={inputClass}
              type="date"
              value={form.publishDate}
              onChange={(e) => updateForm({ publishDate: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-label-bold mb-2" htmlFor="sourceUrl">
              رابط المصدر
            </label>
            <input
              id="sourceUrl"
              className={inputClass}
              placeholder="https://..."
              type="url"
              value={form.sourceUrl}
              onChange={(e) => updateForm({ sourceUrl: e.target.value })}
            />
          </div>
          <div>
            <label className="block font-label-bold mb-2" htmlFor="publisherName">
              اسم الناشر أو الجهة
            </label>
            <input
              id="publisherName"
              className={inputClass}
              placeholder="أدخل اسم المصدر..."
              type="text"
              value={form.publisherName}
              onChange={(e) => updateForm({ publisherName: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block font-label-bold mb-2" htmlFor="sourceNotes">
            ملاحظات أولية عن المصدر
          </label>
          <textarea
            id="sourceNotes"
            className={inputClass}
            placeholder="اكتب أي سياق أو تفاصيل إضافية هنا..."
            rows={4}
            value={form.sourceNotes}
            onChange={(e) => updateForm({ sourceNotes: e.target.value })}
          />
        </div>
      </div>
    </section>
  );
}

export function isSourceDetailsValid(form: {
  sourceType: string;
  publishDate: string;
}) {
  return Boolean(form.sourceType && form.publishDate);
}
