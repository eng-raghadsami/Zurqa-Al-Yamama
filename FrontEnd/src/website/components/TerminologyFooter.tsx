import { Link } from "react-router-dom";
import { WEBSITE_ROUTES } from "@core/constants/routes";

export default function TerminologyFooter() {
  return (
    <footer className="w-full py-12 px-margin-mobile md:px-margin-desktop bg-primary border-t border-outline/30 mt-20">
      <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-4 gap-gutter">
        <div className="flex flex-col gap-4">
          <Link
            to={WEBSITE_ROUTES.HOME}
            className="font-headline-md text-headline-md text-gold-metallic-start"
          >
            زرقاء اليمامة
          </Link>
          <p className="text-on-primary/70 font-body-md text-body-md">
            © {new Date().getFullYear()} زرقاء اليمامة. منصة النزاهة الإعلامية
            المدعومة بالذكاء الاصطناعي.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="text-on-primary font-bold">عن المنصة</h4>
          <ul className="flex flex-col gap-2">
            <li>
              <Link
                className="text-on-primary/70 hover:text-on-primary transition-colors"
                to={WEBSITE_ROUTES.STORIES_HUMANITARIAN}
              >
                من نحن
              </Link>
            </li>
            <li>
              <Link
                className="text-on-primary/70 hover:text-on-primary transition-colors"
                to={WEBSITE_ROUTES.VERIFICATION_IMAGE}
              >
                منهجية التحقق
              </Link>
            </li>
            <li>
              <a
                className="text-on-primary/70 hover:text-on-primary transition-colors"
                href="#"
              >
                فريق العمل
              </a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="text-on-primary font-bold">القانونية</h4>
          <ul className="flex flex-col gap-2">
            <li>
              <a
                className="text-on-primary/70 hover:text-on-primary transition-colors"
                href="#"
              >
                سياسة الخصوصية
              </a>
            </li>
            <li>
              <a
                className="text-on-primary/70 hover:text-on-primary transition-colors"
                href="#"
              >
                شروط الاستخدام
              </a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="text-on-primary font-bold">تواصل معنا</h4>
          <div className="flex gap-4">
            {["mail", "share", "public"].map((icon) => (
              <span
                key={icon}
                className="material-symbols-outlined text-on-primary/70 cursor-pointer hover:text-gold-metallic-start transition-colors"
              >
                {icon}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
