import { PageEnter } from "@shared/components/animations";
import { Outlet } from "react-router-dom";
import TopNav from "@website/components/TopNav";
import TerminologyFooter from "@website/components/TerminologyFooter";
import TerminologySidebar from "@website/components/TerminologySidebar";
import SidebarBottomNav from "@website/components/SidebarBottomNav";

export default function MediaTerminologyLayout() {
  return (
    <div className="terminology-page-bg text-on-surface min-h-screen">
      <TopNav hasSidebar />
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-20 pb-24 lg:pb-10 flex flex-col lg:flex-row gap-gutter">
        <TerminologySidebar />
        <div className="flex-1 min-w-0">
          <PageEnter>
            <Outlet />
          </PageEnter>
        </div>
      </div>
      <TerminologyFooter />
      <SidebarBottomNav />
    </div>
  );
}
