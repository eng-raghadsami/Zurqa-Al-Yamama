import type { GlossaryTerm } from "@website/types/terminology";

/** بيانات وهمية — تُستخدم عند تعذّر الاتصال بالـ API */
export const FEATURED_TERM: GlossaryTerm & {
  image: string;
  ctaLabel: string;
} = {
  id: "osint",
  title: "الاستقصاء مفتوح المصدر (OSINT)",
  english: "Open Source Intelligence",
  category: "مفهوم الشهر",
  icon: "travel_explore",
  description:
    "منهجية تعتمد على جمع وتحليل المعلومات المتاحة للعموم (خرائط، صور أقمار صناعية، سجلات تجارية) لكشف الحقائق الخفية.",
  verificationContext:
    "تُستخدم في زرقاء اليمامة لربط الأدلة المفتوحة بمسارات التحقق الرقمي.",
  indexLetter: "ا",
  image:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCmR3QDdUDswAnBxzAydlFUJDhokXEGlvZzla9p60O5PuDkEY-jqH25KXd-6wk9DpwaCbTtnn2YjS1QQe4oJMz_GmAz9J_Y0oQolBdcXgZBHCz9Mh2FL76xf3-931lKsDiqnqjfdG0XPVmekkayJN2mYRLdsAZLAG_xnpMcduXCMmrKlgWlyTEYIZc7qzT-e8fdPRTMZYAYgWG5w3v4KI2b53Dfe3GXMgJ_kwZCDA43U1j5HIcF4nUij4-cxmjxF4DwlUrQEaJm93ZX",
  ctaLabel: "اقرأ الدليل الكامل للاستقصاء",
};

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: "deepfake",
    title: "التزييف العميق",
    english: "Deepfake",
    category: "أمن سيبراني",
    icon: "auto_awesome",
    description:
      "استخدام الذكاء الاصطناعي لإنشاء صور أو مقاطع فيديو مزيفة تبدو واقعية للغاية، غالباً ما تُستخدم لتشويه سمعة الشخصيات العامة.",
    verificationContext:
      "تستخدم زرقاء اليمامة خوارزميات تحليل ترددات الصوت والمسح البيومتري للوجه لكشف هذه الوسائط.",
    indexLetter: "ت",
  },
  {
    id: "info-laundering",
    title: "غسيل المعلومات",
    english: "Information Laundering",
    category: "تحليل البيانات",
    icon: "insights",
    description:
      "عملية تمرير أخبار كاذبة عبر عدة منصات ومصادر حتى تبدو وكأنها حقائق صادرة عن مصادر موثوقة.",
    verificationContext:
      "تتبع مسار الخبر الأصلي (Metadata tracking) للوصول إلى النقطة الصفر للادعاء.",
    indexLetter: "غ",
  },
  {
    id: "confirmation-bias",
    title: "الانحياز التأكيدي",
    english: "Confirmation Bias",
    category: "علم النفس",
    icon: "psychology",
    description:
      "ميل الأفراد للبحث عن المعلومات التي تتوافق مع معتقداتهم الحالية وتجاهل الحقائق التي تعارضها.",
    verificationContext:
      "نقدم تحليلات محايدة مبنية على الأرقام لتجاوز الحواجز النفسية في تلقي الخبر.",
    indexLetter: "ا",
  },
  {
    id: "digital-footprint",
    title: "البصمة الرقمية",
    english: "Digital Footprint",
    category: "تقنية",
    icon: "fingerprint",
    description:
      "مجموعة الآثار والبيانات التي يتركها المستخدم خلفه أثناء تفاعله مع البيئة الرقمية.",
    verificationContext:
      "تتبع المصدر الأول لتسريب وثيقة معينة من خلال تحليل مسارات النشر.",
    indexLetter: "ب",
  },
  {
    id: "misinformation",
    title: "المعلومات المضللة",
    english: "Misinformation",
    category: "تحقق إعلامي",
    icon: "report",
    description:
      "نشر معلومات خاطئة دون نية ضارة، غالباً نتيجة خطأ أو عدم التحقق من المصدر.",
    verificationContext:
      "نصنّف نوع التضليل لتحديد آلية التحقق المناسبة وسرعة الاستجابة.",
    indexLetter: "م",
  },
  {
    id: "disinformation",
    title: "التضليل الممنهج",
    english: "Disinformation",
    category: "تحقق إعلامي",
    icon: "campaign",
    description:
      "نشر معلومات كاذبة عمداً لتحقيق أهداف سياسية أو اقتصادية أو اجتماعية.",
    verificationContext:
      "نربط أنماط النشر بشبكات التأثير لكشف الحملات المنسقة.",
    indexLetter: "ت",
  },
];
