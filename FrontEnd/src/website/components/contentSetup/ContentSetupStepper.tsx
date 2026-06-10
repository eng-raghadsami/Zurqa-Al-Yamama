import { Link, useLocation } from "react-router-dom";
import {
  CONTENT_SETUP_STEP_ROUTES,
  CONTENT_SETUP_STEPS,
} from "@website/constants/contentSetup";
import type { ContentSetupStepId } from "@website/types/contentSetup";

function resolveActiveStep(pathname: string): ContentSetupStepId {
  if (pathname.includes("/content/cover")) return "cover";
  if (pathname.includes("/content/write")) return "write";
  if (pathname.includes("/content/analysis")) return "analysis";
  if (pathname.includes("/content/pending")) return "pending";
  return "type";
}

function stepIndex(stepId: ContentSetupStepId) {
  return CONTENT_SETUP_STEPS.findIndex((step) => step.id === stepId);
}

type ContentSetupStepperProps = {
  className?: string;
};

export default function ContentSetupStepper({ className = "" }: ContentSetupStepperProps) {
  const { pathname } = useLocation();
  const activeStep = resolveActiveStep(pathname);
  const activeIndex = stepIndex(activeStep);

  return (
    <nav
      aria-label="خطوات إعداد المحتوى"
      className={`glass-panel rounded-2xl border border-outline-variant/10 p-6 md:p-8 ${className}`}
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        {CONTENT_SETUP_STEPS.map((step, index) => {
          const isDone = index < activeIndex;
          const isActive = index === activeIndex;
          const isPending = index > activeIndex;
          const canNavigate = index <= activeIndex;

          const circleClass = isActive
            ? "bg-gold-metallic-start text-on-primary shadow-[0_0_15px_rgba(212,175,55,0.35)]"
            : isDone
              ? "bg-primary text-on-primary"
              : "bg-mist-grey text-on-surface-variant";

          const labelClass = isActive
            ? "text-gold-metallic-start font-label-bold"
            : isDone
              ? "text-primary font-label-bold"
              : "text-on-surface-variant";

          const content = (
            <div className="flex flex-col items-center gap-2 flex-1 min-w-[72px]">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${circleClass} ${
                  isActive ? "scale-105" : ""
                }`}
              >
                {isDone ? (
                  <span className="material-symbols-outlined text-[18px]">check</span>
                ) : (
                  <span className="material-symbols-outlined text-[18px]">{step.icon}</span>
                )}
              </div>
              <span className={`text-xs text-center ${labelClass}`}>{step.shortLabel}</span>
              {isActive && (
                <span className="hidden md:block h-1 w-16 bg-gold-metallic-start rounded-full" />
              )}
            </div>
          );

          return (
            <div key={step.id} className="flex items-center flex-1 min-w-0">
              {canNavigate && !isPending ? (
                <Link
                  to={CONTENT_SETUP_STEP_ROUTES[step.id]}
                  className="flex flex-1 min-w-0 hover:opacity-90 transition-opacity"
                  aria-current={isActive ? "step" : undefined}
                >
                  {content}
                </Link>
              ) : (
                <div className="flex flex-1 min-w-0 opacity-50" aria-current={isActive ? "step" : undefined}>
                  {content}
                </div>
              )}
              {index < CONTENT_SETUP_STEPS.length - 1 && (
                <div
                  className={`hidden md:block h-0.5 flex-1 mx-2 rounded-full ${
                    index < activeIndex ? "bg-gold-metallic-start/60" : "bg-mist-grey"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
