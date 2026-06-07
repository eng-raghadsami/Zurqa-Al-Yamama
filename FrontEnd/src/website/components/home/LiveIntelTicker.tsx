import { useReducedMotion } from "@core/hooks/useReducedMotion";

const TICKER_ITEMS = [
  "تم رصد ١٢ حساباً مشبوهاً نشطاً في المنطقة",
  "تحديث نموذج كشف التلاعب — دقة ٩٧٪",
  "٣ تقارير جديدة بانتظار المراجعة",
  "مراقبة حية: ٤٥٠ مصدر إعلامي متصل",
  "تنبيه: حملة تضليل مرتبطة بأسعار الطاقة",
];

export default function LiveIntelTicker() {
  const reducedMotion = useReducedMotion();
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="home-ticker-bar border-y border-outline-variant/15 bg-surface-container-lowest/80 backdrop-blur-sm">
      <div className="max-w-container-max mx-auto flex items-center gap-4 px-margin-mobile md:px-margin-desktop py-2.5">
        <div className="flex items-center gap-2 shrink-0 pe-4 border-e border-outline-variant/20">
          <span className="relative flex h-2 w-2">
            {!reducedMotion && (
              <span className="absolute inline-flex h-full w-full rounded-full bg-error opacity-75 home-live-ping" />
            )}
            <span className="relative inline-flex h-2 w-2 rounded-full bg-error" />
          </span>
          <span className="text-[11px] font-label-bold text-primary whitespace-nowrap">
            بث مباشر
          </span>
        </div>
        <div className="ticker-wrap flex-1 min-w-0">
          <div
            className={`ticker-move flex gap-10 ${reducedMotion ? "" : "home-ticker-rtl"}`}
          >
            {items.map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="inline-flex items-center gap-2 text-xs text-on-surface-variant whitespace-nowrap"
              >
                <span className="w-1 h-1 rounded-full bg-gold-metallic-start shrink-0" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
