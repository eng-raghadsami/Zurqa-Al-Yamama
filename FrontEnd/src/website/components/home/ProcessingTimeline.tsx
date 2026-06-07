import { useReducedMotion } from "@core/hooks/useReducedMotion";

const STEPS = [
  {
    id: 1,
    type: "number" as const,
    value: "1",
    title: "جمع البيانات الحية",
    subtitle: "يتم الآن سحب البيانات من 450 مصدراً",
    active: false,
    completed: true,
  },
  {
    id: 2,
    type: "icon" as const,
    value: "sync",
    title: "تحليل الأنماط العصبية",
    subtitle: "جارٍ مطابقة الحقائق التاريخية",
    active: true,
    completed: false,
  },
  {
    id: 3,
    type: "number" as const,
    value: "3",
    title: "توليد تقرير النزاهة",
    subtitle: "بانتظار اكتمال التحليل",
    active: false,
    completed: false,
  },
];

export default function ProcessingTimeline() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="flex flex-col gap-6">
      {STEPS.map((step, index) => (
        <div key={step.id} className="flex gap-4 relative">
          {index < STEPS.length - 1 && (
            <div className="absolute top-0 bottom-0 right-[15px] w-0.5 bg-outline-variant/30 overflow-hidden">
              {!reducedMotion && step.completed && (
                <div className="home-timeline-fill w-full bg-gradient-to-b from-gold-metallic-start to-gold-metallic-end" />
              )}
              {!reducedMotion && step.active && (
                <div className="home-timeline-pulse w-full h-full bg-gold-metallic-start/40" />
              )}
            </div>
          )}

          <div
            className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 transition-all duration-500 ${
              step.active
                ? "bg-secondary text-on-secondary gold-glow"
                : step.completed
                  ? "bg-secondary text-on-secondary"
                  : "bg-surface-container-high text-outline"
            } ${!reducedMotion && step.active ? "home-step-active" : ""}`}
          >
            {step.type === "icon" ? (
              <span
                className={`material-symbols-outlined text-[18px] ${
                  !reducedMotion && step.active ? "home-sync-spin" : ""
                }`}
              >
                {step.value}
              </span>
            ) : (
              step.value
            )}
          </div>

          <div
            className={`flex flex-col transition-opacity duration-500 ${
              step.active
                ? ""
                : step.completed
                  ? ""
                  : "opacity-50"
            }`}
          >
            <span
              className={`font-label-bold text-label-bold ${
                step.active ? "text-secondary" : ""
              }`}
            >
              {step.title}
            </span>
            <span className="text-xs text-on-surface-variant">{step.subtitle}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
