export default function Footer() {
  return (
    <footer className="w-full pt-16 pb-8 px-margin-mobile md:px-margin-desktop bg-primary border-t border-outline/30 mt-20 text-on-primary">
      <div className="max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h2 className="font-display-lg text-gold-metallic-start">
              زرقاء اليمامة
            </h2>
            <p className="text-on-primary/70 font-body-md max-w-sm leading-relaxed">
              منصة النزاهة الإعلامية المدعومة بالذكاء الاصطناعي، تهدف لتعزيز
              الشفافية في المشهد الإعلامي العربي من خلال تحليل دقيق ومحايد
              للمحتوى الرقمي.
            </p>
            <div className="flex gap-4 mt-2">
              <a
                className="w-10 h-10 rounded-full bg-on-primary/10 flex items-center justify-center hover:bg-secondary transition-colors"
                href="#"
              >
                <img
                  alt="X"
                  className="w-5 h-5 invert"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDP9ve_DLhRgEaaGXIb8x4G4UAy8wuPveEdHe199pw-7A-jkaK6vw0mO141-pHRY1Ei8cJEPBGqoBaOu9Tv3KerMo4bI4Hxemtf8OxUpepwJPfaeAGpjN81ab9bGhAhGh6rOuqp6PQ54TSvhSlYz18HR-1kXGws3KPUStL18VlLBGNsoENlVg33GEFCwFSCTPAcpI9SIqCRiO9kJrDQSTot8Du3lLk0b8mvn3R13Jx9FfCXYntI4bLW3Zhp6pEuzGW7fC1CEAKYQGf2"
                />
              </a>
              <a
                className="w-10 h-10 rounded-full bg-on-primary/10 flex items-center justify-center hover:bg-secondary transition-colors"
                href="#"
              >
                <img
                  alt="LinkedIn"
                  className="w-5 h-5 invert"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuARYKWLEMe9L4jpIpmFXnXVf6KhbjJ5XW6wulhYhdJPw7PT1MspI14nutmJlXwWa9fnrpCIt00fe6rx573u9TwV3UuSzC87_AFu5Gz4IQx_egd63ZpZPK5Uw3kGt305XMEPxroemN5Q-1F1ijdc5j4EpVD5oXIMPF8VRkXl5pposd817vn4NtUv7sAuWtxB0to4aLAxuqAmhSeXtkN4_IhEzxPmuiHq4mctjnVbqjQT81MwezjgIZaGhl3kkiBpa0GjdXGDizXN_u_J"
                />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="font-label-bold text-secondary uppercase tracking-wider">
              الأقسام الرئيسية
            </h4>
            <nav className="flex flex-col gap-3">
              <a
                className="text-on-primary/60 hover:text-on-primary transition-colors text-sm"
                href="#"
              >
                الرئيسية
              </a>
              <a
                className="text-on-primary/60 hover:text-on-primary transition-colors text-sm"
                href="#"
              >
                التقارير الاستقصائية
              </a>
              <a
                className="text-on-primary/60 hover:text-on-primary transition-colors text-sm"
                href="#"
              >
                قصص النزاهة
              </a>
              <a
                className="text-on-primary/60 hover:text-on-primary transition-colors text-sm"
                href="#"
              >
                المرئيات والبودكاست
              </a>
              <a
                className="text-on-primary/60 hover:text-on-primary transition-colors text-sm"
                href="#"
              >
                الأخبار الموثقة
              </a>
            </nav>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="font-label-bold text-secondary uppercase tracking-wider">
              التحقق والمعرفة
            </h4>
            <nav className="flex flex-col gap-3">
              <a
                className="text-on-primary/60 hover:text-on-primary transition-colors text-sm"
                href="#"
              >
                مركز التحقق الإعلامي
              </a>
              <a
                className="text-on-primary/60 hover:text-on-primary transition-colors text-sm"
                href="#"
              >
                موسوعة المصطلحات
              </a>
              <a
                className="text-on-primary/60 hover:text-on-primary transition-colors text-sm"
                href="#"
              >
                دليل المعرفة الإعلامية
              </a>
              <a
                className="text-on-primary/60 hover:text-on-primary transition-colors text-sm"
                href="#"
              >
                منهجية التحليل
              </a>
              <a
                className="text-on-primary/60 hover:text-on-primary transition-colors text-sm"
                href="#"
              >
                مساحتي الشخصية
              </a>
            </nav>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="font-label-bold text-secondary uppercase tracking-wider">
              النشرة الإخبارية
            </h4>
            <p className="text-on-primary/60 text-sm">
              اشترك لتصلك أحدث تقارير التحقق والتحليلات العميقة.
            </p>
            <div className="flex flex-col gap-3">
              <input
                className="bg-on-primary/5 border border-on-primary/20 rounded px-4 py-2.5 text-on-primary text-sm focus:outline-none focus:border-secondary transition-all w-full"
                placeholder="البريد الإلكتروني"
                type="email"
              />
              <button className="bg-secondary text-on-secondary px-4 py-2.5 rounded font-label-bold text-sm hover:opacity-90 transition-all gold-glow">
                اشترك الآن
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-on-primary/10 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-right">
          <p className="text-on-primary/40 text-xs">
            © {new Date().getFullYear()} زرقاء اليمامة. منصة النزاهة الإعلامية
            المدعومة بالذكاء الاصطناعي. جميع الحقوق محفوظة.
          </p>
          <div className="flex gap-6">
            <a
              className="text-on-primary/40 hover:text-on-primary text-xs transition-colors"
              href="#"
            >
              سياسة الخصوصية
            </a>
            <a
              className="text-on-primary/40 hover:text-on-primary text-xs transition-colors"
              href="#"
            >
              شروط الاستخدام
            </a>
            <a
              className="text-on-primary/40 hover:text-on-primary text-xs transition-colors"
              href="#"
            >
              اتصل بنا
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
