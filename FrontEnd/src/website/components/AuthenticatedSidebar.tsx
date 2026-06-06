import { Link, useLocation } from "react-router-dom";
import { WEBSITE_ROUTES } from "@core/constants/routes";
import { SIDEBAR_LOGO } from "@website/constants/brand";

const navItems = [
  {
    label: "التقارير",
    icon: "analytics",
    href: WEBSITE_ROUTES.REPORTS_INVESTIGATIVE,
    match: "/reports",
  },
  {
    label: "القصص",
    icon: "auto_stories",
    href: WEBSITE_ROUTES.STORIES_HUMANITARIAN,
    match: "/stories",
  },
  { label: "التحقق من الوسائط", icon: "verified_user", href: WEBSITE_ROUTES.VERIFICATION_IMAGE, match: "/verification" },
  {
    label: "مساحتي",
    icon: "person_pin",
    href: WEBSITE_ROUTES.MY_SPACE,
    match: "/my-space",
  },
];

export default function AuthenticatedSidebar({
  belowTopNav = false,
}: {
  belowTopNav?: boolean;
}) {
  const { pathname } = useLocation();

  const isActive = (match: string) => match !== "" && pathname.startsWith(match);

  return (
    <aside
      className={`fixed right-0 top-0 h-full flex flex-col z-40 bg-surface-container-low border-l border-mist-grey shadow-md w-80 hidden lg:flex ${
        belowTopNav ? "pt-20" : ""
      }`}
    >
      <Link
        to={WEBSITE_ROUTES.HOME}
        className="p-8 flex flex-col items-center hover:opacity-90 transition-opacity"
      >
        <img
          alt="زرقاء اليمامة"
          className="w-20 h-20 mb-4 rounded-full border-2 border-gold-metallic-start p-1"
          src={SIDEBAR_LOGO}
        />
        <h1 className="font-headline-md text-headline-md text-primary">
          زرقاء اليمامة
        </h1>
        <p className="font-label-bold text-label-bold text-on-surface-variant opacity-70">
          نظام النزاهة الإعلامية
        </p>
      </Link>

      <nav className="flex-1 px-4 mt-8 space-y-2">
        {navItems.map((item) =>
          isActive(item.match) ? (
            <Link
              key={item.label}
              className="flex flex-row-reverse items-center gap-4 text-primary font-bold border-r-4 border-gold-metallic-start bg-surface-bright px-4 py-3 transition-all rounded-l-lg"
              to={item.href}
            >
              <span
                className="material-symbols-outlined"
                style={
                  item.icon === "person_pin"
                    ? { fontVariationSettings: "'FILL' 1" }
                    : undefined
                }
              >
                {item.icon}
              </span>
              <span className="font-label-bold text-label-bold">
                {item.label}
              </span>
            </Link>
          ) : (
            <Link
              key={item.label}
              className="flex flex-row-reverse items-center gap-4 text-on-surface-variant px-4 py-3 hover:bg-mist-grey/50 hover:text-primary transition-all"
              to={item.href}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="font-label-bold text-label-bold">
                {item.label}
              </span>
            </Link>
          ),
        )}
      </nav>

      <div className="p-6">
        <Link
          to={WEBSITE_ROUTES.VERIFICATION_IMAGE}
          className="block w-full py-4 bg-gradient-to-r from-gold-metallic-start to-gold-metallic-end text-white font-label-bold text-label-bold rounded shadow-lg hover:scale-[1.02] transition-transform text-center"
        >
          تقديم ملف للتحقق
        </Link>
      </div>

      <div className="p-4 space-y-1 mb-8">
        <a
          className="flex flex-row-reverse items-center gap-4 text-on-surface-variant px-4 py-2 hover:text-primary"
          href="#"
        >
          <span className="material-symbols-outlined">settings</span>
          <span className="font-label-bold text-label-bold">الإعدادات</span>
        </a>
        <a
          className="flex flex-row-reverse items-center gap-4 text-on-surface-variant px-4 py-2 hover:text-primary"
          href="#"
        >
          <span className="material-symbols-outlined">help</span>
          <span className="font-label-bold text-label-bold">المساعدة</span>
        </a>
      </div>
    </aside>
  );
}
