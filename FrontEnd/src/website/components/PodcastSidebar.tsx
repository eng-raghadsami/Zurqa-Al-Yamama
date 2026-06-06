import { Link } from "react-router-dom";
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
    active: true,
  },
];

export default function PodcastSidebar() {
  return (
    <aside className="hidden lg:flex flex-col h-[calc(100vh-5rem)] w-72 fixed right-0 top-20 bg-surface-container-low border-l border-outline-variant/30 py-6 z-40 overflow-y-auto">
      <div className="px-6 mb-8 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-tertiary-container flex items-center justify-center text-gold-metallic-start shadow-inner">
          <span className="material-symbols-outlined text-2xl">smart_toy</span>
        </div>
        <div>
          <p className="font-label-bold text-label-bold text-primary">
            مساعدي الذكي
          </p>
          <p className="text-[12px] text-on-surface-variant">
            تحليل النزاهة المباشر
          </p>
        </div>
      </div>

      <nav className="flex flex-col gap-1 px-2">
        {sidebarItems.map((item) =>
          item.active ? (
            <div
              key={item.label}
              className="flex items-center gap-3 bg-primary text-white rounded-lg p-3 shadow-md"
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="font-label-bold text-label-bold">{item.label}</span>
            </div>
          ) : (
            <Link
              key={item.label}
              className="flex items-center gap-3 text-on-surface-variant hover:bg-surface-variant/50 rounded-lg p-3 transition-all group"
              to={item.href}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="font-label-bold text-label-bold group-hover:text-primary">
                {item.label}
              </span>
            </Link>
          ),
        )}
      </nav>

      <div className="mt-auto px-4 pb-4">
        <button
          type="button"
          className="w-full py-3 border border-gold-metallic-start text-gold-metallic-start rounded-lg font-label-bold hover:bg-gold-metallic-start hover:text-white transition-all flex items-center justify-center gap-2"
        >
          <span>تحليل قصة جديدة</span>
          <span className="material-symbols-outlined">add</span>
        </button>
      </div>
    </aside>
  );
}
