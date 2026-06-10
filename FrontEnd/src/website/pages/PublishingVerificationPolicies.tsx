import { useEffect } from "react";
import { Link } from "react-router-dom";
import { WEBSITE_ROUTES } from "@core/constants/routes";
import { PUBLISHING_VERIFICATION_POLICIES } from "@dummy/contentIntegrityPolicy";
import RevealOnScroll from "@shared/components/RevealOnScroll";
import { EnterItem, StaggerReveal } from "@shared/components/animations";

const SEVERITY_STYLES = {
  critical: "border-error/40 bg-error/5 text-error",
  high: "border-tertiary/40 bg-tertiary/5 text-tertiary",
  medium: "border-gold-metallic-start/40 bg-gold-metallic-start/5 text-primary",
  low: "border-secondary/40 bg-secondary/5 text-secondary",
} as const;

const CLASSIFICATION_STYLES = {
  safe: "bg-success-teal/10 text-success-teal border-success-teal/30",
  light: "bg-secondary/10 text-secondary border-secondary/30",
  editorial: "bg-gold-metallic-start/10 text-primary border-gold-metallic-start/30",
  rejected: "bg-error/10 text-error border-error/30",
} as const;

const TOC = [
  { id: "overview", label: "نظرة عامة" },
  { id: "principles", label: "مبادئ النشر والتحقق" },
  { id: "inspection", label: "مؤشر النزاهة التحريرية" },
  { id: "scoring", label: "احتساب الدرجة" },
  { id: "classification", label: "تصنيف النتيجة" },
  { id: "ai-role", label: "دور الذكاء الاصطناعي" },
  { id: "workflow", label: "آلية المراجعة" },
  { id: "coverage", label: "التغطية والتحريض" },
  { id: "goal", label: "هدف المؤشر" },
];

export default function PublishingVerificationPolicies() {
  const policy = PUBLISHING_VERIFICATION_POLICIES;

  useEffect(() => {
    document.title = `${policy.title} | زرقاء اليمامة`;
  }, [policy.title]);

  return (
    <main className="space-y-12 pb-8">
      <section className="rounded-2xl glass-panel border border-outline-variant/10 overflow-hidden">
        <div className="px-6 py-10 md:px-10 md:py-14 border-b border-outline-variant/10 bg-gradient-to-l from-primary/5 to-transparent">
          <EnterItem index={0}>
            <p className="inline-flex items-center gap-2 bg-gold-metallic-start/10 text-gold-metallic-start px-4 py-1 rounded-full mb-5 border border-gold-metallic-start/20 font-label-bold text-xs">
              <span className="material-symbols-outlined text-[16px]">verified_user</span>
              عن المنصة — معايير احترافية للهواة والصحفيين
            </p>
          </EnterItem>
          <EnterItem index={1}>
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-3 text-primary">
              {policy.title}
            </h1>
          </EnterItem>
          <EnterItem index={2}>
            <p className="font-headline-sm text-headline-sm text-secondary mb-4">
              {policy.subtitle}
            </p>
          </EnterItem>
          <EnterItem index={3}>
            <p className="font-body-lg text-on-surface-variant max-w-3xl leading-relaxed">
              {policy.heroDescription}
            </p>
          </EnterItem>
        </div>
        <div className="px-6 py-6 md:px-10 bg-surface-container-low/40">
          <p className="text-body-md text-on-surface-variant leading-relaxed max-w-4xl">
            {policy.missionNote}
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-gutter">
        <nav aria-label="فهرس الصفحة" className="xl:col-span-3 xl:order-2">
          <div className="xl:sticky xl:top-28 glass-panel rounded-xl border border-outline-variant/10 p-4">
            <h2 className="font-label-bold text-primary text-sm mb-3 px-2">في هذه الصفحة</h2>
            <ul className="space-y-1">
              {TOC.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="block px-3 py-2 rounded-lg text-sm text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="xl:col-span-9 xl:order-1 space-y-12">
          <RevealOnScroll>
            <section id="overview" className="scroll-mt-28">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    icon: "groups",
                    title: "للهواة والشغوفين",
                    text: "مساحة للإبداء تحت معايير تحريرية واضحة تساعدك على النمو.",
                  },
                  {
                    icon: "psychology",
                    title: "محلل ذكاء اصطناعي",
                    text: "فحص تلقائي وفق هذه السياسات قبل النشر أو أثناء المراجعة.",
                  },
                  {
                    icon: "gavel",
                    title: "مراجعة بشرية",
                    text: "الحالات الحساسة تُحوّل لفريق التحرير للقرار النهائي.",
                  },
                ].map((card, i) => (
                  <StaggerReveal
                    key={card.title}
                    index={i}
                    className="glass-panel rounded-xl p-5 border border-outline-variant/10"
                  >
                    <span className="material-symbols-outlined text-gold-metallic-start text-2xl mb-3">
                      {card.icon}
                    </span>
                    <h3 className="font-label-bold text-primary mb-2">{card.title}</h3>
                    <p className="text-sm text-on-surface-variant leading-relaxed">{card.text}</p>
                  </StaggerReveal>
                ))}
              </div>
            </section>
          </RevealOnScroll>

          <RevealOnScroll>
            <section id="principles" className="scroll-mt-28 space-y-4">
              <header>
                <h2 className="font-headline-md text-headline-md text-primary site-section-title site-section-title-visible mb-2">
                  {policy.publishingPrinciples.title}
                </h2>
                <p className="text-on-surface-variant font-body-md">
                  {policy.publishingPrinciples.intro}
                </p>
              </header>
              <ul className="glass-panel rounded-xl p-6 md:p-8 border border-outline-variant/10 space-y-3">
                {policy.publishingPrinciples.items.map((item, index) => (
                  <li key={item} className="flex gap-3 text-body-md text-on-surface leading-relaxed">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary text-sm font-label-bold">
                      {index + 1}
                    </span>
                    <span className="pt-0.5">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </RevealOnScroll>

          <RevealOnScroll>
            <section id="inspection" className="scroll-mt-28 space-y-6">
              <header className="rounded-xl bg-primary/5 border border-primary/10 p-6 md:p-8">
                <p className="text-xs font-label-bold text-secondary mb-2">قسم السياسات</p>
                <h2 className="font-headline-md text-headline-md text-primary mb-2">
                  {policy.integritySectionTitle}
                </h2>
                <p className="text-on-surface-variant font-body-md">
                  {policy.integritySectionIntro}
                </p>
              </header>
              <div className="space-y-5">
                {policy.inspectionSections.map((section, index) => (
                  <StaggerReveal
                    key={section.id}
                    index={index}
                    className="glass-panel rounded-xl p-6 md:p-8 border border-outline-variant/10"
                  >
                    <h3 className="font-headline-sm text-headline-sm text-primary mb-3 flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-label-bold">
                        {index + 1}
                      </span>
                      {section.title}
                    </h3>
                    {section.intro && (
                      <p className="text-on-surface-variant mb-4 leading-relaxed">{section.intro}</p>
                    )}
                    <ul className="space-y-2 mr-4">
                      {section.items.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2 text-body-md text-on-surface leading-relaxed"
                        >
                          <span className="text-gold-metallic-start mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    {"footnote" in section && section.footnote && (
                      <p className="mt-4 pt-4 border-t border-outline-variant/10 text-sm text-on-surface-variant italic">
                        {section.footnote}
                      </p>
                    )}
                  </StaggerReveal>
                ))}
              </div>
            </section>
          </RevealOnScroll>

          <RevealOnScroll>
            <section id="scoring" className="scroll-mt-28 space-y-6">
              <header>
                <h2 className="font-headline-md text-headline-md text-primary site-section-title site-section-title-visible mb-2">
                  طريقة احتساب مؤشر النزاهة التحريرية
                </h2>
                <p className="text-on-surface-variant font-body-md">{policy.scoring.intro}</p>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {policy.scoring.levels.map((level, index) => (
                  <StaggerReveal
                    key={level.id}
                    index={index}
                    className={`rounded-xl border p-5 ${SEVERITY_STYLES[level.tone]}`}
                  >
                    <h3 className="font-label-bold text-base mb-2">{level.label}</h3>
                    <p className="text-sm leading-relaxed mb-3 opacity-90">{level.description}</p>
                    <p className="text-sm font-label-bold">الإجراء: {level.action}</p>
                  </StaggerReveal>
                ))}
              </div>
            </section>
          </RevealOnScroll>

          <RevealOnScroll>
            <section id="classification" className="scroll-mt-28 space-y-6">
              <header>
                <h2 className="font-headline-md text-headline-md text-primary site-section-title site-section-title-visible mb-2">
                  تصنيف نتيجة التحليل
                </h2>
                <p className="text-on-surface-variant font-body-md">
                  بعد التحليل، يظهر للنص واحد من التصنيفات التالية:
                </p>
              </header>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {policy.classifications.map((item, index) => (
                  <StaggerReveal
                    key={item.id}
                    index={index}
                    className={`rounded-xl border p-5 ${CLASSIFICATION_STYLES[item.tone]}`}
                  >
                    <h3 className="font-label-bold text-base mb-2">{item.label}</h3>
                    <p className="text-sm leading-relaxed">{item.description}</p>
                  </StaggerReveal>
                ))}
              </div>
            </section>
          </RevealOnScroll>

          <RevealOnScroll>
            <section
              id="ai-role"
              className="scroll-mt-28 glass-panel rounded-xl p-6 md:p-8 border-r-4 border-gold-metallic-start"
            >
              <h2 className="font-headline-md text-headline-md text-primary mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-gold-metallic-start">smart_toy</span>
                {policy.aiRole.title}
              </h2>
              <p className="text-on-surface-variant mb-4 leading-relaxed">{policy.aiRole.intro}</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                {policy.aiRole.checks.map((check) => (
                  <li key={check} className="flex items-center gap-2 text-sm">
                    <span className="material-symbols-outlined text-success-teal text-base">
                      check_circle
                    </span>
                    {check}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-on-surface-variant bg-surface-container-low rounded-lg p-4 border border-outline-variant/10">
                {policy.aiRole.disclaimer}
              </p>
            </section>
          </RevealOnScroll>

          <RevealOnScroll>
            <section id="workflow" className="scroll-mt-28 space-y-6">
              <header>
                <h2 className="font-headline-md text-headline-md text-primary site-section-title site-section-title-visible mb-2">
                  آلية المراجعة داخل المنصة
                </h2>
              </header>
              <ol className="space-y-4">
                {policy.workflowSteps.map((step, index) => (
                  <StaggerReveal
                    key={step}
                    index={index}
                    className="flex gap-4 glass-panel rounded-xl p-4 border border-outline-variant/10"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full gold-gradient-bg text-on-primary font-label-bold">
                      {index + 1}
                    </span>
                    <p className="text-body-md text-on-surface leading-relaxed pt-2">{step}</p>
                  </StaggerReveal>
                ))}
              </ol>
            </section>
          </RevealOnScroll>

          <RevealOnScroll>
            <section id="coverage" className="scroll-mt-28 space-y-6">
              <header>
                <h2 className="font-headline-md text-headline-md text-primary site-section-title site-section-title-visible mb-2">
                  {policy.coverageVsIncitement.title}
                </h2>
                <p className="text-on-surface-variant font-body-md mb-4">
                  {policy.coverageVsIncitement.intro}
                </p>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {policy.coverageVsIncitement.pairs.map((pair) => (
                  <div
                    key={pair.left}
                    className="glass-panel rounded-xl p-4 border border-outline-variant/10"
                  >
                    <p className="font-label-bold text-primary mb-1">{pair.left}</p>
                    <p className="text-sm text-on-surface-variant">{pair.right}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-on-surface-variant italic">
                {policy.coverageVsIncitement.note}
              </p>
            </section>
          </RevealOnScroll>

          <RevealOnScroll>
            <section id="goal" className="scroll-mt-28 rounded-2xl bg-primary text-on-primary p-8 md:p-10">
              <h2 className="font-headline-md text-headline-md mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-gold-metallic-start">flag</span>
                هدف المؤشر
              </h2>
              <p className="text-body-lg leading-relaxed text-mist-grey/95">{policy.goal}</p>
            </section>
          </RevealOnScroll>

          <RevealOnScroll>
            <section className="glass-panel rounded-2xl p-6 md:p-8 border border-dashed border-outline-variant/30 text-center">
              <span className="material-symbols-outlined text-3xl text-secondary mb-3">
                construction
              </span>
              <h3 className="font-headline-sm text-headline-sm text-primary mb-2">قادم على المنصة</h3>
              <p className="text-on-surface-variant text-sm max-w-2xl mx-auto mb-4 leading-relaxed">
                صفحة إضافة المحتوى، محلل الذكاء الاصطناعي التفاعلي، تحويل النص إلى بودكاست،
                ومسار الهواة نحو الاحتراف — كلها ستُبنى على أساس سياسات النشر والتحقق هذه.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  to={WEBSITE_ROUTES.MEDIA_TERMINOLOGY}
                  className="px-4 py-2 rounded-lg border border-primary text-primary font-label-bold text-sm hover:bg-primary hover:text-on-primary transition-colors"
                >
                  استكشف المصطلحات
                </Link>
                <Link
                  to={WEBSITE_ROUTES.MEDIA_LITERACY}
                  className="px-4 py-2 rounded-lg bg-secondary text-white font-label-bold text-sm hover:opacity-90 transition-opacity"
                >
                  المعرفة الإعلامية
                </Link>
              </div>
            </section>
          </RevealOnScroll>
        </div>
      </div>
    </main>
  );
}
