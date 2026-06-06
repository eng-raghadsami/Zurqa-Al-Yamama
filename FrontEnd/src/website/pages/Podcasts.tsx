import { useState } from "react";

const HERO = {
  image:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAToFadJbbFaAmwn3F0Ar_0Szg8miRhQfdrNdu8LWpRtm91DAG93M7ZQri-nZq2X1oP0ca72taKGJEKvS63lLQUMFScETlTrv_XxfvPLZYU2yy9SpXZmv6wrGLopRRVXZPszl1FrqvtVYFttydEPd_0SZ46vdmJcRGySHxbSovKSwvXU-YgsWLTaHSvWhiteMkksLO7MpzV4OybGUwBXRmAVgShHGUnIf_tV5d4XUsGMDi1daAhsje-3XbpNPWBg2Q2GXI_354iKeix",
  title: "ما وراء الحقيقة: تجارة التضليل",
  description:
    'نغوص في أعماق الشبكات الخفية التي تدير حملات التزييف الإعلامي. تحقيق صوتي يكشف آليات صناعة "الواقع البديل" ومن يقف خلفها.',
};

const FILTERS = [
  "أحدث الحلقات",
  "الأكثر استماعاً",
  "تحقيقات صوتية",
  "مقابلات خاصة",
] as const;

const PLAYLISTS = [
  {
    title: "سلسلة استقصائية",
    episodes: "15 حلقة",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCFR1m82Q-BhFJwvguAVmbi7xme3KjVzNhf8xZcWKhIKwJGy4TCFnrTpFKkkWJrWAlY9FB1GOqspgLRTp9fcobz5turCE0FQISH3vAuYrOolcTbtPyPDfueDejkg32kUaZR5AxsdSvcCSyYjTpcKbPPWAsZHPuSF_VN-DmCxzg_rLgNl3a1kls53ZTeprhEdtr5e90ZY5TCPPpStoIlr8zKTtQgp-booDwBLSpJBJjcZscJXd30wh_DaCBwlF5f6tZVPSEcuvZU0-5T",
  },
  {
    title: "مسارات تدقيق الحقائق",
    episodes: "8 حلقات",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAy9A8pIWwiJaUC3vlWsvEgMLtnEF0yDnJl4KqCtkA5LbfeABuM4Kh6RJ1VdyUQnlyU3Ayq-lANgzal706eZXBg1TKXPmFu_Zchf7jurOwXP51N8FapXDNVyrX2vb2ibxpAxC9-9SBkMHIoXJ3_Qw5LGDQBrrYxBLgextUzv25Wv1ND2CziuGl7ak9_u3HisbJHGfHosCe9fbZdDRinJITIhLHWTdyowZqv2ZalA1YZGLpy81ERklI5O_Gz9hnr-nOpeT5_RzBDlYpr",
  },
  {
    title: "اختيارات المحرر",
    episodes: "24 حلقة",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBnN_XZ4QCLrEzCRwGy0NNnGfwiA64bIuKGMlyErblIX6GMj5dzFdS0LlrMf1LEMxZ8BBoSDRprg1gC_bOREMOL6uKHkEN2vDTHtJclgq9EJgCNWCXMLP_xAVYyPOKSZurKvl-YsqLPsHPHaMv36BcdLEeIey6HTuCj5FDMY6f4i_zQrQW4l5p8XEQuxKOiPfmD22Y41kFWMJeWi8BVsVJqqfQit_PyAT0TKRwPUkpuO1--aSvN4o7x6Hco97oHdOLcVoshjrJCAfbp",
  },
];

const EPISODES = [
  {
    title: "الذكاء الاصطناعي والتزييف العميق",
    date: "25 يونيو 2024",
    integrity: "98%",
    description:
      "كيف تطورت تقنيات التزييف العميق لتصبح سلاحاً في الحروب السيبرانية؟ مقابلة مع خبراء الأمن القومي.",
    duration: "42 دقيقة",
    listens: "3.4k استماع",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA-P-H8cQcAMZNvglw9ps9mqLUvqhhvVTTa98g6hRJB9qkuZxHcRGE6VgkoRWzD0mxbDkSKtPC48K5xgYyYzdifDBqts_RzlDnMJMmyRu6z9iGAWPO3Wi1yBtKMdsZQHb1_YQtUipi9VAyPrVXamEjh-CEGomkxH9s6huYs5J6m95TArUCXJGErsIzX5sBJPijNzDRcB9TC3maJvHbPtjpEy7zAMcHCGE5eZCWuxS1xuzRKYRVkr4flPSwNaJ4neg6BSokcwgJ31Xox",
  },
  {
    title: "اقتصاد المنصات المضللة",
    date: "18 يونيو 2024",
    integrity: "95%",
    description:
      'من يدفع ثمن الخبر الكاذب؟ تحقيق في النماذج الربحية لمواقع "الأخبار العاجلة" المزيفة.',
    duration: "35 دقيقة",
    listens: "2.1k استماع",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBrr-zqdflEwLu3G37qOyxOJ6PhLJ6BLNORB5fDKFHXGZry1bKsTvfECeWzR2_1ycipnZrZ6AKO4Ukm1fRKciqkQoLO9TiX230HA1qLY-wgsOBkxyFOTbs658u3z2SEAsy99hr1InXDAQarttSFHRYKOcztt5HEAv1gjvVWXtXs4ELabUMMc_KnoZCw-CAEa0aGm1CkppekypbTLNr3dbXBPf9mndXBysDsWS9ZYaN1MCFsG8kFdYbmj83IhZQsKmVuooe4BLdo-C0_",
  },
  {
    title: "مستقبل الصحافة الاستقصائية",
    date: "10 يونيو 2024",
    integrity: "100%",
    description:
      "هل يمكن للأدوات التقنية الحديثة أن تعيد للصحافة دورها كحارس للحقيقة في عصر الضجيج؟",
    duration: "58 دقيقة",
    listens: "5.8k استماع",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBnN_XZ4QCLrEzCRwGy0NNnGfwiA64bIuKGMlyErblIX6GMj5dzFdS0LlrMf1LEMxZ8BBoSDRprg1gC_bOREMOL6uKHkEN2vDTHtJclgq9EJgCNWCXMLP_xAVYyPOKSZurKvl-YsqLPsHPHaMv36BcdLEeIey6HTuCj5FDMY6f4i_zQrQW4l5p8XEQuxKOiPfmD22Y41kFWMJeWi8BVsVJqqfQit_PyAT0TKRwPUkpuO1--aSvN4o7x6Hco97oHdOLcVoshjrJCAfbp",
  },
];

const TRENDING = [
  {
    title: "شفرات الحقيقة",
    meta: "8 حلقات • تقني",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCFR1m82Q-BhFJwvguAVmbi7xme3KjVzNhf8xZcWKhIKwJGy4TCFnrTpFKkkWJrWAlY9FB1GOqspgLRTp9fcobz5turCE0FQISH3vAuYrOolcTbtPyPDfueDejkg32kUaZR5AxsdSvcCSyYjTpcKbPPWAsZHPuSF_VN-DmCxzg_rLgNl3a1kls53ZTeprhEdtr5e90ZY5TCPPpStoIlr8zKTtQgp-booDwBLSpJBJjcZscJXd30wh_DaCBwlF5f6tZVPSEcuvZU0-5T",
  },
  {
    title: "أسرار الفضاء الرقمي",
    meta: "12 حلقة • سياسة",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCZTxdKmgfgS0hnLm2arrB2FVGvw3CDEDBoDHGzXo_i6QNpbtaP52adl2RS_PNVX8LWLtu5TDunuX49wpwNxD7XLrFLpyxqXqa8WTrWNondc9y8Zto-cWE095P9OcodhyA3oQ1hCD0VB5NWdB3yAnYOWsSsMcdMf0JtQzd1Svoq6-uk45hrtgHdsmXxZQBUKSWtj9sEBw4zFqVmcPHL3n6OzvW7CgAZkbgl5G82Di_IuZGBiyD4uogtFGZGgzdv7Y6o-AnlCzbMY90w",
  },
  {
    title: "خلف كواليس الخبر",
    meta: "5 حلقات • إعلام",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAy9A8pIWwiJaUC3vlWsvEgMLtnEF0yDnJl4KqCtkA5LbfeABuM4Kh6RJ1VdyUQnlyU3Ayq-lANgzal706eZXBg1TKXPmFu_Zchf7jurOwXP51N8FapXDNVyrX2vb2ibxpAxC9-9SBkMHIoXJ3_Qw5LGDQBrrYxBLgextUzv25Wv1ND2CziuGl7ak9_u3HisbJHGfHosCe9fbZdDRinJITIhLHWTdyowZqv2ZalA1YZGLpy81ERklI5O_Gz9hnr-nOpeT5_RzBDlYpr",
  },
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-headline-sm text-headline-sm text-right mb-6 flex items-center justify-end gap-2">
      {children}
      <span className="w-8 h-[2px] bg-gold-metallic-start" />
    </h3>
  );
}

export default function Podcasts() {
  const [activeFilter, setActiveFilter] =
    useState<(typeof FILTERS)[number]>("أحدث الحلقات");

  return (
    <main>
      <section className="relative h-[500px] w-full overflow-hidden mb-12">
        <img
          alt="البودكاست المختار"
          className="w-full h-full object-cover"
          src={HERO.image}
        />
        <div className="absolute inset-0 bg-gradient-to-l from-primary/90 via-primary/40 to-transparent flex items-center justify-end px-margin-desktop">
          <div className="max-w-xl text-right text-white">
            <div className="flex items-center justify-end gap-2 mb-4">
              <span className="bg-gold-metallic-start/20 border border-gold-metallic-start text-gold-metallic-start px-3 py-1 rounded-full font-label-bold text-[12px] flex items-center gap-1">
                <span
                  className="material-symbols-outlined text-[16px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
                محتوى موثق
              </span>
              <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full font-label-bold text-[12px]">
                سلسلة حصرية
              </span>
            </div>
            <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-4">
              {HERO.title}
            </h2>
            <p className="font-body-lg text-body-lg text-primary-fixed/80 mb-8 leading-relaxed">
              {HERO.description}
            </p>
            <div className="flex gap-4">
              <button
                type="button"
                className="bg-gold-metallic-start text-primary px-8 py-3 rounded-lg font-label-bold flex items-center gap-2 hover:scale-105 transition-transform"
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  play_circle
                </span>
                استمع الآن
              </button>
              <button
                type="button"
                className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-3 rounded-lg font-label-bold hover:bg-white/20 transition-all"
              >
                اشتراك
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="px-margin-desktop mb-10">
        <div className="glass-panel p-6 rounded-xl flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm">
          <div className="flex gap-3 overflow-x-auto w-full md:w-auto">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                className={`whitespace-nowrap px-6 py-2 rounded-full font-label-bold transition-all ${
                  activeFilter === filter
                    ? "bg-primary text-white"
                    : "text-on-surface-variant hover:bg-surface-variant/50"
                }`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-8 text-primary">
            <div className="text-center">
              <p className="font-stats-number text-stats-number">12.5k</p>
              <p className="font-label-bold text-[12px] opacity-60">
                مستمع حالي
              </p>
            </div>
            <div className="w-px h-10 bg-outline-variant/30" />
            <div className="text-center">
              <p className="font-stats-number text-stats-number">48</p>
              <p className="font-label-bold text-[12px] opacity-60">
                سلسلة موثقة
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="px-margin-desktop mb-12">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-headline-sm text-headline-sm text-right flex items-center justify-end gap-2">
            قوائم التشغيل
            <span className="w-8 h-[2px] bg-gold-metallic-start" />
          </h3>
          <button
            type="button"
            className="flex items-center gap-2 text-gold-metallic-start hover:text-primary transition-colors font-label-bold"
          >
            <span>إنشاء قائمة جديدة</span>
            <span className="material-symbols-outlined">add_circle</span>
          </button>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4">
          {PLAYLISTS.map((playlist) => (
            <div
              key={playlist.title}
              className="min-w-[280px] bg-surface-container-low rounded-xl p-4 border border-outline-variant/10 hover:border-gold-metallic-start/30 transition-all group cursor-pointer"
            >
              <div className="aspect-square rounded-lg overflow-hidden mb-4 relative">
                <img
                  alt={playlist.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={playlist.image}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    type="button"
                    className="bg-gold-metallic-start text-primary w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      play_arrow
                    </span>
                  </button>
                </div>
              </div>
              <div className="text-right">
                <h4 className="font-label-bold text-lg mb-1">{playlist.title}</h4>
                <p className="text-[12px] text-on-surface-variant mb-4">
                  {playlist.episodes}
                </p>
                <button
                  type="button"
                  className="w-full py-2 bg-primary/5 hover:bg-primary/10 text-primary rounded-lg text-[12px] font-label-bold transition-colors"
                >
                  تشغيل الكل
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="px-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <SectionTitle>اكتشف التحقيقات الصوتية</SectionTitle>

          {EPISODES.map((episode) => (
            <div
              key={episode.title}
              className="group bg-surface-container-lowest border border-outline-variant/20 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row h-auto md:h-48 relative cursor-pointer"
            >
              <div className="w-full md:w-48 h-48 md:h-full relative overflow-hidden shrink-0">
                <img
                  alt={episode.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src={episode.image}
                />
                <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/0 transition-colors flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-white text-4xl opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    play_circle
                  </span>
                </div>
              </div>
              <div className="flex-1 p-6 flex flex-col justify-between text-right">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="bg-success-teal/10 text-success-teal border border-success-teal/30 px-2 py-0.5 rounded text-[10px] font-label-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">
                        verified_user
                      </span>
                      وسام النزاهة {episode.integrity}
                    </span>
                    <span className="text-on-surface-variant font-label-bold text-[12px]">
                      {episode.date}
                    </span>
                  </div>
                  <h4 className="font-headline-sm text-headline-sm mb-2 group-hover:text-gold-metallic-start transition-colors">
                    {episode.title}
                  </h4>
                  <p className="text-on-surface-variant font-body-md text-body-md line-clamp-2">
                    {episode.description}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-on-surface-variant font-label-bold text-[12px] mt-4 md:mt-0">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">
                      schedule
                    </span>
                    {episode.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">
                      headphones
                    </span>
                    {episode.listens}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-surface-container rounded-xl p-6">
            <h4 className="font-headline-sm text-[18px] text-right mb-6">
              سلاسل رائجة الآن
            </h4>
            <div className="space-y-4">
              {TRENDING.map((item) => (
                <div
                  key={item.title}
                  className="flex items-center gap-3 group cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                    <img
                      alt={item.title}
                      className="w-full h-full object-cover"
                      src={item.image}
                    />
                  </div>
                  <div className="text-right">
                    <p className="font-label-bold text-[14px] group-hover:text-gold-metallic-start transition-colors">
                      {item.title}
                    </p>
                    <p className="text-[12px] text-on-surface-variant">
                      {item.meta}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-6 rounded-xl border-gold-metallic-start/30 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold-metallic-start/5 rounded-full -mr-16 -mt-16" />
            <div className="relative z-10 text-right">
              <div className="flex items-center justify-end gap-2 mb-3">
                <p className="font-label-bold text-gold-metallic-start">
                  رؤية المحلل الذكي
                </p>
                <span className="material-symbols-outlined text-gold-metallic-start animate-pulse">
                  auto_awesome
                </span>
              </div>
              <p className="text-[14px] text-on-surface-variant leading-relaxed">
                نلاحظ زيادة بنسبة 40% في الاستماع للتحقيقات المتعلقة بالأمن
                السيبراني هذا الأسبوع. ننصح بمتابعة سلسلة &quot;شفرات الحقيقة&quot;
                لفهم أعمق للمشهد الحالي.
              </p>
              <button
                type="button"
                className="mt-4 text-[12px] font-label-bold text-primary underline"
              >
                عرض المزيد من التحليلات
              </button>
            </div>
          </div>

          <div className="bg-primary text-white p-6 rounded-xl text-right">
            <h4 className="font-headline-sm text-[18px] mb-2">
              هل لديك قصة تستحق النشر؟
            </h4>
            <p className="text-[14px] text-primary-fixed/60 mb-6">
              ساهم في نشر الحقيقة من خلال منصتنا الصوتية.
            </p>
            <button
              type="button"
              className="w-full py-3 bg-white text-primary rounded-lg font-label-bold hover:bg-gold-metallic-start transition-colors"
            >
              ابدأ تسجيلك الآن
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
