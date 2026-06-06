import { Link, useLocation } from "react-router-dom";
import { WEBSITE_ROUTES } from "@core/constants/routes";

const sidebarItems = [
  {
    label: "قصص إنسانية",
    icon: "volunteer_activism",
    href: WEBSITE_ROUTES.STORIES_HUMANITARIAN,
  },
  {
    label: "قضايا اجتماعية",
    icon: "groups",
    href: WEBSITE_ROUTES.STORIES_COMMUNITY,
  },
  {
    label: "قصص نجاح",
    icon: "military_tech",
    href: WEBSITE_ROUTES.STORIES_SUCCESS,
  },
  {
    label: "شؤون المرأة",
    icon: "woman",
    href: WEBSITE_ROUTES.STORIES_WOMEN,
  },
  {
    label: "الأكثر تداولاً",
    icon: "trending_up",
    href: WEBSITE_ROUTES.STORIES,
  },
];

export default function StoriesSidebar() {
  const { pathname } = useLocation();

  const isActive = (href: string) =>
    href === WEBSITE_ROUTES.STORIES
      ? pathname === WEBSITE_ROUTES.STORIES
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <aside className="fixed right-0 top-20 h-[calc(100vh-5rem)] w-72 bg-surface-container-low shadow-lg shadow-on-surface/5 border-l border-outline-variant/30 hidden lg:flex flex-col py-6">
      <div className="flex items-center gap-4 px-6 mb-8">
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center relative shadow-inner">
          <span
            className="material-symbols-outlined text-gold-metallic-start text-3xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            auto_awesome
          </span>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gold-metallic-start rounded-full border-2 border-white pulse-dot" />
        </div>
        <div>
          <h3 className="font-label-bold text-on-surface">مساعدي الذكي</h3>
          <p className="text-[12px] text-on-surface-variant">
            تحليل النزاهة المباشر
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-1 overflow-y-auto grow px-2">
        {sidebarItems.map((item) =>
          isActive(item.href) ? (
            <Link
              key={item.href}
              className="flex items-center gap-3 bg-primary text-white rounded-lg p-3 mx-2 my-1 shadow-md transition-all"
              to={item.href}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="font-label-bold">{item.label}</span>
            </Link>
          ) : (
            <Link
              key={item.href}
              className="flex items-center gap-3 text-on-surface-variant hover:bg-surface-variant/50 rounded-lg p-3 mx-2 my-1 transition-all hover:-translate-x-1 hover:text-primary"
              to={item.href}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="font-label-bold">{item.label}</span>
            </Link>
          ),
        )}
      </div>

      <div className="mt-auto px-4 border-t border-outline-variant/20 pt-4">
        <button
          type="button"
          className="w-full bg-surface-container-highest text-primary font-label-bold py-3 rounded-lg mb-4 hover:bg-mist-grey transition-colors flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined">add</span>
          تحليل قصة جديدة
        </button>
        <div className="flex flex-col gap-1">
          <a
            className="flex items-center gap-3 text-on-surface-variant hover:text-primary p-2 transition-all"
            href="#"
          >
            <span className="material-symbols-outlined">help</span>
            <span className="font-label-bold">المساعدة</span>
          </a>
          <a
            className="flex items-center gap-3 text-error hover:opacity-80 p-2 transition-all"
            href="#"
          >
            <span className="material-symbols-outlined">logout</span>
            <span className="font-label-bold">تسجيل الخروج</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
