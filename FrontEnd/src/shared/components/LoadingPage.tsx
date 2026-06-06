export default function LoadingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin border-4 border-slate-300 border-t-slate-600 rounded-full w-12 h-12 mx-auto" />
        <p className="mt-3">جارٍ التحميل...</p>
      </div>
    </div>
  );
}
