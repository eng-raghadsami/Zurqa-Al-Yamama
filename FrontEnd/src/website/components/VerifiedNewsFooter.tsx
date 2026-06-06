import { Link } from "react-router-dom";
import { WEBSITE_ROUTES } from "@core/constants/routes";

export default function VerifiedNewsFooter() {
  return (
    <footer className="w-full py-12 px-margin-mobile md:px-margin-desktop bg-primary text-on-primary border-t border-outline/30 mt-20">
      <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-4 gap-gutter">
        <div>
          <Link
            to={WEBSITE_ROUTES.HOME}
            className="font-headline-md text-headline-md text-gold-metallic-start block mb-4"
          >
            زرقاء اليمامة
          </Link>
          <p className="font-body-md text-body-md text-on-primary/70">
            منصة النزاهة الإعلامية المدعومة بالذكاء الاصطناعي، تهدف لتقديم
            الحقيقة في زمن الضجيج الرقمي.
          </p>
        </div>
        <div>
          <h4 className="font-label-bold text-label-bold mb-6">روابط سريعة</h4>
          <ul className="flex flex-col gap-4">
            {[
              { label: "عن المنصة", to: WEBSITE_ROUTES.STORIES_HUMANITARIAN },
              { label: "منهجية التحقق", to: WEBSITE_ROUTES.VERIFICATION_IMAGE },
              { label: "المصطلحات", to: WEBSITE_ROUTES.MEDIA_TERMINOLOGY },
              { label: "اتصل بنا", href: "#" },
            ].map((item) => (
              <li key={item.label}>
                {"to" in item && item.to ? (
                  <Link
                    className="text-on-primary/70 hover:text-on-primary transition-opacity font-body-md"
                    to={item.to}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    className="text-on-primary/70 hover:text-on-primary transition-opacity font-body-md"
                    href="#"
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-label-bold text-label-bold mb-6">قانوني</h4>
          <ul className="flex flex-col gap-4">
            {["سياسة الخصوصية", "شروط الاستخدام", "حقوق الملكية"].map(
              (label) => (
                <li key={label}>
                  <a
                    className="text-on-primary/70 hover:text-on-primary transition-opacity font-body-md"
                    href="#"
                  >
                    {label}
                  </a>
                </li>
              ),
            )}
          </ul>
        </div>
        <div>
          <h4 className="font-label-bold text-label-bold mb-6">تابعنا</h4>
          <div className="flex gap-4">
            {["share", "public", "mail"].map((icon) => (
              <a
                key={icon}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined">{icon}</span>
              </a>
            ))}
          </div>
          <p className="mt-8 text-xs text-on-primary/50">
            © {new Date().getFullYear()} زرقاء اليمامة. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}
