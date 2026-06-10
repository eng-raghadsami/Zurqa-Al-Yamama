type PodcastPlayerBarProps = {
  title: string;
  subtitle: string;
  coverImage: string;
  isPlaying: boolean;
  isLoading?: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  onTogglePlay: () => void;
  onSeek: (seconds: number) => void;
  onVolumeChange: (volume: number) => void;
  onClose?: () => void;
  seekable?: boolean;
  error?: string | null;
};

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const whole = Math.floor(seconds);
  const mins = Math.floor(whole / 60);
  const secs = whole % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function PodcastPlayerBar({
  title,
  subtitle,
  coverImage,
  isPlaying,
  isLoading = false,
  currentTime,
  duration,
  volume,
  onTogglePlay,
  onSeek,
  onVolumeChange,
  onClose,
  seekable = true,
  error = null,
}: PodcastPlayerBarProps) {
  const progress = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] border-t border-outline-variant/20 bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_-4px_24px_rgba(0,0,0,0.08)]">
      <div className="mx-auto flex h-24 max-w-container-max items-center justify-between gap-4 px-margin-desktop">
        <div className="flex min-w-0 flex-1 items-center gap-4 md:max-w-[32%]">
          <div className="h-14 w-14 shrink-0 overflow-hidden rounded shadow-md ring-1 ring-outline-variant/10">
            <img alt="" className="h-full w-full object-cover" src={coverImage} />
          </div>
          <div className="min-w-0">
            <p className="truncate font-label-bold text-primary">{title}</p>
            <p className="truncate text-[12px] text-on-surface-variant">{subtitle}</p>
            {error && (
              <p className="mt-0.5 truncate text-[11px] text-error" role="alert">
                {error}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-[1.4] flex-col items-center gap-2 px-2">
          <div className="flex items-center gap-4 md:gap-6">
            <button
              type="button"
              className="hidden text-on-surface-variant hover:text-primary sm:inline-flex"
              aria-hidden
              tabIndex={-1}
            >
              <span className="material-symbols-outlined text-[20px]">shuffle</span>
            </button>
            <button
              type="button"
              className="hidden text-primary hover:text-gold-metallic-start sm:inline-flex"
              aria-hidden
              tabIndex={-1}
            >
              <span className="material-symbols-outlined text-[28px]">skip_previous</span>
            </button>
            <button
              type="button"
              disabled={isLoading}
              className={`flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white shadow-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-60 md:h-12 md:w-12 ${
                !isPlaying && !isLoading ? "animate-pulse-gold" : ""
              }`}
              onClick={onTogglePlay}
              aria-label={isPlaying ? "إيقاف مؤقت" : "تشغيل"}
            >
              <span
                className="material-symbols-outlined text-[28px] md:text-[30px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {isLoading ? "hourglass_top" : isPlaying ? "pause" : "play_arrow"}
              </span>
            </button>
            <button
              type="button"
              className="hidden text-primary hover:text-gold-metallic-start sm:inline-flex"
              aria-hidden
              tabIndex={-1}
            >
              <span className="material-symbols-outlined text-[28px]">skip_next</span>
            </button>
            <button
              type="button"
              className="hidden text-on-surface-variant hover:text-primary sm:inline-flex"
              aria-hidden
              tabIndex={-1}
            >
              <span className="material-symbols-outlined text-[20px]">repeat</span>
            </button>
          </div>

          <div className="flex w-full max-w-md items-center gap-3">
            <span className="w-10 shrink-0 text-[10px] font-label-bold text-on-surface-variant">
              {formatTime(currentTime)}
            </span>
            <div className="relative h-1 flex-1 rounded-full bg-outline-variant/25">
              {seekable ? (
                <input
                  type="range"
                  min={0}
                  max={duration || 1}
                  step={0.5}
                  value={currentTime}
                  onChange={(event) => onSeek(Number(event.target.value))}
                  className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                  aria-label="تقدّم القراءة"
                />
              ) : null}
              <div
                className="absolute right-0 top-0 h-full rounded-full bg-gold-metallic-start transition-[width] duration-200"
                style={{ width: `${progress}%` }}
              />
              <div
                className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-gold-metallic-start shadow-sm transition-[right] duration-200"
                style={{ right: `calc(${progress}% - 6px)` }}
              />
            </div>
            <span className="w-10 shrink-0 text-left text-[10px] font-label-bold text-on-surface-variant">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        <div className="hidden min-w-0 flex-1 items-center justify-end gap-3 md:flex md:max-w-[28%] lg:gap-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-on-surface-variant">
              volume_up
            </span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={volume}
              onChange={(event) => onVolumeChange(Number(event.target.value))}
              className="h-1 w-20 cursor-pointer accent-primary lg:w-24"
              aria-label="مستوى الصوت"
            />
          </div>
          <button
            type="button"
            className="text-on-surface-variant transition-colors hover:text-gold-metallic-start"
            aria-hidden
            tabIndex={-1}
          >
            <span className="material-symbols-outlined text-[22px]">playlist_play</span>
          </button>
          {onClose ? (
            <button
              type="button"
              onClick={onClose}
              className="text-on-surface-variant transition-colors hover:text-gold-metallic-start"
              aria-label="إغلاق المشغّل"
            >
              <span className="material-symbols-outlined text-[22px]">close</span>
            </button>
          ) : (
            <button
              type="button"
              className="text-on-surface-variant transition-colors hover:text-gold-metallic-start"
              aria-hidden
              tabIndex={-1}
            >
              <span className="material-symbols-outlined text-[22px]">share</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
