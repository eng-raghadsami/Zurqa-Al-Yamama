import { Outlet } from "react-router-dom";
import TopNav from "@website/components/TopNav";
import PodcastAudioPlayer from "@website/components/PodcastAudioPlayer";
import PodcastSidebar from "@website/components/PodcastSidebar";
import SidebarBottomNav from "@website/components/SidebarBottomNav";

export default function PodcastsLayout() {
  return (
    <div className="text-on-surface min-h-screen bg-surface">
      <TopNav hasSidebar />
      <div className="flex w-full max-w-container-max mx-auto pt-20">
        <PodcastSidebar />
        <div className="w-full lg:pr-72 pb-44 lg:pb-32">
          <Outlet />
        </div>
      </div>
      <SidebarBottomNav className="bottom-24" />
      <PodcastAudioPlayer />
    </div>
  );
}
