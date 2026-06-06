import { Outlet } from "react-router-dom";
import TopNav from "@website/components/TopNav";
import MediaLiteracyFooter from "@website/components/MediaLiteracyFooter";
import MediaLiteracySidebar from "@website/components/MediaLiteracySidebar";
import SidebarBottomNav from "@website/components/SidebarBottomNav";
import { MEDIA_LITERACY_AVATAR } from "@website/constants/brand";

export default function MediaLiteracyLayout() {
  return (
    <div className="media-literacy-page-bg text-on-surface min-h-screen">
      <TopNav
        variant="authenticated"
        showSearch
        avatarSrc={MEDIA_LITERACY_AVATAR}
        hasSidebar
      />
      <div className="max-w-container-max mx-auto px-margin-desktop pt-20 pb-24 lg:pb-12 flex flex-col lg:flex-row gap-gutter">
        <MediaLiteracySidebar />
        <div className="flex-1 min-w-0">
          <Outlet />
        </div>
      </div>
      <MediaLiteracyFooter />
      <SidebarBottomNav />
    </div>
  );
}
