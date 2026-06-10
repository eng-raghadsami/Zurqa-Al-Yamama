import { useState } from "react";
import PodcastPlayerBar from "@website/components/PodcastPlayerBar";

const CURRENT_TRACK = {
  title: "ما وراء الحقيقة: تجارة التضليل",
  subtitle: "الحلقة 01 • المحقق الرقمي",
  cover:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCMGeUoUolEVgPYxh23Adismm7pytWekc6rP5ib-lGaPLm0tgMgbOvI6Y8DJMn4Swmu7-QhzTNzulPg0RuPO2UlkePPk1TPoQ5CLWHfHkDHptrx-7ckRyPSN6_n6d3Wm-9_-pZR1PbZZXYdvDgS0Sc4w32uDMvuWQNvlGy86Nieo82lYXFEjJf9nDLDuGHsyN4iheR5BNiq8aNgFHdZRuceXbl8wL39DAC1om6W8wPgTR5vDQEemEezatVJqTAi0Pm4svdfdqUsKB3q",
  duration: 42 * 60 + 0,
  demoProgress: 4 * 60 + 25,
};

export default function PodcastAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(CURRENT_TRACK.demoProgress);
  const [volume, setVolume] = useState(0.7);

  return (
    <PodcastPlayerBar
      title={CURRENT_TRACK.title}
      subtitle={CURRENT_TRACK.subtitle}
      coverImage={CURRENT_TRACK.cover}
      isPlaying={isPlaying}
      currentTime={currentTime}
      duration={CURRENT_TRACK.duration}
      volume={volume}
      onTogglePlay={() => setIsPlaying((prev) => !prev)}
      onSeek={setCurrentTime}
      onVolumeChange={setVolume}
      seekable={false}
    />
  );
}
