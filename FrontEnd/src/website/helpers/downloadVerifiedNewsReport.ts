import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import {
  NEWS_CATEGORY_LABELS,
  type VerifiedNewsArticle,
  type VerifiedNewsBodySection,
} from "@website/types/verifiedNews";

const REPORT_WIDTH_PX = 794;

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderBodySection(section: VerifiedNewsBodySection): string {
  if (section.type === "paragraph") {
    return `<p style="margin:0 0 16px;font-size:14px;line-height:1.85;color:#374151;text-align:right;">${escapeHtml(section.text)}</p>`;
  }

  if (section.type === "heading") {
    return `<h2 style="margin:24px 0 12px;font-size:18px;font-weight:700;color:#000;text-align:right;">${escapeHtml(section.text)}</h2>`;
  }

  return `
    <blockquote style="margin:24px 0;padding:20px 24px;border-right:4px solid #d4af37;background:#f9fafb;border-radius:8px;text-align:right;">
      <p style="margin:0 0 12px;font-size:15px;font-style:italic;line-height:1.75;color:#111827;">${escapeHtml(section.text)}</p>
      <footer style="font-size:12px;font-weight:600;color:#6b7280;">— ${escapeHtml(section.author)}</footer>
    </blockquote>
  `;
}

function buildReportElement(article: VerifiedNewsArticle): HTMLDivElement {
  const generatedAt = new Intl.DateTimeFormat("ar-SA-u-nu-latn", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date());

  const metaItems = [
    article.verifier ? `المدقق: ${article.verifier.name}` : null,
    `التاريخ: ${article.publishedAt}`,
    `التصنيف: ${NEWS_CATEGORY_LABELS[article.category]}`,
    article.trustBadge ? article.trustBadge : null,
  ].filter(Boolean);

  const root = document.createElement("div");
  root.dir = "rtl";
  root.lang = "ar";
  root.setAttribute("aria-hidden", "true");
  root.style.cssText = [
    "position:fixed",
    "left:-10000px",
    "top:0",
    `width:${REPORT_WIDTH_PX}px`,
    "padding:48px",
    "background:#ffffff",
    "font-family:'IBM Plex Sans Arabic',Arial,sans-serif",
    "color:#111827",
    "box-sizing:border-box",
  ].join(";");

  root.innerHTML = `
    <header style="margin-bottom:32px;padding-bottom:24px;border-bottom:2px solid #e5e7eb;">
      <p style="margin:0 0 8px;font-size:12px;font-weight:700;color:#d4af37;letter-spacing:0.02em;text-align:right;">
        زرقاء اليمامة · تقرير تحقق إعلامي
      </p>
      <h1 style="margin:0 0 16px;font-size:26px;font-weight:700;line-height:1.45;color:#000;text-align:right;">
        ${escapeHtml(article.title)}
      </h1>
      <div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:flex-start;">
        ${metaItems
          .map(
            (item) =>
              `<span style="display:inline-block;padding:6px 12px;border-radius:999px;background:#f3f4f6;font-size:11px;font-weight:600;color:#374151;">${escapeHtml(item!)}</span>`,
          )
          .join("")}
      </div>
    </header>

    <section style="margin-bottom:28px;padding:20px;border:1px solid #e5e7eb;border-right:4px solid #d4af37;border-radius:12px;background:#fafafa;">
      <h2 style="margin:0 0 16px;font-size:16px;font-weight:700;color:#000;text-align:right;">رؤى التحقق الذكية</h2>
      <div style="display:grid;grid-template-columns:1fr;gap:14px;">
        <div>
          <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#6b7280;text-align:right;">المصدر الأصلي</p>
          <p style="margin:0;font-size:13px;color:#111827;text-align:right;">${escapeHtml(article.verification.originalSource)}</p>
        </div>
        <div>
          <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#6b7280;text-align:right;">تحليل الذكاء الاصطناعي</p>
          <p style="margin:0;font-size:13px;color:#0d9488;text-align:right;">${escapeHtml(article.verification.aiAnalysis)}</p>
        </div>
        <div>
          <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#6b7280;text-align:right;">تأكيد بشري</p>
          <p style="margin:0;font-size:13px;color:#111827;text-align:right;">${escapeHtml(article.verification.humanReview)}</p>
        </div>
      </div>
    </section>

    <section style="margin-bottom:28px;">
      <h2 style="margin:0 0 16px;font-size:16px;font-weight:700;color:#000;text-align:right;">ملخص الخبر</h2>
      <p style="margin:0 0 20px;font-size:14px;line-height:1.85;color:#374151;text-align:right;">${escapeHtml(article.excerpt)}</p>
      ${article.body.map(renderBodySection).join("")}
    </section>

    <footer style="margin-top:32px;padding-top:16px;border-top:1px solid #e5e7eb;text-align:right;">
      <p style="margin:0 0 6px;font-size:11px;color:#6b7280;">تم إنشاء هذا التقرير آلياً بواسطة منصة زرقاء اليمامة.</p>
      <p style="margin:0;font-size:11px;color:#9ca3af;">تاريخ التصدير: ${escapeHtml(generatedAt)}</p>
    </footer>
  `;

  return root;
}

export async function downloadVerifiedNewsReport(
  article: VerifiedNewsArticle,
): Promise<void> {
  const element = buildReportElement(article);
  document.body.appendChild(element);

  try {
    await document.fonts.ready;
    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => resolve());
    });

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      width: REPORT_WIDTH_PX,
      windowWidth: REPORT_WIDTH_PX,
    });

    const pdf = new jsPDF({ orientation: "p", unit: "mm", format: "a4" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const imgData = canvas.toDataURL("image/png");

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`verified-news-${article.slug}.pdf`);
  } finally {
    document.body.removeChild(element);
  }
}
