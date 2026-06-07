import { useState } from "react";
import RevealOnScroll from "@shared/components/RevealOnScroll";
import { EnterItem } from "@shared/components/animations";
import MediaVerificationProgress from "@website/components/media-verification/MediaVerificationProgress";
import ContextStep from "@website/components/media-verification/steps/ContextStep";
import ReviewStep from "@website/components/media-verification/steps/ReviewStep";
import SourceDetailsStep, {
  isSourceDetailsValid,
} from "@website/components/media-verification/steps/SourceDetailsStep";
import SuccessStep from "@website/components/media-verification/steps/SuccessStep";
import UploadStep from "@website/components/media-verification/steps/UploadStep";
import VerificationAiBadge from "@website/components/media-verification/VerificationAiBadge";
import WizardActions from "@website/components/media-verification/WizardActions";
import {
  MediaVerificationProvider,
  useMediaVerification,
} from "@website/context/MediaVerificationContext";
import type { MediaVerificationType } from "@website/types/mediaVerification";

function WizardContent() {
  const { step, form, goNext, goPrev, isSubmitted } = useMediaVerification();
  const [sourceError, setSourceError] = useState(false);

  const handleNext = () => {
    if (step === 1 && !form.file) return;
    if (step === 2 && !isSourceDetailsValid(form)) {
      setSourceError(true);
      return;
    }
    setSourceError(false);
    goNext();
  };

  if (isSubmitted) {
    return (
      <div className="verification-page-bg dot-pattern pt-8 pb-20 px-4 md:px-margin-desktop min-h-screen">
        <div className="max-w-4xl mx-auto">
          <EnterItem index={0}>
            <MediaVerificationProgress currentStep={5} />
          </EnterItem>
          <RevealOnScroll direction="up" delay={100}>
          <div className="bg-white rounded-xl shadow-[0_30px_60px_-12px_rgba(0,0,0,0.04)] overflow-hidden border border-mist-grey/50">
            <div key={5} className="site-wizard-step-enter">
              <SuccessStep />
            </div>
          </div>
          </RevealOnScroll>
        </div>
      </div>
    );
  }

  return (
    <div className="verification-page-bg dot-pattern pt-8 pb-20 px-4 md:px-margin-desktop min-h-screen">
      <div className="max-w-4xl mx-auto">
        <EnterItem index={0}>
          <MediaVerificationProgress currentStep={step} />
        </EnterItem>

        <RevealOnScroll direction="up" delay={100}>
        <div className="bg-white rounded-xl shadow-[0_30px_60px_-12px_rgba(0,0,0,0.04)] overflow-hidden border border-mist-grey/50">
          <div key={step} className="site-wizard-step-enter">
          {step === 1 && <UploadStep />}
          {step === 2 && (
            <>
              <SourceDetailsStep />
              {sourceError && (
                <p className="px-8 md:px-12 pb-4 text-error text-sm font-label-bold">
                  يرجى تعبئة نوع المصدر وتاريخ النشر قبل المتابعة
                </p>
              )}
            </>
          )}
          {step === 3 && <ContextStep />}
          {step === 4 && <ReviewStep />}
          </div>

          {step < 4 && (
            <WizardActions
              nextDisabled={step === 1 && !form.file}
              showNext
              showPrev={step > 1}
              onNext={handleNext}
              onPrev={goPrev}
            />
          )}
        </div>
        </RevealOnScroll>

        {step < 4 && (
          <EnterItem index={1}>
            <VerificationAiBadge />
          </EnterItem>
        )}
      </div>
    </div>
  );
}

type MediaVerificationWizardProps = {
  mediaType: MediaVerificationType;
};

export default function MediaVerificationWizard({
  mediaType,
}: MediaVerificationWizardProps) {
  return (
    <MediaVerificationProvider mediaType={mediaType}>
      <WizardContent />
    </MediaVerificationProvider>
  );
}
