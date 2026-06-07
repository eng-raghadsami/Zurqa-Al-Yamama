import { PageEnter } from "@shared/components/animations";
import { Outlet } from "react-router-dom";
import TopNav from "@website/components/TopNav";
import AuthenticatedSidebar from "@website/components/AuthenticatedSidebar";
import SidebarBottomNav from "@website/components/SidebarBottomNav";
import { MY_SPACE_NAV_AVATAR } from "@website/constants/brand";

export default function MySpaceLayout() {
  return (
    <div className="my-space-page-bg text-on-surface min-h-screen">
      <TopNav
        variant="authenticated"
        avatarSrc={MY_SPACE_NAV_AVATAR}
        hasSidebar
      />
      <AuthenticatedSidebar />
      <main className="relative min-h-[calc(100dvh-5rem)] bg-surface px-4 pb-24 pt-24 md:px-margin-desktop md:pt-28 lg:mr-72 lg:pb-20 xl:mr-80">
        <PageEnter>
          <Outlet />
        </PageEnter>
      </main>
      <SidebarBottomNav />
    </div>
  );
}
