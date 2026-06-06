import { Link } from "react-router-dom";
import { WEBSITE_ROUTES } from "@core/constants/routes";
import { TERMINOLOGY_ASSISTANT_AVATAR } from "@website/constants/brand";

const sidebarItems = [
  {
    label: "مساعدي الذكي",
    icon: "smart_toy",
    href: WEBSITE_ROUTES.HOME,
  },
  {
    label: "مساحتي",
    icon: "person",
    href: WEBSITE_ROUTES.MY_SPACE,
  },
  {
    label: "مصطلحات الإعلام",
    icon: "dictionary",
    href: WEBSITE_ROUTES.MEDIA_TERMINOLOGY,
    active: true,
  },
  {
    label: "أخبار موثقة",
    icon: "verified",
    href: WEBSITE_ROUTES.VERIFIED_NEWS,
  },
];

export default function TerminologySidebar() {
  return (
    <aside className="hidden lg:flex flex-col gap-4 p-6 shrink-0 w-72 sticky top-28 h-fit max-h-[calc(100vh-8rem)] bg-surface-container-low border border-outline-variant/10 rounded-xl shadow-md">
      <div className="flex flex-col items-center text-center gap-2 mb-6">
        <div className="w-16 h-16 rounded-full bg-mist-grey overflow-hidden border-2 border-secondary/20">
          <img
            alt="مساعدك الذكي"
            className="w-full h-full object-cover"
            src={TERMINOLOGY_ASSISTANT_AVATAR}
          />
        </div>
        <h3 className="font-headline-sm text-headline-sm text-secondary">
          مساعدك الذكي
        </h3>
        <p className="text-on-surface-variant text-body-md">
          تحليل النزاهة الرقمية
        </p>
      </div>

      <nav className="flex flex-col gap-2">
        {sidebarItems.map((item) =>
          item.active ? (
            <div
              key={item.label}
              className="flex items-center gap-3 p-3 bg-secondary-container text-on-secondary-container rounded-lg font-bold"
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="font-label-bold text-label-bold">{item.label}</span>
            </div>
          ) : (
            <Link
              key={item.label}
              className="flex items-center gap-3 p-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg hover:-translate-x-1 transition-all"
              to={item.href}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="font-label-bold text-label-bold">{item.label}</span>
            </Link>
          ),
        )}
      </nav>

      <Link
        to={WEBSITE_ROUTES.VERIFICATION_IMAGE}
        className="mt-auto gold-gradient-bg text-primary-container font-bold py-3 rounded-xl shadow-lg hover:scale-[1.02] transition-transform text-center"
      >
        بدء التحقق الآن
      </Link>
    </aside>
  );
}
