export default function Navbar() {
  return (
    <nav className="w-full border-b bg-white/50">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-lg font-semibold">زرقاء اليمامة</div>
        <div className="space-x-4">
          <a href="/" className="text-sm text-slate-700">
            الرئيسية
          </a>
          <a href="/reports" className="text-sm text-slate-700">
            التقارير
          </a>
          <a href="/admin" className="text-sm text-slate-700">
            لوحة التحكم
          </a>
        </div>
      </div>
    </nav>
  );
}
