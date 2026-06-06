export default function StoriesFooter() {
  return (
    <footer className="bg-primary text-white py-12 mt-section-gap">
      <div className="max-w-container-max mx-auto px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-8">
        <span className="font-display-lg bg-gradient-to-r from-gold-metallic-start to-gold-metallic-end bg-clip-text text-transparent">
          زرقاء اليمامة
        </span>
        <div className="flex gap-12 text-body-md">
          <a className="hover:text-gold-metallic-start transition-colors" href="#">
            سياسة الخصوصية
          </a>
          <a className="hover:text-gold-metallic-start transition-colors" href="#">
            شروط الاستخدام
          </a>
          <a className="hover:text-gold-metallic-start transition-colors" href="#">
            اتصل بنا
          </a>
        </div>
        <div className="text-[14px] text-mist-grey/50">
          © {new Date().getFullYear()} زرقاء اليمامة. جميع الحقوق محفوظة للرؤية
          الثاقبة.
        </div>
      </div>
    </footer>
  );
}
