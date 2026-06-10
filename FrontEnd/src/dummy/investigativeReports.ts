/** بيانات وهمية للتقارير الاستقصائية */
import type { ArticleBodySection } from "@website/components/TermHighlightedArticleBody";

export type InvestigativeReport = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  author: string;
  integrityScore: number;
  heroImage: string;
  heroAlt: string;
  originalSource: string;
  aiAnalysis: string;
  humanReview: string;
  body: ArticleBodySection[];
  relatedSlugs: string[];
  apiContentId?: number | null;
  publishedRecordId?: number | null;
};

export const INVESTIGATIVE_REPORTS: InvestigativeReport[] = [
  {
    id: "1",
    slug: "shadow-networks-disinformation",
    title: "شبكات الظل: تتبع تمويل حملات التضليل العابرة للحدود",
    excerpt:
      "تحقيق يكشف عن شبكة معقدة من الشركات الوهمية التي تمول منصات إخبارية زائفة للتأثير على أسواق الطاقة العالمية باستخدام تقنيات التزييف العميق.",
    category: "اقتصادية",
    publishedAt: "١٤ أكتوبر ٢٠٢٣",
    author: "د. أحمد سلامة",
    integrityScore: 94,
    heroImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBAAySVimBx1RqLRqsjYu56qWmEzu0zWnwcz2yljmo2WEYbsZq_OiRBMrm3LJKyZvVElu4qitOqXNhBpJujn8kgCXE7FI3l5pl-PES57qR7d9rsjqUQs8Riv9ysPIKverCCIrFYFC6TU1y0VH-IRX4qj_lr3pkxthVp6ETfmKqhFkGeP7_N0Wk2daMdddMGiKMcJcyX3w2XnNc7AgPvSOJRN0r5V5bFvbJBDMXYnLA7iFE4EGB4x5ryNII4ouCAiGhtgg3dRVy8hWDz",
    heroAlt: "غرفة عمليات سيبرانية مع شاشات متعددة",
    originalSource: "تقرير مشترك — وحدة الاستقصاء مفتوح المصدر",
    aiAnalysis: "أنماط نشر متطابقة مع حملات تضليل ممنهج سابقة",
    humanReview: "مراجعة فريق تحقق من 4 محللين",
    body: [
      {
        type: "paragraph",
        text: "على مدى ثمانية أشهر، تتبعت زرقاء اليمامة مسارات تمويل عشرات المنصات الإخبارية التي نشرت معلومات مضللة حول أسواق الطاقة. اعتمد التحقق على الاستقصاء مفتوح المصدر، وتحليل البصمة الرقمية للناشرين، ومقارنة المحتوى مع مصادر رسمية في أكثر من اثنتي عشرة دولة. وظهر أن جزءاً كبيراً من الادعاءات الإعلامية يمر عبر شبكات التواصل قبل أن يُعاد تدويره كأخبار متداولة في مواقع تبدو محلية.",
      },
      {
        type: "heading",
        text: "كيف تعمل شبكات غسيل المعلومات؟",
      },
      {
        type: "paragraph",
        text: "تبدأ العملية غالباً بادعاءات إعلامية مبالغ فيها تُنشر على حسابات مجهولة، ثم تُعاد صياغتها عبر عدة قنوات حتى تبدو وكأنها تقارير مستقلة. في هذا التحقق، رصدنا استخدام التزييف العميق في مقاطع فيديو قصيرة تُرفق بعناوين مثيرة لجذب الانتباه الرقمي. كما لاحظنا اقتباساً خارج السياق لبيانات اقتصادية رسمية، ما أدى إلى تضخيم إحصائي لنسب التغير في أسعار النفط.",
      },
      {
        type: "quote",
        text: "حين تتكرر الشائعة عبر مصادر متعددة، لا يعني ذلك أنها صحيحة — بل قد تعني أن حملة تضليل ممنهج تعمل بكفاءة.",
        author: "د. أحمد سلامة، رئيس فريق التحقق",
      },
      {
        type: "paragraph",
        text: "أظهر التحليل أن 68% من المنشورات الأكثر تفاعلاً خلال فترة الأزمة احتوت على معلومات مضللة أو ادعاءات بلا مصدر أول. واستخدم فريقنا منهجية التحقق المعتمدة في المنصة: التحقق من المعلومات عبر البيانات المفتوحة، ثم تدقيق الحقائق بشرياً، ثم مطابقة النتائج مع سجلات الشركات في السجلات التجارية العامة.",
      },
      {
        type: "heading",
        text: "دور الذكاء الاصطناعي في كشف التلاعب",
      },
      {
        type: "paragraph",
        text: "ساهم الذكاء الاصطناعي في رصد تشابهات لغوية بين آلاف العناوين، وكشف أنماط نشر آلية مرتبطة ببوتات على شبكات التواصل. كما ساعد في تحليل البيانات الوصفية للملفات المنشورة لتحديد ما إذا كان المحتوى مولّداً أو معدّلاً رقمياً. ومع ذلك، أكد التقرير أن القرار النهائي يظل بشرياً — فالانحياز التأكيدي وسوء فهم السياق يظلان من أكبر تحديات القارئ حتى مع أفضل الأدوات.",
      },
      {
        type: "paragraph",
        text: "يختتم التقرير بتوصيات للمؤسسات الإعلامية: التحقق من المصدر قبل إعادة النشر، والإفصاح عن مصادر التمويل، ورفض التغطية الإعلامية المبنية على لقطات بلا بصمة رقمية موثقة. وتوصي زرقاء اليمامة الجمهور بالاعتماد على الأخبار الموثقة والتقارير التي تجتاز منهجية التحقق الكاملة.",
      },
    ],
    relatedSlugs: ["algorithm-manipulation", "digital-footprints-leaks"],
  },
  {
    id: "2",
    slug: "algorithm-manipulation",
    title: "تلاعب الخوارزميات: كيف تصاغ الآراء العامة في الأزمات",
    excerpt:
      "دراسة تحليلية لبيانات ملايين الحسابات الآلية التي قامت بتوجيه الحوار العام حول أزمة المناخ الأخيرة.",
    category: "استقصائية",
    publishedAt: "٠٢ نوفمبر ٢٠٢٣",
    author: "ليلى المنصور",
    integrityScore: 89,
    heroImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDzEXoPPBDq_C0fNY3LvfKwi6ceZrAedD0Alg-FfWVdlxX0lqnQ1PLqHFA9d3bfR6Gb8uCzRuNNhxWODDqOncfD5x4Fv5VJB43SbgFG48VmpaTZiImFerUia9-ZPdnkhyCqmShcsMtzrtXDQrWtevdTQ3CpN5rJvfTtLpFtOdnVrrq1Vlv-kTEMhNiEqH4lnm30028nzobbHawChR1ij8EWzCIe4LLCcc-CjaFFc_jOH2GzhL_d_MUlKdjg3ibXs8iMeKWti14vGtuT",
    heroAlt: "تمثيل رقمي لشبكة أقمار صناعية حول الأرض",
    originalSource: "مركز تحليل الرأي العام — تقرير ربع سنوي",
    aiAnalysis: "نشاط غير طبيعي لحسابات آلية خلال 72 ساعة",
    humanReview: "تحليل من خبيرين في علم النفس الإعلامي",
    body: [
      {
        type: "paragraph",
        text: "خلال أزمة المناخ الأخيرة، شهدت شبكات التواصل موجة من المنشورات التي تتبع أنmاطاً متطابقة في التوقيت والصياغة. هذا التقرير الاستقصائي يوثّق كيف تُستخدم الخوارزميات والحسابات الآلية لتضخيم روايات معينة وإسكات أخرى، في سياق يشبه اقتصاد الانتباه حيث تُقاس الأهمية بالتفاعل لا بالدقة.",
      },
      {
        type: "heading",
        text: "منهجية التحقق",
      },
      {
        type: "paragraph",
        text: "جمع الفريق أكثر من 4.2 مليون منشور علني خلال 90 يوماً، ورسم خرائط انتشار المحتوى باستخدام تحليل البيانات المفتوحة. تم فصل الادعاءات الإعلامية عن البيانات العلمية الأصلية، ورُصد اقتباس خارج السياق لعدد من دراسات المناخ. كما تُتبع مسار غسيل المعلومات من حسابات مجهولة إلى مواقع تبدو كمصدر مطلع.",
      },
      {
        type: "quote",
        text: "الخوارزمية لا تكذب — لكنها تعكس ما يُغذّيها. وحين يُغذّى النظام بالتضليل الممنهج، تصبح المنصة مكبراً للشائعات.",
        author: "ليلى المنصور، محللة بيانات",
      },
      {
        type: "paragraph",
        text: "أظهر التحليل أن الحملات الأكثر فاعلية اعتمدت على مزيج من المعلومات المضللة — أي أخطاء غير مقصودة — والتضليل الممنهج — أي نشر متعمد لمحتوى كاذب. واستخدمت مقاطع فيديو قصيرة تحتوي على عناصر تزييف عميق لشخصيات عامة، ما زاد من معدل التفاعل دون رفع مستوى التحقق من المعلومات.",
      },
      {
        type: "heading",
        text: "توصيات للمواطن والإعلامي",
      },
      {
        type: "paragraph",
        text: "يوصي التقرير بالتحقق من المصدر الأول قبل إعادة النشر، واستخدام أدوات تدقيق الحقائق، وتجنب الانحياز التأكيدي عبر مقارنة أكثر من مصدر مستقل. كما يدعو إلى تفعيل سياسات شفافية على المنصات الرقمية، بما في ذلك الإفصاح عن المحتوى المولّد بالذكاء الاصطناعي عبر بصمة رقمية واضحة.",
      },
    ],
    relatedSlugs: ["shadow-networks-disinformation", "digital-footprints-leaks"],
  },
  {
    id: "3",
    slug: "digital-footprints-leaks",
    title: "بصمات رقمية: كشف هوية مسربي الوثائق الزائفة",
    excerpt:
      "تحقيق تقني يتتبع البصمة الرقمية لملفات PDF مزيفة انتشرت على نطاق واسع خلال الربع الأخير.",
    category: "استقصائية",
    publishedAt: "٢٨ ديسمبر ٢٠٢٣",
    author: "م. خالد الشمري",
    integrityScore: 91,
    heroImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAXRRximWQAtFcjuHsAgaRDIWmEMuAeyLkIzkBHe3W3uXPJRDebmuroKPBKEmQrb4LTr9T71T9jtDI3qwfwICxU1bFLiyyyJ_aoJ0R6Hb030Bp1_h7FiFbkxjaYaXOOG0MikVGsG9wj_Ibfywb8QFAKNVaCuYnDl-heoVvyo4SVkzpqZpR56Yrbke44-VVI5t4aps-O8FbXy-ZE1LlcKy_7tsyt3dd4m9mSmW_zNvP0DC27ODz5uAC-O_Ti-JtSF2tvDdOzUOp0qt7V",
    heroAlt: "شاشة تعرض خريطة تحليل روابط",
    originalSource: "وحدة الطب الشرعي الرقمي — زرقاء اليمامة",
    aiAnalysis: "بيانات وصفية متناقضة في 92% من العينات",
    humanReview: "مراجعة خبير أمن سيبراني",
    body: [
      {
        type: "paragraph",
        text: "في هذا التقرير، تتبع فريق الطب الشرعي الرقمي مسار 147 ملف PDF ادُّعي أنها وثائق رسمية مسربة. باستخدام تحليل البصمة الرقمية وتتبع البيانات الوصفية، تم كشف أن الغالبية أُنتجت ببرامج تحرير منزلية وليس أنظمة حكومية. يُعد هذا التحقق نموذجاً على كيفية دمج الاستقصاء مفتوح المصدر مع أدوات التحقق من المعلومات في بيئة يتسارع فيها نشر المحتوى الرقمي.",
      },
      {
        type: "heading",
        text: "علامات الوثائق المزيفة",
      },
      {
        type: "paragraph",
        text: "من أبرز المؤشرات: تواريخ إنشاء حديثة مقارنة بتاريخ الادعاء، وخطوط غير مستخدمة في الجهات الرسمية، وغياب التشفير المتقدم أو أي بصمة رقمية حكومية. كما رُصد تضخيم إحصائي في الأرقام المذكورة داخل الوثائق مقارنة بالبيانات المفتوحة المنشورة على بوابات رسمية.",
      },
      {
        type: "quote",
        text: "الوثيقة قد تبدو مقنعة بصرياً، لكن البيانات الوصفية لا تكذب — وهنا يبدأ التحقق الحقيقي.",
        author: "م. خالد الشمري",
      },
      {
        type: "paragraph",
        text: "عولجت العينات أيضاً بتحليل نصي عبر الذكاء الاصطناعي للكشف عن بنية لغوية غير متسقة مع أسلوب الجهة المزعومة. وفي حالات متعددة، تبين أن النصوص مولّدة جزئياً ثم أُعيدت صياغتها لتمرير أجندة إعلامية واضحة. يوصي التقرير المؤسسات الإعلامية بعدم نشر أي وثيقة بلا مصدر أول قابل للتحقق.",
      },
    ],
    relatedSlugs: ["shadow-networks-disinformation", "algorithm-manipulation"],
  },
];

export function getInvestigativeReportBySlug(
  slug: string | undefined,
): InvestigativeReport | undefined {
  return INVESTIGATIVE_REPORTS.find((r) => r.slug === slug);
}

export function getRelatedReports(report: InvestigativeReport): InvestigativeReport[] {
  return report.relatedSlugs
    .map((s) => INVESTIGATIVE_REPORTS.find((r) => r.slug === s))
    .filter((r): r is InvestigativeReport => Boolean(r));
}
