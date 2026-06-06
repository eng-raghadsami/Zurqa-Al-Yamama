import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 border-l p-4">لوحة جانبية (قيد الإنشاء)</aside>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
