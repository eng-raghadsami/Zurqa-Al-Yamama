import { useBroadcastAudio, type ListenToArticleInput } from "@core/context/BroadcastAudioContext";

type ArticleListenButtonProps = ListenToArticleInput & {
  className?: string;
};

export default function ArticleListenButton({
  title,
  subtitle,
  coverImage,
  sections,
  className = "",
}: ArticleListenButtonProps) {
  const {
    isLoading,
    isActive,
    isPlaying,
    title: activeTitle,
    listenToArticle,
    togglePlayback,
  } = useBroadcastAudio();

  const isCurrent = isActive && activeTitle === title;
  const busy = isLoading && isCurrent;
  const playing = isCurrent && isPlaying;

  const handleClick = () => {
    if (isCurrent) {
      togglePlayback();
      return;
    }
    listenToArticle({ title, subtitle, coverImage, sections });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={busy}
      aria-busy={busy}
      aria-pressed={playing}
      className={`flex cursor-pointer items-center gap-2 rounded-lg border border-primary px-6 py-3 font-label-bold text-label-bold text-primary transition-all hover:bg-mist-grey disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
      <span className="material-symbols-outlined pointer-events-none">
        {busy ? "hourglass_top" : playing ? "pause_circle" : "headphones"}
      </span>
      {busy ? "جاري التحضير..." : playing ? "إيقاف مؤقت" : "استمع للنص"}
    </button>
  );
}
