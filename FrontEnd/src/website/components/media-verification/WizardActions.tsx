type WizardActionsProps = {
  showPrev: boolean;
  showNext: boolean;
  showSubmit?: boolean;
  nextDisabled?: boolean;
  onPrev: () => void;
  onNext: () => void;
  onSubmit?: () => void;
  submitLoading?: boolean;
};

export default function WizardActions({
  showPrev,
  showNext,
  showSubmit = false,
  nextDisabled = false,
  onPrev,
  onNext,
  onSubmit,
  submitLoading = false,
}: WizardActionsProps) {
  return (
    <div className="bg-surface-container-low p-6 flex justify-between items-center border-t border-mist-grey">
      <div className="flex gap-4">
        {showNext && (
          <button
            type="button"
            disabled={nextDisabled}
            className="px-10 py-3 bg-primary text-white font-label-bold rounded-lg hover:bg-primary-container transition-all flex items-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onNext}
          >
            <span>التالي</span>
            <span className="material-symbols-outlined text-sm transition-transform group-hover:-translate-x-1">
              arrow_back
            </span>
          </button>
        )}
        {showSubmit && onSubmit && (
          <button
            type="button"
            disabled={submitLoading}
            className="px-12 py-3 gold-gradient-bg text-primary font-bold rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-80"
            onClick={onSubmit}
          >
            {submitLoading ? "جاري الإرسال..." : "تقديم ملف للتحقق"}
          </button>
        )}
      </div>

      <button
        type="button"
        className={`px-6 py-3 text-on-surface-variant font-label-bold flex items-center gap-2 group transition-opacity ${
          showPrev ? "visible" : "invisible"
        }`}
        onClick={onPrev}
      >
        <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">
          arrow_forward
        </span>
        <span>السابق</span>
      </button>
    </div>
  );
}
