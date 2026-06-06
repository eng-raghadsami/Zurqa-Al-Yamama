import { Link } from "react-router-dom";
import { WEBSITE_ROUTES } from "@core/constants/routes";

export default function MediaLiteracyFooter() {
  return (
    <footer className="bg-white border-t border-outline-variant/30 mt-section-gap py-12">
      <div className="max-w-container-max mx-auto px-margin-desktop grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <Link
            to={WEBSITE_ROUTES.HOME}
            className="font-display-lg text-[24px] gold-gradient-text mb-6 inline-block"
          >
            زرقاء اليمامة
          </Link>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            أول منصة عربية ذكية متخصصة في كشف التضليل الإعلامي وتحقيق النزاهة
            الرقمية باستخدام تقنيات الذكاء الاصطناعي المتقدمة.
          </p>
        </div>
        <div>
          <h4 className="font-label-bold mb-6">روابط سريعة</h4>
          <ul className="flex flex-col gap-3 text-sm text-on-surface-variant">
            <li>
              <Link
                className="hover:text-gold-metallic-start transition-colors"
                to={WEBSITE_ROUTES.STORIES_HUMANITARIAN}
              >
                من نحن
              </Link>
            </li>
            <li>
              <a className="hover:text-gold-metallic-start transition-colors" href="#">
                سياسة الخصوصية
              </a>
            </li>
            <li>
              <a className="hover:text-gold-metallic-start transition-colors" href="#">
                الشروط والأحكام
              </a>
            </li>
            <li>
              <a className="hover:text-gold-metallic-start transition-colors" href="#">
                اتصل بنا
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-label-bold mb-6">التعليم</h4>
          <ul className="flex flex-col gap-3 text-sm text-on-surface-variant">
            <li>
              <Link
                className="hover:text-gold-metallic-start transition-colors"
                to={`${WEBSITE_ROUTES.MEDIA_LITERACY}#tracks`}
              >
                مسارات التعلم
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-gold-metallic-start transition-colors"
                to={WEBSITE_ROUTES.MEDIA_TERMINOLOGY}
              >
                المصطلحات الإعلامية
              </Link>
            </li>
            <li>
              <a className="hover:text-gold-metallic-start transition-colors" href="#">
                مركز المساعدة
              </a>
            </li>
            <li>
              <Link
                className="hover:text-gold-metallic-start transition-colors"
                to={WEBSITE_ROUTES.VERIFIED_NEWS}
              >
                الأخبار الموثقة
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-gold-metallic-start transition-colors"
                to={WEBSITE_ROUTES.VERIFICATION_IMAGE}
              >
                أدوات التحقق
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-label-bold mb-6">تواصل معنا</h4>
          <div className="flex gap-4">
            {["share", "link", "mail"].map((icon) => (
              <a
                key={icon}
                className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-gold-metallic-start hover:text-white transition-all"
                href="#"
              >
                <span className="material-symbols-outlined">{icon}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-container-max mx-auto px-margin-desktop border-t border-outline-variant/10 mt-12 pt-8 text-center text-[12px] text-on-surface-variant">
        جميع الحقوق محفوظة © {new Date().getFullYear()} منصة زرقاء اليمامة للتحليل
        الإعلامي
      </div>
    </footer>
  );
}
