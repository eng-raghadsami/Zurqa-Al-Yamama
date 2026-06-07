import { Outlet } from "react-router-dom";
import TopNav from "@website/components/TopNav";
import VisualsFooter from "@website/components/VisualsFooter";
import { PageEnter } from "@shared/components/animations";

export default function VisualsLayout() {
  return (
    <div className="text-on-surface visuals-page-bg min-h-screen">
      <TopNav />
      <div className="pt-20">
        <PageEnter>
          <Outlet />
        </PageEnter>
      </div>
      <VisualsFooter />
    </div>
  );
}
