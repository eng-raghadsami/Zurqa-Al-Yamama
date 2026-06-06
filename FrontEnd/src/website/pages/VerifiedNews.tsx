import { useState } from "react";
import { Link } from "react-router-dom";
import { WEBSITE_ROUTES } from "@core/constants/routes";
import VerifiedNewsImage from "@website/components/VerifiedNewsImage";
import type {
  NewsCategoryFilter,
  VerifiedNewsArticle,
} from "@website/types/verifiedNews";
import {
  INTEGRITY_DAILY_STATS,
  NEWS_CATEGORY_LABELS,
  NEWS_FILTERS,
  filterVerifiedNews,
  getListingArticles,
  isFullBentoLayout,
} from "@website/types/verifiedNews";

function NewsImage(props: { alt: string; src: string; className?: string }) {
  return <VerifiedNewsImage {...props} />;
}

function FeaturedCard({ article }: { article: VerifiedNewsArticle }) {
  return (
    <Link
      to={WEBSITE_ROUTES.verifiedNewsDetail(article.slug)}
      className="group block relative overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-xl transition-all duration-500 border border-outline-variant/10 hover:border-gold-metallic-start/40 h-full"
    >
      <div className="aspect-[16/9] overflow-hidden relative">
        <NewsImage
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
      className="group block bg-surface-container-lowest rounded-xl border border-outline-variant/10 overflow-hidden hover:shadow-lg hover:border-gold-metallic-start/40 transition-all"
    >
      <div className="aspect-video relative overflow-hidden">
        <NewsImage
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
      className="group block bg-surface-container-lowest rounded-xl border border-outline-variant/10 overflow-hidden hover:shadow-lg hover:border-gold-metallic-start/40 transition-all p-6 h-full"
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
          className="bg-gold-metallic-start text-primary font-bold px-4 py-2 rounded-lg hover:bg-gold-metallic-end transition-colors text-sm shrink-0"
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
      {featured && (
        <div className="md:col-span-8">
          <FeaturedCard article={featured} />
        </div>
      )}

      {sidebar.length > 0 && (
        <div className="md:col-span-4 flex flex-col gap-gutter">
          {sidebar.map((article) => (
            <StandardCard key={article.id} article={article} />
          ))}
        </div>
      )}

      {bottomRow.map((article) => (
        <div key={article.id} className="md:col-span-4">
          <CompactCard article={article} />
        </div>
      ))}

      {showSubscribe && (
        <div className="md:col-span-4">
          <SubscribeCard />
        </div>
      )}
    </div>
  );
}

function FlexibleNewsGrid({ articles }: { articles: VerifiedNewsArticle[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-gutter">
      {articles.map((article) => {
        if (article.cardVariant === "featured") {
          return <FeaturedCard key={article.id} article={article} />;
        }
        if (article.cardVariant === "standard") {
          return <StandardCard key={article.id} article={article} />;
        }
        return <CompactCard key={article.id} article={article} />;
      })}
    </div>
  );
}

export default function VerifiedNews() {
  const [activeFilter, setActiveFilter] = useState<NewsCategoryFilter>("all");

  const filtered = filterVerifiedNews(getListingArticles(), activeFilter);
  const useBento = activeFilter === "all" && isFullBentoLayout(filtered);

  return (
    <main className="relative mist-bg rounded-2xl p-6 md:p-8 border border-outline-variant/10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
        <div>
          <p className="inline-flex items-center gap-2 text-gold-metallic-start font-label-bold text-xs mb-3">
            <span
              className="material-symbols-outlined text-[16px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified
            </span>
            الأخبار الموثقة
          </p>
          <h1 className="font-display-lg-mobile md:font-display-lg text-primary mb-2">
            الأخبار الموثقة
          </h1>
          <p className="text-on-surface-variant max-w-2xl font-body-lg text-body-lg">
            خلاصة الأنباء التي تم إخضاعها لأدق معايير التحقق الرقمي والذكاء
            الاصطناعي لضمان نزاهة المحتوى.
          </p>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto shrink-0">
          {NEWS_FILTERS.map((filter) => (
            <button
              key={filter.id}
              type="button"
              className={`px-5 py-2 rounded-full font-label-bold text-label-bold whitespace-nowrap transition-colors ${
                activeFilter === filter.id
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container-highest text-on-surface-variant hover:bg-mist-grey"
              }`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="glass-panel rounded-2xl p-12 text-center border border-outline-variant/10">
          <span className="material-symbols-outlined text-4xl text-outline mb-4">
            news_off
          </span>
          <p className="font-headline-sm mb-2">لا توجد أخبار في هذا التصنيف</p>
          <button
            type="button"
            className="mt-4 px-6 py-2 border border-primary text-primary rounded-lg font-label-bold"
            onClick={() => setActiveFilter("all")}
          >
            عرض الكل
          </button>
        </div>
      ) : useBento ? (
        <BentoNewsGrid articles={filtered} showSubscribe />
      ) : (
        <FlexibleNewsGrid articles={filtered} />
      )}

      <div className="hidden xl:block fixed bottom-10 left-10 z-30 pointer-events-none">
        <div className="glass-panel p-5 rounded-2xl shadow-2xl border border-white/40 w-64 pointer-events-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="font-label-bold text-xs opacity-60">
              مؤشر النزاهة اليومي
            </span>
            <span className="text-gold-metallic-start">✨</span>
          </div>
          <div className="flex items-end gap-2 mb-2">
            <span className="font-stats-number text-stats-number text-primary">
              {INTEGRITY_DAILY_STATS.score}
            </span>
            <span className="text-success-teal text-xs mb-1 font-bold">
              {INTEGRITY_DAILY_STATS.change}
            </span>
          </div>
          <p className="text-[10px] text-on-surface-variant">
            تم فحص {INTEGRITY_DAILY_STATS.scannedToday} خبر اليوم باستخدام
            خوارزميات اليمامة.
          </p>
        </div>
      </div>
    </main>
  );
}
