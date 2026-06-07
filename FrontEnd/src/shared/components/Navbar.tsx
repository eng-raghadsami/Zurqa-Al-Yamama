import { Link } from "react-router-dom";
import { ADMIN_ROUTES, WEBSITE_ROUTES } from "@core/constants/routes";

export default function Navbar() {
  return (
    <nav className="w-full border-b bg-white/50">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-lg font-semibold">زرقاء اليمامة</div>
        <div className="space-x-4">
          <Link to={WEBSITE_ROUTES.HOME} className="text-sm text-slate-700">
            الرئيسية
          </Link>
          <Link
            to={WEBSITE_ROUTES.REPORTS_INVESTIGATIVE}
            className="text-sm text-slate-700"
          >
            التقارير
          </Link>
          <Link to={ADMIN_ROUTES.ROOT} className="text-sm text-slate-700">
            لوحة التحكم
          </Link>
        </div>
      </div>
    </nav>
  );
}
