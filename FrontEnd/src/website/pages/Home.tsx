import { Link } from "react-router-dom";
import type { RefObject } from "react";
import clsx from "clsx";
import { WEBSITE_ROUTES } from "@core/constants/routes";
import { useInViewReveal } from "@core/hooks/useInViewReveal";
import { useReducedMotion } from "@core/hooks/useReducedMotion";
import AnimatedStatNumber from "@shared/components/AnimatedStatNumber";
import RevealOnScroll from "@shared/components/RevealOnScroll";
import HeroRadarVisual from "@website/components/home/HeroRadarVisual";
import InvestigationCard from "@website/components/home/InvestigationCard";
import LiveIntelTicker from "@website/components/home/LiveIntelTicker";
import ProcessingTimeline from "@website/components/home/ProcessingTimeline";

type HeroStat =
  | {
      icon: string;
      label: string;
      staticValue: string;
    }
  | {
      icon: string;
      label: string;
      target: number;
      decimals?: number;
      prefix?: string;
      suffix?: string;
      grouping?: boolean;
    };

const HERO_STATS: HeroStat[] = [
  { icon: "radar", staticValue: "24/7", label: "مراقبة ذكية" },
  {
    icon: "database",
    target: 1.2,
    suffix: "M+",
    decimals: 1,
    label: "بيانات منشورة",
  },
  {
    icon: "hub",
    target: 25,
    suffix: "K+",
    decimals: 0,
    label: "مصدر تم تحليله",
  },
  {
    icon: "verified_user",
    target: 97,
    suffix: "%",
    decimals: 0,
    label: "دقة التحليل",
  },
];

const INVESTIGATIONS = [
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDvkrsgwzP6Ugvowokzy7jBCYwKjL_ow5hq0rIrEVfuD4keiLNkwp5UoogMWUzCYa1ZFzw2Lpt9HBZuvTFdWb7WZPCrHQCvyRBoC-gFsRhQ6yc7HWHyWFM6Q8XJn4Ce_O1BoFLdanBEGyoq30_ArCPdVBalafCXn1JgV37gZywgnBR8kvGMpbh1RB_Vco9Zosicwnwdl3u7DCaqRvaC2g5u6Za20rVgN-wtJYxMl-sAEu9945JpjGWhud7yKo92Lg-hICEbWHRNPBtn",
    imageAlt: "واجهة رقمية متطورة تُظهر خرائط الشبكات وعُقد البيانات",
    badge: { text: "تحقيق حصري", className: "bg-primary text-on-primary" },
    tag: {
      text: "محتوى مضلل",
      dotClassName: "bg-error",
      className: "bg-error/10 text-error border-error/20",
    },
    title: "كواليس التلاعب بأسعار الغاز الطبيعي عبر منصات التواصل",
    description:
      "كشف شبكة من الحسابات الوهمية التي روجت لأخبار كاذبة بهدف التأثير على عقود الطاقة الآجلة في المنطقة العربية.",
    href: WEBSITE_ROUTES.REPORTS_INVESTIGATIVE,
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDyn4VEpZJ40rdQjG0lEnxI18ngCoJEpXSudd3bF95hOWDSMvyV0FadfwrfHIfXUPR9uCD0j6Jc1bigNcQJD8fhVCYX7pnfE1Al0LcOIPdcameAWCgv8Usc6hZRya0bJowKzeZgXK29Jr3EvBEgL5NEcOkxYYm3wetCJNhFpGvbIkJpfzZmnVAfeXTE-dRDFhima-QBm_2auvIUmJdaQ6QqQfAnd2oYnzKBywIn13YGucEdAdwOf4euMLIMv6_lJpNq6B3kiWWBINze",
    imageAlt: "تصور مجرد لبيانات مالية ذهبية على خلفية رقمية داكنة",
    badge: {
      text: "موثق ذكياً",
      className: "bg-secondary-container text-on-secondary-container",
    },
    tag: {
      text: "بيانات حقيقية",
      dotClassName: "bg-success-teal",
      className: "bg-success-teal/10 text-success-teal border-success-teal/20",
    },
    title: "تحليل تدفقات الاستثمار الأجنبي في مشاريع الطاقة النظيفة",
    description:
      "دراسة تحليلية مدعومة بالبيانات الضخمة تظهر النمو الحقيقي مقارنة بالوعود الإعلامية في قطاع الهيدروجين الأخضر.",
    href: WEBSITE_ROUTES.REPORTS_INVESTIGATIVE,
  },
];

function AnimatedStatsBar() {
  const reducedMotion = useReducedMotion();
  const { ref, isVisible } = useInViewReveal({
    threshold: 0.2,
    enabled: !reducedMotion,
  });
  const visible = reducedMotion || isVisible;

  return (
    <div
      ref={ref as RefObject<HTMLDivElement>}
      className={clsx(
        "max-w-container-max mx-auto bg-surface-container-lowest shadow-xl rounded-xl p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-y-4 md:gap-y-0 border border-outline-variant/20",
        !reducedMotion && "home-stats-bar",
        visible && "home-stats-bar-visible",
      )}
    >
      {HERO_STATS.map((stat, index) => (
        <div
          key={stat.label}
          className={clsx(
            `flex flex-col items-center text-center gap-2 ${
              index > 0 ? "border-s border-outline-variant/30 ps-4 md:ps-6" : ""
            }`,
            !reducedMotion && "home-stat-item",
            visible && "home-stat-item-visible",
          )}
          style={
            reducedMotion
              ? undefined
              : { transitionDelay: `${200 + index * 100}ms` }
          }
        >
          <span className="material-symbols-outlined text-secondary text-[32px] home-stat-icon">
            {stat.icon}
          </span>
          {"staticValue" in stat ? (
            <span className="font-stats-number text-stats-number text-primary">
              {stat.staticValue}
            </span>
          ) : (
            <AnimatedStatNumber
              target={stat.target}
              decimals={stat.decimals}
              prefix={stat.prefix}
              suffix={stat.suffix}
              grouping={stat.grouping}
              className="font-stats-number text-stats-number text-primary"
              duration={2200}
            />
          )}
          <span className="font-label-bold text-label-bold text-on-surface-variant">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const reducedMotion = useReducedMotion();

  return (
    <main className="pt-20">
      <section className="relative px-margin-mobile md:px-margin-desktop overflow-hidden dot-pattern home-dot-pattern-drift pt-5 md:pt-7 pb-8 md:pb-12">
        <div className="absolute bottom-0 left-0 right-0 h-48 opacity-10 pointer-events-none grayscale">
          <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        </div>
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center relative z-10 max-w-container-max">
          <div className="order-2 lg:order-1 flex flex-col items-start gap-6">
            <div
              className={clsx(
                "flex items-center gap-2 px-4 py-1.5 bg-secondary-container text-on-secondary-container rounded-full font-label-bold text-label-bold gold-glow",
                !reducedMotion && "home-hero-enter home-hero-enter-delay-1",
              )}
            >
              <span
                className="material-symbols-outlined text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                auto_awesome
              </span>
              تحليل ذكي متقدم ✨
            </div>
            <h2
              className={clsx(
                "font-display-lg text-display-lg-mobile md:text-display-lg text-primary leading-tight",
                !reducedMotion && "home-hero-enter home-hero-enter-delay-2",
              )}
            >
              كشف شبكات{" "}
              <span
                className={
                  reducedMotion ? "text-secondary" : "home-shimmer-text"
                }
              >
                التضليل الإعلامي
              </span>{" "}
              في الإعلام المحلي والعالمي
            </h2>
            <p
              className={clsx(
                "font-body-lg text-body-lg text-on-surface-variant max-w-xl",
                !reducedMotion && "home-hero-enter home-hero-enter-delay-3",
              )}
            >
              نستخدم خوارزميات الرؤية الحاسوبية المتقدمة وتحليل البيانات الضخمة
              لرصد الأنماط الخفية في التقارير الإعلامية، مما يمنحك وضوحاً مطلقاً
              في مشهد إعلامي معقد.
            </p>
            <div
              className={clsx(
                "flex flex-wrap gap-4 pt-4",
                !reducedMotion && "home-hero-enter home-hero-enter-delay-4",
              )}
            >
              <Link
                to={WEBSITE_ROUTES.REPORTS_INVESTIGATIVE}
                className="group home-btn-primary flex items-center gap-2 px-8 py-4 bg-primary text-on-primary rounded-lg font-headline-sm text-headline-sm transition-all hover:translate-x-1 hover:shadow-lg"
              >
                استكشف التحليل الكامل
                <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">
                  arrow_back
                </span>
              </Link>
              <Link
                to={WEBSITE_ROUTES.VISUALS}
                className="flex items-center gap-2 px-8 py-4 border border-outline text-primary rounded-lg font-headline-sm text-headline-sm hover:bg-surface-container-low transition-all hover:border-secondary/40"
              >
                <span className="material-symbols-outlined">play_circle</span>
                شاهد فيديو تعريفي
              </Link>
            </div>
          </div>

          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <HeroRadarVisual />
          </div>
        </div>
      </section>

      <LiveIntelTicker />

      <section
        className="px-margin-mobile md:px-margin-desktop relative z-30 pb-2"
        style={{ marginTop: "8px" }}
      >
        <AnimatedStatsBar />
      </section>

      <section className="pt-12 md:pt-14 pb-section-gap px-margin-mobile md:px-margin-desktop flex flex-col lg:flex-row gap-12 max-w-container-max mx-auto">
        <aside className="lg:w-80 shrink-0 order-1 lg:order-2">
          <RevealOnScroll direction="left" delay={100}>
            <div className="sticky top-28 bg-surface-container-low rounded-xl p-6 shadow-md flex flex-col gap-8 border border-outline-variant/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    smart_toy
                  </span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-secondary">
                    مساعدي الذكي
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    تحليل النزاهة الرقمية
                  </p>
                </div>
              </div>
              <Link
                to={WEBSITE_ROUTES.VERIFICATION_IMAGE}
                className="w-full py-3 bg-secondary text-on-secondary rounded-lg font-label-bold text-label-bold gold-glow hover:opacity-90 transition-all flex items-center justify-center gap-2 home-btn-shine"
              >
                تقديم ملف للتحقق
                <span className="material-symbols-outlined">add</span>
              </Link>
              <ProcessingTimeline />
            </div>
          </RevealOnScroll>
        </aside>

        <div className="flex-1 order-2 lg:order-1">
          <RevealOnScroll
            direction="up"
            className="flex justify-between items-end mb-10 border-b border-outline-variant/30 pb-4"
          >
            <h2 className="font-headline-md text-headline-md text-primary home-section-title home-section-title-visible">
              أبرز التحقيقات الجارية
            </h2>
            <Link
              to={WEBSITE_ROUTES.REPORTS_INVESTIGATIVE}
              className="text-secondary font-label-bold text-label-bold hover:underline flex items-center gap-1 transition-transform hover:-translate-x-0.5"
            >
              عرض جميع التقارير
              <span className="material-symbols-outlined text-sm">
                arrow_back
              </span>
            </Link>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {INVESTIGATIONS.map((item, index) => (
              <InvestigationCard key={item.title} index={index} {...item} />
            ))}

            <InvestigationCard
              index={2}
              variant="wide"
              image="https://lh3.googleusercontent.com/aida-public/AB6AXuCki74AOWZL3uU71OGjJmkeQTz7xjYySouoWN8UvzY-1wv271wRFuKk5W7z5uhFbTgSFN93Co6FxE4OuNaFmpzi58NZHNG6BVX2zWN8DxGg7ByvfqaqHe7YDC4uM1Ta2AsNMKPGhi3sZks_XgPJwRPrRbKu_Xqr6JQnkQLwVhFz2gPxM8l_1D4EsuxWXlROTPA8v4fV4vPGmQghhZQ-ivHjfQNW2euCNLuO3O2_ID5Nx-aU0ERqzYEoHrSCcaBzs7XHzbjfPPHzWqhR"
              imageAlt="غرفة تحكم متطورة مليئة بشاشات رقمية كبيرة"
              badge={{
                text: "تغطية خاصة",
                className: "bg-primary text-on-primary",
              }}
              title="تزييف الواقع: رحلة في أعماق تقنيات الـ Deepfake الإعلامية"
              description="كيف يمكن للذكاء الاصطناعي كشف ما صنعه الذكاء الاصطناعي؟ تقرير مفصل حول أدواتنا في رصد الفيديوهات المفبركة للقادة السياسيين."
              wideContent={{
                buttonText: "شاهد التحليل المرئي",
                readTime: "وقت القراءة: 12 دقيقة",
                href: WEBSITE_ROUTES.VISUALS,
              }}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
