import { useState } from "react";

const CURRENT_TRACK = {
  title: "ما وراء الحقيقة: تجارة التضليل",
  subtitle: "الحلقة 01 • المحقق الرقمي",
  cover:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCMGeUoUolEVgPYxh23Adismm7pytWekc6rP5ib-lGaPLm0tgMgbOvI6Y8DJMn4Swmu7-QhzTNzulPg0RuPO2UlkePPk1TPoQ5CLWHfHkDHptrx-7ckRyPSN6_n6d3Wm-9_-pZR1PbZZXYdvDgS0Sc4w32uDMvuWQNvlGy86Nieo82lYXFEjJf9nDLDuGHsyN4iheR5BNiq8aNgFHdZRuceXbl8wL39DAC1om6W8wPgTR5vDQEemEezatVJqTAi0Pm4svdfdqUsKB3q",
};

export default function PodcastAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-24 bg-surface-container-lowest/90 backdrop-blur-xl border-t border-outline-variant/20 z-[100]">
      <div className="max-w-container-max mx-auto h-full px-margin-desktop flex items-center justify-between">
        <div className="flex items-center gap-4 w-1/3 min-w-0">
          <div className="w-14 h-14 rounded overflow-hidden shadow-md shrink-0">
            <img
              alt="الحلقة الحالية"
              className="w-full h-full object-cover"
              src={CURRENT_TRACK.cover}
            />
          </div>
          <div className="min-w-0">
            <p className="font-label-bold text-primary truncate">
              {CURRENT_TRACK.title}
            </p>
            <p className="text-[12px] text-on-surface-variant">
              {CURRENT_TRACK.subtitle}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 w-1/3">
          <div className="flex items-center gap-6">
            <button
              type="button"
              className="text-on-surface-variant hover:text-primary"
            >
              <span className="material-symbols-outlined">shuffle</span>
            </button>
            <button
              type="button"
              className="text-primary hover:text-gold-metallic-start"
            >
              <span className="material-symbols-outlined text-3xl">
                skip_previous
              </span>
            </button>
            <button
              type="button"
              className={`w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg ${
                !isPlaying ? "animate-pulse-gold" : ""
              }`}
              onClick={() => setIsPlaying((prev) => !prev)}
            >
              <span
                className="material-symbols-outlined text-3xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {isPlaying ? "pause" : "play_arrow"}
              </span>
            </button>
            <button
              type="button"
              className="text-primary hover:text-gold-metallic-start"
            >
              <span className="material-symbols-outlined text-3xl">
                skip_next
              </span>
            </button>
            <button
              type="button"
              className="text-on-surface-variant hover:text-primary"
            >
              <span className="material-symbols-outlined">repeat</span>
            </button>
          </div>
          <div className="w-full flex items-center gap-3">
            <span className="text-[10px] text-on-surface-variant font-label-bold">
              04:25
            </span>
            <div className="relative flex-1 h-1 bg-outline-variant/30 rounded-full group cursor-pointer">
              <div className="absolute right-0 top-0 h-full w-[35%] bg-gold-metallic-start rounded-full" />
              <div className="absolute right-[35%] top-1/2 -translate-y-1/2 w-3 h-3 bg-gold-metallic-start border-2 border-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-[10px] text-on-surface-variant font-label-bold">
              42:00
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 w-1/3 justify-end">
          <div className="hidden sm:flex items-center gap-2">
            <span className="material-symbols-outlined text-on-surface-variant">
              volume_up
            </span>
            <div className="w-24 h-1 bg-outline-variant/30 rounded-full relative">
              <div className="absolute right-0 top-0 h-full w-[70%] bg-primary rounded-full" />
            </div>
          </div>
          <button
            type="button"
            className="text-on-surface-variant hover:text-gold-metallic-start transition-colors"
          >
            <span className="material-symbols-outlined">playlist_play</span>
          </button>
          <button
            type="button"
            className="text-on-surface-variant hover:text-gold-metallic-start transition-colors"
          >
            <span className="material-symbols-outlined">share</span>
          </button>
        </div>
      </div>
    </div>
  );
}
