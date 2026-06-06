import { Outlet } from "react-router-dom";
import TopNav from "@website/components/TopNav";
import VisualsFooter from "@website/components/VisualsFooter";

export default function VisualsLayout() {
  return (
    <div className="text-on-surface visuals-page-bg min-h-screen">
      <TopNav />
      <div className="pt-20">
        <Outlet />
      </div>
      <VisualsFooter />
    </div>
  );
}
