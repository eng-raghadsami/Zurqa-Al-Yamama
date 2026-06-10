/** بيانات وهمية للقصص الإنسانية */
import type { ArticleBodySection } from "@website/components/TermHighlightedArticleBody";

export type HumanitarianStory = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  publishedAt: string;
  relativeTime?: string;
  integrityScore: number;
  heroImage: string;
  heroAlt: string;
  author: string;
  originalSource: string;
  aiAnalysis: string;
  humanReview: string;
  body: ArticleBodySection[];
  relatedSlugs: string[];
  apiContentId?: number | null;
  publishedRecordId?: number | null;
};

export const FEATURED_STORY_SLUG = "light-in-darkness-school";

export const HUMANITARIAN_STORIES: HumanitarianStory[] = [
  {
    id: "1",
    slug: "bridges-of-hope-elderly",
    title: "جسور الأمل: مبادرة شبابية لدعم كبار السن",
    excerpt:
      "تعرف على قصة المتطوعين الذين كرسوا وقتهم لكسر عزلة المسنين في المناطق النائية وتوفير الرعاية النفسية اللازمة لهم.",
    tag: "إنساني",
    publishedAt: "١٢ مايو ٢٠٢٤",
    relativeTime: "منذ 3 ساعات",
    integrityScore: 94,
    heroImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDgYEQSXOWQqrBt2zXcg8R78pCNP55uOqAOYTuaNSpz53XdjwnYFaDCIxLnZyeSewOTXoQGv5fO8A7kCk_6q2RgiA2LGv61DJ4X5J1viY-e6HJm7abIf208hko3haQ2CkGareB9U8h4WS1MNBCtFaNaBBzFiDR34pz2oqZBB2AZR3LmAhGF_dL5uX94nROTDgE4uGFpVfS5Sy4Mh9H9W7k9fUQiYJgqQjPKAi1lML7FYUsf5Bpzl9YRIwaY-zq2_onBO-cxeeuYM0Wh",
    heroAlt: "أيدي متعددة تزرع شتلة في التربة",
    author: "نورة القحطاني",
    originalSource: "تقرير ميداني — فريق زرقاء اليمامة",
    aiAnalysis: "سرد متسق مع شهادات مسجلة ومقارنة أرقام",
    humanReview: "مراجعة محرر قصص إنسانية",
    body: [
      {
        type: "paragraph",
        text: "في قرى بعيدة عن مراكز المدن، يعيش كبار السن غالباً في عزلة اجتماعية متزايدة — ليس بسبب نقص المادة فقط، بل لأن المحتوى الرقمي السلبي حولهم يعمّق الوصم ويقلل فرص التواصل. هذه القصة الإنسانية توثّق مبادرة شبابية رفضت أن تبقى الشائعات أعلى صوتاً من أصوات الرحمة، واعتمدت منهجية التحقق قبل نشر أي شهادة: مقابلات مسجلة، صور ببيانات وصفية واضحة، ومطابقة الأرقام مع تقارير الجمعيات المحلية.",
      },
      {
        type: "heading",
        text: "بداية المبادرة: من فكرة إلى أثر",
      },
      {
        type: "paragraph",
        text: "بدأت «جسور الأمل» بمجموعة من المتطوعين الذين لاحظوا أن كثيراً من المنشورات على شبكات التواصل عن كبار السن تحمل معلومات مضللة — صور قديمة تُعاد تدويرها، أو ادعاءات بلا مصدر أول. قرر الفريق توثيق العمل الميداني بشفافية: كل زيارة تُسجّل، وكل شهادة تُراجع مع مشرف محلي. هكذا تحولت القصة من مجرد «محتوى إنساني» إلى نموذج لنزاهة الإعلام المجتمعي.",
      },
      {
        type: "quote",
        text: "حين نروي قصة إنسان، نحمل أمانة — والأمانة تبدأ بالتحقق من المعلومات قبل أن تصل إلى القارئ.",
        author: "نورة القحطاني، كاتبة القصة",
      },
      {
        type: "paragraph",
        text: "خلال ستة أشهر، نظّم المتطوعون أكثر من 320 زيارة منزلية، وقدّموا جلسات دعم نفسي بالتعاون مع مختصين. واستخدم الفريق الذكاء الاصطناعي لتحليل أنماط التفاعل — لا لاستبدال التعاطف، بل لمعرفة أي قصص تحتاج متابعة إعلامية دون تضخيم إحصائي. النتيجة: مجتمع أكثر وعياً، ومسنون أقل عزلة.",
      },
      {
        type: "heading",
        text: "دروس للصحافة الإنسانية",
      },
      {
        type: "paragraph",
        text: "تؤكد هذه التجربة أن القصص الإنسانية لا تُستثنى من تدقيق الحقائق. كل ادعاء عن «الآلاف المتضررين» أو «النجاحات المعجزة» يجب أن يُختبر. زرقاء اليمامة تعتمد في قصصها على التحقق من المعلومات، وحماية خصوصية المستفيدين، ورفض أي تأطير إعلامي يبالغ في المعاناة أو يُسقط من قيمة التجربة.",
      },
    ],
    relatedSlugs: ["digital-education-villages", "light-in-darkness-school"],
  },
  {
    id: "2",
    slug: "digital-education-villages",
    title: "ثورة التعليم الرقمي في القرى المحرومة",
    excerpt:
      "كيف ساهمت التكنولوجيا في تقليص الفجوة المعرفية بين المدن والأرياف وتوفير فرص تعليمية متكافئة للجميع.",
    tag: "اجتماعي",
    publishedAt: "١٠ مايو ٢٠٢٤",
    relativeTime: "منذ يوم واحد",
    integrityScore: 89,
    heroImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD2Y6jKNN3n3z4roOpo4cE3shd0IwdioMmlChHq5BrYvkROd5AMVxvT-qjb90fch3GWbo6Z9ptmfYMTfxUVC-PUSbKmUaLDKoovGXu8EPQuP9ww8XNUwbgOF_KnLvmrCVVretSvfGrD1bJjUma2XGCxUJ0f2PxoS-nZj83YydN2s31wE4KPGxENguQx-4RfkTscdPm8O-jWTvbHPVDvI0wFDm3iwCx01hEhBR0Fu-W_GmJpmhYnvDJy6ya-rrxPD1RZne4uks9Y4aNB",
    heroAlt: "طلاب في فصل دراسي رقمي",
    author: "سارة العتيبي",
    originalSource: "وزارة التعليم — بيانات مفتوحة + تقرير ميداني",
    aiAnalysis: "أرقام التغطية متسقة مع البيانات الرسمية",
    humanReview: "تدقيق محلل تعليم",
    body: [
      {
        type: "paragraph",
        text: "عندما انتشرت على شبكات التواصل ادعاءات عن «إغلاق المدارس» في قرى نائية، تحرك فريق زرقاء اليمامة للتحقق. تبين أن جزءاً من الادعاءات الإعلامية مبني على اقتباس خارج السياق لبيان قديم. في المقابل، وثّق التقرير مبادرة حقيقية: تجهيز 45 مدرسة باتصال رقمي وأجهزة لوحية، مع تدريب المعلمين على المعرفة الإعلامية — أي القدرة على التمييز بين المعلومات المضللة والمحتوى الموثق.",
      },
      {
        type: "heading",
        text: "البنية التحتية الرقمية في التعليم",
      },
      {
        type: "paragraph",
        text: "اعتمد المشروع على الخدمات السحابية لتخزين المناهج، وشبكات محمية للطلاب. وواجه الفريق تحديات أمن سيبراني — محاولات تصيد تستهدف حسابات المعلمين — فعُدّلت سياسات المصادقة متعددة العوامل. هذه التفاصيل التقنية نادراً ما تظهر في التغطية الإنسانية، لكنها أساسية لاستدامة المشروع.",
      },
      {
        type: "quote",
        text: "التعليم الرقمي ليس رفاهية — بل حق. لكن روايته تتطلب نزاهة لا تبالغ ولا تُسقط من قيمة الإنجاز.",
        author: "سارة العتيبي",
      },
      {
        type: "paragraph",
        text: "بعد 18 شهراً، ارتفع معدل حضور الطلاب في المناطق المستهدفة بنسبة موثقة — لا كما ادّعت بعض الحسابات على شبكات التواصل (تضخيم إحصائي واضح). القصة تذكّرنا: حتى الروايات الإيجابية تستحق التحقق من المعلومات.",
      },
    ],
    relatedSlugs: ["bridges-of-hope-elderly", "green-footprint-women"],
  },
  {
    id: "3",
    slug: "light-in-darkness-school",
    title: "نور في العتمة: كيف أعاد المجتمع بناء مدرسته من الركام",
    excerpt:
      "في قلب قرية منسية، اجتمع الأهالي لإعادة بناء مدرستهم بعد أن تضررت بفعل الصراع، مع التحقق من كل ادعاء قبل نشر القصة.",
    tag: "إنساني",
    publishedAt: "٨ مايو ٢٠٢٤",
    integrityScore: 97,
    heroImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA39hY2wakji6A_mbuWF2uhyOcIsrz1ENSqxunnwv1kqIqPU2GV4QixYsSK2RsbHtsrQXrCYqvPF9wO7P1d3rEXzkB83HZEjy4L5mHRo7K2y36yHX50jP76oQLS86Q3uf4_VkBz5nUKHlSvE2qe40-9t9t2rfNI6h1NHsXpDlYid-7c9Xwm1a9S0s9TMFWHaZ5HAvRR7IyFDyBwU3tefwoiR5NsdCeSxQe_65m7YUN3oIOJozPhaHTpgGaEsWG9y9SQyUdg_IJRzyxM",
    heroAlt: "مجتمع يعيد بناء مدرسة",
    author: "د. ليلى الحربي",
    originalSource: "شهادات موثقة + صور أقمار صناعية",
    aiAnalysis: "صور قبل/بعد متطابقة مع بيانات الأقمار الصناعية",
    humanReview: "مراجعة محرر ولجنة أخلاقيات",
    body: [
      {
        type: "paragraph",
        text: "بعد أن تضررت المدرسة الوحيدة في القرية، انتشرت على شبكات التواصل مقاطع تحمل ادعاءات متناقضة — بعضها تحدث عن «دمار كامل»، وبعضها عن «إهمال حكومي» بلا دليل. طبّقت زرقاء اليمامة منهجية التحقق الكاملة: صور أقمار صناعية، مقابلات مع 12 شاهداً، ومراجعة تصاريح البناء.",
      },
      {
        type: "heading",
        text: "المجتمع بطل القصة",
      },
      {
        type: "paragraph",
        text: "الحقيقة: الأهالي — بقيادة نساء وشباب — أعادوا بناء الفصول بمواد محلية while awaiting الدعم الرسمي. لا معجزة، ولا تمويل أجنبي خفي كما زعمت حملات تضليل ممنهج. بل تضامن، وتخطيط، ومحاسبة شفافة نُشرت على بوابة البيانات المفتوحة المحلية.",
      },
      {
        type: "quote",
        text: "القصة ليست عن أبطال من العدم — بل عن جيران رفضوا أن يسرق التضليل الممنهج روايتهم.",
        author: "د. ليلى الحربي",
      },
      {
        type: "paragraph",
        text: "اليوم، 180 طالباً يلتحقون بالمدرسة المعاد بناؤها. وتُستخدم القصة في ورش المعرفة الإعلامية كمثال على كيف يُروى الصمود بنزاهة — مع تمييز مصطلحات مثل التحقق من المعلومات، المصدر الأول، وغسيل المعلومات التي حاولت اختطاف إنجازهم.",
      },
    ],
    relatedSlugs: ["bridges-of-hope-elderly", "digital-education-villages"],
  },
  {
    id: "4",
    slug: "green-footprint-women",
    title: "بصمة خضراء: امرأة تقود التغيير البيئي",
    excerpt:
      "رحلة كفاح بدأت بفكرة بسيطة لإعادة التدوير وتحولت إلى مشروع قومي يخدم البيئة والمجتمع المحلي.",
    tag: "نجاح",
    publishedAt: "٥ مايو ٢٠٢٤",
    relativeTime: "منذ يومين",
    integrityScore: 97,
    heroImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDWNLEXovI27SgWrDZhbG5m7EmVV2jPAQY6lJ6ve1uCP1nAGNS5VRn3jFNzpdPiMkS5awZL5gpV2RBbJD6Vr84A5Wg69tMmRxj0axeXaIljwWp_3v36mKez1pUzu0hYbBzLkk1fNHvC4Yove1CDOOAGtj_mFfn9R_XPpoIz1_lBa7UGTgQXXqlsr-qs8qDcJ6KKA0hDAgN9wjmNZC2Zl5iw4XP0cv0-u21YS1NxKu6op2TcfMuhlzuEGUhSW8MfihVoHoiaAXkYyrK1",
    heroAlt: "امرأة تطل على مشروع طاقة متجددة",
    author: "مريم الحسن",
    originalSource: "تقرير بيئي + محاضر اجتماعات منشورة",
    aiAnalysis: "أرقام الأثر مطابقة للبيانات المفتوحة",
    humanReview: "مراجعة محلل بيئي",
    body: [
      {
        type: "paragraph",
        text: "حين انتشر منشور ي ادّعى أن مشروع «بصمة خضراء» ممول من «أجندة خارجية»، تحرك فريق تدقيق الحقائق. تحليل البصمة الرقمية للحسابات التي أطلقت الحملة كشف نمطاً منسقاً — غسيل معلومات كلاسيكي. في المقابل، وثائق المشروع متاحة للعموم: تمويل محلي، شراكات بلدية، ومؤشرات تدوير قابلة للقياس.",
      },
      {
        type: "heading",
        text: "من فكرة إلى حركة",
      },
      {
        type: "paragraph",
        text: "بدأت المؤسسة بورشة صغيرة عن فرز النفايات. اليوم، 12 حياً يكررون النموذج. ساهم الذكاء الاصطناعي في رسم معدلات المشاركة — لا ليحل محل الحكم البشري، بل لاكتشاف تضخيم إحصائي في منشورات ت claim «ملايين المستفيدين» بينما الرقم الموثق 8400 أسرة.",
      },
      {
        type: "quote",
        text: "البيئة قضية كبيرة بما يكفي دون الحاجة لأرقام مزيفة. النزاهة جزء من الاستدامة أيضاً.",
        author: "مريم الحسن",
      },
      {
        type: "paragraph",
        text: "القصة توضّح كيف يجب أن يمر حتى المحتوى الملهم بمرحلة التحقق من المعلومات — حتى لا يُضعف التضليل الممنهج صناع التغيير الحقيقيين.",
      },
    ],
    relatedSlugs: ["bridges-of-hope-elderly", "digital-education-villages"],
  },
];

export function getHumanitarianStoryBySlug(
  slug: string | undefined,
): HumanitarianStory | undefined {
  return HUMANITARIAN_STORIES.find((s) => s.slug === slug);
}

export function getRelatedStories(story: HumanitarianStory): HumanitarianStory[] {
  return story.relatedSlugs
    .map((s) => HUMANITARIAN_STORIES.find((item) => item.slug === s))
    .filter((s): s is HumanitarianStory => Boolean(s));
}
