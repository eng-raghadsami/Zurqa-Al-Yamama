import { Link } from "react-router-dom";
import { EnterItem, PageEnter } from "@shared/components/animations";
import { WEBSITE_ROUTES } from "@core/constants/routes";

export default function NotFound() {
  return (
    <PageEnter>
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <EnterItem index={0}>
            <p className="text-8xl font-bold site-shimmer-text leading-none mb-4">404</p>
          </EnterItem>
          <EnterItem index={1}>
            <h1 className="text-2xl font-headline-sm text-primary mb-2">
              الصفحة غير موجودة
            </h1>
          </EnterItem>
          <EnterItem index={2}>
            <p className="text-on-surface-variant mb-8">
              يبدو أن الرابط الذي طلبته غير صحيح أو أن الصفحة نُقلت.
            </p>
          </EnterItem>
          <EnterItem index={3}>
            <Link
              to={WEBSITE_ROUTES.HOME}
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-on-primary rounded-lg font-label-bold site-btn-shine"
            >
              العودة للرئيسية
              <span className="material-symbols-outlined text-sm">home</span>
            </Link>
          </EnterItem>
        </div>
      </div>
    </PageEnter>
  );
}
