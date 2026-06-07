import { useEffect } from "react";
import RevealOnScroll from "@shared/components/RevealOnScroll";
import { EnterItem, StaggerReveal } from "@shared/components/animations";

const STORY_CARDS = [
  {
    tag: "إنساني",
    integrity: "94%",
    title: "جسور الأمل: مبادرة شبابية لدعم كبار السن",
    excerpt:
      "تعرف على قصة المتطوعين الذين كرسوا وقتهم لكسر عزلة المسنين في المناطق النائية وتوفير الرعاية النفسية اللازمة لهم.",
    time: "منذ 3 ساعات",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDgYEQSXOWQqrBt2zXcg8R78pCNP55uOqAOYTuaNSpz53XdjwnYFaDCIxLnZyeSewOTXoQGv5fO8A7kCk_6q2RgiA2LGv61DJ4X5J1viY-e6HJm7abIf208hko3haQ2CkGareB9U8h4WS1MNBCtFaNaBBzFiDR34pz2oqZBB2AZR3LmAhGF_dL5uX94nROTDgE4uGFpVfS5Sy4Mh9H9W7k9fUQiYJgqQjPKAi1lML7FYUsf5Bpzl9YRIwaY-zq2_onBO-cxeeuYM0Wh",
    alt: "أيدي متعددة تزرع شتلة في التربة",
  },
  {
    tag: "اجتماعي",
    integrity: "89%",
    title: "ثورة التعليم الرقمي في القرى المحرومة",
    excerpt:
      "كيف ساهمت التكنولوجيا في تقليص الفجوة المعرفية بين المدن والأرياف وتوفير فرص تعليمية متكافئة للجميع.",
    time: "منذ يوم واحد",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD2Y6jKNN3n3z4roOpo4cE3shd0IwdioMmlChHq5BrYvkROd5AMVxvT-qjb90fch3GWbo6Z9ptmfYMTfxUVC-PUSbKmUaLDKoovGXu8EPQuP9ww8XNUwbgOF_KnLvmrCVVretSvfGrD1bJjUma2XGCxUJ0f2PxoS-nZj83YydN2s31wE4KPGxENguQx-4RfkTscdPm8O-jWTvbHPVDvI0wFDm3iwCx01hEhBR0Fu-W_GmJpmhYnvDJy6ya-rrxPD1RZne4uks9Y4aNB",
    alt: "طلاب في فصل دراسي رقمي",
  },
  {
    tag: "نجاح",
    integrity: "97%",
    title: "بصمة خضراء: امرأة تقود التغيير البيئي",
    excerpt:
      "رحلة كفاح بدأت بفكرة بسيطة لإعادة التدوير وتحولت إلى مشروع قومي يخدم البيئة والمجتمع المحلي.",
    time: "منذ يومين",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDWNLEXovI27SgWrDZhbG5m7EmVV2jPAQY6lJ6ve1uCP1nAGNS5VRn3jFNzpdPiMkS5awZL5gpV2RBbJD6Vr84A5Wg69tMmRxj0axeXaIljwWp_3v36mKez1pUzu0hYbBzLkk1fNHvC4Yove1CDOOAGtj_mFfn9R_XPpoIz1_lBa7UGTgQXXqlsr-qs8qDcJ6KKA0hDAgN9wjmNZC2Zl5iw4XP0cv0-u21YS1NxKu6op2TcfMuhlzuEGUhSW8MfihVoHoiaAXkYyrK1",
    alt: "امرأة تطل على مشروع طاقة متجددة",
  },
  {
    tag: "إنساني",
    integrity: "92%",
    title: "إحياء الحرف: حكايات من مشغل النسيج",
    excerpt:
      "قصص مجموعة من النساء اللواتي وجدن في النسيج وسيلة للتحرر الاقتصادي والحفاظ على التراث الشعبي.",
    time: "منذ أسبوع",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAesPZUFbkzzpAJPd254b7IIQE6NjI8hyYVOoNVeUe0QuWojrwdmSQ6BrwigLUgyFaEh0WLKykm-ZsfzLdc2visdmM-zdI5CbYtgvedY0COKCOqRx9BZbCj4njGBtx-_KSrAxR-9HJkTWC2UcnhnbpvBYTdfYLgrx-28FX0VwYoNgYxddTwwZpulrw--RWzJ273-5nZXfTmZzNtOodFi-fl31rI0MBjUqq0-zIHgkwLtaBxeGj0rBXNWKWQKsOmP21TUoQmq_rPO7Ei",
    alt: "أدوات نسيج تقليدية",
  },
];

const TRENDING_STORIES = [
  {
    rank: "01",
    title: "المتطوعون في مواجهة الجفاف: أمل جديد للحقول",
    views: "12.4K",
    comments: "48",
  },
  {
    rank: "02",
    title: "الأم المثالية في حي التضامن: قصة تحدي وصمود",
    views: "8.2K",
    comments: "32",
  },
  {
    rank: "03",
    title: "العدالة الاجتماعية في العصر الرقمي: تحديات معاصرة",
    views: "5.1K",
    comments: "15",
  },
];

const TAGS = ["#مبادرات", "#مجتمع", "#تمكين"];

export default function HumanitarianStories() {
  useEffect(() => {
    document.title = "القصص الإنسانية والاجتماعية - زرقاء اليمامة";
  }, []);

  return (
    <main className="py-10">
      <section className="mb-section-gap relative px-margin-desktop lg:px-0">
        <div className="relative w-full h-[500px] overflow-hidden rounded-xl shadow-2xl">
          <img
            alt="قصة مميزة"
            className="w-full h-full object-cover site-hero-ken-burns"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA39hY2wakji6A_mbuWF2uhyOcIsrz1ENSqxunnwv1kqIqPU2GV4QixYsSK2RsbHtsrQXrCYqvPF9wO7P1d3rEXzkB83HZEjy4L5mHRo7K2y36yHX50jP76oQLS86Q3uf4_VkBz5nUKHlSvE2qe40-9t9t2rfNI6h1NHsXpDlYid-7c9Xwm1a9S0s9TMFWHaZ5HAvRR7IyFDyBwU3tefwoiR5NsdCeSxQe_65m7YUN3oIOJozPhaHTpgGaEsWG9y9SQyUdg_IJRzyxM"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
          <div className="absolute bottom-0 right-0 p-12 max-w-2xl text-white site-hero-overlay-enter">
            <EnterItem index={0}>
              <span className="bg-gold-metallic-start text-white text-[12px] font-label-bold px-3 py-1 rounded-sm uppercase tracking-wider mb-4 inline-block">
                قصة مميزة
              </span>
            </EnterItem>
            <EnterItem index={1}>
              <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-4">
                نور في العتمة: كيف أعاد المجتمع بناء مدرسته من الركام
              </h1>
            </EnterItem>
            <EnterItem index={2}>
              <p className="text-body-lg text-mist-grey/90 mb-8 leading-relaxed">
                في قلب قرية منسية، اجتمع الأهالي بروح لا تعرف اليأس، ليرسموا
                ملامح مستقبل مشرق لأطفالهم، متحدين الصعاب وقوة الإحباط.
              </p>
            </EnterItem>
            <EnterItem index={3}>
              <button
                type="button"
                className="bg-white text-primary font-label-bold px-8 py-4 rounded-sm flex items-center gap-3 hover:bg-gold-metallic-start hover:text-white transition-all transform hover:-translate-y-1 site-btn-shine"
              >
                اقرأ القصة كاملة
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
            </EnterItem>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 px-margin-desktop lg:px-0">
        <div className="xl:col-span-8">
          <RevealOnScroll
            direction="up"
            className="flex items-center justify-between mb-8"
          >
            <h2 className="font-headline-md text-headline-md border-r-4 border-gold-metallic-start pr-4 site-section-title site-section-title-visible">
              القصص الإنسانية والاجتماعية
            </h2>
            <div className="flex gap-2">
              <button
                type="button"
                className="p-2 border border-outline-variant hover:bg-surface-variant transition-all rounded-sm"
              >
                <span className="material-symbols-outlined">grid_view</span>
              </button>
              <button
                type="button"
                className="p-2 border border-outline-variant hover:bg-surface-variant transition-all rounded-sm"
              >
                <span className="material-symbols-outlined">view_list</span>
              </button>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {STORY_CARDS.map((story, index) => (
              <StaggerReveal
                key={story.title}
                as="article"
                index={index}
                className="group site-card-hover bg-surface-container-lowest rounded-sm overflow-hidden shadow-sm border border-transparent hover:border-gold-metallic-start"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    alt={story.alt}
                    className="w-full h-full object-cover site-card-image"
                    src={story.image}
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <span className="bg-primary/80 backdrop-blur-md text-white text-[10px] px-2 py-1 font-label-bold">
                      {story.tag}
                    </span>
                    <div className="flex items-center gap-1 bg-white/90 backdrop-blur-md px-2 py-1 rounded-sm shadow-sm">
                      <span
                        className="material-symbols-outlined text-gold-metallic-start text-[14px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        verified
                      </span>
                      <span className="text-[10px] font-label-bold text-primary">
                        نزاهة: {story.integrity}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-headline-sm text-headline-sm mb-2 group-hover:text-gold-metallic-start transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-on-surface-variant text-body-md mb-4 line-clamp-2">
                    {story.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-mist-grey" />
                      <span className="text-[12px] text-outline">
                        {story.time}
                      </span>
                    </div>
                    <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">
                      share
                    </span>
                  </div>
                </div>
              </StaggerReveal>
            ))}
          </div>

          <RevealOnScroll direction="up" className="mt-12 flex justify-center">
            <button
              type="button"
              className="bg-primary text-white font-label-bold px-10 py-3 rounded-sm flex items-center gap-2 hover:bg-gold-metallic-start transition-all site-btn-shine"
            >
              تحميل المزيد من القصص
              <span className="material-symbols-outlined">expand_more</span>
            </button>
          </RevealOnScroll>
        </div>

        <aside className="xl:col-span-4 space-y-8">
          <RevealOnScroll direction="left">
          <div className="bg-surface-container-low p-6 rounded-xl shadow-sm">
            <h3 className="font-label-bold text-on-surface mb-4">
              بحث في القصص
            </h3>
            <div className="relative">
              <input
                className="w-full bg-white border-outline-variant/30 rounded-lg py-3 pr-12 text-body-md focus:ring-gold-metallic-start"
                placeholder="ما الذي تبحث عنه؟"
                type="text"
              />
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-primary">
                search
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {TAGS.map((tag) => (
                <span
                  key={tag}
                  className="text-[12px] bg-mist-grey px-3 py-1 rounded-full text-on-surface-variant cursor-pointer hover:bg-gold-metallic-start hover:text-white transition-all"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          </RevealOnScroll>

          <RevealOnScroll direction="left" delay={100}>
          <div className="glass-panel p-8 rounded-xl border-t-4 border-gold-metallic-start shadow-lg">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-gold-metallic-start">
                trending_up
              </span>
              <h3 className="font-headline-sm text-headline-sm">
                الأكثر تداولاً
              </h3>
            </div>
            <div className="space-y-6">
              {TRENDING_STORIES.map((story) => (
                <div key={story.rank} className="group cursor-pointer">
                  <span className="text-gold-metallic-start font-stats-number text-stats-number opacity-20 group-hover:opacity-100 transition-opacity">
                    {story.rank}
                  </span>
                  <h4 className="font-label-bold text-primary group-hover:text-gold-metallic-start transition-colors -mt-4">
                    {story.title}
                  </h4>
                  <div className="flex gap-4 mt-2">
                    <span className="text-[12px] text-outline flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">
                        visibility
                      </span>
                      {story.views}
                    </span>
                    <span className="text-[12px] text-outline flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">
                        chat_bubble
                      </span>
                      {story.comments}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          </RevealOnScroll>

          <RevealOnScroll direction="left" delay={200}>
          <div className="bg-primary p-8 rounded-xl text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-32 h-32 bg-gold-metallic-start/10 rounded-full -translate-x-16 -translate-y-16" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="material-symbols-outlined text-gold-metallic-start"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  bolt
                </span>
                <h3 className="font-label-bold text-mist-grey">
                  ذكاء اصطناعي سيادي
                </h3>
              </div>
              <p className="font-headline-sm text-headline-sm mb-6 leading-tight text-white">
                هل تشك في صحة قصة متداولة؟
              </p>
              <p className="text-body-md text-mist-grey/80 mb-8">
                استخدم محرك &quot;زرقاء اليمامة&quot; للتحقق من صدق الروايات
                الإنسانية وكشف التلاعب العاطفي في الأخبار الاجتماعية.
              </p>
              <button
                type="button"
                className="w-full bg-gold-metallic-start py-4 rounded-sm font-label-bold text-primary hover:bg-white transition-all transform active:scale-95 shadow-lg site-btn-shine"
              >
                ابدأ التحليل الآن
              </button>
            </div>
          </div>
          </RevealOnScroll>
        </aside>
      </div>
    </main>
  );
}
