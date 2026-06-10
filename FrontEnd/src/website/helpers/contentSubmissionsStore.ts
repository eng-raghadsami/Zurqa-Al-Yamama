import { slugifyTitle } from "@website/helpers/slugify";
import type { ContentSubmission } from "@website/types/contentSubmission";

const STORAGE_KEY = "zurqa-content-submissions";

function normalizeSubmission(item: ContentSubmission): ContentSubmission {
  return {
    ...item,
    slug: item.slug ?? slugifyTitle(item.title || "مسودة", item.id),
    contributorName: item.contributorName ?? item.contributorRole ?? "مساهم",
    apiContentId: item.apiContentId ?? null,
    publishedRecordId: item.publishedRecordId ?? null,
    publishedAt: item.publishedAt ?? null,
  };
}

function readAll(): ContentSubmission[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return (JSON.parse(raw) as ContentSubmission[]).map(normalizeSubmission);
  } catch {
    return [];
  }
}

function writeAll(items: ContentSubmission[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function listSubmissions(): ContentSubmission[] {
  return readAll().sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime(),
  );
}

export function listPendingSubmissions(): ContentSubmission[] {
  return listSubmissions().filter((s) => s.status === "pending_review");
}

export function getSubmission(id: string): ContentSubmission | undefined {
  return readAll().find((s) => s.id === id);
}

export function addSubmission(submission: ContentSubmission) {
  const items = readAll();
  writeAll([submission, ...items]);
}

export function updateSubmission(
  id: string,
  patch: Partial<
    Pick<
      ContentSubmission,
      "status" | "integrityScore" | "publishedAt" | "apiContentId" | "publishedRecordId"
    >
  >,
) {
  const items = readAll().map((s) => (s.id === id ? { ...s, ...patch } : s));
  writeAll(items);
}
