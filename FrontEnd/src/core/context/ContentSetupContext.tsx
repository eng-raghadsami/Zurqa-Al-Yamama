import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import type {
  ImageAnalysisResult,
  TextAnalysisResult,
} from "@website/types/contentAnalysis";
import type { ContentSetupType } from "@website/types/contentSetup";

const STORAGE_KEY = "zurqa-content-setup-draft-v2";

export type ContentSetupStatus = "draft" | "pending_review" | "submitted";

type ContentSetupDraft = {
  contentType: ContentSetupType | null;
  coverPreviewUrl: string | null;
  coverFileName: string | null;
  coverBlurLevel: number;
  coverRemoved: boolean;
  title: string;
  body: string;
  textAnalysis: TextAnalysisResult | null;
  imageAnalysis: ImageAnalysisResult | null;
  status: ContentSetupStatus;
  submissionId: string | null;
};

type ContentSetupContextValue = {
  draft: ContentSetupDraft;
  setContentType: (type: ContentSetupType) => void;
  setCoverPreviewUrl: (url: string | null, fileName?: string | null) => void;
  setCoverBlurLevel: (level: number) => void;
  setCoverRemoved: (removed: boolean) => void;
  setTitle: (title: string) => void;
  setBody: (body: string) => void;
  setTextAnalysis: (result: TextAnalysisResult | null) => void;
  setImageAnalysis: (result: ImageAnalysisResult | null) => void;
  markPendingReview: (submissionId: string) => void;
  resetDraft: () => void;
};

const EMPTY_DRAFT: ContentSetupDraft = {
  contentType: null,
  coverPreviewUrl: null,
  coverFileName: null,
  coverBlurLevel: 0,
  coverRemoved: false,
  title: "",
  body: "",
  textAnalysis: null,
  imageAnalysis: null,
  status: "draft",
  submissionId: null,
};

const ContentSetupContext = createContext<ContentSetupContextValue | null>(null);

function readDraft(): ContentSetupDraft {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_DRAFT;
    const parsed = { ...EMPTY_DRAFT, ...(JSON.parse(raw) as Partial<ContentSetupDraft>) };
    // تحليل قديم (mock أو قبل تحديث شكل API) — يُجبر على إعادة الرفع
    if (parsed.imageAnalysis && parsed.imageAnalysis.source !== "api") {
      parsed.imageAnalysis = null;
    }
    return parsed;
  } catch {
    return EMPTY_DRAFT;
  }
}

function writeDraft(draft: ContentSetupDraft) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
}

export function ContentSetupProvider({ children }: PropsWithChildren) {
  const [draft, setDraft] = useState<ContentSetupDraft>(readDraft);

  const persist = useCallback((updater: (prev: ContentSetupDraft) => ContentSetupDraft) => {
    setDraft((prev) => {
      const next = updater(prev);
      writeDraft(next);
      return next;
    });
  }, []);

  const setContentType = useCallback(
    (type: ContentSetupType) => {
      persist((prev) => {
        if (prev.contentType === type) return prev;
        return {
          ...EMPTY_DRAFT,
          contentType: type,
          status: "draft",
        };
      });
    },
    [persist],
  );

  const setCoverPreviewUrl = useCallback(
    (url: string | null, fileName: string | null = null) => {
      persist((prev) => ({
        ...prev,
        coverPreviewUrl: url,
        coverFileName: fileName,
        coverRemoved: false,
        imageAnalysis: null,
      }));
    },
    [persist],
  );

  const setCoverBlurLevel = useCallback(
    (level: number) => {
      persist((prev) => ({
        ...prev,
        coverBlurLevel: Math.max(0, Math.min(24, level)),
      }));
    },
    [persist],
  );

  const setCoverRemoved = useCallback(
    (removed: boolean) => {
      persist((prev) => ({
        ...prev,
        coverRemoved: removed,
        coverPreviewUrl: removed ? null : prev.coverPreviewUrl,
        coverBlurLevel: removed ? 0 : prev.coverBlurLevel,
        imageAnalysis: removed ? null : prev.imageAnalysis,
      }));
    },
    [persist],
  );

  const setTitle = useCallback(
    (title: string) => {
      persist((prev) => ({ ...prev, title }));
    },
    [persist],
  );

  const setBody = useCallback(
    (body: string) => {
      persist((prev) => ({ ...prev, body, textAnalysis: null }));
    },
    [persist],
  );

  const setTextAnalysis = useCallback(
    (result: TextAnalysisResult | null) => {
      persist((prev) => ({ ...prev, textAnalysis: result }));
    },
    [persist],
  );

  const setImageAnalysis = useCallback(
    (result: ImageAnalysisResult | null) => {
      persist((prev) => ({
        ...prev,
        imageAnalysis: result,
        coverBlurLevel: result?.recommendedBlur ?? prev.coverBlurLevel,
      }));
    },
    [persist],
  );

  const markPendingReview = useCallback(
    (submissionId: string) => {
      persist((prev) => ({
        ...prev,
        status: "pending_review",
        submissionId,
      }));
    },
    [persist],
  );

  const resetDraft = useCallback(() => {
    writeDraft(EMPTY_DRAFT);
    setDraft(EMPTY_DRAFT);
  }, []);

  const value = useMemo(
    () => ({
      draft,
      setContentType,
      setCoverPreviewUrl,
      setCoverBlurLevel,
      setCoverRemoved,
      setTitle,
      setBody,
      setTextAnalysis,
      setImageAnalysis,
      markPendingReview,
      resetDraft,
    }),
    [
      draft,
      setContentType,
      setCoverPreviewUrl,
      setCoverBlurLevel,
      setCoverRemoved,
      setTitle,
      setBody,
      setTextAnalysis,
      setImageAnalysis,
      markPendingReview,
      resetDraft,
    ],
  );

  return (
    <ContentSetupContext.Provider value={value}>{children}</ContentSetupContext.Provider>
  );
}

export function useContentSetup() {
  const ctx = useContext(ContentSetupContext);
  if (!ctx) {
    throw new Error("useContentSetup must be used within ContentSetupProvider");
  }
  return ctx;
}
