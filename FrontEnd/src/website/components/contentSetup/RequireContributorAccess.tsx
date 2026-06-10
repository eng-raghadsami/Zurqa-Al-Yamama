import { Link } from "react-router-dom";
import { WEBSITE_ROUTES } from "@core/constants/routes";
import { useAuth } from "@core/context/AuthContext";
import { canAccessContentSetup } from "@website/helpers/contentSetupAccess";

type RequireContributorAccessProps = {
  children: React.ReactNode;
};

export default function RequireContributorAccess({ children }: RequireContributorAccessProps) {
  const auth = useAuth();

  if (!auth.isLoggedIn) {
    return (
      <div className="max-w-lg mx-auto glass-panel rounded-2xl border border-outline-variant/10 p-8 text-center">
        <span className="material-symbols-outlined text-4xl text-outline mb-4">lock</span>
        <h1 className="font-headline-sm text-headline-sm text-primary mb-2">تسجيل الدخول مطلوب</h1>
        <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">
          إعداد المحتوى متاح للمستخدمين المسجلين فقط. سجّل الدخول من الشريط العلوي ثم فعّل
          وضع <strong>صحفي</strong> أو <strong>ممارس إعلامي</strong> من الإعدادات.
        </p>
        <Link
          to={WEBSITE_ROUTES.MY_SPACE}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-lg font-label-bold text-sm"
        >
          العودة إلى مساحتي
        </Link>
      </div>
    );
  }

  if (!canAccessContentSetup(auth)) {
    return (
      <div className="max-w-lg mx-auto glass-panel rounded-2xl border border-gold-metallic-start/20 p-8 text-center">
        <span className="material-symbols-outlined text-4xl text-gold-metallic-start mb-4">
          badge
        </span>
        <h1 className="font-headline-sm text-headline-sm text-primary mb-2">اختر وضع المساهمة</h1>
        <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">
          لتقديم محتوى جديد، فعّل وضع <strong>صحفي</strong> أو <strong>ممارس إعلامي</strong> من
          قائمة الإعدادات في الشريط العلوي. يُسمح بوضع واحد نشط فقط في كل مرة.
        </p>
        <Link
          to={WEBSITE_ROUTES.MY_SPACE}
          className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary rounded-lg font-label-bold text-sm hover:bg-primary hover:text-on-primary transition-colors"
        >
          العودة إلى مساحتي
        </Link>
      </div>
    );
  }

  return children;
}
