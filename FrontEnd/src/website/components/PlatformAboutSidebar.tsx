import { Link, useLocation } from "react-router-dom";
import { PLACEHOLDER_ROUTE, WEBSITE_ROUTES } from "@core/constants/routes";

const SIDEBAR_ITEMS = [
  {
    id: "publishing-policies",
    label: "سياسات النشر والتحقق",
    icon: "policy",
    to: WEBSITE_ROUTES.ABOUT_PUBLISHING_POLICIES,
    active: true,
  },
  {
    id: "amateur-path",
    label: "مسار الهواة نحو الاحتراف",
    icon: "school",
    to: PLACEHOLDER_ROUTE,
    active: false,
  },
  {
    id: "platform-vision",
    label: "رؤية المنصة",
    icon: "lightbulb",
    to: PLACEHOLDER_ROUTE,
    active: false,
  },
] as const;

export default function PlatformAboutSidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <div className="sticky top-28 glass-panel rounded-2xl border border-outline-variant/10 p-4">
        <h2 className="font-label-bold text-primary text-sm mb-4 px-2">عن المنصة</h2>
        <nav className="space-y-1">
          {SIDEBAR_ITEMS.map((item) => {
            const isCurrent = pathname.startsWith(item.to) && item.to !== PLACEHOLDER_ROUTE;
            const className = `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              isCurrent
                ? "bg-primary/10 text-primary font-label-bold"
                : item.active
                  ? "text-on-surface-variant hover:bg-surface-container-low hover:text-primary"
                  : "text-outline cursor-not-allowed"
            }`;

            if (!item.active) {
              return (
                <span key={item.id} className={className} title="قريبًا">
                  <span className="material-symbols-outlined text-xl">{item.icon}</span>
                  <span className="flex-1">{item.label}</span>
                  <span className="text-[10px]">قريبًا</span>
                </span>
              );
            }

            return (
              <Link key={item.id} className={className} to={item.to}>
                <span className="material-symbols-outlined text-xl">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-6 p-3 rounded-xl bg-gold-metallic-start/10 border border-gold-metallic-start/20">
          <p className="text-xs text-on-surface-variant leading-relaxed">
            سياسات النشر والتحقق أساس محلل الذكاء الاصطناعي ومسار نشر المحتوى للهواة
            والصحفيين على المنصة.
          </p>
        </div>
      </div>
    </aside>
  );
}
