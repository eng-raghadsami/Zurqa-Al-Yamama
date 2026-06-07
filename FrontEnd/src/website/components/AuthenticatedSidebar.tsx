import { Link, useLocation } from "react-router-dom";
import { PLACEHOLDER_ROUTE, WEBSITE_ROUTES } from "@core/constants/routes";
import { SIDEBAR_LOGO } from "@website/constants/brand";
import { getVerificationCta } from "@website/helpers/verificationNav";

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
  {
    label: "التحقق من الوسائط",
    icon: "verified_user",
    href: WEBSITE_ROUTES.VERIFICATION_IMAGE,
    match: "/verification",
  },
  {
    label: "مساحتي",
    icon: "person_pin",
    href: WEBSITE_ROUTES.MY_SPACE,
    match: "/my-space",
    filledWhenActive: true,
  },
];

export default function AuthenticatedSidebar() {
  const { pathname } = useLocation();
  const verificationCta = getVerificationCta(pathname);

  const isActive = (match: string) => match !== "" && pathname.startsWith(match);

  return (
    <aside className="fixed inset-y-0 right-0 top-20 z-40 hidden w-72 flex-col border-l border-mist-grey bg-surface-container-low shadow-md lg:flex xl:w-80">
      <Link
        to={WEBSITE_ROUTES.HOME}
        className="flex shrink-0 flex-row-reverse items-center gap-3 border-b border-mist-grey/40 px-5 py-4 hover:opacity-90 transition-opacity"
      >
        <img
          alt="زرقاء اليمامة"
          className="h-11 w-11 shrink-0 rounded-full border-2 border-gold-metallic-start p-0.5"
          src={SIDEBAR_LOGO}
        />
        <div className="min-w-0 text-right">
          <h1 className="truncate font-headline-sm text-primary">زرقاء اليمامة</h1>
          <p className="truncate text-xs text-on-surface-variant">
            نظام النزاهة الإعلامية
          </p>
        </div>
      </Link>

      <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navItems.map((item) => {
          const active = isActive(item.match);
          return (
            <Link
              key={item.label}
              className={`flex flex-row-reverse items-center gap-3 rounded-lg px-4 py-3 transition-all ${
                active
                  ? "border-r-4 border-gold-metallic-start bg-surface-bright font-bold text-primary"
                  : "text-on-surface-variant hover:bg-mist-grey/50 hover:text-primary"
              }`}
              to={item.href}
            >
              <span
                className="material-symbols-outlined text-[22px]"
                style={
                  active && item.filledWhenActive
                    ? { fontVariationSettings: "'FILL' 1" }
                    : undefined
                }
              >
                {item.icon}
              </span>
              <span className="font-label-bold text-label-bold">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto shrink-0 space-y-2 border-t border-mist-grey/40 p-4">
        <Link
          to={verificationCta.to}
          className="flex w-full flex-row-reverse items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-gold-metallic-start to-gold-metallic-end py-3.5 text-center font-label-bold text-label-bold text-white shadow-lg transition-transform hover:scale-[1.02]"
        >
          <span className="material-symbols-outlined text-[20px]">
            {verificationCta.icon}
          </span>
          {verificationCta.label}
        </Link>

        <div className="flex flex-col gap-0.5">
          <a
            className="flex flex-row-reverse items-center gap-3 rounded-lg px-3 py-2 text-on-surface-variant transition-colors hover:bg-mist-grey/40 hover:text-primary"
            href={PLACEHOLDER_ROUTE}
          >
            <span className="material-symbols-outlined text-[20px]">settings</span>
            <span className="text-sm font-label-bold">الإعدادات</span>
          </a>
          <a
            className="flex flex-row-reverse items-center gap-3 rounded-lg px-3 py-2 text-on-surface-variant transition-colors hover:bg-mist-grey/40 hover:text-primary"
            href={PLACEHOLDER_ROUTE}
          >
            <span className="material-symbols-outlined text-[20px]">help</span>
            <span className="text-sm font-label-bold">المساعدة</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
