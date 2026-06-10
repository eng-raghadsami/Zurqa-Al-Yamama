const CHARS_PER_SECOND = 13;

export function estimateSpeechDurationSeconds(text: string, rate = 0.95): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return Math.max(8, trimmed.length / (CHARS_PER_SECOND * rate));
}

export function splitTextForSpeech(text: string, maxLen = 260): string[] {
  const trimmed = text.trim();
  if (!trimmed) return [];
  if (trimmed.length <= maxLen) return [trimmed];

  const parts = trimmed.split(/(?<=[.!?؟،])\s+/);
  const chunks: string[] = [];
  let current = "";

  for (const part of parts) {
    const candidate = current ? `${current} ${part}` : part;
    if (candidate.length > maxLen && current) {
      chunks.push(current.trim());
      current = part;
    } else {
      current = candidate;
    }
  }

  if (current.trim()) chunks.push(current.trim());
  return chunks.length > 0 ? chunks : [trimmed];
}

export function getSpeechVoicesNow(): SpeechSynthesisVoice[] {
  if (typeof window === "undefined" || !window.speechSynthesis) return [];
  return window.speechSynthesis.getVoices();
}

export function pickArabicVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  const arabic =
    voices.find((voice) => voice.lang.toLowerCase().startsWith("ar-sa")) ??
    voices.find((voice) => voice.lang.toLowerCase().startsWith("ar")) ??
    voices.find((voice) => /arab/i.test(voice.name));

  return arabic ?? voices[0] ?? null;
}

export function isSpeechSynthesisSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function primeSpeechSynthesis(): void {
  if (!isSpeechSynthesisSupported()) return;
  window.speechSynthesis.getVoices();
  const utterance = new SpeechSynthesisUtterance("");
  utterance.volume = 0;
  window.speechSynthesis.speak(utterance);
  window.speechSynthesis.cancel();
}
