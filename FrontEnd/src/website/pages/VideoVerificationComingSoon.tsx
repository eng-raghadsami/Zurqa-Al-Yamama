import { Link } from "react-router-dom";
import { WEBSITE_ROUTES } from "@core/constants/routes";
import { EnterItem } from "@shared/components/animations";

export default function VideoVerificationComingSoon() {
  return (
    <div className="verification-page-bg dot-pattern min-h-[calc(100dvh-8rem)] px-4 pb-20 pt-8 md:px-margin-desktop">
      <div className="mx-auto max-w-2xl">
        <EnterItem index={0}>
          <div className="overflow-hidden rounded-xl border border-mist-grey/50 bg-white shadow-[0_30px_60px_-12px_rgba(0,0,0,0.04)]">
            <section className="p-10 text-center md:p-16">
              <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gold-metallic-start/10">
                <span className="material-symbols-outlined text-5xl text-gold-metallic-start">
                  videocam
                </span>
              </div>
              <span className="mb-4 inline-block rounded-full bg-secondary-container/30 px-4 py-1 text-xs font-label-bold text-primary">
                قريباً
              </span>
              <h1 className="mb-4 font-headline-md text-headline-md text-primary">
                التحقق من الفيديوهات
              </h1>
              <p className="mx-auto mb-8 max-w-md text-body-lg leading-relaxed text-on-surface-variant">
                نعمل على تجهيز أدوات تحليل الفيديو والتزييف العميق. يمكنك حالياً استخدام{" "}
                <strong className="text-primary">التحقق من الصور</strong> عبر الذكاء الاصطناعي.
              </p>
              <div className="flex flex-col justify-center gap-3 sm:flex-row-reverse">
                <Link
                  to={WEBSITE_ROUTES.VERIFICATION_IMAGE}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3 font-label-bold text-white transition-opacity hover:opacity-90"
                >
                  <span className="material-symbols-outlined text-[20px]">image</span>
                  تحقق من الصور
                </Link>
                <Link
                  to={WEBSITE_ROUTES.HOME}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary px-8 py-3 font-label-bold text-primary transition-colors hover:bg-mist-grey/20"
                >
                  العودة للرئيسية
                </Link>
              </div>
            </section>
          </div>
        </EnterItem>
      </div>
    </div>
  );
}
