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
      <AuthenticatedSidebar belowTopNav />
      <main className="lg:mr-80 pt-24 md:pt-28 px-4 md:px-margin-desktop pb-24 lg:pb-20">
        <Outlet />
      </main>
      <SidebarBottomNav />
    </div>
  );
}
