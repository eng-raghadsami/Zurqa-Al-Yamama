import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { WEBSITE_ROUTES } from "@core/constants/routes";
import { useIntegrityCertificate } from "@services";
import IntegrityCertificateCard from "@website/components/certificates/IntegrityCertificateCard";

export default function IntegrityCertificateDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: certificate, isLoading } = useIntegrityCertificate(id);

  useEffect(() => {
    document.title = "شهادة النزاهة | زرقاء اليمامة";
  }, []);

  if (isLoading) {
    return (
      <div className="py-16 text-center">
        <span className="material-symbols-outlined animate-spin text-4xl text-gold-metallic-start">
          progress_activity
        </span>
      </div>
    );
  }

  if (!certificate) {
    return <Navigate to={WEBSITE_ROUTES.MY_SPACE_CERTIFICATES} replace />;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12 py-8">
      <Link
        to={WEBSITE_ROUTES.MY_SPACE_CERTIFICATES}
        className="text-sm text-secondary font-label-bold hover:underline inline-flex items-center gap-1"
      >
        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        جميع الشهادات
      </Link>

      <IntegrityCertificateCard certificate={certificate}>
        <div className="flex flex-wrap justify-center gap-4 pt-8">
          <button
            type="button"
            className="flex items-center gap-2 bg-primary text-on-primary px-8 py-3 rounded-lg font-label-bold transition-all duration-300 hover:shadow-xl hover:-translate-y-1 active:scale-95"
          >
            <span className="material-symbols-outlined">download</span>
            تحميل الشهادة (PDF)
          </button>
          <button
            type="button"
            className="flex items-center gap-2 border border-primary text-primary px-8 py-3 rounded-lg font-label-bold transition-all duration-300 hover:bg-surface-container-highest active:scale-95"
          >
            <span className="material-symbols-outlined">share</span>
            مشاركة الرابط الموثق
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-2 border border-mist-grey text-on-surface-variant px-8 py-3 rounded-lg font-label-bold transition-all duration-300 hover:bg-surface-container-lowest active:scale-95"
          >
            <span className="material-symbols-outlined">print</span>
            طباعة الشهادة
          </button>
        </div>
      </IntegrityCertificateCard>
    </div>
  );
}
