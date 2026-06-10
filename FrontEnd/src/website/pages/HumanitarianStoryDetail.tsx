import { Link, Navigate, useParams } from "react-router-dom";
import { WEBSITE_ROUTES } from "@core/constants/routes";
import { useHighlightTerms } from "@services";
import RevealOnScroll from "@shared/components/RevealOnScroll";
import { EnterItem, StaggerReveal } from "@shared/components/animations";
import ArticleListenButton from "@website/components/broadcast/ArticleListenButton";
import ContentEditorToolbar from "@website/components/ContentEditorToolbar";
import TermHighlightedArticleBody from "@website/components/TermHighlightedArticleBody";
import TermHighlightedText from "@website/components/TermHighlightedText";
import { useHumanitarianStories, useHumanitarianStory } from "@services";

export default function HumanitarianStoryDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: story, isLoading } = useHumanitarianStory(slug);
  const { data: allStories = [] } = useHumanitarianStories();
  const { data: highlightTerms = [] } = useHighlightTerms();

  if (isLoading) {
    return (
      <main className="py-16 text-center">
        <span className="material-symbols-outlined animate-spin text-4xl text-gold-metallic-start">
          progress_activity
        </span>
      </main>
    );
  }

  if (!story) {
    return <Navigate to={WEBSITE_ROUTES.STORIES_HUMANITARIAN} replace />;
  }

  const related = allStories
    .filter((item) => story.relatedSlugs.includes(item.slug))
    .slice(0, 3);

  return (
    <main className="py-10 px-margin-desktop">
      <div className="grid grid-cols-1 gap-gutter lg:grid-cols-12 max-w-container-max mx-auto">
        <article className="space-y-8 lg:col-span-8">
          <EnterItem index={0}>
            <nav className="mb-2 flex flex-wrap items-center gap-2 border-b border-outline-variant/10 pb-5 font-label-bold text-label-bold text-on-surface-variant">
              <Link className="hover:text-primary transition-colors" to={WEBSITE_ROUTES.HOME}>
                الرئيسية
              </Link>
              <span className="material-symbols-outlined text-[14px]">chevron_left</span>
              <Link
                className="hover:text-primary transition-colors"
                to={WEBSITE_ROUTES.STORIES_HUMANITARIAN}
              >
                القصص الإنسانية
              </Link>
              <span className="material-symbols-outlined text-[14px]">chevron_left</span>
              <span className="text-primary truncate max-w-[200px] md:max-w-md">
                {story.title}
              </span>
            </nav>
          </EnterItem>

          <ContentEditorToolbar contentLabel={`القصة «${story.title}»`} />

          <RevealOnScroll>
            <header className="space-y-4">
              <span className="inline-block bg-gold-metallic-start text-white text-xs font-label-bold px-3 py-1 rounded-sm">
                {story.tag}
              </span>
              <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg leading-tight text-primary">
                <TermHighlightedText text={story.title} terms={highlightTerms} />
              </h1>
              <div className="flex flex-wrap items-center gap-6 py-4 border-y border-outline-variant/10">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-on-surface-variant">person</span>
                  <span className="font-label-bold">{story.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-on-surface-variant">
                    calendar_today
                  </span>
                  <span className="text-on-surface-variant">
                    {story.relativeTime ?? story.publishedAt}
                  </span>
                </div>
                <div className="mr-auto flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full text-primary font-label-bold text-sm">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  نزاهة {story.integrityScore}%
                </div>
              </div>
            </header>
          </RevealOnScroll>

          <RevealOnScroll delay={100}>
            <div className="relative rounded-xl overflow-hidden shadow-xl">
              <img
                alt={story.heroAlt}
                className="w-full h-[280px] md:h-[420px] object-cover"
                src={story.heroImage}
              />
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <section className="glass-panel p-6 rounded-xl border-r-4 border-secondary bg-surface-container-low/50">
              <h3 className="font-headline-sm text-headline-sm mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">fact_check</span>
                منهجية التحقق في القصة
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-on-surface-variant text-label-bold font-label-bold mb-1">
                    المصدر
                  </p>
                  <p className="font-body-md text-primary">{story.originalSource}</p>
                </div>
                <div>
                  <p className="text-on-surface-variant text-label-bold font-label-bold mb-1">
                    تحليل الذكاء الاصطناعي
                  </p>
                  <p className="font-body-md text-success-teal">{story.aiAnalysis}</p>
                </div>
                <div>
                  <p className="text-on-surface-variant text-label-bold font-label-bold mb-1">
                    مراجعة تحريرية
                  </p>
                  <p className="font-body-md text-primary">{story.humanReview}</p>
                </div>
              </div>
            </section>
          </RevealOnScroll>

          <RevealOnScroll>
            <TermHighlightedArticleBody sections={story.body} terms={highlightTerms} />
          </RevealOnScroll>

          <footer className="border-t border-outline-variant/20 pt-8">
            <ArticleListenButton
              title={story.title}
              subtitle={`قصة إنسانية • ${story.author}`}
              coverImage={story.heroImage}
              sections={story.body}
            />
          </footer>
        </article>

        <aside className="lg:col-span-4 space-y-8">
          {related.length > 0 && (
            <RevealOnScroll direction="left">
              <section className="glass-panel p-6 rounded-xl border border-outline-variant/10">
                <h4 className="font-label-bold text-primary mb-4 border-b border-outline-variant/20 pb-2">
                  قصص ذات صلة
                </h4>
                <div className="space-y-4">
                  {related.map((item, index) => (
                    <StaggerReveal key={item.id} index={index}>
                      <Link
                        className="block group"
                        to={WEBSITE_ROUTES.humanitarianStoryDetail(item.slug)}
                      >
                        <h5 className="font-label-bold group-hover:text-gold-metallic-start transition-colors leading-snug line-clamp-2">
                          {item.title}
                        </h5>
                        <p className="text-xs text-on-surface-variant mt-1">{item.tag}</p>
                      </Link>
                    </StaggerReveal>
                  ))}
                </div>
              </section>
            </RevealOnScroll>
          )}
        </aside>
      </div>
    </main>
  );
}
