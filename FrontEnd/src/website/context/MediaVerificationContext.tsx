import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  INITIAL_VERIFICATION_FORM,
  type MediaVerificationFormData,
  type MediaVerificationType,
} from "@website/types/mediaVerification";

type MediaVerificationContextValue = {
  mediaType: MediaVerificationType;
  step: number;
  trackingId: string | null;
  form: MediaVerificationFormData;
  setForm: React.Dispatch<React.SetStateAction<MediaVerificationFormData>>;
  updateForm: (patch: Partial<MediaVerificationFormData>) => void;
  goNext: () => void;
  goPrev: () => void;
  goToStep: (step: number) => void;
  submit: () => void;
  reset: () => void;
  isSubmitted: boolean;
};

const MediaVerificationContext =
  createContext<MediaVerificationContextValue | null>(null);

function generateTrackingId() {
  const segment = () => Math.floor(100 + Math.random() * 900);
  return `ZY-${segment()}-${segment()}`;
}

type ProviderProps = {
  mediaType: MediaVerificationType;
  children: ReactNode;
};

export function MediaVerificationProvider({
  mediaType,
  children,
}: ProviderProps) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<MediaVerificationFormData>(
    INITIAL_VERIFICATION_FORM,
  );
  const [trackingId, setTrackingId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateForm = useCallback((patch: Partial<MediaVerificationFormData>) => {
    setForm((prev) => ({ ...prev, ...patch }));
  }, []);

  const goNext = useCallback(() => {
    setStep((prev) => Math.min(prev + 1, 4));
  }, []);

  const goPrev = useCallback(() => {
    setStep((prev) => Math.max(prev - 1, 1));
  }, []);

  const goToStep = useCallback((target: number) => {
    setStep(Math.min(Math.max(target, 1), 4));
  }, []);

  const submit = useCallback(() => {
    setTrackingId(generateTrackingId());
    setIsSubmitted(true);
  }, []);

  const reset = useCallback(() => {
    setForm((prev) => {
      if (prev.filePreviewUrl) URL.revokeObjectURL(prev.filePreviewUrl);
      return INITIAL_VERIFICATION_FORM;
    });
    setStep(1);
    setTrackingId(null);
    setIsSubmitted(false);
  }, []);

  const value = useMemo(
    () => ({
      mediaType,
      step,
      trackingId,
      form,
      setForm,
      updateForm,
      goNext,
      goPrev,
      goToStep,
      submit,
      reset,
      isSubmitted,
    }),
    [
      mediaType,
      step,
      trackingId,
      form,
      updateForm,
      goNext,
      goPrev,
      goToStep,
      submit,
      reset,
      isSubmitted,
    ],
  );

  return (
    <MediaVerificationContext.Provider value={value}>
      {children}
    </MediaVerificationContext.Provider>
  );
}

export function useMediaVerification() {
  const ctx = useContext(MediaVerificationContext);
  if (!ctx) {
    throw new Error(
      "useMediaVerification must be used within MediaVerificationProvider",
    );
  }
  return ctx;
}
