import { useMemo, useState } from "react";
import type { GlossaryTerm } from "@website/types/terminology";
import { useAuth } from "@core/context/AuthContext";
import RevealOnScroll from "@shared/components/RevealOnScroll";
import { EnterItem, StaggerReveal } from "@shared/components/animations";
import {
  useCreateMediaTerm,
  useDeleteMediaTerm,
  useMediaTerms,
  useUpdateMediaTerm,
} from "@services";
import {
  ARABIC_ALPHABET,
  FEATURED_TERM,
  GLOSSARY_TERMS,
  filterGlossaryTerms,
} from "@website/types/terminology";

type TermCardProps = {
  term: GlossaryTerm;
  index: number;
  canManage: boolean;
  onEdit: (term: GlossaryTerm) => void;
  onDelete: (term: GlossaryTerm) => void;
};

function TermCard({ term, index, canManage, onEdit, onDelete }: TermCardProps) {
  return (
    <StaggerReveal
      index={index}
      as="article"
      className="glass-panel p-6 rounded-2xl shadow-sm border border-outline-variant/10 site-card-hover group transition-all duration-300 flex flex-col h-full relative"
    >
      {canManage && (
        <div className="absolute top-4 left-4 flex gap-1 z-10">
          <button
            type="button"
            aria-label={`تعديل ${term.title}`}
            className="p-1.5 rounded-lg bg-surface-container-lowest/90 border border-outline-variant/20 text-primary hover:bg-primary hover:text-on-primary transition-colors"
            onClick={() => onEdit(term)}
          >
            <span className="material-symbols-outlined text-[18px]">edit</span>
          </button>
          <button
            type="button"
            aria-label={`حذف ${term.title}`}
            className="p-1.5 rounded-lg bg-surface-container-lowest/90 border border-error/30 text-error hover:bg-error hover:text-white transition-colors"
            onClick={() => onDelete(term)}
          >
            <span className="material-symbols-outlined text-[18px]">delete</span>
          </button>
        </div>
      )}
      <div className="flex justify-between items-start mb-4">
        <span className="px-3 py-1 bg-secondary-container/30 text-secondary font-label-bold text-label-bold rounded-full text-xs">
          {term.category}
        </span>
        <span className="material-symbols-outlined text-gold-metallic-start opacity-0 group-hover:opacity-100 transition-opacity">
          {term.icon}
        </span>
      </div>
      <h2 className="font-headline-sm text-headline-sm mb-1">{term.title}</h2>
      {term.english && (
        <p className="text-outline font-body-md mb-4 italic text-sm">{term.english}</p>
      )}
      <p className="text-on-surface-variant font-body-md mb-6 line-clamp-3 flex-1">
        {term.description}
      </p>
      <div className="pt-4 border-t border-outline-variant/20 mt-auto">
        <h4 className="font-label-bold text-label-bold text-primary mb-2">
          سياق التحقق:
        </h4>
        <p className="text-body-md text-on-surface-variant text-sm">
          {term.verificationContext}
        </p>
      </div>
    </StaggerReveal>
  );
}

export default function MediaTerminology() {
  const [query, setQuery] = useState("");
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const [searchFocused, setSearchFocused] = useState(false);
  const [showSuggestForm, setShowSuggestForm] = useState(false);
  const [suggestWord, setSuggestWord] = useState("");
  const [suggestMeaning, setSuggestMeaning] = useState("");
  const [suggestCategory, setSuggestCategory] = useState("مصطلحات الأخبار");
  const [suggestMessage, setSuggestMessage] = useState<string | null>(null);
  const [editingTerm, setEditingTerm] = useState<GlossaryTerm | null>(null);
  const [editWord, setEditWord] = useState("");
  const [editMeaning, setEditMeaning] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [termActionMessage, setTermActionMessage] = useState<string | null>(null);

  const { canManageTerms } = useAuth();
  const { data: apiTerms, isLoading, isFetching } = useMediaTerms();
  const createTerm = useCreateMediaTerm();
  const updateTerm = useUpdateMediaTerm();
  const deleteTerm = useDeleteMediaTerm();

  const allTerms = apiTerms ?? GLOSSARY_TERMS;

  const filteredTerms = useMemo(
    () => filterGlossaryTerms(allTerms, query, activeLetter),
    [allTerms, query, activeLetter],
  );

  const showFeatured =
    !activeLetter &&
    !query.trim() &&
    filteredTerms.length === allTerms.length;

  const handleSuggestTerm = async () => {
    if (!suggestWord.trim() || !suggestMeaning.trim()) return;

    try {
      await createTerm.mutateAsync({
        word: suggestWord.trim(),
        meaning: suggestMeaning.trim(),
        category: suggestCategory,
        is_active: true,
      });
      setSuggestMessage("تم إرسال المصطلح بنجاح.");
      setSuggestWord("");
      setSuggestMeaning("");
      setShowSuggestForm(false);
    } catch {
      setSuggestMessage("تعذّر إرسال المصطلح. حاول مرة أخرى.");
    }
  };

  const parseApiTermId = (id: string): number | null => {
    const num = Number(id);
    return Number.isInteger(num) && num > 0 ? num : null;
  };

  const openEditTerm = (term: GlossaryTerm) => {
    setEditingTerm(term);
    setEditWord(term.title);
    setEditMeaning(term.description);
    setEditCategory(term.category);
    setTermActionMessage(null);
  };

  const handleUpdateTerm = async () => {
    if (!editingTerm || !editWord.trim() || !editMeaning.trim()) return;
    const apiId = parseApiTermId(editingTerm.id);
    if (!apiId) {
      setTermActionMessage("تعديل المصطلحات المحلية غير متاح — المصطلحات من الخادم فقط.");
      return;
    }
    try {
      await updateTerm.mutateAsync({
        id: apiId,
        payload: {
          word: editWord.trim(),
          meaning: editMeaning.trim(),
          category: editCategory.trim() || editingTerm.category,
        },
      });
      setTermActionMessage("تم تحديث المصطلح.");
      setEditingTerm(null);
    } catch {
      setTermActionMessage("تعذّر تحديث المصطلح.");
    }
  };

  const handleDeleteTerm = async (term: GlossaryTerm) => {
    const apiId = parseApiTermId(term.id);
    if (!apiId) {
      window.alert("حذف المصطلحات المحلية غير متاح — المصطلحات من الخادم فقط.");
      return;
    }
    if (!window.confirm(`حذف المصطلح «${term.title}»؟`)) return;
    try {
      await deleteTerm.mutateAsync(apiId);
      setTermActionMessage("تم حذف المصطلح.");
    } catch {
      setTermActionMessage("تعذّر حذف المصطلح.");
    }
  };

  return (
    <main className="space-y-10">
      {/* Hero + Search */}
      <section className="rounded-2xl glass-panel border border-outline-variant/10 overflow-hidden">
        <div className="px-6 py-10 md:px-12 md:py-14 text-center max-w-3xl mx-auto site-hero-overlay-enter">
          {(isLoading || isFetching) && (
            <p className="mb-4 text-xs font-label-bold text-gold-metallic-start">
              جاري تحميل المصطلحات من الخادم...
            </p>
          )}
          {canManageTerms && (
            <p className="mb-4 text-xs font-label-bold text-secondary">
              وضع المحرر/المدير مفعّل — يمكنك تعديل أو حذف المصطلحات
            </p>
          )}
          <EnterItem index={0}>
            <p className="inline-flex items-center gap-2 bg-gold-metallic-start/10 text-gold-metallic-start px-4 py-1 rounded-full mb-5 border border-gold-metallic-start/20 font-label-bold text-xs">
              <span className="material-symbols-outlined text-[16px]">menu_book</span>
              قاموس النزاهة الإعلامية
            </p>
          </EnterItem>
          <EnterItem index={1}>
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-4">
              مرجع المصطلحات{" "}
              <span className="gold-gradient-text site-shimmer-text">الرقمية</span>
            </h1>
          </EnterItem>
          <EnterItem index={2}>
            <p className="font-body-lg text-on-surface-variant mb-8 leading-relaxed">
              دليل منظّم لفهم آليات التضليل، أدوات التحقق، والمفاهيم الأساسية في
              الصحافة الاستقصائية الحديثة.
            </p>
          </EnterItem>
          <EnterItem index={3}>
            <div
              className={`relative transition-transform duration-200 ${
                searchFocused ? "scale-[1.01]" : ""
              }`}
            >
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none">
                search
              </span>
              <input
                className="w-full h-14 md:h-16 pr-12 pl-4 rounded-2xl border border-outline-variant/20 shadow-lg bg-surface-container-lowest focus:ring-2 focus:ring-gold-metallic-start focus:border-gold-metallic-start transition-all text-base md:text-lg font-body-md"
                placeholder="ابحث عن مصطلح (مثلاً: التزييف العميق، التضليل...)"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
            </div>
          </EnterItem>
        </div>
      </section>

      {/* Alphabet filter */}
      <RevealOnScroll direction="up">
        <section className="alphabet-scroll overflow-x-auto -mx-1 px-1">
          <div className="flex gap-2 pb-2 min-w-max md:min-w-0 md:flex-wrap md:justify-center glass-panel rounded-xl p-3 border border-outline-variant/10">
            <button
              type="button"
              className={`min-w-10 h-10 px-3 flex items-center justify-center rounded-lg font-label-bold text-sm transition-all ${
                activeLetter === null
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container-low hover:bg-secondary-container/40"
              }`}
              onClick={() => setActiveLetter(null)}
            >
              الكل
            </button>
            {ARABIC_ALPHABET.map((letter) => (
              <button
                key={letter}
                type="button"
                className={`min-w-10 h-10 flex items-center justify-center rounded-lg font-label-bold text-sm transition-all active:scale-95 ${
                  activeLetter === letter
                    ? "bg-primary text-on-primary"
                    : "bg-surface-container-low hover:bg-secondary-container/40"
                }`}
                onClick={() =>
                  setActiveLetter((prev) => (prev === letter ? null : letter))
                }
              >
                {letter}
              </button>
            ))}
          </div>
        </section>
      </RevealOnScroll>

      {/* Featured term — shown only in default browse mode */}
      {showFeatured && (
        <section aria-labelledby="featured-term-heading">
          <RevealOnScroll direction="up">
            <div className="flex items-center justify-between mb-5">
              <h2
                id="featured-term-heading"
                className="font-headline-md text-primary flex items-center gap-2 site-section-title site-section-title-visible"
              >
                <span className="w-1.5 h-6 bg-gold-metallic-start rounded-full" />
                مفهوم الشهر
              </h2>
            </div>
          </RevealOnScroll>
          <RevealOnScroll direction="up" delay={100}>
            <article className="glass-panel rounded-2xl border border-outline-variant/10 shadow-sm overflow-hidden site-card-hover group">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                <div className="lg:col-span-3 p-8 md:p-10 flex flex-col justify-center order-2 lg:order-1">
                  <span className="px-3 py-1 bg-primary text-on-primary font-label-bold text-xs rounded-full mb-4 w-fit">
                    {FEATURED_TERM.category}
                  </span>
                  <h3 className="font-headline-md text-headline-md mb-2">
                    {FEATURED_TERM.title}
                  </h3>
                  <p className="text-outline font-body-md mb-4 italic">
                    {FEATURED_TERM.english}
                  </p>
                  <p className="text-on-surface-variant font-body-lg mb-6 leading-relaxed">
                    {FEATURED_TERM.description}
                  </p>
                  <button
                    type="button"
                    className="flex items-center gap-2 text-secondary font-bold hover:gap-3 transition-all w-fit"
                  >
                    {FEATURED_TERM.ctaLabel}
                    <span className="material-symbols-outlined">west</span>
                  </button>
                </div>
                <div className="lg:col-span-2 relative min-h-[220px] lg:min-h-full order-1 lg:order-2 overflow-hidden">
                  <img
                    alt={FEATURED_TERM.title}
                    className="absolute inset-0 w-full h-full object-cover site-card-image"
                    src={FEATURED_TERM.image}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-primary/60 to-transparent" />
                </div>
              </div>
            </article>
          </RevealOnScroll>
        </section>
      )}

      {/* Glossary grid */}
      <section aria-labelledby="glossary-heading">
        <RevealOnScroll direction="up">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
            <div>
              <h2 id="glossary-heading" className="font-headline-md text-primary site-section-title site-section-title-visible">
                دليل المصطلحات
              </h2>
              <p className="text-on-surface-variant text-sm mt-1">
                {filteredTerms.length} مصطلح
                {activeLetter ? ` — يبدأ بحرف «${activeLetter}»` : ""}
                {query.trim() ? ` — نتائج «${query.trim()}»` : ""}
              </p>
            </div>
          </div>
        </RevealOnScroll>

        {termActionMessage && (
          <p className="mb-4 text-sm font-label-bold text-success-teal">{termActionMessage}</p>
        )}

        {filteredTerms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-gutter">
            {filteredTerms.map((term, i) => (
              <TermCard
                key={term.id}
                index={i}
                term={term}
                canManage={canManageTerms}
                onEdit={openEditTerm}
                onDelete={handleDeleteTerm}
              />
            ))}
          </div>
        ) : (
          <RevealOnScroll direction="up">
            <div className="glass-panel rounded-2xl p-12 text-center border border-outline-variant/10">
            <span className="material-symbols-outlined text-4xl text-outline mb-4">
              search_off
            </span>
            <p className="font-headline-sm text-headline-sm mb-2">
              لا توجد نتائج مطابقة
            </p>
            <p className="text-on-surface-variant text-sm mb-6">
              جرّب حرفاً آخر أو عدّل كلمة البحث
            </p>
            <button
              type="button"
              className="px-6 py-2 border border-primary text-primary rounded-lg font-label-bold hover:bg-surface-container transition-colors"
              onClick={() => {
                setQuery("");
                setActiveLetter(null);
              }}
            >
              إعادة ضبط الفلاتر
            </button>
            </div>
          </RevealOnScroll>
        )}
      </section>

      <RevealOnScroll direction="up">
        <section className="p-8 md:p-10 text-center glass-panel rounded-2xl border-2 border-dashed border-outline-variant/40">
          <span className="material-symbols-outlined text-4xl text-secondary mb-4">
            edit_note
          </span>
          <h3 className="font-headline-sm text-headline-sm mb-2">
            لم تجد المصطلح الذي تبحث عنه؟
          </h3>
          <p className="text-on-surface-variant mb-6 max-w-lg mx-auto">
            ساهم في إثراء المحتوى المعرفي للمنصة من خلال اقتراح مصطلحات جديدة.
          </p>
          {suggestMessage && (
            <p className="mb-4 text-sm font-label-bold text-success-teal">{suggestMessage}</p>
          )}
          {showSuggestForm ? (
            <div className="mx-auto mb-4 max-w-md space-y-3 text-right">
              <input
                className="w-full rounded-lg border border-outline-variant/30 px-4 py-2"
                placeholder="المصطلح"
                value={suggestWord}
                onChange={(e) => setSuggestWord(e.target.value)}
              />
              <textarea
                className="w-full rounded-lg border border-outline-variant/30 px-4 py-2"
                placeholder="المعنى"
                rows={3}
                value={suggestMeaning}
                onChange={(e) => setSuggestMeaning(e.target.value)}
              />
              <input
                className="w-full rounded-lg border border-outline-variant/30 px-4 py-2"
                placeholder="التصنيف"
                value={suggestCategory}
                onChange={(e) => setSuggestCategory(e.target.value)}
              />
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  type="button"
                  disabled={createTerm.isPending}
                  className="rounded-xl bg-primary px-6 py-2 font-bold text-on-primary disabled:opacity-60"
                  onClick={handleSuggestTerm}
                >
                  {createTerm.isPending ? "جاري الإرسال..." : "إرسال المصطلح"}
                </button>
                <button
                  type="button"
                  className="rounded-xl border border-primary px-6 py-2 font-bold text-primary"
                  onClick={() => setShowSuggestForm(false)}
                >
                  إلغاء
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              className="px-8 py-3 bg-primary text-on-primary rounded-xl font-bold hover:scale-105 transition-transform site-btn-shine"
              onClick={() => {
                setSuggestMessage(null);
                setShowSuggestForm(true);
              }}
            >
              اقترح مصطلحاً جديداً
            </button>
          )}
        </section>
      </RevealOnScroll>

      {editingTerm && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-primary/40 backdrop-blur-sm">
          <div
            className="w-full max-w-md rounded-2xl bg-surface-container-lowest border border-outline-variant/20 shadow-2xl p-6"
            role="dialog"
            aria-labelledby="edit-term-title"
          >
            <h3 id="edit-term-title" className="font-headline-sm text-primary mb-4">
              تعديل المصطلح
            </h3>
            <div className="space-y-3">
              <input
                className="w-full rounded-lg border border-outline-variant/30 px-4 py-2"
                value={editWord}
                onChange={(e) => setEditWord(e.target.value)}
              />
              <textarea
                className="w-full rounded-lg border border-outline-variant/30 px-4 py-2"
                rows={3}
                value={editMeaning}
                onChange={(e) => setEditMeaning(e.target.value)}
              />
              <input
                className="w-full rounded-lg border border-outline-variant/30 px-4 py-2"
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
              />
            </div>
            <div className="mt-4 flex gap-2 justify-end">
              <button
                type="button"
                className="rounded-lg border border-primary px-4 py-2 font-label-bold text-primary"
                onClick={() => setEditingTerm(null)}
              >
                إلغاء
              </button>
              <button
                type="button"
                disabled={updateTerm.isPending}
                className="rounded-lg bg-primary px-4 py-2 font-label-bold text-on-primary disabled:opacity-60"
                onClick={handleUpdateTerm}
              >
                {updateTerm.isPending ? "جاري الحفظ..." : "حفظ"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
