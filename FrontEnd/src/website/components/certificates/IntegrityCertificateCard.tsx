import { useRef, type ReactNode } from "react";
import type { IntegrityCertificate } from "@website/helpers/integrityCertificatesStore";

type IntegrityCertificateCardProps = {
  certificate: IntegrityCertificate;
  children?: ReactNode;
};

const CIRCLE_LENGTH = 552.92;

export default function IntegrityCertificateCard({
  certificate,
  children,
}: IntegrityCertificateCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 50;
    const rotateY = (centerX - x) / 50;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transition = "transform 0.5s ease";
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  };

  const handleMouseEnter = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transition = "none";
  };

  const dashOffset = CIRCLE_LENGTH * (1 - certificate.integrityScore / 100);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className="certificate-card relative bg-white mist-background p-8 md:p-16 rounded-lg overflow-hidden transition-transform will-change-transform"
      style={{
        border: "2px solid transparent",
        borderImage: "linear-gradient(135deg, #D4AF37, #F9E29C, #D4AF37) 1",
        boxShadow: "0 30px 60px -12px rgba(26, 26, 26, 0.12)",
      }}
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold-metallic-start/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none" />

      <div className="relative flex flex-col items-center text-center space-y-6">
        <div className="flex items-center gap-3">
          <span
            className="material-symbols-outlined text-5xl gold-gradient-text"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            visibility
          </span>
          <div className="h-12 w-px bg-gold-metallic-start/30" />
          <span className="font-display-lg text-primary tracking-tight">زرقاء اليمامة</span>
        </div>
        <h2 className="font-display-lg-mobile md:text-display-lg gold-gradient-text">
          شهادة نزاهة رقمية
        </h2>
        <div className="w-24 h-1 bg-gold-metallic-start rounded-full" />
      </div>

      <div className="mt-12 space-y-8 text-center">
        <p className="font-body-lg text-on-surface leading-relaxed max-w-2xl mx-auto">
          تشهد منصة زرقاء اليمامة للذكاء الاصطناعي، وبعد إجراء عمليات الفحص والتدقيق الرقمي
          المعمق، بأن المحتوى المذكور أدناه قد اجتاز كافة معايير النزاهة الإعلامية والتوثيق الرقمي
          المعتمدة لدينا.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-y border-mist-grey/50">
          <div className="space-y-2">
            <span className="text-on-surface-variant font-label-bold block">
              عنوان التقرير الموثق
            </span>
            <span className="font-headline-sm text-primary">{certificate.title}</span>
          </div>
          <div className="space-y-2">
            <span className="text-on-surface-variant font-label-bold block">الصحفي المحقق</span>
            <span className="font-headline-sm text-primary">{certificate.authorName}</span>
          </div>
          <div className="space-y-2">
            <span className="text-on-surface-variant font-label-bold block">
              تاريخ إصدار الشهادة
            </span>
            <span className="font-body-lg font-bold text-primary">
              {new Date(certificate.issuedAt).toLocaleDateString("ar-SA", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="space-y-2">
            <span className="text-on-surface-variant font-label-bold block">
              الرقم المرجعي للتحقق
            </span>
            <span className="font-body-lg font-mono text-primary tracking-widest">
              {certificate.referenceCode}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center my-12">
        <div className="relative w-48 h-48 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="96"
              cy="96"
              fill="transparent"
              r="88"
              stroke="#E5E7EB"
              strokeWidth="8"
            />
            <circle
              cx="96"
              cy="96"
              fill="transparent"
              r="88"
              stroke="url(#goldGradient)"
              strokeDasharray={CIRCLE_LENGTH}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              strokeWidth="12"
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="goldGradient" x1="0%" x2="100%" y1="0%" y2="0%">
                <stop offset="0%" stopColor="#D4AF37" stopOpacity={1} />
                <stop offset="100%" stopColor="#F9E29C" stopOpacity={1} />
              </linearGradient>
            </defs>
          </svg>
          <div className="flex flex-col items-center">
            <span className="font-stats-number text-primary">{certificate.integrityScore}%</span>
            <span className="font-label-bold text-on-surface-variant">مؤشر النزاهة</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
        {certificate.badges.map((badge) => (
          <div
            key={badge.label}
            className="flex flex-col items-center p-6 bg-surface-container-low rounded-xl border border-gold-metallic-start/20 transition-all duration-300 hover:shadow-lg"
          >
            <div className="w-12 h-12 bg-gold-metallic-start/10 rounded-full flex items-center justify-center mb-4">
              <span
                className="material-symbols-outlined text-gold-metallic-start"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified_user
              </span>
            </div>
            <span className="font-label-bold text-primary mb-1">{badge.label}</span>
            <span className="text-success-teal font-body-md flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">check_circle</span>
              مؤكد
            </span>
          </div>
        ))}
      </div>

      <div className="mt-16 pt-12 border-t border-mist-grey/50 flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="flex items-center gap-6">
          <div className="p-3 bg-white border-4 border-primary rounded-lg shadow-sm">
            <div className="w-24 h-24 bg-mist-grey flex items-center justify-center text-xs font-mono text-on-surface-variant p-2 text-center">
              QR
              <br />
              {certificate.referenceCode}
            </div>
          </div>
          <div className="space-y-1 text-right">
            <p className="font-label-bold text-primary">المصادقة الفورية</p>
            <p className="font-body-md text-on-surface-variant max-w-[200px]">
              امسح الرمز ضوئياً للتحقق من صحة هذه الشهادة عبر منصتنا الرقمية.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end text-right space-y-4">
          <div className="relative p-6 bg-primary/5 rounded-xl border border-primary/10 overflow-hidden">
            <div className="relative flex items-center gap-4">
              <div className="text-right">
                <p className="font-label-bold text-primary">التوقيع الرقمي الرسمي</p>
                <p className="text-[10px] font-mono text-on-surface-variant uppercase tracking-tighter">
                  ZARQA-AI-ENCRYPTED-SIGNATURE-v2.1
                </p>
              </div>
              <span
                className="material-symbols-outlined text-primary text-4xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                security_update_good
              </span>
            </div>
          </div>
          <span className="text-xs font-mono text-on-surface-variant">
            التحقق تم بواسطة نظام اليمامة الذكي (نسخة 4.0)
          </span>
        </div>
      </div>

      {children}
    </div>
  );
}
