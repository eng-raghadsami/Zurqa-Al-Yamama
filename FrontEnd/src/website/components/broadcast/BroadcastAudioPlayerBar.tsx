import { useBroadcastAudio } from "@core/context/BroadcastAudioContext";
import PodcastPlayerBar from "@website/components/PodcastPlayerBar";

export default function BroadcastAudioPlayerBar() {
  const {
    isActive,
    isPlaying,
    isLoading,
    title,
    subtitle,
    coverImage,
    currentTime,
    duration,
    volume,
    error,
    togglePlayback,
    seekTo,
    setVolume,
    stopPlayback,
  } = useBroadcastAudio();

  if (!isActive || !title) return null;

  return (
    <PodcastPlayerBar
      title={title}
      subtitle={subtitle ?? "قراءة نصية • زرقاء اليمامة"}
      coverImage={coverImage}
      isPlaying={isPlaying}
      isLoading={isLoading}
      currentTime={currentTime}
      duration={duration}
      volume={volume}
      error={error}
      onTogglePlay={togglePlayback}
      onSeek={seekTo}
      onVolumeChange={setVolume}
      onClose={stopPlayback}
      seekable
    />
  );
}
