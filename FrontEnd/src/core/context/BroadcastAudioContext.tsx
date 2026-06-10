import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";
import type { ArticleBodySection } from "@website/components/TermHighlightedArticleBody";
import { extractPlainTextFromSections } from "@website/helpers/articleTextUtils";
import {
  estimateSpeechDurationSeconds,
  getSpeechVoicesNow,
  isSpeechSynthesisSupported,
  pickArabicVoice,
  primeSpeechSynthesis,
  splitTextForSpeech,
} from "@website/helpers/speechSynthesis";
import { VERIFIED_NEWS_IMAGES } from "@website/constants/verifiedNewsImages";

const DEFAULT_COVER = VERIFIED_NEWS_IMAGES.featuredList;
const SPEECH_RATE = 0.92;
const DEFAULT_SUBTITLE = "قراءة نصية • زرقاء اليمامة";

export type ListenToArticleInput = {
  title: string;
  subtitle?: string;
  coverImage?: string;
  sections: ArticleBodySection[];
};

type BroadcastAudioContextValue = {
  isActive: boolean;
  isLoading: boolean;
  isPlaying: boolean;
  title: string | null;
  subtitle: string | null;
  coverImage: string;
  error: string | null;
  currentTime: number;
  duration: number;
  volume: number;
  listenToArticle: (input: ListenToArticleInput) => void;
  togglePlayback: () => void;
  seekTo: (seconds: number) => void;
  setVolume: (volume: number) => void;
  stopPlayback: () => void;
};

const BroadcastAudioContext = createContext<BroadcastAudioContextValue | null>(null);

export function BroadcastAudioProvider({ children }: PropsWithChildren) {
  const chunksRef = useRef<string[]>([]);
  const chunkIndexRef = useRef(0);
  const plainTextRef = useRef("");
  const startedAtRef = useRef(0);
  const pausedAtRef = useRef(0);
  const progressTimerRef = useRef<number | null>(null);
  const durationRef = useRef(0);
  const volumeRef = useRef(0.85);
  const metaRef = useRef<{ title: string; subtitle: string; cover: string }>({
    title: "",
    subtitle: DEFAULT_SUBTITLE,
    cover: DEFAULT_COVER,
  });

  const [title, setTitle] = useState<string | null>(null);
  const [subtitle, setSubtitle] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<string>(DEFAULT_COVER);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.85);

  const clearProgressTimer = useCallback(() => {
    if (progressTimerRef.current !== null) {
      window.clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }
  }, []);

  const stopSpeech = useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    clearProgressTimer();
    chunkIndexRef.current = 0;
  }, [clearProgressTimer]);

  const resetPlayback = useCallback(() => {
    stopSpeech();
    setTitle(null);
    setSubtitle(null);
    setCoverImage(DEFAULT_COVER);
    setIsPlaying(false);
    setIsLoading(false);
    setError(null);
    setCurrentTime(0);
    setDuration(0);
    plainTextRef.current = "";
    chunksRef.current = [];
    durationRef.current = 0;
    pausedAtRef.current = 0;
  }, [stopSpeech]);

  const startProgressTimer = useCallback(() => {
    clearProgressTimer();
    startedAtRef.current = Date.now() - pausedAtRef.current * 1000;
    progressTimerRef.current = window.setInterval(() => {
      const elapsed = (Date.now() - startedAtRef.current) / 1000;
      const cap = durationRef.current || elapsed;
      setCurrentTime(Math.min(elapsed, cap));
    }, 200);
  }, [clearProgressTimer]);

  const speakChunk = useCallback(
    (index: number) => {
      const chunks = chunksRef.current;
      if (!chunks[index] || !isSpeechSynthesisSupported()) return;

      const utterance = new SpeechSynthesisUtterance(chunks[index]);
      utterance.lang = "ar-SA";
      utterance.rate = SPEECH_RATE;
      utterance.volume = volumeRef.current;
      utterance.pitch = 1;

      const voice = pickArabicVoice(getSpeechVoicesNow());
      if (voice) utterance.voice = voice;

      utterance.onstart = () => {
        if (index === 0) {
          setIsLoading(false);
          setIsPlaying(true);
          pausedAtRef.current = 0;
          startedAtRef.current = Date.now();
          startProgressTimer();
        }
      };

      utterance.onend = () => {
        const next = index + 1;
        if (next < chunks.length) {
          chunkIndexRef.current = next;
          speakChunk(next);
          return;
        }

        clearProgressTimer();
        setIsPlaying(false);
        setCurrentTime(durationRef.current);
      };

      utterance.onerror = (event) => {
        if (event.error === "interrupted" || event.error === "canceled") return;
        clearProgressTimer();
        setIsLoading(false);
        setIsPlaying(false);
        setError("تعذّر تشغيل القراءة الصوتية. جرّب مرة أخرى.");
      };

      window.speechSynthesis.speak(utterance);
    },
    [clearProgressTimer, startProgressTimer],
  );

  const beginSpeech = useCallback(
    (fullText: string, startChunkIndex = 0, startTimeSeconds = 0) => {
      if (!isSpeechSynthesisSupported()) {
        setError("القراءة الصوتية غير مدعومة في هذا المتصفح");
        setIsLoading(false);
        return;
      }

      stopSpeech();

      const chunks = splitTextForSpeech(fullText);
      if (chunks.length === 0) {
        setError("لا يوجد نص كافٍ للقراءة الصوتية");
        setIsLoading(false);
        return;
      }

      chunksRef.current = chunks;
      chunkIndexRef.current = startChunkIndex;
      plainTextRef.current = fullText;

      const estimated = estimateSpeechDurationSeconds(fullText, SPEECH_RATE);
      durationRef.current = estimated;
      setDuration(estimated);
      setCurrentTime(startTimeSeconds);
      pausedAtRef.current = startTimeSeconds;
      setIsLoading(true);
      setError(null);

      primeSpeechSynthesis();
      window.speechSynthesis.cancel();
      speakChunk(startChunkIndex);
    },
    [speakChunk, stopSpeech],
  );

  const listenToArticle = useCallback(
    (input: ListenToArticleInput) => {
      const plainText = extractPlainTextFromSections(input.title, input.sections);
      const nextSubtitle = input.subtitle ?? DEFAULT_SUBTITLE;
      const nextCover = input.coverImage ?? DEFAULT_COVER;

      metaRef.current = {
        title: input.title,
        subtitle: nextSubtitle,
        cover: nextCover,
      };

      setTitle(input.title);
      setSubtitle(nextSubtitle);
      setCoverImage(nextCover);
      setError(null);
      setIsLoading(true);
      setIsPlaying(false);
      setCurrentTime(0);

      if (!plainText.trim()) {
        setError("لا يوجد نص كافٍ للقراءة الصوتية");
        setIsLoading(false);
        return;
      }

      beginSpeech(plainText);
    },
    [beginSpeech],
  );

  const togglePlayback = useCallback(() => {
    if (!isSpeechSynthesisSupported() || !title) return;

    const synth = window.speechSynthesis;

    if (isLoading) return;

    if (synth.speaking && !synth.paused) {
      pausedAtRef.current = currentTime;
      synth.pause();
      clearProgressTimer();
      setIsPlaying(false);
      return;
    }

    if (synth.paused) {
      synth.resume();
      startProgressTimer();
      setIsPlaying(true);
      return;
    }

    if (plainTextRef.current) {
      beginSpeech(plainTextRef.current);
    }
  }, [beginSpeech, clearProgressTimer, currentTime, isLoading, startProgressTimer, title]);

  const seekTo = useCallback(
    (seconds: number) => {
      const fullText = plainTextRef.current;
      if (!fullText || !title || !isSpeechSynthesisSupported()) return;

      const clamped = Math.max(0, Math.min(seconds, durationRef.current || seconds));
      const charIndex = Math.floor(
        (clamped / Math.max(durationRef.current, 1)) * fullText.length,
      );
      const remaining = fullText.slice(charIndex).trim();

      setCurrentTime(clamped);
      pausedAtRef.current = clamped;

      if (!remaining) {
        stopSpeech();
        setIsPlaying(false);
        setCurrentTime(durationRef.current);
        return;
      }

      stopSpeech();
      chunksRef.current = splitTextForSpeech(remaining);
      chunkIndexRef.current = 0;
      setIsLoading(true);
      setError(null);
      primeSpeechSynthesis();
      window.speechSynthesis.cancel();
      speakChunk(0);
    },
    [speakChunk, stopSpeech, title],
  );

  const setVolume = useCallback((nextVolume: number) => {
    const clamped = Math.max(0, Math.min(1, nextVolume));
    volumeRef.current = clamped;
    setVolumeState(clamped);
  }, []);

  const stopPlayback = useCallback(() => {
    resetPlayback();
  }, [resetPlayback]);

  useEffect(() => {
    if (!isSpeechSynthesisSupported()) return undefined;

    const loadVoices = () => {
      getSpeechVoicesNow();
    };

    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
    loadVoices();

    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
      stopSpeech();
    };
  }, [stopSpeech]);

  const value = useMemo<BroadcastAudioContextValue>(
    () => ({
      isActive: Boolean(title),
      isLoading,
      isPlaying,
      title,
      subtitle,
      coverImage,
      error,
      currentTime,
      duration,
      volume,
      listenToArticle,
      togglePlayback,
      seekTo,
      setVolume,
      stopPlayback,
    }),
    [
      coverImage,
      currentTime,
      duration,
      error,
      isLoading,
      isPlaying,
      listenToArticle,
      seekTo,
      setVolume,
      stopPlayback,
      subtitle,
      title,
      togglePlayback,
      volume,
    ],
  );

  return (
    <BroadcastAudioContext.Provider value={value}>
      {children}
    </BroadcastAudioContext.Provider>
  );
}

export function useBroadcastAudio() {
  const context = useContext(BroadcastAudioContext);
  if (!context) {
    throw new Error("useBroadcastAudio must be used within BroadcastAudioProvider");
  }
  return context;
}
