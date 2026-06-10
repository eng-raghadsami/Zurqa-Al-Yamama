import { Link } from "react-router-dom";
import { PLACEHOLDER_ROUTE, WEBSITE_ROUTES } from "@core/constants/routes";
import { LibraryNavItemLabel } from "@website/components/LibraryNavDropdown";

export type PlatformAboutNavId =
  | "publishing-policies"
  | "amateur-path"
  | "platform-vision";

export const PLATFORM_ABOUT_NAV_ITEMS: {
  id: PlatformAboutNavId;
  label: string;
  to: string;
  featured?: boolean;
  comingSoon?: boolean;
}[] = [
  {
    id: "publishing-policies",
    label: "سياسات النشر والتحقق",
    to: WEBSITE_ROUTES.ABOUT_PUBLISHING_POLICIES,
    featured: true,
  },
  {
    id: "amateur-path",
    label: "مسار الهواة نحو الاحتراف",
    to: PLACEHOLDER_ROUTE,
    comingSoon: true,
  },
  {
    id: "platform-vision",
    label: "رؤية المنصة",
    to: PLACEHOLDER_ROUTE,
    comingSoon: true,
  },
];

export function resolvePlatformAboutNavId(
  pathname: string,
): PlatformAboutNavId | undefined {
  if (pathname.startsWith(WEBSITE_ROUTES.ABOUT_PUBLISHING_POLICIES)) {
    return "publishing-policies";
  }
  return undefined;
}

type PlatformAboutNavDropdownProps = {
  variant: "public" | "authenticated";
  activeId?: PlatformAboutNavId;
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

export default function PlatformAboutNavDropdown({
  variant,
  activeId,
}: PlatformAboutNavDropdownProps) {
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
        عن المنصة
        <span className="material-symbols-outlined text-[16px] group-hover:rotate-180 transition-transform">
          expand_more
        </span>
      </button>
      <div
        className={`absolute right-0 top-full pt-2 dropdown-menu min-w-[220px] ${
          variant === "authenticated" ? "z-50" : ""
        }`}
      >
        <div className="bg-surface-container-lowest rounded-lg shadow-xl border border-outline-variant/30 overflow-hidden">
          {PLATFORM_ABOUT_NAV_ITEMS.map((item) =>
            item.comingSoon ? (
              <span
                key={item.id}
                className="block px-4 py-3 text-sm text-outline border-b border-outline-variant/10 last:border-0 cursor-not-allowed"
                title="قريبًا"
              >
                <span className="flex flex-row-reverse items-center justify-end gap-2">
                  <span>{item.label}</span>
                  <span className="text-[10px] font-label-bold bg-surface-container-high px-2 py-0.5 rounded-full">
                    قريبًا
                  </span>
                </span>
              </span>
            ) : (
              <Link
                key={item.id}
                className={itemClass(activeId === item.id, variant)}
                to={item.to}
              >
                <LibraryNavItemLabel label={item.label} featured={item.featured} />
              </Link>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
