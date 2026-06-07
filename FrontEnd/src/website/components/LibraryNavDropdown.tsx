import { Link } from "react-router-dom";
import { WEBSITE_ROUTES } from "@core/constants/routes";

export type LibraryNavId = "visuals" | "podcasts" | "terminology" | "verified-news";

export const LIBRARY_NAV_ITEMS: {
  id: LibraryNavId;
  label: string;
  to: string;
  featured?: boolean;
}[] = [
  {
    id: "verified-news",
    label: "الأخبار الموثقة",
    to: WEBSITE_ROUTES.VERIFIED_NEWS,
    featured: true,
  },
  { id: "visuals", label: "المرئيات", to: WEBSITE_ROUTES.VISUALS },
  { id: "podcasts", label: "البودكاست", to: WEBSITE_ROUTES.PODCASTS },
  { id: "terminology", label: "المصطلحات", to: WEBSITE_ROUTES.MEDIA_TERMINOLOGY },
];

export function LibraryNavItemLabel({
  label,
  featured = false,
}: {
  label: string;
  featured?: boolean;
}) {
  return (
    <span className="flex flex-row-reverse items-center justify-end gap-2">
      <span>{label}</span>
      {featured && (
        <span className="relative flex h-2 w-2 shrink-0" aria-hidden>
          <span className="home-live-ping absolute inline-flex h-full w-full rounded-full bg-gold-metallic-start opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-metallic-start shadow-[0_0_6px_rgba(212,175,55,0.65)]" />
        </span>
      )}
    </span>
  );
}

export function resolveLibraryNavId(pathname: string): LibraryNavId | undefined {
  if (pathname.startsWith(WEBSITE_ROUTES.VERIFIED_NEWS)) return "verified-news";
  if (pathname.startsWith(WEBSITE_ROUTES.VISUALS)) return "visuals";
  if (pathname.startsWith(WEBSITE_ROUTES.PODCASTS)) return "podcasts";
  if (pathname.startsWith(WEBSITE_ROUTES.MEDIA_TERMINOLOGY)) return "terminology";
  return undefined;
}

type LibraryNavDropdownProps = {
  variant: "public" | "authenticated";
  activeId?: LibraryNavId;
};

const itemClass = (isActive: boolean, variant: "public" | "authenticated") => {
  if (variant === "public") {
    return `block px-4 py-3 text-sm transition-colors ${
      isActive
        ? "bg-secondary-container/20 text-secondary font-semibold"
        : "hover:bg-secondary-container/10 hover:text-secondary"
    } border-b border-outline-variant/10 last:border-0`;
  }
  return `block px-4 py-3 text-sm font-label-bold transition-colors ${
    isActive
      ? "bg-gold-metallic-start/10 text-primary"
      : "text-on-surface-variant hover:bg-surface-variant/50 hover:text-primary"
  } border-b border-outline-variant/10 last:border-0`;
};

export default function LibraryNavDropdown({
  variant,
  activeId,
}: LibraryNavDropdownProps) {
  const isGroupActive = activeId !== undefined;

  const triggerClassPublic = isGroupActive
    ? "flex items-center gap-1 px-3 py-2 text-primary font-bold border-b-2 border-secondary text-sm transition-colors"
    : "flex items-center gap-1 px-3 py-2 text-on-surface-variant hover:text-primary transition-colors text-sm font-semibold";

  const triggerClassAuthenticated = isGroupActive
    ? "text-primary border-b-2 border-gold-metallic-start pb-1 font-label-bold flex items-center gap-1"
    : "text-on-surface-variant hover:text-gold-metallic-start transition-all duration-300 font-label-bold flex items-center gap-1";

  return (
    <div className="relative dropdown-trigger group">
      <button
        type="button"
        className={
          variant === "public" ? triggerClassPublic : triggerClassAuthenticated
        }
      >
        المكتبة
        <span className="material-symbols-outlined text-[16px] group-hover:rotate-180 transition-transform">
          expand_more
        </span>
      </button>
      <div
        className={`absolute right-0 top-full pt-2 dropdown-menu min-w-[200px] ${
          variant === "authenticated" ? "z-50" : ""
        }`}
      >
        <div className="bg-surface-container-lowest rounded-lg shadow-xl border border-outline-variant/30 overflow-hidden">
          {LIBRARY_NAV_ITEMS.map((item) => (
            <Link
              key={item.id}
              className={itemClass(activeId === item.id, variant)}
              to={item.to}
            >
              <LibraryNavItemLabel label={item.label} featured={item.featured} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
