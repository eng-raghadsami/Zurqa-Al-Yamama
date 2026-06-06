import { Outlet } from "react-router-dom";
import TopNav from "@website/components/TopNav";
import Footer from "@shared/components/Footer";

export default function WebsiteLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <TopNav />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
