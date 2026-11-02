export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function escapeXml(value: string): string {
  return escapeHtml(value);
}

export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replaceAll("<", "\\u003c");
}

export function slugify(value: string): string {
  const slug = value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || "section";
}

export function uniqueSlug(value: string, used: Set<string>): string {
  const base = slugify(value);
  let slug = base;
  let n = 2;
  while (used.has(slug)) {
    slug = `${base}-${n}`;
    n += 1;
  }
  used.add(slug);
  return slug;
}

/** Visible words, close to what a reader sees after markdown punctuation is removed. */
export function countWords(value: string): number {
  const plain = value
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]+`/g, " ")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_~|[\]()-]/g, " ");
  const words = plain.split(/\s+/).filter((word) => /[A-Za-z0-9]/.test(word));
  return words.length;
}
