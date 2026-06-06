import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { WEBSITE_ROUTES } from "@core/constants/routes";

const CATEGORIES = [
  "الكل",
  "فيديو",
  "تقارير مرئية",
  "أفلام قصيرة",
  "قصص مصورة",
  "مقابلات",
] as const;

const VIDEO_CARDS = [
  {
    category: "تقرير مرئي",
    date: "15 أكتوبر 2023",
    title: "أمن البيانات في عصر الذكاء الاصطناعي",
    excerpt:
      "تحقيق معمق حول كيفية حماية المصادر الصحفية في ظل تطور تقنيات التجسس الرقمي الحديثة.",
    duration: "12:45",
    integrity: "96%",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAF0i274VZFBu59BUEEtof4S261evTpt7ktPY4nfBJ1kPlXbz1hR5L3DfsIiBO-B6QITma-SU-WL4r_UEx9Aq4ceCInIZ_TKVhVmqixTQSgfC5bQZtkk7-UX9RwcyEmLiYAo4Ltzuiuzo49jcXi_TwttKljox5KcBGJCJ7Gd89Go7l4KGqLDKU71VWjzxiMuDTm9ux3ovfiQxNlnk1KouK9cCEWAzRyhJwWc-t9T9V8L2PEcVL1FKBhNE3rzs2oRhzqml9RZq9yg7uV",
    alt: "مختبر رقمي مع شاشات بيانات",
  },
  {
    category: "أفلام قصيرة",
    date: "12 أكتوبر 2023",
    title: "الحدود الرقمية: صراع النفوذ التقني",
    excerpt:
      "فيلم وثائقي قصير يستعرض التوترات الجيوسياسية في فضاء الإنترنت وتأثيرها على تدفق المعلومات.",
    duration: "08:20",
    integrity: "99%",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAi1VveRfQrbjmidX6TLaT8anlSgADj62m1N_sAettq3NdOzJl5zAv5I0eoVjWNP01h7PsokXtRWfnABDbVhkH-6n3XTOdI8VEi_BZmigHJ84zpT4E7BbZDHelRZ9GHpbrCCZiy_bhe28PoFLHeuEqKiSllREqMdYMnHg2g4aX-29BiGSnmfE6GTaWoXr1FA9XhRUDlo5isYfRw1BYZoKRRlm9gN2mPib3ZBLDG2Fn0kjl5v-6JOqRY0s5UW7L7Pd9HZ0JCszGUb7Eo",
    alt: "خريطة رقمية عالمية",
  },
  {
    category: "مقابلات",
    date: "10 أكتوبر 2023",
    title: "لقاء خاص: أخلاقيات الذكاء الاصطناعي",
    excerpt:
      "مقابلة مع خبراء دوليين لمناقشة التحديات الأخلاقية والقانونية لتقنيات التزييف العميق.",
    duration: "25:10",
    integrity: "94%",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC8XxuD26WNSD_IIwZKfCEAz3w-j9GoouGRn5-FmXCUvO3Xjc7VtPCmk3Io8Pog5slKPBXbM1zXk8UR-wtTzK9nbA8HsKJf1IsSLmHGi__SgFaXBnuhLzX4p9mWx3G4vu_LpCA3TqTyvdARDywVRVZjI54c0UInNcsPJRFBqjQ0CnaKfNeBTVzybxlNRklIS-bzQX4luHq9n1M4jbdJqH0ITsx72hjyN7K8f-2QW-66M1dIBfwfGYlGVnJsv9FR5bmh3Z-_ADl_94lS",
    alt: "صحفي في استوديو مقابلة",
  },
  {
    category: "فيديو",
    date: "08 أكتوبر 2023",
    title: "مستقبل الصحافة الاستقصائية",
    excerpt:
      "كيف تغير التكنولوجيا قواعد اللعبة في الكشف عن الفساد وتوثيق الحقائق في الميدان.",
    duration: "05:55",
    integrity: "97%",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBaRM02dSO_oKmi4Mg_9Iw3fthJQbE-DMj9-OTr2qDfW0Ymp3FRIsnGej1Xcv8W9b74JSZll5FlQDvAZf_iIh0wa8X0pie5oQILrGpeiglxC538mfpQQsid5wfQuSHtOQT0txGJdTOl_YTCfdcJfhYbf-l63k9b1pczTZY0U038ZrNS7FlZc2vjdmFG8L9JS5DiygrG73BK21w0GwC0LJqmfn4MQYYB393kFo0VqORroyIx7AZzP4Rssk6zoXk96BEZm1QrWhtzHGs9",
    alt: "صحف على طاولة",
  },
];

const PODCASTS = [
  {
    title: "صوت الحقيقة #42",
    meta: "منذ يومين • 45 دقيقة",
    excerpt: "نقاش مع د. سمير كمال حول مستقبل الخصوصية الرقمية.",
  },
  {
    title: "عين الاستقصاء #12",
    meta: "منذ 5 أيام • 38 دقيقة",
    excerpt: "كيف تتبعنا مسار الأموال المهربة عبر الملاذات الضريبية؟",
  },
  {
    title: "ما وراء الخبر #08",
    meta: "منذ أسبوع • 52 دقيقة",
    excerpt: "تحليل لغة الجسد في التصريحات السياسية المثيرة للجدل.",
  },
];

export default function Visuals() {
  const [activeCategory, setActiveCategory] =
    useState<(typeof CATEGORIES)[number]>("الكل");

  useEffect(() => {
    document.title = "المرئيات | زرقاء اليمامة";
  }, []);

  return (
    <main className="max-w-container-max mx-auto px-margin-desktop py-8">
      <section className="relative w-full h-[600px] rounded-xl overflow-hidden mb-section-gap group">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBKWRcjyXj5-pUCg3FS0OLCFVk58AGnHOuHrlrmaNcbmw99NKeg8_TR6qeKxFnV1KmY2sQApEsFqqGO58hoAg5VY0a9iBg6EGrlbASOVhLiZX8hFCWoD4uonxm-BnmcKQhBxdnWHpOCFVyTaOMIgxynvzLMx4SYuGadIJ0SkdZqwfVJlcPV8oI3zx54luZd7t_Wr0GzIsFOEXs6YgxKNxMloXSqLkkw0pVPMY__SWvYmmalGFWn44ExNFnMVtmK8wPgfvS0w_s9aG59')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
        <div className="absolute bottom-0 right-0 p-12 w-full md:w-2/3 flex flex-col items-start gap-4">
          <span className="px-3 py-1 bg-gold-metallic-start text-on-primary font-label-bold rounded">
            فيلم مميز
          </span>
          <h1 className="font-display-lg text-display-lg text-white leading-tight">
            ظل الحقيقة: تفكيك شبكات التزييف
          </h1>
          <p className="font-body-lg text-white/80 max-w-2xl">
            رحلة استقصائية في عمق غرف عمليات التضليل الرقمي، كيف يتم صناعة
            &quot;الواقع البديل&quot; ومن يقف خلفه؟
          </p>
          <div className="flex items-center gap-4 mt-4">
            <button
              type="button"
              className="flex items-center gap-2 px-8 py-4 gold-gradient-bg text-primary font-label-bold rounded-lg shadow-xl hover:scale-105 transition-transform"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                play_arrow
              </span>
              شاهد الآن
            </button>
            <button
              type="button"
              className="flex items-center gap-2 px-8 py-4 glass text-white font-label-bold rounded-lg hover:bg-white/10 transition-all"
            >
              <span className="material-symbols-outlined">info</span>
              التفاصيل
            </button>
          </div>
        </div>
      </section>

      <div className="flex flex-col lg:flex-row-reverse gap-gutter">
        <div className="lg:w-3/4">
          <div className="flex items-center gap-4 overflow-x-auto pb-6 mb-8">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full font-label-bold whitespace-nowrap transition-all ${
                  activeCategory === category
                    ? "bg-primary text-white"
                    : "bg-white text-on-surface-variant hover:border-gold-metallic-start border border-outline-variant/30"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {VIDEO_CARDS.map((video) => (
              <article
                key={video.title}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    alt={video.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    src={video.image}
                  />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span
                      className="material-symbols-outlined text-white text-6xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      play_circle
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 px-2 py-1 bg-primary/80 text-white text-xs font-label-bold rounded">
                    {video.duration}
                  </div>
                  <div className="absolute top-3 left-3 px-2 py-1 glass text-gold-metallic-start text-xs font-label-bold rounded border border-gold-metallic-start/30">
                    نزاهة: {video.integrity} ✨
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-label-bold text-gold-metallic-start uppercase">
                      {video.category}
                    </span>
                    <span className="text-xs text-outline font-body-md">
                      {video.date}
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-primary group-hover:text-gold-metallic-start transition-colors mb-2">
                    {video.title}
                  </h3>
                  <p className="text-on-surface-variant font-body-md line-clamp-2">
                    {video.excerpt}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <button
              type="button"
              className="px-8 py-3 border border-primary text-primary hover:bg-primary hover:text-white transition-all font-label-bold rounded-lg"
            >
              عرض المزيد من الفيديوهات
            </button>
          </div>
        </div>

        <aside className="lg:w-1/4">
          <div className="bg-surface-container-low rounded-xl p-6 shadow-sm border border-outline-variant/20 sticky top-28">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-gold-metallic-start">
                mic
              </span>
              <h2 className="font-headline-sm text-headline-sm text-primary">
                البودكاست الأحدث
              </h2>
            </div>
            <div className="space-y-6">
              {PODCASTS.map((podcast, index) => (
                <div key={podcast.title}>
                  {index > 0 && (
                    <hr className="border-outline-variant/30 mb-6" />
                  )}
                  <div className="group cursor-pointer">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 rounded bg-primary flex items-center justify-center group-hover:bg-gold-metallic-start transition-colors">
                        <span
                          className="material-symbols-outlined text-white"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          play_arrow
                        </span>
                      </div>
                      <div>
                        <h4 className="font-label-bold text-primary group-hover:text-gold-metallic-start transition-colors">
                          {podcast.title}
                        </h4>
                        <p className="text-[12px] text-outline">{podcast.meta}</p>
                      </div>
                    </div>
                    <p className="text-sm text-on-surface-variant font-body-md line-clamp-2">
                      {podcast.excerpt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              className="block w-full mt-8 py-3 text-center text-primary font-label-bold hover:bg-white rounded transition-colors border border-transparent hover:border-outline-variant/30"
              to={WEBSITE_ROUTES.PODCASTS}
            >
              استمع لجميع الحلقات
            </Link>
          </div>

          <div className="mt-8 bg-gradient-to-br from-primary-container to-primary p-6 rounded-xl text-white shadow-xl relative overflow-hidden">
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-gold-metallic-start opacity-10 rounded-full blur-2xl" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-gold-metallic-start">
                  smart_toy
                </span>
                <h3 className="font-label-bold">مساعدي الذكي</h3>
              </div>
              <p className="text-xs text-white/80 font-body-md mb-4 leading-relaxed">
                أقوم حالياً بتحليل صحة الفيديو &quot;أمن البيانات&quot; بنسبة
                96%. هل ترغب في عرض التفاصيل الفنية للمصادقة؟
              </p>
              <button
                type="button"
                className="w-full py-2 bg-white/10 hover:bg-white/20 rounded text-xs font-label-bold transition-all border border-white/20"
              >
                فتح التحليل العميق
              </button>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
