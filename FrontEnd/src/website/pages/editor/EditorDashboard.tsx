import { Link } from "react-router-dom";
import { WEBSITE_ROUTES } from "@core/constants/routes";
import RequireStaffAccess from "@website/components/editor/RequireStaffAccess";
import { listPendingSubmissions } from "@website/helpers/contentSubmissionsStore";
import { EnterItem, StaggerReveal } from "@shared/components/animations";

export default function EditorDashboard() {
  const pendingCount = listPendingSubmissions().length;

  const cards = [
    {
      title: "مراجعة الخبراء",
      description: "محتوى مُقدَّم من الصحفيين والممارسين الإعلاميين بانتظار الاعتماد.",
      icon: "rate_review",
      to: WEBSITE_ROUTES.EDITOR_EXPERT_REVIEW,
      badge: pendingCount > 0 ? `${pendingCount} قيد الانتظار` : "لا طلبات",
      accent: "gold",
    },
    {
      title: "التحقق من المحتوى",
      description: "مراجعة مقالة نشطة بأدوات الذكاء الاصطناعي.",
      icon: "verified_user",
      to: WEBSITE_ROUTES.EDITOR_SPACE,
      badge: "نشط",
      accent: "primary",
    },
    {
      title: "أرشيف التضليل",
      description: "إدارة ومراجعة حالات التضليل المسجلة.",
      icon: "auto_stories",
      to: WEBSITE_ROUTES.EDITOR_DISINFORMATION_ARCHIVE,
      badge: "أرشيف",
      accent: "teal",
    },
  ] as const;

  return (
    <RequireStaffAccess>
    <div className="max-w-container-max mx-auto w-full" dir="rtl">
      <EnterItem index={0}>
        <header className="mb-10">
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-2">
            لوحة تحكم المحرر
          </h1>
          <p className="text-on-surface-variant max-w-2xl">
            إدارة مراجعات المحتوى، التحقق التحريري، وطلبات النشر المعلقة.
          </p>
        </header>
      </EnterItem>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {cards.map((card, i) => (
          <StaggerReveal key={card.title} index={i}>
            <Link
              to={card.to}
              className="block glass-panel rounded-2xl p-6 border border-outline-variant/10 hover:shadow-lg hover:border-gold-metallic-start/30 transition-all h-full"
            >
              <span className="material-symbols-outlined text-3xl text-gold-metallic-start mb-4">
                {card.icon}
              </span>
              <h2 className="font-headline-sm text-lg text-primary mb-2">{card.title}</h2>
              <p className="text-sm text-on-surface-variant mb-4 leading-relaxed">
                {card.description}
              </p>
              <span className="text-xs font-label-bold bg-surface-container px-3 py-1 rounded-full">
                {card.badge}
              </span>
            </Link>
          </StaggerReveal>
        ))}
      </div>

      {pendingCount > 0 && (
        <div className="rounded-2xl bg-primary text-on-primary p-6 md:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="font-headline-sm text-headline-sm mb-1">
              {pendingCount} مساهمة بانتظار المراجعة
            </h3>
            <p className="text-sm text-mist-grey/90">
              تقارير وقصص وأخبار مُرسلة من مساحة إعداد المحتوى.
            </p>
          </div>
          <Link
            to={WEBSITE_ROUTES.EDITOR_EXPERT_REVIEW}
            className="gold-gradient-bg text-on-primary px-6 py-3 rounded-lg font-label-bold text-center shrink-0"
          >
            فتح قائمة المراجعة
          </Link>
        </div>
      )}
    </div>
    </RequireStaffAccess>
  );
}
