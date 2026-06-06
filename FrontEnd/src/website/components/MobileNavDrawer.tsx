import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { WEBSITE_ROUTES } from "@core/constants/routes";
import { LIBRARY_NAV_ITEMS } from "@website/components/LibraryNavDropdown";

type MobileNavDrawerProps = {
  open: boolean;
  onClose: () => void;
  variant?: "public" | "authenticated";
};

const sectionClass =
  "block px-4 py-3 text-sm font-label-bold text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-colors border-b border-outline-variant/10";

export default function MobileNavDrawer({
  open,
  onClose,
  variant = "public",
}: MobileNavDrawerProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const activeClass = (active: boolean) =>
    active
      ? "bg-secondary-container/20 text-primary font-bold"
      : "text-on-surface-variant hover:bg-surface-container-low hover:text-primary";

  return (
    <div className="lg:hidden fixed inset-0 z-[60]" role="presentation">
      <button
        type="button"
        className="absolute inset-0 bg-primary/40 backdrop-blur-[2px]"
        aria-label="إغلاق القائمة"
        onClick={onClose}
      />

      <aside
        className={`absolute top-0 right-0 h-full w-[min(100%,20rem)] bg-surface-container-lowest shadow-2xl border-l border-outline-variant/20 flex flex-col`}
        dir="rtl"
        aria-label="قائمة التنقل"
      >
        <div className="flex items-center justify-between px-4 h-16 border-b border-outline-variant/20 shrink-0">
          <span className="font-label-bold text-primary">القائمة</span>
          <button
            type="button"
            className="p-2 text-on-surface-variant hover:text-primary transition-colors"
            aria-label="إغلاق"
            onClick={onClose}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-2">
          <Link
            className={`${sectionClass} ${activeClass(pathname === WEBSITE_ROUTES.HOME)}`}
            to={WEBSITE_ROUTES.HOME}
            onClick={onClose}
          >
            الرئيسية
          </Link>

          <p className="px-4 pt-4 pb-2 text-xs font-label-bold text-outline">التقارير</p>
          <Link
            className={`${sectionClass} ${activeClass(pathname.startsWith("/reports"))}`}
            to={WEBSITE_ROUTES.REPORTS_INVESTIGATIVE}
            onClick={onClose}
          >
            تقارير استقصائية
          </Link>

          <p className="px-4 pt-4 pb-2 text-xs font-label-bold text-outline">القصص</p>
          <Link
            className={`${sectionClass} ${activeClass(pathname.startsWith("/stories"))}`}
            to={WEBSITE_ROUTES.STORIES_HUMANITARIAN}
            onClick={onClose}
          >
            قصص إنسانية
          </Link>
          <Link className={sectionClass} to={WEBSITE_ROUTES.STORIES_SUCCESS} onClick={onClose}>
            قصص نجاح
          </Link>

          <p className="px-4 pt-4 pb-2 text-xs font-label-bold text-outline">المكتبة</p>
          {LIBRARY_NAV_ITEMS.map((item) => (
            <Link
              key={item.id}
              className={`${sectionClass} ${activeClass(pathname.startsWith(item.to))}`}
              to={item.to}
              onClick={onClose}
            >
              {item.label}
            </Link>
          ))}

          <p className="px-4 pt-4 pb-2 text-xs font-label-bold text-outline">التحقق الإعلامي</p>
          <Link
            className={`${sectionClass} ${activeClass(pathname.startsWith(WEBSITE_ROUTES.VERIFICATION))}`}
            to={WEBSITE_ROUTES.VERIFICATION_IMAGE}
            onClick={onClose}
          >
            تحقق من الصور
          </Link>
          <Link
            className={sectionClass}
            to={WEBSITE_ROUTES.VERIFICATION_VIDEO}
            onClick={onClose}
          >
            تحقق من الفيديوهات
          </Link>

          <Link
            className={`${sectionClass} mt-2 ${activeClass(pathname.startsWith(WEBSITE_ROUTES.MEDIA_LITERACY))}`}
            to={WEBSITE_ROUTES.MEDIA_LITERACY}
            onClick={onClose}
          >
            المعرفة الإعلامية
          </Link>
          <Link
            className={`${sectionClass} ${activeClass(pathname.startsWith(WEBSITE_ROUTES.MY_SPACE))}`}
            to={WEBSITE_ROUTES.MY_SPACE}
            onClick={onClose}
          >
            مساحتي
          </Link>
        </nav>

        <div className="p-4 border-t border-outline-variant/20 shrink-0">
          {variant === "authenticated" ? (
            <Link
              to={WEBSITE_ROUTES.VERIFICATION_IMAGE}
              className="block w-full py-3 gold-gradient-bg text-on-primary font-label-bold text-center rounded-lg"
              onClick={onClose}
            >
              تقديم ملف للتحقق
            </Link>
          ) : (
            <button
              type="button"
              className="w-full py-3 bg-primary text-on-primary font-label-bold rounded-lg"
              onClick={onClose}
            >
              تسجيل الدخول
            </button>
          )}
        </div>
      </aside>
    </div>
  );
}
