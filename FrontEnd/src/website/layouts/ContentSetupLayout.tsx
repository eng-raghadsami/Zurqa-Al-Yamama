import { Link, Outlet } from "react-router-dom";
import { WEBSITE_ROUTES } from "@core/constants/routes";
import { ContentSetupProvider } from "@core/context/ContentSetupContext";
import ContentSetupStepper from "@website/components/contentSetup/ContentSetupStepper";
import RequireContributorAccess from "@website/components/contentSetup/RequireContributorAccess";

export default function ContentSetupLayout() {
  return (
    <ContentSetupProvider>
      <RequireContributorAccess>
        <div className="max-w-container-max mx-auto space-y-8" dir="rtl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <Link
              to={WEBSITE_ROUTES.MY_SPACE}
              className="inline-flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors w-fit"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              العودة إلى مساحتي
            </Link>
            <p className="text-xs text-on-surface-variant">
              تخضع كل المسودات لـ{" "}
              <Link
                to={WEBSITE_ROUTES.ABOUT_PUBLISHING_POLICIES}
                className="text-secondary font-label-bold hover:underline"
              >
                سياسات النشر والتحقق
              </Link>
            </p>
          </div>

          <ContentSetupStepper />

          <Outlet />
        </div>
      </RequireContributorAccess>
    </ContentSetupProvider>
  );
}
