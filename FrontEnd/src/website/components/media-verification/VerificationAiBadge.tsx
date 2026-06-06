export default function VerificationAiBadge() {
  return (
    <div className="mt-12 flex justify-center">
      <div className="glass-panel px-6 py-4 rounded-full flex items-center gap-4 text-sm border border-gold-metallic-start/30">
        <span
          className="material-symbols-outlined text-gold-metallic-start"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          auto_awesome
        </span>
        <span className="text-on-surface-variant">
          الذكاء الاصطناعي جاهز لمعالجة:{" "}
          <strong className="text-primary">
            Deepfake, Voice Cloning, Image Meta-data
          </strong>
        </span>
      </div>
    </div>
  );
}
