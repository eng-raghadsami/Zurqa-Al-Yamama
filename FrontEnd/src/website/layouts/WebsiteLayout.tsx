import { Outlet } from "react-router-dom";
import { useBroadcastAudio } from "@core/context/BroadcastAudioContext";
import TopNav from "@website/components/TopNav";
import BroadcastAudioPlayerBar from "@website/components/broadcast/BroadcastAudioPlayerBar";
import Footer from "@shared/components/Footer";
import { PageEnter } from "@shared/components/animations";

export default function WebsiteLayout() {
  const { isActive } = useBroadcastAudio();

  return (
    <div className={`min-h-screen flex flex-col ${isActive ? "pb-28 md:pb-24" : ""}`}>
      <TopNav />
      <div className="flex-1">
        <PageEnter>
          <Outlet />
        </PageEnter>
      </div>
      <Footer />
      <BroadcastAudioPlayerBar />
    </div>
  );
}
