import { PageEnter } from "@shared/components/animations";
import { Outlet, useLocation } from "react-router-dom";
import { WEBSITE_ROUTES } from "@core/constants/routes";
import TopNav from "@website/components/TopNav";
import VerifiedNewsFooter from "@website/components/VerifiedNewsFooter";
import VerifiedNewsSidebar from "@website/components/VerifiedNewsSidebar";
import VerifiedNewsTicker from "@website/components/VerifiedNewsTicker";
import SidebarBottomNav from "@website/components/SidebarBottomNav";

export default function VerifiedNewsLayout() {
  const { pathname } = useLocation();
  const isDetailPage = pathname.startsWith(`${WEBSITE_ROUTES.VERIFIED_NEWS}/`);

  return (
    <div className="verified-news-page-bg text-on-surface min-h-screen">
      <TopNav hasSidebar={!isDetailPage} />
      {!isDetailPage && (
        <div className="pt-20">
          <VerifiedNewsTicker />
        </div>
      )}
      <div
        className={`max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop ${
          isDetailPage ? "pt-28 pb-10 md:pt-32" : "py-8 pb-24 lg:pb-8"
        } flex flex-col lg:flex-row gap-gutter`}
      >
        {!isDetailPage && <VerifiedNewsSidebar />}
        <div className="flex-1 min-w-0">
          <PageEnter>
            <Outlet />
          </PageEnter>
        </div>
      </div>
      <VerifiedNewsFooter />
      {!isDetailPage && <SidebarBottomNav />}
    </div>
  );
}
