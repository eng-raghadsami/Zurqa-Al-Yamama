import { Link } from "react-router-dom";
import { WEBSITE_ROUTES } from "@core/constants/routes";

const sidebarItems = [
  {
    label: "مركز المعرفة",
    icon: "school",
    href: WEBSITE_ROUTES.MEDIA_LITERACY,
    active: true,
  },
  {
    label: "مسارات التعلم",
    icon: "route",
    href: `${WEBSITE_ROUTES.MEDIA_LITERACY}#tracks`,
  },
  {
    label: "مقالات وأدلة",
    icon: "article",
    href: `${WEBSITE_ROUTES.MEDIA_LITERACY}#articles`,
  },
  {
    label: "مصطلحات إعلامية",
    icon: "menu_book",
    href: WEBSITE_ROUTES.MEDIA_TERMINOLOGY,
  },
  {
    label: "أخبار موثقة",
    icon: "verified",
    href: WEBSITE_ROUTES.VERIFIED_NEWS,
  },
  {
    label: "أدوات التحقق",
    icon: "verified_user",
    href: WEBSITE_ROUTES.VERIFICATION_IMAGE,
  },
];

export default function MediaLiteracySidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-72 shrink-0 bg-surface-container-low border-l border-outline-variant/30 rounded-xl p-6 sticky top-28 h-fit max-h-[calc(100vh-8rem)] overflow-y-auto">
      <div className="mb-8 flex items-center gap-4">
        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white">
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            smart_toy
          </span>
        </div>
        <div>
          <p className="font-label-bold text-primary">مساعدي الذكي</p>
          <p className="text-[12px] text-on-surface-variant">
            تحليل النزاهة المباشر
          </p>
        </div>
      </div>

      <nav className="flex flex-col gap-2 mb-10">
        {sidebarItems.map((item) =>
          item.active ? (
            <div
              key={item.label}
              className="flex items-center gap-3 bg-primary text-white rounded-lg p-3 shadow-md"
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="font-label-bold">{item.label}</span>
            </div>
          ) : (
            <Link
              key={item.label}
              className="flex items-center gap-3 text-on-surface-variant hover:bg-surface-variant/50 rounded-lg p-3 transition-all"
              to={item.href}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="font-label-bold">{item.label}</span>
            </Link>
          ),
        )}
      </nav>

      <div className="mt-auto pt-6 border-t border-outline-variant/20">
        <Link
          to={WEBSITE_ROUTES.VERIFICATION_IMAGE}
          className="w-full bg-surface-container-highest text-primary font-label-bold py-3 rounded-lg flex items-center justify-center gap-2 mb-4 hover:bg-surface-dim transition-all"
        >
          <span className="material-symbols-outlined">add</span>
          تحليل قصة جديدة
        </Link>
        <div className="flex flex-col gap-2">
          <a
            className="flex items-center gap-3 text-on-surface-variant p-2 hover:text-primary transition-all"
            href="#"
          >
            <span className="material-symbols-outlined">help</span>
            <span className="text-sm">مركز المساعدة</span>
          </a>
          <a
            className="flex items-center gap-3 text-on-surface-variant p-2 hover:text-error transition-all"
            href="#"
          >
            <span className="material-symbols-outlined">logout</span>
            <span className="text-sm">تسجيل الخروج</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
