import { Link } from "react-router-dom";
import { WEBSITE_ROUTES } from "@core/constants/routes";
import { useAuth } from "@core/context/AuthContext";

type RequireStaffAccessProps = {
  children: React.ReactNode;
};

export default function RequireStaffAccess({ children }: RequireStaffAccessProps) {
  const { isLoggedIn, canManageContent, isEditor, isAdmin } = useAuth();

  if (!isLoggedIn || !canManageContent) {
    return (
      <div className="max-w-lg mx-auto glass-panel rounded-2xl border border-outline-variant/10 p-8 text-center">
        <span className="material-symbols-outlined text-4xl text-outline mb-4">shield</span>
        <h1 className="font-headline-sm text-headline-sm text-primary mb-2">صلاحيات المحرر مطلوبة</h1>
        <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">
          هذه الصفحة متاحة عند تفعيل وضع <strong>محرر</strong> أو <strong>مدير</strong> من الإعدادات.
        </p>
        <Link
          to={WEBSITE_ROUTES.HOME}
          className="inline-flex px-6 py-3 bg-primary text-on-primary rounded-lg font-label-bold text-sm"
        >
          العودة للرئيسية
        </Link>
      </div>
    );
  }

  if (!isEditor && !isAdmin) {
    return (
      <div className="max-w-lg mx-auto glass-panel rounded-2xl p-8 text-center">
        <p className="text-sm text-on-surface-variant">الوضع النشط لا يملك صلاحية المراجعة.</p>
      </div>
    );
  }

  return children;
}
