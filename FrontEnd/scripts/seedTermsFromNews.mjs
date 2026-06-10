/**
 * يستخرج مصطلحات إعلامية/تحقق من نصوص الأخبار الموثقة ويضيفها عبر POST /api/terms
 * التشغيل: node scripts/seedTermsFromNews.mjs
 */
const API_BASE = process.env.VITE_API_BASE_URL ?? "https://zurqa-al-yamama.onrender.com";

/** مصطلحات مستخرجة من مقالات verifiedNews.ts */
const TERMS_FROM_NEWS = [
  {
    word: "الذكاء الاصطناعي",
    meaning:
      "تقنيات تمكّن الأنظمة من محاكاة القدرات البشرية في التحليل والتوليد، وتُستخدم في إنشاء أو تعديل المحتوى الرقمي.",
    category: "تقنية",
  },
  {
    word: "التزييف العميق",
    meaning:
      "استخدام الذكاء الاصطناعي لإنشاء صور أو مقاطع فيديو أو صوت مزيفة تبدو واقعية، وغالباً ما تُستخدم لتشويه الحقائق.",
    category: "أمن سيبراني",
  },
  {
    word: "المعلومات المضللة",
    meaning:
      "نشر معلومات خاطئة دون نية ضارة غالباً، نتيجة خطأ أو عدم التحقق من المصدر قبل النشر.",
    category: "تحقق إعلامي",
  },
  {
    word: "بصمة رقمية",
    meaning:
      "علامة أو توقيع رقمي مدمج في ملفات الوسائط يثبت أصل المحتوى والتعديلات التي طرأت عليه.",
    category: "تقنية",
  },
  {
    word: "المحتوى الرقمي",
    meaning:
      "النصوص والصور والفيديوهات والبيانات المنشورة عبر الإنترنت والمنصات الرقمية.",
    category: "إعلام رقمي",
  },
  {
    word: "نزاهة الإعلام",
    meaning:
      "التزام المؤسسات الإعلامية بالدقة والشفافية ونقل الحقيقة دون تحيز أو تلاعب.",
    category: "أخلاقيات إعلامية",
  },
  {
    word: "اقتصاد الانتباه",
    meaning:
      "نظام يعتمد على جذب وقت المستخدم وتركيزه في الفضاء الرقمي، حيث تُقاس قيمة المحتوى بمدى تفاعله.",
    category: "إعلام رقمي",
  },
  {
    word: "التشفير المتقدم",
    meaning:
      "تقنيات تشفير معقدة تُستخدم لحماية البيانات وإنشاء سجلات غير قابلة للتلاعب للمحتوى الرقمي.",
    category: "أمن سيبراني",
  },
  {
    word: "تضخيم إحصائي",
    meaning:
      "تضخيم الأرقام أو النسب لإضفاء أهمية أكبر على الخبر مما يبرره الواقع أو المصدر الأصلي.",
    category: "تحقق إعلامي",
  },
  {
    word: "اقتباس خارج السياق",
    meaning:
      "نقل جزء من تصريح أو نص بعيداً عن سياقه الأصلي لإنتاج انطباع مضلل يختلف عن المعنى الحقيقي.",
    category: "تحقق إعلامي",
  },
  {
    word: "شبكات التواصل",
    meaning:
      "منصات تفاعلية تتيح للمستخدمين نشر المحتوى وتبادله، وغالباً ما تُستخدم لتداول الأخبار بسرعة.",
    category: "إعلام رقمي",
  },
  {
    word: "البنية التحتية الرقمية",
    meaning:
      "الأنظمة والشبكات والخدمات التقنية التي تدعم العمليات الرقمية للمؤسسات والخدمات العامة.",
    category: "أمن سيبراني",
  },
  {
    word: "إنترنت الأشياء",
    meaning:
      "شبكة من الأجهزة المتصلة بالإنترنت التي تجمع وتبادل البيانات، وقد تكون هدفاً للهجمات السيبرانية.",
    category: "تقنية",
  },
  {
    word: "الخدمات السحابية",
    meaning:
      "خدمات الحوسبة والتخزين المقدّمة عبر الإنترنت بدلاً من الأجهزة المحلية.",
    category: "تقنية",
  },
  {
    word: "المصادقة متعددة العوامل",
    meaning:
      "آلية أمنية تتطلب أكثر من وسيلة تحقق (مثل كلمة مرور ورمز) قبل منح الوصول.",
    category: "أمن سيبراني",
  },
  {
    word: "البيانات المفتوحة",
    meaning:
      "بيانات منشورة للعموم بصيغ قابلة لإعادة الاستخدام، تُستخدم في التحقق من الأرقام والادعاءات الرسمية.",
    category: "تحليل البيانات",
  },
  {
    word: "منهجية التحقق",
    meaning:
      "مجموعة خطوات منظمة لمقارنة الخبر بالمصادر الأصلية وتحليل الأدلة قبل إصدار حكم التوثيق.",
    category: "تحقق إعلامي",
  },
  {
    word: "الهجمات السيبرانية",
    meaning:
      "محاولات إلكترونية لاختراق الأنظمة أو تعطيل الخدمات أو سرقة البيانات.",
    category: "أمن سيبراني",
  },
  {
    word: "الحوادث السيبرانية",
    meaning:
      "أحداث أمنية رقمية مؤكدة مثل اختراق أو تسريب بيانات، تتطلب استجابة وتصحيحاً رسمياً.",
    category: "أمن سيبراني",
  },
  {
    word: "التغطية الإعلامية",
    meaning:
      "طريقة تعامل وسائل الإعلام مع حدث أو خبر، ويُقارَن بها المصدر الأصلي لكشف التحريف أو المبالغة.",
    category: "صحافة",
  },
  {
    word: "الادعاءات الإعلامية",
    meaning:
      "ادعاءات منشورة في وسائل الإعلام أو شبكات التواصل تُختبر مقابل المصدر العلمي أو الرسمي.",
    category: "تحقق إعلامي",
  },
  {
    word: "البصمة الرقمية",
    meaning:
      "مجموعة الآثار والبيانات التي يتركها المحتوى أو المستخدم في البيئة الرقمية.",
    category: "تقنية",
  },
  {
    word: "التضليل الممنهج",
    meaning:
      "نشر معلومات كاذبة عمداً لتحقيق أهداف سياسية أو اقتصادية أو اجتماعية.",
    category: "تحقق إعلامي",
  },
  {
    word: "غسيل المعلومات",
    meaning:
      "تمرير أخبار كاذبة عبر عدة منصات ومصادر حتى تبدو وكأنها حقائق من مصادر موثوقة.",
    category: "تحليل البيانات",
  },
  {
    word: "الانحياز التأكيدي",
    meaning:
      "ميل الأفراد للبحث عن معلومات تتوافق مع معتقداتهم وتجاهل ما يعارضها.",
    category: "علم النفس الإعلامي",
  },
];

function normalizeWord(word) {
  return word.trim().replace(/\s+/g, " ");
}

async function fetchExistingWords() {
  const res = await fetch(`${API_BASE}/api/terms`);
  if (!res.ok) throw new Error(`GET /api/terms failed: ${res.status}`);
  const terms = await res.json();
  return new Set(terms.map((t) => normalizeWord(t.word)));
}

async function createTerm(term) {
  const res = await fetch(`${API_BASE}/api/terms`, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ ...term, is_active: true }),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(body.message ?? JSON.stringify(body) ?? res.statusText);
  }
  return body;
}

async function main() {
  console.log(`API: ${API_BASE}`);
  const existing = await fetchExistingWords();
  console.log(`Existing terms: ${existing.size}`);

  let added = 0;
  let skipped = 0;
  let failed = 0;

  for (const term of TERMS_FROM_NEWS) {
    const word = normalizeWord(term.word);
    if (existing.has(word)) {
      console.log(`⏭  موجود: ${word}`);
      skipped++;
      continue;
    }
    try {
      const created = await createTerm({ ...term, word });
      existing.add(word);
      console.log(`✅ أُضيف: ${word} (id: ${created.id})`);
      added++;
    } catch (err) {
      console.error(`❌ فشل "${word}": ${err.message}`);
      failed++;
    }
  }

  console.log(`\nالنتيجة: ${added} أُضيف، ${skipped} موجود مسبقاً، ${failed} فشل`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
