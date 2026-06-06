import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { WEBSITE_ROUTES } from "@core/constants/routes";
import { SIDEBAR_LOGO } from "@website/constants/brand";

const FILTERS = [
  "الكل",
  "استقصائية",
  "إنسانية",
  "اجتماعية",
  "اقتصادية",
  "بيئية",
] as const;

const IMPACT_REPORTS = [
  {
    title: "الخداع البصري: ثغرات التزييف العميق في السياسة",
    meta: "تأثير مرتفع • ١.٢ مليون مشاهدة",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA7PFgpUS5fjJBUoscjFXN2w8_ch6V1sQuRFRxeuGFxP4vrqeYSRraE08HgOGDQ8y2SEfcnNjjMRz7yFm7BNwlaoLN-nODHh_GK3U7UK15LVXAeGPDZyvzNzWC6A6kbe8uFfjrvxvGBLH0I1mKjvn4OGHZuurTQWWXZYgF5DcAl35kHF79vTMQ1i8Hu9h5bgv00ASSbAYJl5Grf8-9YdmLqlGYKeaPMielsWykbrMzQ8c9L7sV2Ed9oashTfAQFiIHnlWnPVoRJ-xte",
    alt: "شاشة هاتف تعرض تصوراً بيانياً لبيانات التواصل الاجتماعي",
  },
  {
    title: "بيانات الذهب الأسود: تلاعب الأسعار عبر الإشاعة",
    meta: "تأثير متوسط • ٨٥٠ ألف مشاهدة",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCZ9cihNY8coBKhoRaxQ7W7WLwo57rhevP9fZ8O4omQMGpc4jE-DLR1xyytzN1MBoX9xWQkXxDaf5MQqPe6YdCROv3YgqblTrub68fuJ0aeMkqWN1jbyG5ZYq8jB2KxwwezY6_MyPdkXYjmYZ8bzdoj9uTil2qqw0FqyF8uZDfecVBb6KCHwWcMxpmkxdA3R0XtPoVOuZxrtI6LxvRcWuUiBuBkrmDdtSjjXwgMmMonZ42N4GGGQQRBzR4eG-jdUDiJsrlsZtnAB4vS",
    alt: "تابلت يعرض رسوماً بيانية مالية",
  },
  {
    title: "بصمات رقمية: كشف هوية مسربي الوثائق الزائفة",
    meta: "تأثير مرتفع • ٢.١ مليون مشاهدة",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAXRRximWQAtFcjuHsAgaRDIWmEMuAeyLkIzkBHe3W3uXPJRDebmuroKPBKEmQrb4LTr9T71T9jtDI3qwfwICxU1bFLiyyyJ_aoJ0R6Hb030Bp1_h7FiFbkxjaYaXOOG0MikVGsG9wj_Ibfywb8QFAKNVaCuYnDl-heoVvyo4SVkzpqZpR56Yrbke44-VVI5t4aps-O8FbXy-ZE1LlcKy_7tsyt3dd4m9mSmW_zNvP0DC27ODz5uAC-O_Ti-JtSF2tvDdOzUOp0qt7V",
    alt: "شاشة تعرض خريطة تحليل روابط",
  },
];

export default function InvestigativeReports() {
  const [activeFilter, setActiveFilter] =
    useState<(typeof FILTERS)[number]>("الكل");

  useEffect(() => {
    document.title = "التقارير الاستقصائية | زرقاء اليمامة";
  }, []);

  return (
    <>
      <div className="px-margin-desktop py-12 mist-overlay">
        <section className="mb-16">
          <div className="max-w-4xl">
            <h2 className="font-display-lg text-display-lg text-primary mb-6 leading-tight">
              التقارير الاستقصائية
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed max-w-3xl">
              نغوص في أعماق البيانات لكشف زيف التلاعب الإعلامي. تقاريرنا تعتمد
              على الذكاء الاصطناعي والتحليل الجنائي للوسائط لتقديم الحقيقة
              المجردة من التحيزات والضجيج الرقمي.
            </p>
          </div>
        </section>

        <div className="flex flex-wrap items-center gap-4 mb-12 border-b border-mist-grey pb-6">
          <span className="font-label-bold text-label-bold text-on-surface-variant ml-4">
            التصنيف:
          </span>
          {FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full font-label-bold text-label-bold transition-all ${
                activeFilter === filter
                  ? "bg-primary text-white"
                  : "border border-outline hover:border-gold-metallic-start hover:text-gold-metallic-start"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
          <div className="xl:col-span-8 space-y-10">
            <article className="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-transparent hover:border-gold-metallic-start/30">
              <div className="relative h-72 overflow-hidden">
                <img
                  alt="غرفة عمليات سيبرانية مع شاشات متعددة"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAAySVimBx1RqLRqsjYu56qWmEzu0zWnwcz2yljmo2WEYbsZq_OiRBMrm3LJKyZvVElu4qitOqXNhBpJujn8kgCXE7FI3l5pl-PES57qR7d9rsjqUQs8Riv9ysPIKverCCIrFYFC6TU1y0VH-IRX4qj_lr3pkxthVp6ETfmKqhFkGeP7_N0Wk2daMdddMGiKMcJcyX3w2XnNc7AgPvSOJRN0r5V5bFvbJBDMXYnLA7iFE4EGB4x5ryNII4ouCAiGhtgg3dRVy8hWDz"
                />
                <div className="absolute top-4 right-4 bg-primary px-4 py-1 rounded text-white font-label-bold text-xs">
                  اقتصادية
                </div>
                <div className="absolute bottom-4 left-4 glass-panel px-4 py-2 rounded flex items-center gap-2">
                  <span className="material-symbols-outlined text-gold-metallic-start text-sm">
                    verified
                  </span>
                  <span className="font-label-bold text-sm text-primary">
                    نزاهة AI: 94%
                  </span>
                </div>
              </div>
              <div className="p-8">
                <h3 className="font-headline-sm text-headline-sm text-primary mb-4 group-hover:text-gold-metallic-start transition-colors">
                  شبكات الظل: تتبع تمويل حملات التضليل العابرة للحدود
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6 line-clamp-2">
                  تحقيق يكشف عن شبكة معقدة من الشركات الوهمية التي تمول
                  منصات إخبارية زائفة للتأثير على أسواق الطاقة العالمية
                  باستخدام تقنيات التزييف العميق.
                </p>
                <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-mist-grey">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-on-surface-variant">
                      <span className="material-symbols-outlined text-sm">
                        calendar_today
                      </span>
                      <span className="text-sm">١٤ أكتوبر ٢٠٢٣</span>
                    </div>
                    <div className="flex items-center gap-2 text-on-surface-variant">
                      <span className="material-symbols-outlined text-sm">
                        person
                      </span>
                      <span className="text-sm">د. أحمد سلامة</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="flex items-center gap-2 text-primary font-label-bold hover:gap-4 transition-all"
                  >
                    اقرأ التقرير الكامل
                    <span className="material-symbols-outlined">arrow_back</span>
                  </button>
                </div>
              </div>
            </article>

            <article className="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-transparent hover:border-gold-metallic-start/30">
              <div className="relative h-72 overflow-hidden">
                <img
                  alt="تمثيل رقمي لشبكة أقمار صناعية حول الأرض"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzEXoPPBDq_C0fNY3LvfKwi6ceZrAedD0Alg-FfWVdlxX0lqnQ1PLqHFA9d3bfR6Gb8uCzRuNNhxWODDqOncfD5x4Fv5VJB43SbgFG48VmpaTZiImFerUia9-ZPdnkhyCqmShcsMtzrtXDQrWtevdTQ3CpN5rJvfTtLpFtOdnVrrq1Vlv-kTEMhNiEqH4lnm30028nzobbHawChR1ij8EWzCIe4LLCcc-CjaFFc_jOH2GzhL_d_MUlKdjg3ibXs8iMeKWti14vGtuT"
                />
                <div className="absolute top-4 right-4 bg-primary px-4 py-1 rounded text-white font-label-bold text-xs">
                  استقصائية
                </div>
                <div className="absolute bottom-4 left-4 glass-panel px-4 py-2 rounded flex items-center gap-2">
                  <span
                    className="material-symbols-outlined text-gold-metallic-start text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    stars
                  </span>
                  <span className="font-label-bold text-sm text-primary">
                    نزاهة AI: 89%
                  </span>
                </div>
              </div>
              <div className="p-8">
                <h3 className="font-headline-sm text-headline-sm text-primary mb-4 group-hover:text-gold-metallic-start transition-colors">
                  تلاعب الخوارزميات: كيف تصاغ الآراء العامة في الأزمات
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6 line-clamp-2">
                  دراسة تحليلية لبيانات ملايين الحسابات الآلية التي قامت
                  بتوجيه الحوار العام حول أزمة المناخ الأخيرة، وكشف الجهات
                  المحركة لهذه البوتات.
                </p>
                <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-mist-grey">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-on-surface-variant">
                      <span className="material-symbols-outlined text-sm">
                        calendar_today
                      </span>
                      <span className="text-sm">٠٢ نوفمبر ٢٠٢٣</span>
                    </div>
                    <div className="flex items-center gap-2 text-on-surface-variant">
                      <span className="material-symbols-outlined text-sm">
                        person
                      </span>
                      <span className="text-sm">ليلى المنصور</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="flex items-center gap-2 text-primary font-label-bold hover:gap-4 transition-all"
                  >
                    اقرأ التقرير الكامل
                    <span className="material-symbols-outlined">arrow_back</span>
                  </button>
                </div>
              </div>
            </article>
          </div>

          <aside className="xl:col-span-4 space-y-8">
            <div className="bg-surface-container-low rounded-xl p-8 border border-mist-grey">
              <h3 className="font-headline-sm text-headline-sm text-primary mb-8 flex items-center gap-3">
                <span
                  className="material-symbols-outlined text-gold-metallic-start"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  trending_up
                </span>
                أكثر التقارير تأثيراً
              </h3>
              <div className="space-y-6">
                {IMPACT_REPORTS.map((report) => (
                  <div key={report.title} className="flex gap-4 group cursor-pointer">
                    <div className="shrink-0 w-16 h-16 rounded overflow-hidden">
                      <img
                        alt={report.alt}
                        className="w-full h-full object-cover"
                        src={report.image}
                      />
                    </div>
                    <div>
                      <h4 className="font-label-bold text-primary group-hover:text-gold-metallic-start transition-colors leading-tight mb-1">
                        {report.title}
                      </h4>
                      <span className="text-xs text-on-surface-variant">
                        {report.meta}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="w-full mt-8 py-3 border border-primary text-primary font-label-bold rounded hover:bg-primary hover:text-white transition-all"
              >
                عرض قائمة الشرف كاملة
              </button>
            </div>

            <div className="bg-primary text-white rounded-xl p-8 shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="font-headline-sm text-headline-sm mb-4">
                  مقياس النزاهة
                </h3>
                <p className="text-sm opacity-80 mb-6">
                  يتم فحص كل تقرير عبر محركنا المتطور للتحقق من الموثوقية
                  والمصادر.
                </p>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-label-bold">
                    متوسط نزاهة الشهر
                  </span>
                  <span className="text-gold-metallic-end font-stats-number text-lg">
                    ٩١.٤٪
                  </span>
                </div>
                <div className="w-full h-2 bg-on-primary-container rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gold-metallic-start"
                    style={{ width: "91.4%" }}
                  />
                </div>
              </div>
              <div className="absolute -bottom-10 -left-10 opacity-10">
                <span className="material-symbols-outlined text-[120px]">
                  shield_with_heart
                </span>
              </div>
            </div>

            <div className="bg-surface-container-highest rounded-xl p-8 border border-mist-grey">
              <h3 className="font-label-bold text-primary mb-2">
                اشترك في النشرة الاستقصائية
              </h3>
              <p className="text-sm text-on-surface-variant mb-6">
                احصل على تنبيهات التقارير الحصرية فور صدورها.
              </p>
              <div className="space-y-3">
                <input
                  className="w-full bg-surface border-outline-variant focus:ring-gold-metallic-start rounded p-3 text-sm"
                  placeholder="البريد الإلكتروني"
                  type="email"
                />
                <button
                  type="button"
                  className="w-full py-3 bg-tertiary text-white font-label-bold rounded hover:opacity-90 transition-opacity"
                >
                  اشتراك
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <footer className="mt-section-gap px-margin-desktop py-12 border-t border-mist-grey flex flex-col md:flex-row justify-between items-center gap-6 text-on-surface-variant">
        <div className="flex items-center gap-4">
          <Link to={WEBSITE_ROUTES.HOME}>
            <img
              alt="زرقاء اليمامة"
              className="w-8 h-8 rounded-full grayscale opacity-50 hover:opacity-80 transition-opacity"
              src={SIDEBAR_LOGO}
            />
          </Link>
          <p className="text-sm">
            © {new Date().getFullYear()} زرقاء اليمامة. جميع الحقوق محفوظة.
          </p>
        </div>
        <div className="flex gap-8 text-sm">
          <a className="hover:text-gold-metallic-start" href="#">
            سياسة الخصوصية
          </a>
          <a className="hover:text-gold-metallic-start" href="#">
            شروط الاستخدام
          </a>
          <a className="hover:text-gold-metallic-start" href="#">
            تواصل معنا
          </a>
        </div>
      </footer>
    </>
  );
}
