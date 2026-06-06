import { Link } from "react-router-dom";
import { WEBSITE_ROUTES } from "@core/constants/routes";

type SidebarActive = "terminology" | "verified-news";

type VerifiedNewsSidebarProps = {
  active?: SidebarActive;
};

const sidebarItems: {
  label: string;
  icon: string;
  href: string;
  id: SidebarActive | "home" | "my-space";
  filled?: boolean;
}[] = [
  {
    label: "مساعدي الذكي",
    icon: "smart_toy",
    href: WEBSITE_ROUTES.HOME,
    id: "home",
  },
  {
    label: "مساحتي",
    icon: "person",
    href: WEBSITE_ROUTES.MY_SPACE,
    id: "my-space",
  },
  {
    label: "مصطلحات الإعلام",
    icon: "dictionary",
    href: WEBSITE_ROUTES.MEDIA_TERMINOLOGY,
    id: "terminology",
  },
  {
    label: "أخبار موثقة",
    icon: "verified",
    href: WEBSITE_ROUTES.VERIFIED_NEWS,
    id: "verified-news",
    filled: true,
  },
];

export default function VerifiedNewsSidebar({
  active = "verified-news",
}: VerifiedNewsSidebarProps) {
  return (
    <aside className="hidden lg:flex flex-col gap-4 p-6 shrink-0 w-72 sticky top-28 h-fit max-h-[calc(100vh-8rem)] bg-surface-container-low border border-outline-variant/10 rounded-xl shadow-md">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
          <span
            className="material-symbols-outlined text-on-secondary-container"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            smart_toy
          </span>
        </div>
        <div>
          <h3 className="font-headline-sm text-headline-sm text-secondary">
            مساعدك الذكي
          </h3>
          <p className="text-on-surface-variant text-xs">تحليل النزاهة الرقمية</p>
        </div>
      </div>

      <nav className="flex flex-col gap-2">
        {sidebarItems.map((item) =>
          item.id === active ? (
            <div
              key={item.label}
              className="flex items-center gap-3 p-3 bg-secondary-container text-on-secondary-container rounded-lg font-bold"
            >
              <span
                className="material-symbols-outlined"
                style={
                  item.filled
                    ? { fontVariationSettings: "'FILL' 1" }
                    : undefined
                }
              >
                {item.icon}
              </span>
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

      <div className="mt-auto p-4 glass-panel rounded-xl border border-gold-metallic-start/20">
        <p className="text-xs text-on-surface-variant mb-3">
          هل لديك خبر تريد التحقق منه؟
        </p>
        <Link
          to={WEBSITE_ROUTES.VERIFICATION_IMAGE}
          className="block w-full py-2 gold-gradient-bg text-primary font-bold rounded-lg text-sm shadow-sm hover:scale-[1.02] transition-transform text-center"
        >
          بدء التحقق الآن
        </Link>
      </div>
    </aside>
  );
}
