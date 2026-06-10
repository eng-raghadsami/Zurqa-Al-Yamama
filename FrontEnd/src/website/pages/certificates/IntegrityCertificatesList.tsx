import { useEffect } from "react";
import { Link } from "react-router-dom";
import { WEBSITE_ROUTES } from "@core/constants/routes";
import { useIntegrityCertificates } from "@services";
import { CONTENT_TYPE_LABELS } from "@website/constants/contentSetup";

export default function IntegrityCertificatesList() {
  const { data: certificates = [], isLoading } = useIntegrityCertificates();

  useEffect(() => {
    document.title = "شهادات النزاهة | مساحتي | زرقاء اليمامة";
  }, []);

  return (
    <div className="space-y-8 pb-12">
      <header>
        <Link
          to={WEBSITE_ROUTES.MY_SPACE}
          className="text-sm text-secondary font-label-bold hover:underline mb-4 inline-flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          مساحتي
        </Link>
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-2">
          شهادات النزاهة الرقمية
        </h1>
        <p className="text-on-surface-variant max-w-2xl">
          شهادات صادرة بعد اعتماد محتواك من فريق الخبراء — يمكنك عرضها أو مشاركتها أو تحميلها.
        </p>
      </header>

      {isLoading ? (
        <div className="glass-panel rounded-2xl p-12 text-center">
          <span className="material-symbols-outlined animate-spin text-4xl text-gold-metallic-start">
            progress_activity
          </span>
        </div>
      ) : certificates.length === 0 ? (
        <div className="glass-panel rounded-2xl p-12 text-center border border-dashed border-outline-variant/30">
          <span className="material-symbols-outlined text-5xl text-outline mb-4">workspace_premium</span>
          <p className="text-on-surface-variant mb-4">لا توجد شهادات بعد.</p>
          <Link
            to={WEBSITE_ROUTES.CONTENT_SETUP_NEW}
            className="inline-flex items-center gap-2 text-secondary font-label-bold hover:underline"
          >
            ابدأ بإعداد محتوى جديد
            <span className="material-symbols-outlined text-base">arrow_back</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((cert) => (
            <Link
              key={cert.id}
              to={WEBSITE_ROUTES.integrityCertificateDetail(cert.id)}
              className="glass-panel rounded-2xl p-6 border border-gold-metallic-start/20 hover:shadow-lg hover:border-gold-metallic-start/50 transition-all group"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <span
                  className="material-symbols-outlined text-3xl text-gold-metallic-start group-hover:scale-110 transition-transform"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
                <span className="font-stats-number text-2xl text-primary">
                  {cert.integrityScore}%
                </span>
              </div>
              <h2 className="font-label-bold text-primary mb-2 line-clamp-2">{cert.title}</h2>
              <p className="text-xs text-on-surface-variant mb-3">
                {CONTENT_TYPE_LABELS[cert.contentType]} • {cert.authorName}
              </p>
              <p className="text-xs font-mono text-on-surface-variant">{cert.referenceCode}</p>
              <p className="text-xs text-on-surface-variant mt-2">
                {new Date(cert.issuedAt).toLocaleDateString("ar-SA")}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
