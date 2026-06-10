import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { WEBSITE_ROUTES } from "@core/constants/routes";
import { useAuth } from "@core/context/AuthContext";
import { useContentSetup } from "@core/context/ContentSetupContext";
import ContentTypeCard from "@website/components/contentSetup/ContentTypeCard";
import { CONTENT_TYPE_OPTIONS } from "@website/constants/contentSetup";
import { canSelectVerifiedNews } from "@website/helpers/contentSetupAccess";
import { EnterItem, StaggerReveal } from "@shared/components/animations";
import type { ContentSetupType } from "@website/types/contentSetup";

export default function ContentTypeSelection() {
  const navigate = useNavigate();
  const { activeModeLabel, isJournalist } = useAuth();
  const { draft, setContentType } = useContentSetup();
  const [selectedType, setSelectedType] = useState<ContentSetupType | null>(draft.contentType);

  useEffect(() => {
    document.title = "إعداد محتوى جديد | زرقاء اليمامة";
  }, []);

  const roleLabel = activeModeLabel;

  const typeOptions = useMemo(
    () =>
      CONTENT_TYPE_OPTIONS.map((option) => {
        if (!option.available) {
          return { option, disabled: true, reason: "هذا النوع غير متاح حالياً على المنصة." };
        }
        if (option.journalistOnly && !canSelectVerifiedNews({ isJournalist })) {
          return {
            option,
            disabled: true,
            reason: "خبر موثّق متاح للصحفي فقط. فعّل وضع «صحفي» من الإعدادات.",
          };
        }
        return { option, disabled: false, reason: undefined };
      }),
    [isJournalist],
  );

  const handleContinue = () => {
    if (!selectedType) return;
    setContentType(selectedType);
    navigate(WEBSITE_ROUTES.CONTENT_SETUP_COVER);
  };

  return (
    <div className="space-y-10 pb-8">
      <header className="glass-panel rounded-2xl border border-outline-variant/10 overflow-hidden">
        <div className="px-6 py-8 md:px-10 md:py-10 bg-gradient-to-l from-gold-metallic-start/5 to-transparent">
          <EnterItem index={0}>
            <p className="inline-flex items-center gap-2 bg-primary/5 text-primary px-4 py-1 rounded-full mb-4 border border-primary/10 font-label-bold text-xs">
              <span className="material-symbols-outlined text-[16px]">post_add</span>
              إعداد محتوى جديد — الخطوة ١ من ٥
            </p>
          </EnterItem>
          <EnterItem index={1}>
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-3">
              ما نوع المحتوى الذي تريد نشره؟
            </h1>
          </EnterItem>
          <EnterItem index={2}>
            <p className="font-body-lg text-on-surface-variant max-w-3xl leading-relaxed">
              اختر نوع المساهمة المناسب. في الخطوات التالية ستضيف صورة الغلاف ثم تكتب المحتوى
              وتحصل على تحليل ذكاء اصطناعي وفق سياسات المنصة.
            </p>
          </EnterItem>
          {roleLabel && (
            <EnterItem index={3}>
              <p className="mt-4 text-sm text-secondary font-label-bold">
                الوضع النشط: {roleLabel}
              </p>
            </EnterItem>
          )}
        </div>
      </header>

      <section>
        <div className="flex items-center gap-2 mb-6">
          <span className="material-symbols-outlined text-gold-metallic-start">category</span>
          <h2 className="font-headline-sm text-headline-sm text-primary">أنواع المحتوى</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {typeOptions.map(({ option, disabled, reason }, index) => (
            <StaggerReveal key={option.id} index={index}>
              <ContentTypeCard
                option={option}
                selected={selectedType === option.id}
                disabled={disabled}
                disabledReason={reason}
                onSelect={() => {
                  if (!disabled) setSelectedType(option.id);
                }}
              />
            </StaggerReveal>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 rounded-2xl bg-surface-container-lowest border border-outline-variant/10 p-6 md:p-8">
          <h3 className="font-headline-sm text-headline-sm text-primary mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-gold-metallic-start">route</span>
            ماذا يحدث بعد الاختيار؟
          </h3>
          <ol className="space-y-4">
            {[
              "رفع صورة غلاف للمحتوى مع فحص أولي بالذكاء الاصطناعي.",
              "كتابة النص في محرر مخصص مع إمكانية تغيير النوع في أي وقت.",
              "تحليل المحتوى ومعاينة النتائج قبل التقديم للمراجعة.",
            ].map((text, i) => (
              <li key={text} className="flex gap-3 text-body-md text-on-surface-variant">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary text-sm font-label-bold">
                  {i + 2}
                </span>
                <span className="pt-0.5">{text}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="lg:col-span-5 rounded-2xl bg-primary text-on-primary p-6 md:p-8 flex flex-col justify-between">
          <div>
            <h3 className="font-headline-sm text-headline-sm mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-gold-metallic-start">policy</span>
              تذكير بالسياسات
            </h3>
            <p className="text-sm text-mist-grey/90 leading-relaxed">
              كل محتوى يخضع لمؤشر النزاهة التحريرية. تأكد من دقة المصادر واحترام الخصوصية
              قبل المتابعة.
            </p>
          </div>
          <Link
            to={WEBSITE_ROUTES.ABOUT_PUBLISHING_POLICIES}
            className="mt-6 inline-flex items-center gap-2 text-gold-metallic-start text-sm font-label-bold hover:underline w-fit"
          >
            اقرأ سياسات النشر والتحقق
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          </Link>
        </div>
      </section>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-outline-variant/10">
        <p className="text-sm text-on-surface-variant">
          {selectedType
            ? `النوع المختار: ${
                CONTENT_TYPE_OPTIONS.find((o) => o.id === selectedType)?.label ?? ""
              }`
            : "اختر نوع المحتوى للمتابعة"}
        </p>
        <button
          type="button"
          disabled={!selectedType}
          onClick={handleContinue}
          className="px-8 py-3 rounded-lg font-label-bold text-label-bold bg-primary text-on-primary hover:bg-gold-metallic-start transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
        >
          متابعة إلى صورة الغلاف
        </button>
      </div>
    </div>
  );
}
