import { BREAKING_NEWS_TICKER } from "@website/types/verifiedNews";

export default function VerifiedNewsTicker() {
  const tickerText = BREAKING_NEWS_TICKER.join(" • ");

  return (
    <div className="sticky top-20 z-40 w-full bg-primary text-on-primary h-10 flex items-center overflow-hidden border-b border-gold-metallic-start/30">
      <div className="bg-gold-metallic-start text-primary px-4 h-full flex items-center z-10 shrink-0 font-label-bold text-label-bold">
        <span
          className="material-symbols-outlined ml-2 text-[18px]"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          verified
        </span>
        عاجل موثق
      </div>
      <div className="ticker-wrap flex-1">
        <div className="ticker-move px-4 font-body-md text-body-md italic">
          {tickerText} •
        </div>
      </div>
    </div>
  );
}
