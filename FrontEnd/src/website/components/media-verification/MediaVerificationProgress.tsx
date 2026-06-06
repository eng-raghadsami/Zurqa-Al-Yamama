import { VERIFICATION_STEPS } from "@website/types/mediaVerification";

type MediaVerificationProgressProps = {
  currentStep: number;
};

export default function MediaVerificationProgress({
  currentStep,
}: MediaVerificationProgressProps) {
  const progressWidth =
    currentStep > 4
      ? 100
      : currentStep <= 1
        ? 0
        : ((currentStep - 1) / (VERIFICATION_STEPS.length - 1)) * 100;

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center relative px-2">
        <div className="absolute top-5 left-0 right-0 h-[2px] bg-mist-grey z-0" />
        <div
          className="absolute top-5 right-0 h-[2px] bg-gold-metallic-start z-0 transition-all duration-500 origin-right"
          style={{ width: `${progressWidth}%` }}
        />

        {VERIFICATION_STEPS.map((step) => {
          const isCompleted = step.id < currentStep || currentStep > 4;
          const isActive = step.id === currentStep && currentStep <= 4;

          return (
            <div
              key={step.id}
              className="relative z-10 flex flex-col items-center gap-2 min-w-0 flex-1"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-surface transition-all duration-300 ${
                  isCompleted
                    ? "bg-success-teal text-white shadow-md"
                    : isActive
                      ? "bg-primary text-white pulse-gold shadow-lg"
                      : "bg-mist-grey text-on-surface-variant"
                } ${isActive ? "ring-2 ring-gold-metallic-start/40 step-active" : ""}`}
              >
                {isCompleted ? (
                  <span
                    className="material-symbols-outlined text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check
                  </span>
                ) : (
                  <span className="font-label-bold text-sm">{step.id}</span>
                )}
              </div>
              <span
                className={`font-label-bold text-[11px] md:text-sm text-center leading-tight ${
                  isActive || isCompleted ? "text-primary" : "text-on-surface-variant"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
