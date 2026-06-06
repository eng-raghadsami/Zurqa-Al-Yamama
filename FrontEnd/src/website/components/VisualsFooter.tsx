import { Link } from "react-router-dom";
import { WEBSITE_ROUTES } from "@core/constants/routes";

export default function VisualsFooter() {
  return (
    <footer className="bg-primary text-white pt-section-gap pb-12 mt-section-gap">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1">
            <span className="font-display-lg text-display-lg-mobile bg-gradient-to-r from-gold-metallic-start to-gold-metallic-end bg-clip-text text-transparent">
              زرقاء اليمامة
            </span>
            <p className="mt-6 text-white/60 font-body-md leading-relaxed">
              المنصة الرائدة في التحقيق والتحقق من النزاهة الإعلامية باستخدام
              تقنيات الذكاء الاصطناعي المتقدمة.
            </p>
          </div>
          <div>
            <h4 className="font-label-bold text-white mb-6 underline decoration-gold-metallic-start underline-offset-8">
              الأقسام
            </h4>
            <ul className="space-y-4 text-white/60 font-body-md">
              <li>
                <Link
                  className="hover:text-gold-metallic-start transition-colors"
                  to={WEBSITE_ROUTES.REPORTS_INVESTIGATIVE}
                >
                  التحقيقات
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-gold-metallic-start transition-colors"
                  to={WEBSITE_ROUTES.VISUALS}
                >
                  المرئيات
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-gold-metallic-start transition-colors"
                  to={WEBSITE_ROUTES.PODCASTS}
                >
                  البودكاست
                </Link>
              </li>
              <li>
                <a className="hover:text-gold-metallic-start transition-colors" href="#">
                  مراقب الحقائق
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-label-bold text-white mb-6 underline decoration-gold-metallic-start underline-offset-8">
              عن المنصة
            </h4>
            <ul className="space-y-4 text-white/60 font-body-md">
              <li>
                <a className="hover:text-gold-metallic-start transition-colors" href="#">
                  من نحن
                </a>
              </li>
              <li>
                <a className="hover:text-gold-metallic-start transition-colors" href="#">
                  فريق العمل
                </a>
              </li>
              <li>
                <a className="hover:text-gold-metallic-start transition-colors" href="#">
                  سياسة الخصوصية
                </a>
              </li>
              <li>
                <a className="hover:text-gold-metallic-start transition-colors" href="#">
                  تواصل معنا
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-label-bold text-white mb-6 underline decoration-gold-metallic-start underline-offset-8">
              النشرة الإخبارية
            </h4>
            <p className="text-xs text-white/60 mb-4">
              اشترك لتصلك آخر التحقيقات والتقارير الحصرية.
            </p>
            <div className="flex gap-2">
              <input
                className="bg-white/5 border border-white/20 rounded px-4 py-2 w-full text-sm focus:outline-none focus:border-gold-metallic-start"
                placeholder="البريد الإلكتروني"
                type="email"
              />
              <button
                type="button"
                className="px-4 py-2 gold-gradient-bg text-primary rounded font-label-bold text-xs shrink-0"
              >
                اشتراك
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} زرقاء اليمامة. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-6">
            <a className="text-white/40 hover:text-white transition-colors" href="#">
              <span className="material-symbols-outlined text-lg">language</span>
            </a>
            <a className="text-white/40 hover:text-white transition-colors" href="#">
              <span className="material-symbols-outlined text-lg">public</span>
            </a>
            <a className="text-white/40 hover:text-white transition-colors" href="#">
              <span className="material-symbols-outlined text-lg">share</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
