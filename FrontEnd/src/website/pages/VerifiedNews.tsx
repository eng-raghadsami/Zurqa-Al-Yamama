import { useState } from "react";
import { Link } from "react-router-dom";
import { WEBSITE_ROUTES } from "@core/constants/routes";
import { useCountUp } from "@core/hooks/useCountUp";
import { useReducedMotion } from "@core/hooks/useReducedMotion";
import {
  useVerifiedNewsIntegrityStats,
  useVerifiedNewsListing,
} from "@services";
import RevealOnScroll from "@shared/components/RevealOnScroll";
import AnimatedStatNumber from "@shared/components/AnimatedStatNumber";
import { formatStatValue } from "@shared/helpers/formatStatValue";
import { EnterItem, StaggerReveal } from "@shared/components/animations";
import { INTEGRITY_DAILY_STATS } from "@dummy/verifiedNews";
import VerifiedNewsImage from "@website/components/VerifiedNewsImage";
import type {
  NewsCategoryFilter,
  VerifiedNewsArticle,
} from "@website/types/verifiedNews";
import {
  NEWS_CATEGORY_LABELS,
  NEWS_FILTERS,
  filterVerifiedNews,
  getListingArticles,
  isFullBentoLayout,
} from "@website/types/verifiedNews";

function HeaderStatCard({
  target,
  label,
  decimals = 1,
  prefix,
  suffix,
  valueClassName,
}: {
  target: number;
  label: string;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  valueClassName: string;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <div className="verified-news-stat-card min-w-[9rem] rounded-xl px-4 py-3.5 text-center">
      <AnimatedStatNumber
        target={target}
        decimals={decimals}
        prefix={prefix}
        suffix={suffix}
        duration={2000}
        enabled={!reducedMotion}
        startOnMount
        className={`block font-stats-number text-2xl tabular-nums ${valueClassName}`}
      />
          <span className="mt-1 block text-[11px] font-label-bold text-on-surface-variant">
            {label}
          </span>
    </div>
  );
}

function IntegrityFloatingPanel({
  stats,
}: {
  stats: typeof INTEGRITY_DAILY_STATS;
}) {
  const reducedMotion = useReducedMotion();
  const { value: score } = useCountUp(stats.score, {
    decimals: 1,
    duration: 2200,
    enabled: !reducedMotion,
    startOnMount: true,
  });
  const { value: change } = useCountUp(stats.change, {
    decimals: 1,
    duration: 2200,
    enabled: !reducedMotion,
    startOnMount: true,
  });
  const { value: scannedToday } = useCountUp(stats.scannedToday, {
    duration: 2200,
    enabled: !reducedMotion,
    startOnMount: true,
  });

  const displayScore = reducedMotion ? stats.score : score;
  const displayChange = reducedMotion ? stats.change : change;
  const displayScanned = reducedMotion ? stats.scannedToday : scannedToday;

  return (
    <aside
      aria-label="مؤشر النزاهة اليومي"
      className="pointer-events-none fixed bottom-24 left-4 z-50 hidden w-64 xl:block xl:bottom-10 xl:left-8"
    >
      <div className="glass-panel pointer-events-auto rounded-2xl border border-white/40 p-5 shadow-2xl">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-label-bold text-xs opacity-60">
            مؤشر النزاهة اليومي
          </span>
          <span className="text-gold-metallic-start">✨</span>
        </div>
        <div className="mb-2 flex items-end gap-2">
          <span className="font-stats-number text-stats-number tabular-nums text-primary">
            {formatStatValue(displayScore, { decimals: 1 })}
          </span>
          <span className="mb-1 text-xs font-bold tabular-nums text-success-teal">
            {formatStatValue(displayChange, {
              decimals: 1,
              prefix: "+",
              suffix: "%",
            })}
          </span>
        </div>
        <p className="text-[10px] text-on-surface-variant">
          تم فحص{" "}
          <span className="font-bold tabular-nums text-on-surface">
            {formatStatValue(displayScanned, { grouping: true })}
          </span>{" "}
          خبر اليوم باستخدام خوارزميات اليمامة.
        </p>
      </div>
    </aside>
  );
}

function NewsImage(props: { alt: string; src: string; className?: string }) {
  return <VerifiedNewsImage {...props} />;
}

function FeaturedCard({ article }: { article: VerifiedNewsArticle }) {
  return (
    <Link
      to={WEBSITE_ROUTES.verifiedNewsDetail(article.slug)}
      className="group block relative overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm border border-outline-variant/10 h-full site-card-hover"
    >
      <div className="aspect-[16/9] overflow-hidden relative">
        <NewsImage
          alt={article.title}
          className="w-full h-full object-cover site-card-image"
          src={article.listImage}
        />
        {article.trustBadge && (
          <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-md text-gold-metallic-start px-4 py-1.5 rounded-full flex items-center gap-2 border border-gold-metallic-start/30 pulse-gold">
            <span
              className="material-symbols-outlined text-sm"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified
            </span>
            <span className="font-label-bold text-xs">{article.trustBadge}</span>
          </div>
        )}
      </div>
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-4 mb-4 text-sm">
          <span className="text-secondary font-label-bold">
            {NEWS_CATEGORY_LABELS[article.category]}
          </span>
          <span className="w-1 h-1 rounded-full bg-outline-variant" />
          <span className="text-on-surface-variant">
            {article.relativeTime ?? article.publishedAt}
          </span>
        </div>
        <h2 className="font-headline-md text-headline-md mb-4 group-hover:text-secondary transition-colors leading-tight">
          {article.title}
        </h2>
        <p className="text-on-surface-variant font-body-md mb-6 line-clamp-2">
          {article.excerpt}
        </p>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-outline-variant/10">
          {article.verifier && (
            <div className="flex items-center gap-3">
              <NewsImage
                alt={article.verifier.name}
                className="w-8 h-8 rounded-full object-cover border border-outline-variant/20"
                src={article.verifier.avatar}
              />
              <span className="text-sm font-medium">
                المدقق: {article.verifier.name}
              </span>
            </div>
          )}
          <span className="flex items-center gap-1 text-primary font-label-bold group-hover:gap-3 transition-all shrink-0">
            تفاصيل التحقق
            <span className="material-symbols-outlined rotate-180">arrow_forward</span>
          </span>
        </div>
      </div>
    </Link>
  );
}

function StandardCard({ article }: { article: VerifiedNewsArticle }) {
  return (
    <Link
      to={WEBSITE_ROUTES.verifiedNewsDetail(article.slug)}
      className="group block bg-surface-container-lowest rounded-xl border border-outline-variant/10 overflow-hidden site-card-hover"
    >
      <div className="aspect-video relative overflow-hidden">
        <NewsImage
          alt={article.title}
          className="w-full h-full object-cover site-card-image"
          src={article.listImage}
        />
        {article.trustBadge && (
          <div className="absolute bottom-3 right-3 bg-success-teal/90 text-white px-3 py-1 rounded-lg text-xs font-label-bold backdrop-blur-sm">
            {article.trustBadge}
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-label-bold text-label-bold mb-2 group-hover:text-secondary transition-colors line-clamp-2">
          {article.title}
        </h3>
        <div className="flex items-center justify-between text-xs text-on-surface-variant">
          <span>{NEWS_CATEGORY_LABELS[article.category]}</span>
          <span>{article.publishedAt}</span>
        </div>
      </div>
    </Link>
  );
}

function CompactCard({ article }: { article: VerifiedNewsArticle }) {
  return (
    <Link
      to={WEBSITE_ROUTES.verifiedNewsDetail(article.slug)}
      className="group block bg-surface-container-lowest rounded-xl border border-outline-variant/10 overflow-hidden p-6 h-full site-card-hover"
    >
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${
          article.category === "environment"
            ? "bg-success-teal/10 text-success-teal"
            : "bg-gold-metallic-start/10 text-gold-metallic-start"
        }`}
      >
        <span
          className="material-symbols-outlined"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          {article.compactIcon ?? "article"}
        </span>
      </div>
      <h3 className="font-headline-sm text-headline-sm mb-3 group-hover:text-secondary transition-colors">
        {article.title}
      </h3>
      <p className="text-on-surface-variant font-body-md mb-6 line-clamp-3">
        {article.excerpt}
      </p>
      {article.trustScore !== undefined && article.category === "security" ? (
        <div className="flex items-center gap-2">
          <div className="h-1 flex-1 bg-mist-grey rounded-full overflow-hidden">
            <div
              className="h-full bg-gold-metallic-start"
              style={{ width: `${article.trustScore}%` }}
            />
          </div>
          <span className="text-xs font-bold">{article.trustBadge}</span>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <span className="text-xs text-on-surface-variant">
            {article.sourceLabel ?? NEWS_CATEGORY_LABELS[article.category]}
          </span>
          <span className="material-symbols-outlined text-success-teal">
            check_circle
          </span>
        </div>
      )}
    </Link>
  );
}

function SubscribeCard() {
  return (
    <div className="bg-primary text-on-primary rounded-xl overflow-hidden p-6 relative h-full flex flex-col justify-center">
      <div
        className="absolute inset-0 opacity-10 pointer-events-none dot-pattern"
        aria-hidden
      />
      <h3 className="font-headline-sm text-headline-sm mb-4 text-gold-metallic-end relative">
        اشترك في موجز النزاهة
      </h3>
      <p className="text-on-primary/70 font-body-md mb-6 relative">
        احصل على الأخبار الموثقة فور صدورها مباشرة إلى بريدك الإلكتروني.
      </p>
      <form
        className="flex flex-col sm:flex-row gap-2 relative"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder:text-white/40 focus:ring-1 focus:ring-gold-metallic-start outline-none text-sm"
          placeholder="بريدك الإلكتروني"
          type="email"
        />
        <button
          type="submit"
          className="bg-gold-metallic-start text-primary font-bold px-4 py-2 rounded-lg hover:bg-gold-metallic-end transition-colors text-sm shrink-0 site-btn-shine"
        >
          اشترك
        </button>
      </form>
    </div>
  );
}

function BentoNewsGrid({
  articles,
  showSubscribe,
}: {
  articles: VerifiedNewsArticle[];
  showSubscribe: boolean;
}) {
  const bySlug = Object.fromEntries(articles.map((a) => [a.slug, a]));
  const featured = bySlug["ai-transparency-standard"];
  const sidebar = ["renewable-energy-growth", "genetic-treatment-discovery"]
    .map((slug) => bySlug[slug])
    .filter(Boolean) as VerifiedNewsArticle[];
  const bottomRow = ["digital-space-security", "green-middle-east-initiative"]
    .map((slug) => bySlug[slug])
    .filter(Boolean) as VerifiedNewsArticle[];

  let staggerIndex = 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
      {featured && (
        <StaggerReveal index={staggerIndex++} className="md:col-span-8">
          <FeaturedCard article={featured} />
        </StaggerReveal>
      )}

      {sidebar.length > 0 && (
        <div className="md:col-span-4 flex flex-col gap-gutter">
          {sidebar.map((article) => (
            <StaggerReveal key={article.id} index={staggerIndex++}>
              <StandardCard article={article} />
            </StaggerReveal>
          ))}
        </div>
      )}

      {bottomRow.map((article) => (
        <StaggerReveal key={article.id} index={staggerIndex++} className="md:col-span-4">
          <CompactCard article={article} />
        </StaggerReveal>
      ))}

      {showSubscribe && (
        <StaggerReveal index={staggerIndex++} className="md:col-span-4">
          <SubscribeCard />
        </StaggerReveal>
      )}
    </div>
  );
}

function FlexibleNewsGrid({ articles }: { articles: VerifiedNewsArticle[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-gutter">
      {articles.map((article, index) => {
        const card =
          article.cardVariant === "featured" ? (
            <FeaturedCard article={article} />
          ) : article.cardVariant === "standard" ? (
            <StandardCard article={article} />
          ) : (
            <CompactCard article={article} />
          );
        return (
          <StaggerReveal key={article.id} index={index}>
            {card}
          </StaggerReveal>
        );
      })}
    </div>
  );
}

export default function VerifiedNews() {
  const [activeFilter, setActiveFilter] = useState<NewsCategoryFilter>("all");
  const { data: listingArticles = getListingArticles() } = useVerifiedNewsListing();
  const { data: integrityStats = INTEGRITY_DAILY_STATS } =
    useVerifiedNewsIntegrityStats();

  const filtered = filterVerifiedNews(listingArticles, activeFilter);
  const useBento = activeFilter === "all" && isFullBentoLayout(filtered);

  return (
    <>
    <main className="verified-news-shell relative rounded-2xl p-5 md:p-8">
      <header className="verified-news-hero relative mb-8 overflow-hidden rounded-2xl p-6 md:p-8">
        <div className="verified-news-hero-accent" aria-hidden />
        <div
          className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-gold-metallic-start/10 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-20 -right-10 h-56 w-56 rounded-full bg-success-teal/6 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-4 left-4 h-20 w-20 rounded-full border border-gold-metallic-start/15 opacity-60"
          aria-hidden
        />

        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <EnterItem index={0}>
              <div className="mb-4 inline-flex flex-row-reverse items-center gap-2 rounded-full border border-gold-metallic-start/30 bg-gold-metallic-start/10 px-3.5 py-1.5">
                <span
                  className="material-symbols-outlined text-[18px] text-gold-metallic-start"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
                <span className="font-label-bold text-xs text-gold-metallic-start">
                  تحقق رقمي · ذكاء اصطناعي
                </span>
              </div>
            </EnterItem>

            <EnterItem index={1}>
              <h1 className="mb-4 font-display-lg-mobile leading-tight text-primary md:font-display-lg site-section-title site-section-title-visible">
                الأخبار الموثقة
              </h1>
            </EnterItem>

            <EnterItem index={2}>
              <p className="max-w-xl font-body-lg text-body-lg leading-relaxed text-on-surface-variant">
                خلاصة الأنباء التي تم إخضاعها لأدق معايير التحقق الرقمي والذكاء
                الاصطناعي لضمان نزاهة المحتوى.
              </p>
            </EnterItem>
          </div>

          <EnterItem index={3} className="flex shrink-0 flex-wrap gap-3 lg:flex-col lg:items-stretch">
            <HeaderStatCard
              target={integrityStats.score}
              label="مؤشر النزاهة اليومي"
              valueClassName="text-primary"
            />
            <HeaderStatCard
              target={integrityStats.change}
              label="مقارنة بالأمس"
              prefix="+"
              suffix="%"
              valueClassName="text-success-teal"
            />
          </EnterItem>
        </div>
      </header>

      <EnterItem index={4}>
        <div className="verified-news-filter-bar mb-10 flex flex-col gap-4 rounded-xl px-1 pb-6 pt-2 sm:flex-row sm:flex-wrap sm:items-center">
          <span className="shrink-0 font-label-bold text-label-bold text-on-surface-variant">
            التصنيف:
          </span>
          <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0">
            {NEWS_FILTERS.map((filter) => (
              <button
                key={filter.id}
                type="button"
                className={`shrink-0 rounded-full px-5 py-2 font-label-bold text-label-bold whitespace-nowrap transition-all ${
                  activeFilter === filter.id
                    ? "bg-primary text-on-primary shadow-sm"
                    : "border border-outline-variant/35 bg-surface-container-lowest text-on-surface-variant hover:border-gold-metallic-start/45 hover:text-primary hover:shadow-sm"
                }`}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </EnterItem>

      {filtered.length === 0 ? (
        <RevealOnScroll>
          <div className="glass-panel rounded-2xl p-12 text-center border border-outline-variant/10">
            <span className="material-symbols-outlined text-4xl text-outline mb-4">
              news_off
            </span>
            <p className="font-headline-sm mb-2">لا توجد أخبار في هذا التصنيف</p>
            <button
              type="button"
              className="mt-4 px-6 py-2 border border-primary text-primary rounded-lg font-label-bold site-btn-shine"
              onClick={() => setActiveFilter("all")}
            >
              عرض الكل
            </button>
          </div>
        </RevealOnScroll>
      ) : useBento ? (
        <BentoNewsGrid articles={filtered} showSubscribe />
      ) : (
        <FlexibleNewsGrid articles={filtered} />
      )}
    </main>

    <IntegrityFloatingPanel stats={integrityStats} />
    </>
  );
}
