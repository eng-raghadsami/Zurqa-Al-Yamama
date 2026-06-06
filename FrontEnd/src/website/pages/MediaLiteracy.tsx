const HERO_BG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBrLacCmWxKOvkm1De3M7t0SY8gfuz1jzFok2sRPiEObE5GOjw4DCb5nnklMA1o4CgvUgSUfPc8Qy2Zruqn41pB5KbxXcAwIUgfk54uuSUMHchrY3mXVCS-9G3UraR5Juunmdls7ma_anMhdJdLYb2H3DYpAzC6c0_2vTVa3_iDQIReHXLLJSX24YHbis9FhRZKlvrpFws-_NXWMq_dFJVZIatZX5Wzvj2ErUW2qCa0HL1fKwYyaLhgoGBePJ9wnuISz-QR9948PtNa";

const WEBINAR_SPEAKER =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAH2N9zXFC_slx-hmKuQkDlT9Zdf6lZKJ5ics5MdRxSrB9sNEY7IogIdJvWxW63vVBhXHn07rcj-87IkvJXNzMY3xAsvMoOp79BPgPrTkQTsmfmUMzN6IGhNT0fUVSaDWhcnp9zw7lW8iNNlqQxce7GXfCakGhd9MBFqBURv9z8vq7-IARjuzwh5FUDY_s8ktcbDqnpb4pxRenaGuWiIAZ9F_Z8LDTz_PCErMujkj-beY9KiqjYwD0qOrsOdpEM4LDeAWvie3IfmiHv";

const LEARNING_TRACKS = [
  {
    icon: "face_retouching_off",
    title: "كيفية كشف التزييف العميق",
    description: "تعلم التعرف على الفيديو والصور المصنوعة بالذكاء الاصطناعي.",
    units: "8 وحدات تعليمية",
  },
  {
    icon: "fact_check",
    title: "أساسيات التحقق الرقمي",
    description: "خطوات عملية للتأكد من صحة الأخبار والبيانات المتداولة.",
    units: "12 وحدة تعليمية",
  },
  {
    icon: "balance",
    title: "فهم الانحياز الإعلامي",
    description: "تحليل الخطاب الإعلامي وكشف الأجندات الخفية في الأخبار.",
    units: "5 وحدات تعليمية",
  },
  {
    icon: "security",
    title: "الاستخدام الآمن للتواصل",
    description: "حماية خصوصيتك وتجنب الوقوع ضحية للهندسة الاجتماعية.",
    units: "10 وحدات تعليمية",
  },
];

const ARTICLES = [
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB2DD4MChXTR6oczXGlcMF_66_mYP3TIvO1Y9xufKduCwKzhuAakcvvYp57Sp3EmHeXuwJMq07-lxn554Cbo60Jxh-gfXpkK3ttpR9diXn77DHcXznRuuIY8IB2XMcLZ4w8thSJ_YuvQ-czBI3BWw69lAcRG_GBfXjRuZU8kTW2nidWoYudPepcJk4w2NBNmv0MxwKnmlvgtVuB-YPHXT9vBI7wYP61YRzpAnKnXe6PpXqVYTZYk-_LF3WGHt7zkwmPm9TnUASxw0r9",
    badge: "Beginner",
    badgeClass: "bg-primary/90 text-white",
    title: "دليل المبتدئين للبحث عن الصور العكسي",
    excerpt:
      "تعرف على كيفية استخدام أدوات مثل Google Images و TinEye لتتبع مصدر الصورة الأصلي والتأكد من تاريخ نشرها...",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAfcal12LdfiOSKCKuSa-AB0xqXDGjKuBlqOE_Sy2L45q3su6GAcou2ObOfzqFNL5YKoUUzqgFk1lPGI_TT49bgZkBwhG1jzLAeZXMix5vJPF4ku2n1bQLua3BrF0tJreeetKJlS6EKBWvPWEaf2iVAOye0s3STQYgCXj1qIZ2IjGLl4DXLu5eUOkueywXPve6uRkcua7Hu0dfeeKUX52lLWLpKvYRWjD5vs45LeK7I3IG2VtJUaFfxjSgVlnGG7HrkYVnkqsIhQzwI",
    badge: "Practical Guide",
    badgeClass: "bg-secondary text-white",
    title: "كشف الحسابات الآلية (الذباب الإلكتروني)",
    excerpt:
      "طرق عملية لتحليل أنماط التغريد والنشاط المشبوه على منصة X للكشف عن حملات التضليل الممنهجة...",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCbYMrDpkcP2OVId9PhEAhsvvrFXvnLg9UmpoKqVFagMm06OVbzE_TSG2HpPuc-BBuj-Jg9dZyRY2Vyy2_aj6Ik-iXYA8WXoNauTXUrRX8kyYJhn9tZlp0hAjX9uAHu41_5Zp9pQdvq-CL8497uUXETnLsktSSAhmQd--tkcPHeUDdi4DKEG65Dk0D8z6Djy-I0xLCmpgZLA-WaJRDNTu6bt7koJKJDZlhfXM7LNf6S416nVJIrQjMnAEbjlqg66-3gqmL8b_pRCnZP",
    badge: "Advanced",
    badgeClass: "bg-error text-white",
    title: "تحليل الخوارزميات وصناديق الصدى",
    excerpt:
      "دراسة معقدة حول كيفية توجيه الخوارزميات للمحتوى الإعلامي وتأثيرها على الرأي العام وتشكيل القناعات...",
  },
];

function VerifiedBadge() {
  return (
    <div className="flex items-center gap-2 text-gold-metallic-start mb-2">
      <span className="material-symbols-outlined text-[14px]">stars</span>
      <span className="text-[12px] font-label-bold">AI Integrity Verified</span>
    </div>
  );
}

export default function MediaLiteracy() {
  return (
    <main>
      <section className="relative overflow-hidden rounded-xl mb-section-gap shadow-lg min-h-[400px] flex flex-col justify-center border-r-4 border-gold-metallic-start">
        <img
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          src={HERO_BG}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-white/55 backdrop-blur-[2px]"
        />
        <div className="relative z-10 p-12 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-gold-metallic-start/20 text-gold-metallic-start px-4 py-1 rounded-full mb-6 border border-gold-metallic-start/100">
            <span
              className="material-symbols-outlined text-[18px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified
            </span>
            <span className="font-label-bold text-[12px]">
              محو الأمية الرقمية
            </span>
          </div>
          <h1 className="font-display-lg text-display-lg-mobile text-primary mb-6 leading-tight">
            مركز المعرفة الإعلامية
          </h1>
          <p className="font-body-lg text-on-surface-variant mb-8 leading-relaxed">
            تمكين المستخدمين بالأدوات والمهارات اللازمة للتنقل في المشهد الرقمي
            المعقد. نحن نقدم الدقة والوضوح في عصر الضوضاء المعلوماتية.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              className="bg-primary text-white font-label-bold px-8 py-3 rounded-lg hover:shadow-xl transition-all"
              href="#tracks"
            >
              ابدأ التعلم الآن
            </a>
            <a
              className="border border-primary text-primary font-label-bold px-8 py-3 rounded-lg hover:bg-surface-container transition-all"
              href="#articles"
            >
              استعراض الأدلة
            </a>
          </div>
        </div>
      </section>

      <section className="mb-section-gap" id="tracks">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
          <div>
            <h2 className="font-headline-md text-primary">مسارات التعلم</h2>
            <p className="text-on-surface-variant">
              اختر تخصصك وابدأ في بناء درعك المعلوماتي
            </p>
          </div>
          <a
            className="text-gold-metallic-start font-label-bold flex items-center gap-1 hover:underline shrink-0"
            href="#tracks"
          >
            عرض جميع المسارات
            <span className="material-symbols-outlined text-sm">
              arrow_back_ios
            </span>
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-gutter">
          {LEARNING_TRACKS.map((track) => (
            <div
              key={track.title}
              className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-transparent hover:border-gold-metallic-start/30"
            >
              <div className="w-14 h-14 bg-surface-container rounded-lg flex items-center justify-center text-primary mb-6 group-hover:bg-gold-metallic-start group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[32px]">
                  {track.icon}
                </span>
              </div>
              <h3 className="font-headline-sm text-[20px] mb-3">
                {track.title}
              </h3>
              <p className="text-on-surface-variant text-sm mb-4">
                {track.description}
              </p>
              <span className="text-primary font-label-bold text-xs">
                {track.units}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-section-gap">
        <div className="bg-primary text-white rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row items-center relative">
          <div className="absolute top-0 left-0 w-32 h-32 bg-gold-metallic-start/20 blur-[60px] rounded-full pointer-events-none" />
          <div className="md:w-1/3 p-8 relative z-10">
            <img
              alt="مقدّم الورشة"
              className="w-full aspect-video md:aspect-square object-cover rounded-lg"
              src={WEBINAR_SPEAKER}
            />
          </div>
          <div className="md:w-2/3 p-8 relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 bg-error rounded-full animate-pulse" />
              <span className="font-label-bold text-xs tracking-wider">
                جلسة مباشرة قادمة
              </span>
            </div>
            <h2 className="font-headline-md mb-2">
              مستقبل الخداع الرقمي: عام 2025 وما بعده
            </h2>
            <p className="text-mist-grey mb-6 opacity-80 leading-relaxed">
              انضم إلينا في جلسة تفاعلية مع كبار محللي زرقاء اليمامة لمناقشة
              أحدث تقنيات التزييف وكيفية حماية نفسك ومؤسستك.
            </p>
            <div className="flex flex-wrap gap-6 items-center">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-gold-metallic-start">
                  calendar_today
                </span>
                <span className="text-sm">24 أكتوبر، 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-gold-metallic-start">
                  schedule
                </span>
                <span className="text-sm">08:00 مساءً بتوقيت مكة</span>
              </div>
              <button
                type="button"
                className="bg-gold-metallic-start text-primary font-label-bold px-8 py-3 rounded-lg hover:bg-gold-metallic-end transition-all mr-auto"
              >
                سجل الآن مجاناً
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-section-gap" id="articles">
        <h2 className="font-headline-md text-primary mb-8">
          مقالات وأدلة تعليمية
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {ARTICLES.map((article) => (
            <article
              key={article.title}
              className="group overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-xl transition-all"
            >
              <div className="relative overflow-hidden h-48">
                <img
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src={article.image}
                />
                <div
                  className={`absolute top-4 right-4 text-[10px] px-3 py-1 rounded-full font-label-bold uppercase ${article.badgeClass}`}
                >
                  {article.badge}
                </div>
              </div>
              <div className="p-6">
                <VerifiedBadge />
                <h3 className="font-headline-sm text-[18px] mb-2 group-hover:text-gold-metallic-start transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-on-surface-variant line-clamp-3">
                  {article.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-surface-container rounded-xl p-10 flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center text-gold-metallic-start mb-6">
          <span className="material-symbols-outlined text-[32px]">mail</span>
        </div>
        <h2 className="font-headline-md mb-2">اشترك في نشرتنا البريدية</h2>
        <p className="text-on-surface-variant mb-8 max-w-lg">
          احصل على أحدث نصائح التحقق الإعلامي وتنبيهات حملات التضليل مباشرة في
          بريدك الإلكتروني أسبوعياً.
        </p>
        <form
          className="flex flex-col sm:flex-row gap-4 w-full max-w-md"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            className="flex-1 bg-white border border-outline-variant rounded-lg px-6 py-3 focus:outline-none focus:ring-2 focus:ring-gold-metallic-start"
            placeholder="بريدك الإلكتروني"
            type="email"
          />
          <button
            type="submit"
            className="bg-primary text-white font-label-bold px-8 py-3 rounded-lg hover:shadow-lg transition-all"
          >
            اشترك الآن
          </button>
        </form>
        <p className="text-[12px] text-on-surface-variant mt-4">
          نحن نحترم خصوصيتك. يمكنك إلغاء الاشتراك في أي وقت.
        </p>
      </section>
    </main>
  );
}
