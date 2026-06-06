import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { WEBSITE_ROUTES } from "@core/constants/routes";

type NotificationItem = {
  id: string;
  title: string;
  message: string;
  time: string;
  icon: string;
  urgent?: boolean;
  href?: string;
  unread?: boolean;
};

const NOTIFICATIONS: NotificationItem[] = [
  {
    id: "1",
    title: "طلب تحقق عاجل",
    message: "تم استلام ملف فيديو يحتاج معالجة فورية",
    time: "منذ 5 دقائق",
    icon: "priority_high",
    urgent: true,
    href: WEBSITE_ROUTES.VERIFICATION_VIDEO,
    unread: true,
  },
  {
    id: "2",
    title: "اكتمل فحص الوسائط",
    message: "نتيجة تحليل الصورة جاهزة للمراجعة",
    time: "منذ 45 دقيقة",
    icon: "verified_user",
    href: WEBSITE_ROUTES.VERIFICATION_IMAGE,
    unread: true,
  },
  {
    id: "3",
    title: "محتوى يتداول",
    message: "رصد مقطع مشارك على منصة X يحتاج تدقيقاً",
    time: "منذ ساعتين",
    icon: "trending_up",
    unread: true,
  },
  {
    id: "4",
    title: "تقرير استقصائي جديد",
    message: "نُشر تقرير: أمن البيانات في عصر الذكاء الاصطناعي",
    time: "منذ 4 ساعات",
    icon: "analytics",
    href: WEBSITE_ROUTES.REPORTS_INVESTIGATIVE,
    unread: false,
  },
  {
    id: "5",
    title: "تحديث النظام",
    message: "تحسينات على محرك كشف التزييف العميق",
    time: "أمس",
    icon: "auto_awesome",
    unread: false,
  },
];

type NotificationsDropdownProps = {
  className?: string;
};

export default function NotificationsDropdown({
  className = "",
}: NotificationsDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const unreadCount = NOTIFICATIONS.filter((n) => n.unread).length;

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        aria-expanded={open}
        aria-label="الإشعارات"
        className="relative p-2 flex items-center justify-center text-on-surface-variant hover:text-gold-metallic-start transition-colors"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="material-symbols-outlined text-[24px] leading-none">
          notifications
        </span>
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 min-w-[8px] h-2 px-0.5 bg-error rounded-full ring-2 ring-surface" />
        )}
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-2 w-80 md:w-96 bg-surface-container-lowest rounded-xl shadow-xl border border-outline-variant/30 overflow-hidden z-50">
          <div className="flex items-center justify-between px-4 py-3 border-b border-outline-variant/20 bg-surface-container-low">
            <h3 className="font-label-bold text-primary">الإشعارات</h3>
            {unreadCount > 0 && (
              <span className="text-xs font-label-bold text-error bg-error/10 px-2 py-0.5 rounded-full">
                {unreadCount} غير مقروء
              </span>
            )}
          </div>

          <ul className="max-h-80 overflow-y-auto">
            {NOTIFICATIONS.map((item) => {
              const content = (
                <>
                  <div
                    className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                      item.urgent
                        ? "bg-error/10 text-error"
                        : "bg-surface-container text-on-surface-variant"
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-xl"
                      style={
                        item.urgent
                          ? { fontVariationSettings: "'FILL' 1" }
                          : undefined
                      }
                    >
                      {item.icon}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0 text-right">
                    <div className="flex items-center justify-end gap-2 mb-0.5">
                      {item.urgent && (
                        <span className="text-[10px] font-label-bold text-error bg-error/10 px-1.5 py-0.5 rounded">
                          عاجل
                        </span>
                      )}
                      <p
                        className={`font-label-bold text-sm truncate ${
                          item.unread ? "text-primary" : "text-on-surface-variant"
                        }`}
                      >
                        {item.title}
                      </p>
                    </div>
                    <p className="text-xs text-on-surface-variant line-clamp-2">
                      {item.message}
                    </p>
                    <p className="text-[10px] text-outline mt-1">{item.time}</p>
                  </div>
                  {item.unread && (
                    <span className="shrink-0 w-2 h-2 bg-error rounded-full mt-2" />
                  )}
                </>
              );

              return (
                <li key={item.id}>
                  {item.href ? (
                    <Link
                      className="flex items-start gap-3 px-4 py-3 hover:bg-surface-container-low transition-colors border-b border-outline-variant/10 last:border-0"
                      to={item.href}
                      onClick={() => setOpen(false)}
                    >
                      {content}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      className="w-full flex items-start gap-3 px-4 py-3 hover:bg-surface-container-low transition-colors border-b border-outline-variant/10 last:border-0 text-right"
                      onClick={() => setOpen(false)}
                    >
                      {content}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="px-4 py-3 border-t border-outline-variant/20 bg-surface-container-low">
            <button
              type="button"
              className="w-full text-center text-sm font-label-bold text-gold-metallic-start hover:text-primary transition-colors"
              onClick={() => setOpen(false)}
            >
              عرض جميع الإشعارات
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
