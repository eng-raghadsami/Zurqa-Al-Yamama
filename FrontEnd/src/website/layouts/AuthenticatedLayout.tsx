import { Outlet, useLocation } from "react-router-dom";
import TopNav from "@website/components/TopNav";
import AuthenticatedSidebar from "@website/components/AuthenticatedSidebar";
import SidebarBottomNav from "@website/components/SidebarBottomNav";

export default function AuthenticatedLayout() {
  const { pathname } = useLocation();
  const showSearch =
    pathname.startsWith("/reports") ||
    pathname.startsWith("/verification");

  return (
    <>
      <TopNav variant="authenticated" showSearch={showSearch} hasSidebar />
      <AuthenticatedSidebar belowTopNav />
      <main className="lg:mr-80 pt-20 pb-24 lg:pb-0 min-h-screen relative overflow-hidden bg-surface font-body-md text-on-surface">
        <Outlet />
      </main>
      <SidebarBottomNav />
    </>
  );
}
