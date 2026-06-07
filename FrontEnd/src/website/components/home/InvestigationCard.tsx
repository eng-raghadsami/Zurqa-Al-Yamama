import RevealOnScroll from "@shared/components/RevealOnScroll";
import SmartLink from "@shared/components/SmartLink";
import { WEBSITE_ROUTES } from "@core/constants/routes";

type InvestigationCardProps = {
  index: number;
  image: string;
  imageAlt: string;
  badge: { text: string; className: string };
  tag?: { text: string; dotClassName: string; className: string };
  title: string;
  description: string;
  href?: string;
  variant?: "default" | "wide";
  wideContent?: {
    buttonText: string;
    readTime: string;
    href?: string;
  };
};

export default function InvestigationCard({
  index,
  image,
  imageAlt,
  badge,
  tag,
  title,
  description,
  href = WEBSITE_ROUTES.REPORTS_INVESTIGATIVE,
  variant = "default",
  wideContent,
}: InvestigationCardProps) {
  if (variant === "wide") {
    return (
      <RevealOnScroll
        as="article"
        delay={index * 120}
        direction="scale"
        className="md:col-span-2"
      >
        <div className="group glass-panel rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-secondary/10 flex flex-col md:flex-row home-card-hover">
          <div className="md:w-1/3 overflow-hidden relative">
            <img
              alt={imageAlt}
              className="w-full h-full min-h-[200px] object-cover home-card-image"
              src={image}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          <div className="p-8 flex-1 flex flex-col justify-center">
            <div className="flex gap-2 mb-4">
              <span className={`px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${badge.className}`}>
                {badge.text}
              </span>
            </div>
            <h3 className="font-headline-md text-headline-md text-primary mb-4 group-hover:text-secondary transition-colors duration-300">
              {title}
            </h3>
            <p className="text-on-surface-variant text-body-lg mb-6 max-w-2xl">
              {description}
            </p>
            {wideContent && (
              <div className="flex items-center gap-4">
                <SmartLink
                  to={wideContent.href ?? WEBSITE_ROUTES.VISUALS}
                  className="px-6 py-2 bg-secondary text-on-secondary rounded-lg font-label-bold text-label-bold hover:opacity-90 transition-all home-btn-shine inline-block"
                >
                  {wideContent.buttonText}
                </SmartLink>
                <span className="text-outline text-sm">{wideContent.readTime}</span>
              </div>
            )}
          </div>
        </div>
      </RevealOnScroll>
    );
  }

  return (
    <RevealOnScroll as="article" delay={index * 120} direction="up">
      <div className="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-outline-variant/10 home-card-hover h-full">
        <div className="aspect-video overflow-hidden relative">
          <img
            alt={imageAlt}
            className="w-full h-full object-cover home-card-image"
            src={image}
          />
          <div
            className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${badge.className}`}
          >
            {badge.text}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        <div className="p-6">
          {tag && (
            <div className="flex gap-2 mb-3">
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold border flex items-center gap-1 ${tag.className}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${tag.dotClassName}`} />
                {tag.text}
              </span>
            </div>
          )}
          <h3 className="font-headline-sm text-headline-sm text-primary mb-3 group-hover:text-secondary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-on-surface-variant text-sm line-clamp-2 mb-4">
            {description}
          </p>
          <SmartLink
            to={href}
            className="inline-flex items-center gap-2 text-secondary font-bold text-sm border-b-2 border-transparent hover:border-secondary transition-all group/link"
          >
            اقرأ المزيد
            <span className="material-symbols-outlined text-[18px] transition-transform group-hover/link:-translate-x-1">
              open_in_new
            </span>
          </SmartLink>
        </div>
      </div>
    </RevealOnScroll>
  );
}
