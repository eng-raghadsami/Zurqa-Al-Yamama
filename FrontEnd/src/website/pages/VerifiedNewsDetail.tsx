import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { WEBSITE_ROUTES } from "@core/constants/routes";
import { useHighlightTerms, useVerifiedNewsArticle } from "@services";
import RevealOnScroll from "@shared/components/RevealOnScroll";
import { EnterItem, StaggerReveal } from "@shared/components/animations";
import ArticleListenButton from "@website/components/broadcast/ArticleListenButton";
import ContentEditorToolbar from "@website/components/ContentEditorToolbar";
import TermHighlightedText from "@website/components/TermHighlightedText";
import VerifiedNewsImage from "@website/components/VerifiedNewsImage";
import { downloadVerifiedNewsReport } from "@website/helpers/downloadVerifiedNewsReport";
import type { HighlightTerm } from "@website/helpers/termHighlightUtils";
import type { VerifiedNewsBodySection } from "@website/types/verifiedNews";
import {
  NEWS_CATEGORY_LABELS,
  getRelatedArticles,
} from "@website/types/verifiedNews";

function ArticleBody({
  sections,
  terms,
}: {
  sections: VerifiedNewsBodySection[];
  terms: HighlightTerm[];
}) {
  return (
    <div className="space-y-6 font-body-lg text-body-lg leading-relaxed text-on-surface">
      {sections.map((section, index) => {
        if (section.type === "paragraph") {
          return (
            <p key={index}>
              <TermHighlightedText text={section.text} terms={terms} />
            </p>
          );
        }
        if (section.type === "heading") {
          return (
            <h2
              key={index}
              className="pt-4 font-headline-md text-headline-md text-primary"
            >
              <TermHighlightedText text={section.text} terms={terms} />
            </h2>
          );
        }
        return (
          <blockquote
            key={index}
            className="relative my-10 rounded-lg border-r-4 border-gold-metallic-start bg-surface-container-low p-8"
          >
            <span className="material-symbols-outlined absolute -right-2 -top-4 text-5xl text-gold-metallic-start opacity-30">
              format_quote
            </span>
            <p className="font-headline-sm text-headline-sm italic leading-snug">
              <TermHighlightedText text={section.text} terms={terms} />
            </p>
            <footer className="mt-4 text-left font-label-bold text-label-bold text-on-surface-variant">
              — {section.author}
            </footer>
          </blockquote>
        );
      })}
    </div>
  );
}

export default function VerifiedNewsDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: article, isLoading } = useVerifiedNewsArticle(slug);
  const { data: highlightTerms = [] } = useHighlightTerms();
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  if (isLoading) {
    return (
      <main className="py-16 text-center text-on-surface-variant">
        جاري تحميل الخبر...
      </main>
    );
  }

  if (!article) {
    return <Navigate to={WEBSITE_ROUTES.VERIFIED_NEWS} replace />;
  }

  const related = getRelatedArticles(article);

  const handleDownloadReport = async () => {
    if (isDownloading) return;

    setIsDownloading(true);
    setDownloadError(null);

    try {
      await downloadVerifiedNewsReport(article);
    } catch {
      setDownloadError("تعذّر إنشاء ملف PDF. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <main className="grid grid-cols-1 gap-gutter lg:grid-cols-12">
      <article className="space-y-8 lg:col-span-8">
        <EnterItem index={0}>
          <nav className="mb-2 flex flex-wrap items-center gap-2 border-b border-outline-variant/10 pb-5 font-label-bold text-label-bold text-on-surface-variant md:pb-6">
            <Link className="hover:text-primary transition-colors" to={WEBSITE_ROUTES.HOME}>
              الرئيسية
            </Link>
            <span className="material-symbols-outlined text-[14px]">chevron_left</span>
            <Link
              className="hover:text-primary transition-colors"
              to={WEBSITE_ROUTES.VERIFIED_NEWS}
            >
              الأخبار الموثقة
            </Link>
            <span className="material-symbols-outlined text-[14px]">chevron_left</span>
            <span className="text-primary truncate max-w-[200px] md:max-w-md">
              {article.title}
            </span>
          </nav>
        </EnterItem>

        <RevealOnScroll>
          <ContentEditorToolbar contentLabel={`الخبر «${article.title}»`} />
        </RevealOnScroll>

        <RevealOnScroll>
          <header className="space-y-4 pt-2 md:pt-4">
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg leading-tight text-primary site-section-title site-section-title-visible">
              <TermHighlightedText text={article.title} terms={highlightTerms} />
            </h1>
          <div className="flex flex-wrap items-center gap-6 py-4 border-y border-outline-variant/10">
            {article.verifier && (
              <div className="flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-primary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  person
                </span>
                <span className="font-label-bold text-label-bold">
                  {article.verifier.name}
                </span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-on-surface-variant">
                calendar_today
              </span>
              <span className="text-on-surface-variant">{article.publishedAt}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-on-surface-variant">
                category
              </span>
              <span className="text-on-surface-variant">
                {NEWS_CATEGORY_LABELS[article.category]}
              </span>
            </div>
            <div className="mr-auto">
              <div className="flex items-center gap-1 gold-gradient-bg px-3 py-1 rounded-full text-white font-label-bold text-label-bold shadow-sm">
                <span
                  className="material-symbols-outlined text-[18px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
                <span>موثوق</span>
              </div>
            </div>
          </div>
        </header>
        </RevealOnScroll>

        <RevealOnScroll delay={100}>
          <div className="relative group rounded-xl overflow-hidden shadow-xl bg-surface-container">
            <VerifiedNewsImage
              alt={article.title}
              className="w-full h-[280px] md:h-[450px] object-cover site-card-image"
              src={article.detailImage}
            />
          {article.trustBadge && (
            <div className="absolute top-6 right-6 glass-panel px-4 py-2 rounded-lg flex items-center gap-2">
              <div className="w-3 h-3 bg-gold-metallic-start rounded-full animate-pulse" />
              <span className="font-headline-sm text-headline-sm gold-gradient-text">
                {article.trustBadge}
              </span>
            </div>
          )}
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <section className="glass-panel p-6 rounded-xl border-r-4 border-gold-metallic-start shadow-sm bg-mist-grey/20">
            <h3 className="font-headline-sm text-headline-sm mb-4 flex items-center gap-2 site-section-title site-section-title-visible">
            <span className="material-symbols-outlined text-gold-metallic-start">
              insights
            </span>
            رؤى التحقق الذكية
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1">
              <p className="text-on-surface-variant text-label-bold font-label-bold">
                المصدر الأصلي
              </p>
              <p className="font-body-md text-primary">
                {article.verification.originalSource}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-on-surface-variant text-label-bold font-label-bold">
                تحليل الذكاء الاصطناعي
              </p>
              <p className="font-body-md text-success-teal">
                {article.verification.aiAnalysis}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-on-surface-variant text-label-bold font-label-bold">
                تأكيد بشري
              </p>
              <p className="font-body-md text-primary">
                {article.verification.humanReview}
              </p>
            </div>
          </div>
        </section>
        </RevealOnScroll>

        <RevealOnScroll>
          <ArticleBody sections={article.body} terms={highlightTerms} />
        </RevealOnScroll>

        <footer className="relative z-10 space-y-3 border-t border-outline-variant/20 pt-10">
          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              disabled={isDownloading}
              onClick={handleDownloadReport}
              aria-busy={isDownloading}
              className="relative z-10 flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-8 py-3 font-label-bold text-label-bold text-white transition-all hover:scale-[1.02] hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 site-btn-shine"
            >
              <span className="material-symbols-outlined pointer-events-none">
                {isDownloading ? "hourglass_top" : "download"}
              </span>
              {isDownloading ? "جاري إعداد التقرير..." : "تحميل التقرير الكامل"}
            </button>
            <ArticleListenButton
              title={article.title}
              subtitle={`خبر موثّق • ${article.verifier?.name ?? "زرقاء اليمامة"}`}
              coverImage={article.detailImage}
              sections={article.body}
            />
            <button
              type="button"
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-primary px-8 py-3 font-label-bold text-label-bold text-primary transition-all hover:bg-mist-grey"
            >
              <span className="material-symbols-outlined">bookmark</span>
              حفظ في الأرشيف
            </button>
          </div>
          {downloadError && (
            <p className="text-sm font-label-bold text-error" role="alert">
              {downloadError}
            </p>
          )}
        </footer>
      </article>

      <aside className="lg:col-span-4 space-y-10">
        <RevealOnScroll direction="left">
          <section className="glass-panel p-6 rounded-xl shadow-lg mist-bg border border-outline-variant/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-white">psychology</span>
            </div>
            <div>
              <h4 className="font-label-bold text-label-bold">مساعدي الذكي</h4>
              <p className="text-xs text-on-surface-variant">تتبع حالة التحقق</p>
            </div>
          </div>
          <div className="space-y-6 relative">
            <div className="absolute right-[11px] top-2 bottom-2 w-[2px] bg-mist-grey" />
            {[
              { label: "التحقق من المصدر", done: true },
              { label: "تحليل البيانات الوصفية", done: true },
              { label: "المطابقة المتقاطعة", active: true },
              { label: "اعتماد المراجع البشري", done: false },
            ].map((step, index) => (
              <StaggerReveal key={step.label} index={index}>
                <div className="relative flex items-center gap-4">
                <div
                  className={`z-10 w-6 h-6 rounded-full flex items-center justify-center ${
                    step.active
                      ? "bg-gold-metallic-start ring-4 ring-gold-metallic-end/20"
                      : step.done
                        ? "bg-primary"
                        : "bg-mist-grey"
                  } ${!step.done && !step.active ? "opacity-50" : ""}`}
                >
                  {step.done && (
                    <span className="material-symbols-outlined text-white text-[14px]">
                      check
                    </span>
                  )}
                  {step.active && (
                    <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                  )}
                </div>
                <span
                  className={`text-body-md ${
                    step.active ? "font-bold text-primary" : step.done ? "font-medium" : "opacity-50"
                  }`}
                >
                  {step.label}
                </span>
                </div>
              </StaggerReveal>
            ))}
          </div>
          <button
            type="button"
            className="w-full mt-8 bg-primary text-white py-3 rounded-lg text-label-bold font-label-bold hover:opacity-90 transition-opacity site-btn-shine"
          >
            عرض السجل الكامل
          </button>
        </section>
        </RevealOnScroll>

        {related.length > 0 && (
          <RevealOnScroll direction="left" delay={100}>
            <section className="space-y-6">
              <h4 className="font-label-bold text-label-bold border-b border-outline-variant/20 pb-2 site-section-title site-section-title-visible">
                أخبار ذات صلة
              </h4>
              {related.map((item, index) => (
                <StaggerReveal key={item.id} index={index}>
                  <Link
                    className="block group site-card-hover"
                    to={WEBSITE_ROUTES.verifiedNewsDetail(item.slug)}
                  >
                    <div className="relative overflow-hidden rounded-lg aspect-video mb-3">
                      <VerifiedNewsImage
                        alt={item.title}
                        className="w-full h-full object-cover site-card-image"
                        src={item.listImage}
                      />
                  <div className="absolute top-2 right-2 bg-primary/90 text-white text-[10px] px-2 py-1 rounded font-bold">
                    موثق
                  </div>
                </div>
                <h5 className="font-label-bold text-label-bold group-hover:text-gold-metallic-start transition-colors leading-snug line-clamp-2">
                  {item.title}
                </h5>
                <p className="text-xs text-on-surface-variant mt-1">
                  {item.relativeTime ?? item.publishedAt}
                    {item.readMinutes ? ` • ${item.readMinutes} دقائق قراءة` : ""}
                  </p>
                  </Link>
                </StaggerReveal>
              ))}
            </section>
          </RevealOnScroll>
        )}
      </aside>
    </main>
  );
}
