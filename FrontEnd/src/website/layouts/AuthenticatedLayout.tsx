import { Outlet, useLocation } from "react-router-dom";
import TopNav from "@website/components/TopNav";
import AuthenticatedSidebar from "@website/components/AuthenticatedSidebar";
import SidebarBottomNav from "@website/components/SidebarBottomNav";
import { PageEnter } from "@shared/components/animations";

export default function AuthenticatedLayout() {
  const { pathname } = useLocation();
  const showSearch =
    pathname.startsWith("/reports") ||
    pathname.startsWith("/verification");

  return (
    <>
      <TopNav variant="authenticated" showSearch={showSearch} hasSidebar />
      <AuthenticatedSidebar />
      <main className="relative min-h-[calc(100dvh-5rem)] overflow-hidden bg-surface pt-20 font-body-md text-on-surface lg:mr-72 lg:pb-0 lg:pt-20 xl:mr-80 pb-24">
        <PageEnter>
          <Outlet />
        </PageEnter>
      </main>
      <SidebarBottomNav />
    </>
  );
}
