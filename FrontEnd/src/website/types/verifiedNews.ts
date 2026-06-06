import { VERIFIED_NEWS_IMAGES } from "@website/constants/verifiedNewsImages";

export type NewsCategory =
  | "politics"
  | "economy"
  | "technology"
  | "environment"
  | "health"
  | "security";

export type NewsCategoryFilter = NewsCategory | "all";

export const NEWS_CATEGORY_LABELS: Record<NewsCategory, string> = {
  politics: "سياسة",
  economy: "اقتصاد",
  technology: "تكنولوجيا",
  environment: "بيئة",
  health: "صحة",
  security: "أمن",
};

export const NEWS_FILTERS: { id: NewsCategoryFilter; label: string }[] = [
  { id: "all", label: "الكل" },
  { id: "politics", label: "سياسة" },
  { id: "economy", label: "اقتصاد" },
  { id: "technology", label: "تكنولوجيا" },
  { id: "environment", label: "بيئة" },
  { id: "health", label: "صحة" },
  { id: "security", label: "أمن" },
];

export type VerifiedNewsBodySection =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | {
      type: "quote";
      text: string;
      author: string;
    };

export type VerifiedNewsArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: NewsCategory;
  publishedAt: string;
  relativeTime?: string;
  readMinutes?: number;
  listImage: string;
  detailImage: string;
  trustScore?: number;
  trustBadge?: string;
  cardVariant: "featured" | "standard" | "compact";
  compactIcon?: string;
  sourceLabel?: string;
  verifier?: {
    name: string;
    avatar: string;
  };
  verification: {
    originalSource: string;
    aiAnalysis: string;
    humanReview: string;
  };
  body: VerifiedNewsBodySection[];
  relatedSlugs: string[];
};

export const BREAKING_NEWS_TICKER = [
  "تم التحقق من صحة التقارير الاقتصادية المتعلقة بالنمو الرقمي في الشرق الأوسط",
  "زرقاء اليمامة تؤكد نزاهة البيانات الصادرة عن قمة التكنولوجيا العالمية",
  "لا صحة للأنباء المتداولة حول انقطاع كابلات الإنترنت البحرية في البحر الأحمر",
];

const verifier = {
  name: "د. أحمد المنصور",
  avatar: VERIFIED_NEWS_IMAGES.verifierAvatar,
};

export const VERIFIED_NEWS_ARTICLES: VerifiedNewsArticle[] = [
  {
    id: "1",
    slug: "ai-transparency-standard",
    title: "إطلاق أول معيار عالمي لشفافية المحتوى المولد بواسطة الذكاء الاصطناعي",
    excerpt:
      "أعلنت كبرى شركات التكنولوجيا عن تبني «بروتوكول زرقاء» لوسم الصور والفيديوهات، مما ينهي حقبة التزييف العميق غير المكتشف.",
    category: "technology",
    publishedAt: "14 مايو 2024",
    relativeTime: "منذ ساعتين",
    readMinutes: 6,
    listImage: VERIFIED_NEWS_IMAGES.featuredList,
    detailImage: VERIFIED_NEWS_IMAGES.featuredDetail,
    trustScore: 99,
    trustBadge: "موثق بنسبة 99%",
    cardVariant: "featured",
    verifier,
    verification: {
      originalSource: "وكالة الأنباء الدولية (IAW)",
      aiAnalysis: "بنية لغوية سليمة - خالية من التزييف",
      humanReview: "تمت المراجعة من قبل 3 خبراء",
    },
    body: [
      {
        type: "paragraph",
        text: "في خطوة تاريخية تهدف إلى إعادة الثقة في المحتوى الرقمي، أعلن التحالف الدولي لنزاهة الإعلام عن إطلاق أول معيار عالمي موحد لوسم وتصنيف المحتوى الذي يتم توليده أو تعديله بواسطة أدوات الذكاء الاصطناعي. يأتي هذا الإعلان في وقت حرج حيث تتزايد التحديات المتعلقة بالتزييف العميق والمعلومات المضللة.",
      },
      {
        type: "heading",
        text: "ما هو معيار «الرؤية الواضحة»؟",
      },
      {
        type: "paragraph",
        text: "يعتمد المعيار الجديد على تقنيات التشفير المتقدمة لدمج بصمة رقمية غير مرئية داخل الملفات، سواء كانت نصوصاً أو صوراً أو مقاطع فيديو. هذه البصمة تتيح للمنصات والمستخدمين النهائيين معرفة أصل المحتوى والتعديلات التي طرأت عليه عبر سجل شفاف وغير قابل للتلاعب.",
      },
      {
        type: "quote",
        text: "إننا لا نحارب التكنولوجيا بالتكنولوجيا فحسب، بل نبني جسراً من الحقيقة في عالم أصبح فيه التمييز بين الواقع والزيف أمراً شبه مستحيل.",
        author: "ماري لويس، رئيسة لجنة الشفافية الرقمية",
      },
      {
        type: "paragraph",
        text: "وقد حظي المعيار بدعم كبرى شركات التكنولوجيا العالمية والمؤسسات الصحفية العريقة، مما يمهد الطريق لتبني واسع النطاق خلال العام المقبل. ويرى الخبراء أن هذا التوجه سيعيد تشكيل اقتصاد الانتباه الرقمي، حيث ستكون الأولوية للمحتوى الموثق والمعروف المصدر.",
      },
    ],
    relatedSlugs: ["cybersecurity-alliance", "digital-markets-stability"],
  },
  {
    id: "2",
    slug: "renewable-energy-growth",
    title: "نمو قياسي في قطاع الطاقة المتجددة بالمملكة",
    excerpt:
      "بيانات رسمية تؤكد ارتفاع القدرة المركبة للطاقة الشمسية وطاقة الرياح بنسبة غير مسبوقة خلال الربع الأول.",
    category: "economy",
    publishedAt: "14 مايو 2024",
    readMinutes: 4,
    listImage: VERIFIED_NEWS_IMAGES.renewableEnergy,
    detailImage: VERIFIED_NEWS_IMAGES.renewableEnergy,
    trustScore: 96,
    trustBadge: "مصدر موثوق",
    cardVariant: "standard",
    verifier: { name: "سارة العتيبي", avatar: VERIFIED_NEWS_IMAGES.verifierAvatar },
    verification: {
      originalSource: "وزارة الطاقة - تقرير ربع سنوي",
      aiAnalysis: "أرقام متسقة مع بيانات سابقة معتمدة",
      humanReview: "مراجعة محلل اقتصادي معتمد",
    },
    body: [
      {
        type: "paragraph",
        text: "أظهرت أحدث البيانات الرسمية نمواً قياسياً في قطاع الطاقة المتجددة بالمملكة، حيث ارتفعت القدرة المركبة للطاقة الشمسية وطاقة الرياح بنسبة تجاوزت التوقعات المعلنة في خطة التحول الأخضر.",
      },
      {
        type: "heading",
        text: "أبرز مؤشرات النمو",
      },
      {
        type: "paragraph",
        text: "سجّل الربع الأول زيادة بنسبة 18% في مشاريع الطاقة الشمسية المركّبة، مع توسع ملحوظ في محطات التخزين. وربطت الوزارة هذا النمو باستثمارات البنية التحتية وتسريع تراخيص المشاريع الإستراتيجية.",
      },
      {
        type: "paragraph",
        text: "وأكدت فرق التحقق في زرقاء اليمامة مطابقة الأرقام المنشورة مع التقارير الربعية السابقة ومع بيانات الهيئة الدولية للطاقة المتجددة، دون وجود تضخيم إحصائي أو اقتباس خارج السياق.",
      },
    ],
    relatedSlugs: ["green-middle-east-initiative", "digital-markets-stability"],
  },
  {
    id: "3",
    slug: "genetic-treatment-discovery",
    title: "اكتشاف طبي جديد لعلاج الأمراض الوراثية",
    excerpt:
      "فريق بحثي يعلن نتائج واعدة لتقنية تحرير جيني تستهدف اضطرابات نادرة بعد مراجعة بيانات سريرية منشورة.",
    category: "health",
    publishedAt: "13 مايو 2024",
    readMinutes: 5,
    listImage: VERIFIED_NEWS_IMAGES.geneticTreatment,
    detailImage: VERIFIED_NEWS_IMAGES.geneticTreatment,
    trustScore: 97,
    trustBadge: "موثق بالكامل",
    cardVariant: "standard",
    verifier: { name: "د. ليلى الحربي", avatar: VERIFIED_NEWS_IMAGES.verifierAvatar },
    verification: {
      originalSource: "مجلة Nature Medicine",
      aiAnalysis: "مصطلحات علمية دقيقة دون مبالغة إعلامية",
      humanReview: "تدقيق طبي من مختصين في علم الوراثة",
    },
    body: [
      {
        type: "paragraph",
        text: "أعلن فريق بحثي دولي عن نتائج مرحلة أولى واعدة لتقنية تحرير جيني تستهدف مجموعة من الاضطرابات الوراثية النادرة، بعد نشر الدراسة في مجلة محكّمة ومراجعة البيانات السريرية المرفقة.",
      },
      {
        type: "heading",
        text: "ما الذي تم التحقق منه؟",
      },
      {
        type: "paragraph",
        text: "ركز التحقق على فصل الادعاءات الإعلامية عن نتائج الدراسة الفعلية. تأكد أن نسب التحسن المذكورة في بعض المنشورات المنتشرة على شبكات التواصل لا تطابق ما ورد في التقرير العلمي الأصلي.",
      },
      {
        type: "quote",
        text: "الاكتشاف مهم، لكنه لا يعني «علاجاً شاملاً» كما روّجت بعض الحسابات. الدقة في نقل العلم تساوي أهمية الاكتشاف نفسه.",
        author: "د. ليلى الحربي، مدققة طبية في زرقاء اليمامة",
      },
    ],
    relatedSlugs: ["ai-transparency-standard", "renewable-energy-growth"],
  },
  {
    id: "4",
    slug: "digital-space-security",
    title: "تحليل أمني: سلامة الفضاء الرقمي",
    excerpt:
      "تقرير مفصل حول مواجهة الهجمات السيبرانية المنظمة خلال الربع الأول ومدى جاهزية البنية التحتية.",
    category: "security",
    publishedAt: "12 مايو 2024",
    readMinutes: 7,
    listImage: VERIFIED_NEWS_IMAGES.cybersecurity,
    detailImage: VERIFIED_NEWS_IMAGES.cybersecurity,
    trustScore: 92,
    trustBadge: "٩٢٪ موثوقية",
    cardVariant: "compact",
    compactIcon: "security",
    verifier: { name: "م. خالد الشمري", avatar: VERIFIED_NEWS_IMAGES.verifierAvatar },
    verification: {
      originalSource: "مركز الأمن السيبراني الوطني",
      aiAnalysis: "أنماط هجوم متطابقة مع تقارير CERT",
      humanReview: "تحليل فريق أمن معلومات مستقل",
    },
    body: [
      {
        type: "paragraph",
        text: "رصد التقرير الأمني للربع الأول ارتفاعاً في الهجمات السيبرانية الموجّهة ضد البنية التحتية الرقمية، مع تركيز واضح على محاولات استغلال ثغرات في أنظمة IoT والخدمات السحابية.",
      },
      {
        type: "heading",
        text: "التوصيات المعتمدة",
      },
      {
        type: "paragraph",
        text: "أوصى التقرير بتفعيل المصادقة متعددة العوامل على مستوى المؤسسات، وتحديث سياسات الاستجابة للحوادث، مع إجراء تدريبات محاكاة ربع سنوية. وتم التحقق من أن الأرقام المذكورة مطابقة لسجلات الحوادث المنشورة رسمياً.",
      },
    ],
    relatedSlugs: ["cybersecurity-alliance", "ai-transparency-standard"],
  },
  {
    id: "5",
    slug: "green-middle-east-initiative",
    title: "مبادرة الشرق الأوسط الأخضر",
    excerpt:
      "البيانات الرسمية تؤكد زراعة 50 مليون شجرة في المناطق الجافة ضمن خطة إعادة التخضير الإقليمية.",
    category: "environment",
    publishedAt: "11 مايو 2024",
    readMinutes: 4,
    listImage: VERIFIED_NEWS_IMAGES.greenInitiative,
    detailImage: VERIFIED_NEWS_IMAGES.greenInitiative,
    trustScore: 95,
    trustBadge: "مصدر رسمي",
    cardVariant: "compact",
    compactIcon: "eco",
    sourceLabel: "المصدر: وزارة البيئة",
    verifier: { name: "نورة القحطاني", avatar: VERIFIED_NEWS_IMAGES.verifierAvatar },
    verification: {
      originalSource: "وزارة البيئة - بيان رسمي",
      aiAnalysis: "تطابق مع تقارير الأرقام المفتوحة",
      humanReview: "مراجعة محلل بيانات بيئية",
    },
    body: [
      {
        type: "paragraph",
        text: "أكدت وزارة البيئة تحقيق مرحلة جديدة من مبادرة الشرق الأوسط الأخضر بزراعة 50 مليون شجرة في مناطق جافة وشبه جافة، ضمن خطة طويلة المدى لإعادة التخضير وتثبيت الكثبان الرملية.",
      },
      {
        type: "heading",
        text: "منهجية التحقق",
      },
      {
        type: "paragraph",
        text: "قارنت زرقاء اليمامة الأرقام المعلنة مع بيانات الأقمار الصناعية وصور «قبل/بعد» للمواقع المستهدفة، ومع سجلات التوريد والزراعة المنشورة في بوابة البيانات المفتوحة، دون العثور على تناقضات جوهرية.",
      },
    ],
    relatedSlugs: ["renewable-energy-growth", "digital-space-security"],
  },
  {
    id: "6",
    slug: "cybersecurity-alliance",
    title: "تحالف تقني لتعزيز الأمن السيبراني في الشرق الأوسط",
    excerpt:
      "مذكرة تفاهم بين جهات حكومية وشركات تقنية لإنشاء مركز استجابة إقليمي للحوادث السيبرانية.",
    category: "security",
    publishedAt: "14 مايو 2024",
    relativeTime: "قبل 3 ساعات",
    readMinutes: 5,
    listImage: VERIFIED_NEWS_IMAGES.cybersecurity,
    detailImage: VERIFIED_NEWS_IMAGES.cybersecurity,
    trustScore: 94,
    trustBadge: "موثق",
    cardVariant: "standard",
    verifier: { name: "م. خالد الشمري", avatar: VERIFIED_NEWS_IMAGES.verifierAvatar },
    verification: {
      originalSource: "بيان مشترك - هيئة الاتصالات",
      aiAnalysis: "لا وجود لادعاءات مبالغ فيها",
      humanReview: "تدقيق من محلل سياسات تقنية",
    },
    body: [
      {
        type: "paragraph",
        text: "وقّعت جهات حكومية وشركات تقنية رائدة مذكرة تفاهم لإنشاء مركز استجابة إقليمي للحوادث السيبرانية، يهدف إلى تبادل التحذيرات والاستخبارات التقنية في الوقت الفعلي.",
      },
      {
        type: "paragraph",
        text: "وثّقت زرقاء اليمامة البيان الرسمي وقارنته مع التغطية الإعلامية، ورفضت ادعاءات منشورة على شبكات التواصل تتحدث عن «تدخل أجنبي مباشر» دون أي دليل في المصدر الأول.",
      },
    ],
    relatedSlugs: ["digital-space-security", "ai-transparency-standard"],
  },
  {
    id: "7",
    slug: "digital-markets-stability",
    title: "توقعات باستقرار الأسواق الرقمية بعد المعايير الجديدة",
    excerpt:
      "محللون يربطون تراجع التقلبات في أسواق الأصول الرقمية بإعلان معايير الشفافية والامتثال الجديدة.",
    category: "economy",
    publishedAt: "14 مايو 2024",
    relativeTime: "قبل 8 ساعات",
    readMinutes: 4,
    listImage: VERIFIED_NEWS_IMAGES.digitalMarkets,
    detailImage: VERIFIED_NEWS_IMAGES.digitalMarkets,
    trustScore: 91,
    trustBadge: "موثق",
    cardVariant: "standard",
    verifier: { name: "سارة العتيبي", avatar: VERIFIED_NEWS_IMAGES.verifierAvatar },
    verification: {
      originalSource: "تقرير مؤسسة أسواق المستقبل",
      aiAnalysis: "توقعات مشروطة وليست ادعاءات قطعية",
      humanReview: "مراجعة محلل اقتصادي",
    },
    body: [
      {
        type: "paragraph",
        text: "يرى محللون أن إعلان معايير شفافية جديدة للمحتوى والامتثال الرقمي سيساهم في تهدئة تقلبات بعض أسواق الأصول الرقمية، خاصة مع تحسن ثقة المستثمرين المؤسسيين.",
      },
      {
        type: "paragraph",
        text: "وضّح تقرير التحقق أن العناوين التي تحدثت عن «استقرار فوري» مبالغ فيها؛ فالتقرير الأصلي يستخدم لغة احتمالية ويشير إلى عوامل خارجية قد تعكس الاتجاه.",
      },
    ],
    relatedSlugs: ["ai-transparency-standard", "renewable-energy-growth"],
  },
];

export function getVerifiedNewsBySlug(slug: string): VerifiedNewsArticle | undefined {
  return VERIFIED_NEWS_ARTICLES.find((article) => article.slug === slug);
}

export function getRelatedArticles(article: VerifiedNewsArticle): VerifiedNewsArticle[] {
  return article.relatedSlugs
    .map((relatedSlug) => getVerifiedNewsBySlug(relatedSlug))
    .filter((item): item is VerifiedNewsArticle => item !== undefined);
}

export function filterVerifiedNews(
  articles: VerifiedNewsArticle[],
  category: NewsCategoryFilter,
): VerifiedNewsArticle[] {
  if (category === "all") return articles;
  return articles.filter((article) => article.category === category);
}

export const INTEGRITY_DAILY_STATS = {
  score: "٩٨.٤",
  change: "+١.٢٪",
  scannedToday: "٢,٤٥٠",
};

/** ترتيب العرض في صفحة القائمة — مطابق للتصميم الأصلي (Bento) */
export const LISTING_ARTICLE_SLUGS = [
  "ai-transparency-standard",
  "renewable-energy-growth",
  "genetic-treatment-discovery",
  "digital-space-security",
  "green-middle-east-initiative",
] as const;

export function getListingArticles(): VerifiedNewsArticle[] {
  return LISTING_ARTICLE_SLUGS.map((slug) => getVerifiedNewsBySlug(slug)).filter(
    (article): article is VerifiedNewsArticle => article !== undefined,
  );
}

export function isFullBentoLayout(articles: VerifiedNewsArticle[]): boolean {
  if (articles.length < 5) return false;
  const slugs = new Set(articles.map((a) => a.slug));
  return LISTING_ARTICLE_SLUGS.every((slug) => slugs.has(slug));
}
