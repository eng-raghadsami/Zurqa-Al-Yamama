import { Outlet } from "react-router-dom";
import TopNav from "@website/components/TopNav";
import StoriesFooter from "@website/components/StoriesFooter";
import StoriesSidebar from "@website/components/StoriesSidebar";
import SidebarBottomNav from "@website/components/SidebarBottomNav";
import { STORIES_ANALYST_AVATAR } from "@website/constants/brand";
import { PageEnter } from "@shared/components/animations";

export default function StoriesLayout() {
  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <TopNav
        variant="authenticated"
        showSearch
        avatarSrc={STORIES_ANALYST_AVATAR}
        hasSidebar
      />
      <div className="flex max-w-container-max mx-auto px-margin-desktop relative pt-20 pb-24 lg:pb-0">
        <StoriesSidebar />
        <div className="flex-grow lg:mr-72 min-h-screen mist-background">
          <PageEnter>
            <Outlet />
          </PageEnter>
        </div>
      </div>
      <StoriesFooter />
      <SidebarBottomNav />
    </div>
  );
}
