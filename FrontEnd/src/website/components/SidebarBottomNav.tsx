import { Link, useLocation } from "react-router-dom";
import { WEBSITE_ROUTES } from "@core/constants/routes";

import { getVerificationCta } from "@website/helpers/verificationNav";

const navItems = [
  {
    label: "التقارير",
    icon: "analytics",
    to: WEBSITE_ROUTES.REPORTS_INVESTIGATIVE,
    match: "/reports",
  },
  {
    label: "القصص",
    icon: "auto_stories",
    to: WEBSITE_ROUTES.STORIES_HUMANITARIAN,
    match: "/stories",
  },
  {
    label: "التحقق",
    icon: "verified_user",
    to: WEBSITE_ROUTES.VERIFICATION_IMAGE,
    match: "/verification",
  },
  {
    label: "مساحتي",
    icon: "person_pin",
    to: WEBSITE_ROUTES.MY_SPACE,
    match: "/my-space",
    filledWhenActive: true,
  },
] as const;

function isActive(pathname: string, match: string) {
  return pathname.startsWith(match);
}

type SidebarBottomNavProps = {
  className?: string;
};

export default function SidebarBottomNav({ className = "" }: SidebarBottomNavProps) {
  const { pathname } = useLocation();
  const verificationCta = getVerificationCta(pathname);
  const [first, second, third, fourth] = navItems;

  const linkClass = (match: string) =>
    `flex flex-col items-center gap-1 min-w-[56px] ${
      isActive(pathname, match) ? "text-primary" : "text-on-surface-variant"
    }`;

  return (
    <nav
      className={`lg:hidden fixed bottom-0 left-0 w-full bg-surface border-t border-mist-grey flex justify-around items-center h-20 z-50 px-4 pb-4 ${className}`}
      aria-label="التنقل السريع"
    >
      <Link className={linkClass(first.match)} to={first.to}>
        <span className="material-symbols-outlined">{first.icon}</span>
        <span className="text-[10px] font-bold">{first.label}</span>
      </Link>

      <Link className={linkClass(second.match)} to={second.to}>
        <span className="material-symbols-outlined">{second.icon}</span>
        <span className="text-[10px] font-bold">{second.label}</span>
      </Link>

      <div className="relative -mt-10">
        <Link
          to={verificationCta.to}
          className="bg-gradient-to-br from-gold-metallic-start to-gold-metallic-end text-white p-4 rounded-full shadow-2xl border-4 border-surface active:scale-90 transition-transform flex"
          aria-label={verificationCta.label}
        >
          <span className="material-symbols-outlined text-3xl">
            {verificationCta.icon}
          </span>
        </Link>
      </div>

      <Link className={linkClass(third.match)} to={third.to}>
        <span className="material-symbols-outlined">{third.icon}</span>
        <span className="text-[10px] font-bold">{third.label}</span>
      </Link>

      <Link className={linkClass(fourth.match)} to={fourth.to}>
        <span
          className="material-symbols-outlined"
          style={
            isActive(pathname, fourth.match)
              ? { fontVariationSettings: "'FILL' 1" }
              : undefined
          }
        >
          {fourth.icon}
        </span>
        <span className="text-[10px] font-bold">{fourth.label}</span>
      </Link>
    </nav>
  );
}
