export function slugifyTitle(title: string, suffix: string): string {
  const normalized = title
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\u0600-\u06FF-]/g, "")
    .slice(0, 48);

  const base = normalized || "content";
  return `${base}-${suffix.slice(-6)}`;
}
