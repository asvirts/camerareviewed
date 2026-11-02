import { mkdirSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const heroDir = path.join(root, "public/images/hero");
const ogDir = path.join(root, "public/images/og");
const illustrationDir = path.join(root, "public/images/illustrations");
mkdirSync(heroDir, { recursive: true });
mkdirSync(ogDir, { recursive: true });
mkdirSync(illustrationDir, { recursive: true });

function field(block, key) {
  const line = block.split("\n").find((entry) => entry.startsWith(`${key}:`));
  if (!line) return "";
  return line
    .slice(key.length + 1)
    .trim()
    .replace(/^["']|["']$/g, "");
}

function pagesFrom(dir) {
  return readdirSync(dir)
    .filter((name) => name.endsWith(".md"))
    .map((name) => {
      const raw = readFileSync(path.join(dir, name), "utf8");
      const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      const block = match?.[1] ?? "";
      return { id: field(block, "slug"), label: field(block, "h1") || field(block, "title") };
    });
}

const staticPages = [
  ["home", "Home security cameras"],
  ["articles", "All guides"],
  ["about", "About this site"],
  ["editorial-policy", "How we choose"],
  ["author", "Andrew Virts"],
  ["affiliate-disclosure", "Affiliate disclosure"],
  ["privacy", "Privacy policy"],
  ["contact", "Contact"],
];

const jobs = [
  ...staticPages.map(([id, label]) => ({ id, label })),
  ...pagesFrom(path.join(root, "content/articles")),
  ...pagesFrom(path.join(root, "content/categories")),
];

function escapeXml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function wrap(value, width) {
  const words = value.split(/\s+/);
  const lines = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > width && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 4);
}

function accent(id) {
  const palette = ["#8c2f12", "#1f4d3a", "#9a3412", "#3f3a34", "#7c2d12"];
  const index = [...id].reduce((sum, char) => sum + char.charCodeAt(0), 0) % palette.length;
  return palette[index];
}

function heroSvg(id) {
  const color = accent(id);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
    <rect width="1280" height="720" fill="#f3efe6"/>
    <rect x="0" y="0" width="16" height="720" fill="${color}"/>
    <rect x="140" y="250" width="360" height="250" fill="#fffdf8" stroke="#1c1915" stroke-width="6"/>
    <polygon points="140,250 320,120 500,250" fill="#fffdf8" stroke="#1c1915" stroke-width="6"/>
    <rect x="280" y="360" width="70" height="140" fill="#e7e0d4" stroke="#1c1915" stroke-width="6"/>
    <circle cx="860" cy="300" r="90" fill="none" stroke="${color}" stroke-width="14"/>
    <circle cx="860" cy="300" r="28" fill="${color}"/>
    <rect x="820" y="390" width="80" height="46" rx="8" fill="#1c1915"/>
    <rect x="700" y="500" width="150" height="90" rx="10" fill="#fffdf8" stroke="#1c1915" stroke-width="6"/>
    <rect x="724" y="524" width="100" height="12" fill="#e7e0d4"/>
    <rect x="724" y="548" width="70" height="12" fill="#e7e0d4"/>
  </svg>`;
}

function ogSvg(label) {
  const lines = wrap(label, 24);
  const text = lines
    .map(
      (line, index) =>
        `<text x="72" y="${250 + index * 74}" font-family="Noto Serif, Georgia, serif" font-size="60" fill="#1c1915">${escapeXml(line)}</text>`,
    )
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <rect width="1200" height="630" fill="#f3efe6"/>
    <rect width="18" height="630" fill="#8c2f12"/>
    <circle cx="78" cy="92" r="12" fill="#c2410c"/>
    <text x="104" y="100" font-family="Inter, sans-serif" font-size="26" letter-spacing="3" fill="#1f4d3a">CAMERAREVIEWED</text>
    ${text}
  </svg>`;
}

function logoSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
    <rect width="512" height="512" fill="#f3efe6"/>
    <circle cx="256" cy="256" r="150" fill="none" stroke="#1c1915" stroke-width="18"/>
    <circle cx="256" cy="256" r="58" fill="#c2410c"/>
  </svg>`;
}

const illustration = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360">
  <rect width="640" height="360" fill="#f7f1e6"/>
  <circle cx="230" cy="170" r="70" fill="none" stroke="#1c1915" stroke-width="8"/>
  <circle cx="230" cy="170" r="22" fill="#8c2f12"/>
  <rect x="200" y="240" width="60" height="36" fill="#1c1915"/>
  <rect x="360" y="120" width="160" height="110" rx="8" fill="#fffdf8" stroke="#1c1915" stroke-width="6"/>
  <rect x="382" y="146" width="116" height="14" fill="#e7e0d4"/>
  <rect x="382" y="174" width="80" height="14" fill="#e7e0d4"/>
</svg>`;

for (const job of jobs) {
  if (!job.id || !job.label) throw new Error(`Bad image job: ${JSON.stringify(job)}`);
  const hero = Buffer.from(heroSvg(job.id));
  await sharp(hero)
    .resize(1280, 720)
    .avif({ quality: 42 })
    .toFile(path.join(heroDir, `${job.id}-1280.avif`));
  await sharp(hero)
    .resize(640, 360)
    .avif({ quality: 40 })
    .toFile(path.join(heroDir, `${job.id}-640.avif`));
  await sharp(hero)
    .resize(1280, 720)
    .webp({ quality: 72 })
    .toFile(path.join(heroDir, `${job.id}-1280.webp`));
  await sharp(hero)
    .resize(640, 360)
    .webp({ quality: 70 })
    .toFile(path.join(heroDir, `${job.id}-640.webp`));
  await sharp(Buffer.from(ogSvg(job.label)))
    .jpeg({ quality: 82 })
    .toFile(path.join(ogDir, `${job.id}.jpg`));
}

await sharp(Buffer.from(illustration))
  .webp({ quality: 72 })
  .toFile(path.join(illustrationDir, "candidate-640.webp"));
await sharp(Buffer.from(illustration))
  .avif({ quality: 42 })
  .toFile(path.join(illustrationDir, "candidate-640.avif"));
await sharp(Buffer.from(logoSvg())).png().toFile(path.join(root, "public/images/logo.png"));
await sharp(Buffer.from(logoSvg()))
  .resize(180, 180)
  .png()
  .toFile(path.join(root, "public/apple-touch-icon.png"));

console.log(`wrote images for ${jobs.length} pages`);
