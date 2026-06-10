import type { ContentSetupType } from "@website/types/contentSetup";

const STORAGE_KEY = "zurqa-integrity-certificates";

export type IntegrityCertificate = {
  id: string;
  referenceCode: string;
  submissionId: string;
  title: string;
  authorName: string;
  contributorRole: string;
  integrityScore: number;
  issuedAt: string;
  contentType: ContentSetupType;
  badges: { label: string; status: "confirmed" }[];
};

function readAll(): IntegrityCertificate[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as IntegrityCertificate[];
  } catch {
    return [];
  }
}

function writeAll(items: IntegrityCertificate[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function listCertificates(): IntegrityCertificate[] {
  return readAll().sort(
    (a, b) => new Date(b.issuedAt).getTime() - new Date(a.issuedAt).getTime(),
  );
}

export function getCertificate(id: string): IntegrityCertificate | undefined {
  return readAll().find((item) => item.id === id);
}

export function addCertificate(certificate: IntegrityCertificate) {
  const items = readAll().filter((item) => item.id !== certificate.id);
  writeAll([certificate, ...items]);
}

export function buildReferenceCode(submissionId: string, score: number): string {
  const year = new Date().getFullYear();
  const segment = submissionId.replace(/\D/g, "").slice(-3).padStart(3, "0");
  return `ZY-${segment}-X${Math.round(score)}-${year}`;
}
