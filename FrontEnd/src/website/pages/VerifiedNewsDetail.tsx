import { Link, Navigate, useParams } from "react-router-dom";
import { WEBSITE_ROUTES } from "@core/constants/routes";
import VerifiedNewsImage from "@website/components/VerifiedNewsImage";
import type { VerifiedNewsBodySection } from "@website/types/verifiedNews";
import {
  NEWS_CATEGORY_LABELS,
  getRelatedArticles,
  getVerifiedNewsBySlug,
} from "@website/types/verifiedNews";

function ArticleBody({ sections }: { sections: VerifiedNewsBodySection[] }) {
  return (
    <div className="font-body-lg text-body-lg leading-relaxed text-on-surface space-y-6">
      {sections.map((section, index) => {
        if (section.type === "paragraph") {
          return <p key={index}>{section.text}</p>;
        }
        if (section.type === "heading") {
          return (
            <h2
              key={index}
              className="font-headline-md text-headline-md text-primary pt-4"
            >
              {section.text}
            </h2>
          );
        }
        return (
          <blockquote
            key={index}
            className="relative border-r-4 border-gold-metallic-start bg-surface-container-low p-8 rounded-lg my-10"
          >
            <span className="material-symbols-outlined absolute -top-4 -right-2 text-gold-metallic-start text-5xl opacity-30">
              format_quote
            </span>
            <p className="font-headline-sm text-headline-sm italic leading-snug">
              {section.text}
            </p>
            <footer className="mt-4 font-label-bold text-label-bold text-on-surface-variant text-left">
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
  const article = slug ? getVerifiedNewsBySlug(slug) : undefined;

  if (!article) {
    return <Navigate to={WEBSITE_ROUTES.VERIFIED_NEWS} replace />;
  }

  const related = getRelatedArticles(article);

  return (
    <main className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
      <article className="lg:col-span-8 space-y-8">
        <nav className="flex items-center gap-2 text-on-surface-variant font-label-bold text-label-bold flex-wrap">
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

        <header className="space-y-4">
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg leading-tight text-primary">
            {article.title}
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

        <div className="relative group rounded-xl overflow-hidden shadow-xl bg-surface-container">
          <VerifiedNewsImage
            alt={article.title}
            className="w-full h-[280px] md:h-[450px] object-cover transition-transform duration-700 group-hover:scale-105"
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

        <section className="glass-panel p-6 rounded-xl border-r-4 border-gold-metallic-start shadow-sm bg-mist-grey/20">
          <h3 className="font-headline-sm text-headline-sm mb-4 flex items-center gap-2">
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

        <ArticleBody sections={article.body} />

        <footer className="pt-10 flex flex-wrap gap-4 border-t border-outline-variant/20">
          <button
            type="button"
            className="bg-primary text-white px-8 py-3 rounded-lg font-label-bold text-label-bold hover:opacity-90 transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined">download</span>
            تحميل التقرير الكامل
          </button>
          <button
            type="button"
            className="border border-primary text-primary px-8 py-3 rounded-lg font-label-bold text-label-bold hover:bg-mist-grey transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined">bookmark</span>
            حفظ في الأرشيف
          </button>
        </footer>
      </article>

      <aside className="lg:col-span-4 space-y-10">
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
            ].map((step) => (
              <div key={step.label} className="relative flex items-center gap-4">
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
            ))}
          </div>
          <button
            type="button"
            className="w-full mt-8 bg-primary text-white py-3 rounded-lg text-label-bold font-label-bold hover:opacity-90 transition-opacity"
          >
            عرض السجل الكامل
          </button>
        </section>

        {related.length > 0 && (
          <section className="space-y-6">
            <h4 className="font-label-bold text-label-bold border-b border-outline-variant/20 pb-2">
              أخبار ذات صلة
            </h4>
            {related.map((item) => (
              <Link
                key={item.id}
                className="block group"
                to={WEBSITE_ROUTES.verifiedNewsDetail(item.slug)}
              >
                <div className="relative overflow-hidden rounded-lg aspect-video mb-3">
                  <VerifiedNewsImage
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
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
            ))}
          </section>
        )}
      </aside>
    </main>
  );
}
