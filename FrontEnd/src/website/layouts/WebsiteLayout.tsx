import { Outlet } from "react-router-dom";
import TopNav from "@website/components/TopNav";
import Footer from "@shared/components/Footer";
import { PageEnter } from "@shared/components/animations";

export default function WebsiteLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <TopNav />
      <div className="flex-1">
        <PageEnter>
          <Outlet />
        </PageEnter>
      </div>
      <Footer />
    </div>
  );
}
