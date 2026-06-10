import type { IntegrityCertificate } from "@website/helpers/integrityCertificatesStore";

/** شهادات احتياطية عند غياب بيانات المساهم */
export const INTEGRITY_CERTIFICATES_DUMMY: IntegrityCertificate[] = [
  {
    id: "cert-dummy-1",
    referenceCode: "ZY-882-X98-2024",
    submissionId: "sub-dummy-1",
    title: "الأبعاد الجيوسياسية في منطقة الشرق الأوسط: تقرير استقصائي",
    authorName: "أحمد بن منصور العتيبي",
    contributorRole: "صحفي",
    integrityScore: 98,
    issuedAt: "2023-10-14T10:00:00.000Z",
    contentType: "report",
    badges: [
      { label: "توثيق المصادر", status: "confirmed" },
      { label: "خلو من الانحياز", status: "confirmed" },
      { label: "سلامة الوسائط", status: "confirmed" },
    ],
  },
];
