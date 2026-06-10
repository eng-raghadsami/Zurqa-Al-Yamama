import { PageEnter } from "@shared/components/animations";
import { Outlet } from "react-router-dom";
import TopNav from "@website/components/TopNav";
import PlatformAboutSidebar from "@website/components/PlatformAboutSidebar";
import Footer from "@shared/components/Footer";

export default function PlatformAboutLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      <TopNav />
      <div className="flex-1 max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop pt-24 pb-12">
        <div className="flex flex-col lg:flex-row gap-gutter">
          <PlatformAboutSidebar />
          <div className="flex-1 min-w-0">
            <PageEnter>
              <Outlet />
            </PageEnter>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
