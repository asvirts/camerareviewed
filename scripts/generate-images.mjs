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

function schematicMeta(id) {
  switch (id) {
    case "home":
    case "security-cameras-without-subscription":
    case "no-subscription":
    case "wireless-security-camera-system-without-monthly-fee":
      return {
        fig: "FIG. 01",
        code: "CR-ARCH-LOCAL",
        subtitle: "LOCAL STORAGE TOPOLOGY // CARD · HUB · POE NVR",
        accent: "#8f2d10",
        secondary: "#1b4b38",
        variant: "local-storage",
      };
    case "outdoor-security-cameras-without-subscription":
    case "outdoor-cameras":
      return {
        fig: "FIG. 02",
        code: "CR-EXT-MOUNT",
        subtitle: "EXTERIOR EAVES MOUNT // WEATHER SEAL & INDOOR ARCHIVE",
        accent: "#1b4b38",
        secondary: "#8f2d10",
        variant: "outdoor",
      };
    case "security-cameras-without-wifi":
      return {
        fig: "FIG. 03",
        code: "CR-HARDWIRE-NVR",
        subtitle: "CLOSED-CIRCUIT TOPOLOGY // POE CAT6 · COAX · LTE CELLULAR",
        accent: "#8f2d10",
        secondary: "#1b4b38",
        variant: "offline",
      };
    case "ring-subscription":
      return {
        fig: "FIG. 04",
        code: "CR-PLAN-SPLIT",
        subtitle: "SIGNAL ROUTING // LIVE STREAM ($0) VS. CLOUD CLIP ARCHIVE",
        accent: "#9a3412",
        secondary: "#181614",
        variant: "ring-split",
      };
    case "install-ring-video-doorbell":
    case "video-doorbells":
    case "best-video-doorbell-without-monthly-fee":
      return {
        fig: "FIG. 05",
        code: "CR-LOWVOLT-16V",
        subtitle: "LOW-VOLTAGE DOORBELL CIRCUIT // 16-24VAC TRANSFORMER & CHIME",
        accent: "#1b4b38",
        secondary: "#8f2d10",
        variant: "doorbell",
      };
    case "indoor-cameras":
      return {
        fig: "FIG. 06",
        code: "CR-INT-PRIVACY",
        subtitle: "INTERIOR CAMERA ARCHITECTURE // MECHANICAL SHUTTER & MICROSD",
        accent: "#1b4b38",
        secondary: "#8f2d10",
        variant: "indoor",
      };
    case "arlo-without-subscription":
      return {
        fig: "FIG. 07",
        code: "CR-ARLO-PLAN",
        subtitle: "ARLO SPLIT // LIVE VIEW · HUB DRIVE · CLOUD HISTORY",
        accent: "#8f2d10",
        secondary: "#1b4b38",
        variant: "arlo-plan",
      };
    default:
      return {
        fig: "DESK REF",
        code: `CR-DOC-${id.slice(0, 6).toUpperCase()}`,
        subtitle: "INDEPENDENT HARDWARE RESEARCH DESK // SOURCE VERIFICATION",
        accent: "#8f2d10",
        secondary: "#1b4b38",
        variant: "desk",
      };
  }
}

function renderVariantArtwork(variant, accent, secondary) {
  if (variant === "local-storage") {
    return `
      <!-- Path 1: On-Camera Card -->
      <g transform="translate(88, 162)">
        <rect width="320" height="390" rx="6" fill="#fffdf9" stroke="#181614" stroke-width="3"/>
        <rect width="320" height="44" fill="#181614"/>
        <text x="18" y="28" font-family="ui-monospace, Menlo, monospace" font-size="15" font-weight="700" fill="#fffdf9" letter-spacing="1.5">[01] ON-CAMERA MICROSD</text>
        <!-- Camera Housing -->
        <rect x="64" y="84" width="192" height="136" rx="22" fill="#f4f0e8" stroke="#181614" stroke-width="3.5"/>
        <circle cx="160" cy="152" r="46" fill="#fffdf9" stroke="#181614" stroke-width="3.5"/>
        <circle cx="160" cy="152" r="26" fill="none" stroke="${accent}" stroke-width="3" stroke-dasharray="6 4"/>
        <circle cx="160" cy="152" r="12" fill="${accent}"/>
        <circle cx="222" cy="108" r="5" fill="#c2410c"/>
        <!-- MicroSD Slot Callout -->
        <rect x="96" y="254" width="128" height="68" rx="4" fill="#ebe5d8" stroke="#181614" stroke-width="2.5"/>
        <line x1="112" y1="254" x2="112" y2="274" stroke="${accent}" stroke-width="3"/>
        <line x1="126" y1="254" x2="126" y2="274" stroke="${accent}" stroke-width="3"/>
        <line x1="140" y1="254" x2="140" y2="274" stroke="${accent}" stroke-width="3"/>
        <line x1="154" y1="254" x2="154" y2="274" stroke="${accent}" stroke-width="3"/>
        <text x="160" y="302" text-anchor="middle" font-family="ui-monospace, Menlo, monospace" font-size="14" font-weight="700" fill="#181614">microSDXC SLOT</text>
        <text x="160" y="356" text-anchor="middle" font-family="sans-serif" font-size="15" fill="#463f38">Lowest cost · Stolen with camera</text>
      </g>

      <!-- Arrow 1 to 2 -->
      <line x1="408" y1="356" x2="478" y2="356" stroke="${accent}" stroke-width="3" stroke-dasharray="6 5"/>
      <polygon points="478,356 466,349 466,363" fill="${accent}"/>

      <!-- Path 2: In-Home Hub -->
      <g transform="translate(480, 162)">
        <rect width="320" height="390" rx="6" fill="#fffdf9" stroke="#181614" stroke-width="3"/>
        <rect width="320" height="44" fill="${secondary}"/>
        <text x="18" y="28" font-family="ui-monospace, Menlo, monospace" font-size="15" font-weight="700" fill="#fffdf9" letter-spacing="1.5">[02] IN-HOME BASE / HUB</text>
        <!-- Hub Graphic -->
        <rect x="85" y="92" width="150" height="176" rx="12" fill="#f4f0e8" stroke="#181614" stroke-width="3.5"/>
        <line x1="115" y1="92" x2="115" y2="62" stroke="#181614" stroke-width="4" stroke-linecap="round"/>
        <line x1="205" y1="92" x2="205" y2="62" stroke="#181614" stroke-width="4" stroke-linecap="round"/>
        <rect x="112" y="126" width="96" height="22" rx="3" fill="#fffdf9" stroke="#181614" stroke-width="2"/>
        <rect x="112" y="162" width="96" height="22" rx="3" fill="#fffdf9" stroke="#181614" stroke-width="2"/>
        <circle cx="160" cy="230" r="8" fill="${secondary}"/>
        <rect x="64" y="290" width="192" height="36" rx="4" fill="#e6f0ec" stroke="${secondary}" stroke-width="2"/>
        <text x="160" y="313" text-anchor="middle" font-family="ui-monospace, Menlo, monospace" font-size="13" font-weight="700" fill="${secondary}">INDOOR CLIP ARCHIVE</text>
        <text x="160" y="356" text-anchor="middle" font-family="sans-serif" font-size="15" fill="#463f38">Survives outdoor camera theft</text>
      </g>

      <!-- Arrow 2 to 3 -->
      <line x1="800" y1="356" x2="870" y2="356" stroke="${secondary}" stroke-width="3"/>
      <polygon points="870,356 858,349 858,363" fill="${secondary}"/>

      <!-- Path 3: Wired PoE NVR -->
      <g transform="translate(872, 162)">
        <rect width="320" height="390" rx="6" fill="#fffdf9" stroke="#181614" stroke-width="3"/>
        <rect width="320" height="44" fill="#181614"/>
        <text x="18" y="28" font-family="ui-monospace, Menlo, monospace" font-size="15" font-weight="700" fill="#fffdf9" letter-spacing="1.5">[03] WIRED POE NVR</text>
        <!-- NVR Chassis -->
        <rect x="40" y="96" width="240" height="96" rx="6" fill="#181614"/>
        <rect x="56" y="114" width="94" height="60" rx="3" fill="#2c2824" stroke="#f4f0e8" stroke-width="1.5"/>
        <rect x="166" y="114" width="94" height="60" rx="3" fill="#2c2824" stroke="#f4f0e8" stroke-width="1.5"/>
        <circle cx="72" cy="144" r="5" fill="#22c55e"/>
        <circle cx="182" cy="144" r="5" fill="#22c55e"/>
        <text x="108" y="149" font-family="ui-monospace, Menlo, monospace" font-size="12" fill="#fffdf9">HDD 1</text>
        <text x="218" y="149" font-family="ui-monospace, Menlo, monospace" font-size="12" fill="#fffdf9">HDD 2</text>
        <!-- PoE Ports -->
        <rect x="56" y="218" width="208" height="58" rx="4" fill="#f4f0e8" stroke="#181614" stroke-width="2.5"/>
        <text x="160" y="252" text-anchor="middle" font-family="ui-monospace, Menlo, monospace" font-size="14" font-weight="700" fill="#181614">8x 802.3af PoE PORTS</text>
        <rect x="64" y="294" width="192" height="32" rx="4" fill="#fdf5e2" stroke="${accent}" stroke-width="2"/>
        <text x="160" y="315" text-anchor="middle" font-family="ui-monospace, Menlo, monospace" font-size="13" font-weight="700" fill="${accent}">24/7 CONTINUOUS · $0/MO</text>
        <text x="160" y="356" text-anchor="middle" font-family="sans-serif" font-size="15" fill="#463f38">Power + video on one Cat6 run</text>
      </g>
    `;
  }

  if (variant === "outdoor") {
    return `
      <!-- Exterior Wall Boundary -->
      <rect x="520" y="136" width="44" height="440" fill="#dcd3c2" stroke="#181614" stroke-width="3"/>
      <line x1="520" y1="160" x2="564" y2="190" stroke="#181614" stroke-width="1.5"/>
      <line x1="520" y1="220" x2="564" y2="250" stroke="#181614" stroke-width="1.5"/>
      <line x1="520" y1="280" x2="564" y2="310" stroke="#181614" stroke-width="1.5"/>
      <line x1="520" y1="340" x2="564" y2="370" stroke="#181614" stroke-width="1.5"/>
      <line x1="520" y1="400" x2="564" y2="430" stroke="#181614" stroke-width="1.5"/>
      <line x1="520" y1="460" x2="564" y2="490" stroke="#181614" stroke-width="1.5"/>
      <text x="310" y="168" font-family="ui-monospace, Menlo, monospace" font-size="16" font-weight="700" fill="${secondary}">EXTERIOR ZONE // WEATHER &amp; TAMPER</text>
      <text x="610" y="168" font-family="ui-monospace, Menlo, monospace" font-size="16" font-weight="700" fill="${accent}">INTERIOR PERIMETER // PROTECTED STORAGE</text>

      <!-- Eaves & Bullet Camera -->
      <polygon points="120,210 520,210 520,180 160,180" fill="#181614"/>
      <rect x="440" y="230" width="80" height="48" fill="#fffdf9" stroke="#181614" stroke-width="3"/>
      <polygon points="440,254 380,254 350,224 210,224 210,308 350,308 380,274 440,274" fill="#fffdf9" stroke="#181614" stroke-width="3.5"/>
      <!-- Sunshield Hood -->
      <path d="M 192 220 L 356 220 L 340 236 L 204 236 Z" fill="${accent}"/>
      <circle cx="250" cy="268" r="24" fill="#181614"/>
      <circle cx="250" cy="268" r="10" fill="${secondary}"/>
      <!-- Drip Loop -->
      <path d="M 468 278 Q 468 356 496 356 Q 520 356 520 318 L 690 318" fill="none" stroke="${secondary}" stroke-width="5"/>
      <rect x="136" y="378" width="330" height="150" rx="6" fill="#fffdf9" stroke="#181614" stroke-width="2.5"/>
      <text x="158" y="412" font-family="ui-monospace, Menlo, monospace" font-size="15" font-weight="700" fill="#181614">OUTDOOR CHECKLIST</text>
      <text x="158" y="444" font-family="sans-serif" font-size="16" fill="#463f38">• IP65/IP66 rated housing + sun hood</text>
      <text x="158" y="474" font-family="sans-serif" font-size="16" fill="#463f38">• Cable drip loop below wall penetration</text>
      <text x="158" y="504" font-family="sans-serif" font-size="16" fill="#463f38">• Operating temp rating (battery vs wired)</text>

      <!-- Indoor NVR / Hub -->
      <rect x="690" y="246" width="460" height="282" rx="6" fill="#fffdf9" stroke="#181614" stroke-width="3"/>
      <rect x="690" y="246" width="460" height="46" fill="${accent}"/>
      <text x="714" y="275" font-family="ui-monospace, Menlo, monospace" font-size="15" font-weight="700" fill="#fffdf9">INDOOR RECORDER OR HOME HUB</text>
      <rect x="726" y="324" width="388" height="86" rx="6" fill="#f4f0e8" stroke="#181614" stroke-width="2.5"/>
      <text x="752" y="360" font-family="ui-monospace, Menlo, monospace" font-size="16" font-weight="700" fill="#181614">CLIP ARCHIVE SURVIVES TAMPERING</text>
      <text x="752" y="388" font-family="sans-serif" font-size="15" fill="#463f38">If an intruder pulls down the eaves camera, footage stays inside.</text>
      <rect x="726" y="432" width="184" height="64" rx="4" fill="#e6f0ec" stroke="${accent}" stroke-width="2"/>
      <text x="818" y="469" text-anchor="middle" font-family="ui-monospace, Menlo, monospace" font-size="14" font-weight="700" fill="${accent}">POE / LAN CAT6</text>
      <rect x="930" y="432" width="184" height="64" rx="4" fill="#fdf5e2" stroke="${secondary}" stroke-width="2"/>
      <text x="1022" y="469" text-anchor="middle" font-family="ui-monospace, Menlo, monospace" font-size="14" font-weight="700" fill="${secondary}">NO MONTHLY FEE</text>
    `;
  }

  if (variant === "offline") {
    return `
      <!-- Closed LAN Box -->
      <rect x="88" y="156" width="700" height="400" rx="6" fill="#fffdf9" stroke="#181614" stroke-width="3"/>
      <rect x="88" y="156" width="700" height="46" fill="#181614"/>
      <text x="112" y="185" font-family="ui-monospace, Menlo, monospace" font-size="15" font-weight="700" fill="#fffdf9" letter-spacing="1.2">PATH A // TRUE OFFLINE RECORDING (NO INTERNET OR WI-FI)</text>

      <rect x="122" y="238" width="176" height="126" rx="6" fill="#f4f0e8" stroke="#181614" stroke-width="2.5"/>
      <circle cx="210" cy="284" r="24" fill="#fffdf9" stroke="#181614" stroke-width="3"/>
      <circle cx="210" cy="284" r="9" fill="${accent}"/>
      <text x="210" y="342" text-anchor="middle" font-family="ui-monospace, Menlo, monospace" font-size="14" font-weight="700" fill="#181614">POE / COAX CAM</text>

      <line x1="298" y1="300" x2="366" y2="300" stroke="${secondary}" stroke-width="4"/>
      <text x="332" y="286" text-anchor="middle" font-family="ui-monospace, Menlo, monospace" font-size="12" font-weight="700" fill="${secondary}">CAT6</text>

      <rect x="366" y="238" width="186" height="126" rx="6" fill="#f4f0e8" stroke="#181614" stroke-width="2.5"/>
      <rect x="390" y="264" width="138" height="42" rx="4" fill="#181614"/>
      <circle cx="412" cy="285" r="5" fill="#22c55e"/>
      <circle cx="432" cy="285" r="5" fill="#22c55e"/>
      <text x="459" y="342" text-anchor="middle" font-family="ui-monospace, Menlo, monospace" font-size="14" font-weight="700" fill="#181614">LOCAL NVR + HDD</text>

      <line x1="552" y1="300" x2="606" y2="300" stroke="#181614" stroke-width="4"/>
      <text x="579" y="286" text-anchor="middle" font-family="ui-monospace, Menlo, monospace" font-size="12" font-weight="700" fill="#181614">HDMI</text>

      <rect x="606" y="238" width="150" height="126" rx="6" fill="#f4f0e8" stroke="#181614" stroke-width="2.5"/>
      <rect x="624" y="256" width="114" height="66" rx="3" fill="#fffdf9" stroke="#181614" stroke-width="2"/>
      <text x="681" y="346" text-anchor="middle" font-family="ui-monospace, Menlo, monospace" font-size="13" font-weight="700" fill="#181614">LOCAL MONITOR</text>

      <rect x="122" y="394" width="634" height="128" rx="6" fill="#e6f0ec" stroke="${secondary}" stroke-width="2"/>
      <text x="148" y="432" font-family="ui-monospace, Menlo, monospace" font-size="15" font-weight="700" fill="${secondary}">ZERO RECURRING COST · WORKS IN COMPLETE INTERNET OUTAGE</text>
      <text x="148" y="464" font-family="sans-serif" font-size="16" fill="#181614">Records 24/7 to internal SATA drives. Phone push alerts require a WAN link,</text>
      <text x="148" y="492" font-family="sans-serif" font-size="16" fill="#181614">but local recording and HDMI playback never touch a cloud server.</text>

      <!-- Cellular Warning Box -->
      <rect x="820" y="156" width="372" height="400" rx="6" fill="#fffdf9" stroke="${accent}" stroke-width="3"/>
      <rect x="820" y="156" width="372" height="46" fill="${accent}"/>
      <text x="844" y="185" font-family="ui-monospace, Menlo, monospace" font-size="15" font-weight="700" fill="#fffdf9" letter-spacing="1.2">PATH B // 4G LTE CELLULAR</text>
      <rect x="926" y="238" width="160" height="126" rx="10" fill="#fdf5e2" stroke="${accent}" stroke-width="3"/>
      <text x="1006" y="294" text-anchor="middle" font-family="ui-monospace, Menlo, monospace" font-size="18" font-weight="700" fill="${accent}">SIM / LTE</text>
      <text x="1006" y="324" text-anchor="middle" font-family="ui-monospace, Menlo, monospace" font-size="13" fill="#593e0c">CARRIER DATA PLAN</text>
      <text x="1006" y="416" text-anchor="middle" font-family="ui-monospace, Menlo, monospace" font-size="15" font-weight="700" fill="${accent}">NO WI-FI ≠ NO MONTHLY BILL</text>
      <text x="1006" y="452" text-anchor="middle" font-family="sans-serif" font-size="15" fill="#463f38">Cellular cameras skip home Wi-Fi</text>
      <text x="1006" y="478" text-anchor="middle" font-family="sans-serif" font-size="15" fill="#463f38">by adding a monthly LTE data plan.</text>
    `;
  }

  if (variant === "ring-split") {
    return `
      <!-- Left Doorbell Unit -->
      <g transform="translate(96, 178)">
        <rect width="260" height="356" rx="18" fill="#fffdf9" stroke="#181614" stroke-width="3.5"/>
        <rect x="34" y="34" width="192" height="146" rx="10" fill="#181614"/>
        <circle cx="130" cy="107" r="38" fill="none" stroke="#f4f0e8" stroke-width="3"/>
        <circle cx="130" cy="107" r="14" fill="${accent}"/>
        <circle cx="130" cy="248" r="36" fill="#f4f0e8" stroke="${accent}" stroke-width="4"/>
        <circle cx="130" cy="248" r="22" fill="#fffdf9" stroke="#181614" stroke-width="2"/>
        <text x="130" y="324" text-anchor="middle" font-family="ui-monospace, Menlo, monospace" font-size="15" font-weight="700" fill="#181614">RING HARDWARE</text>
      </g>

      <!-- Branch Lines -->
      <path d="M 356 280 L 456 280 L 456 238 L 524 238" fill="none" stroke="#1b4b38" stroke-width="4"/>
      <path d="M 356 420 L 456 420 L 456 462 L 524 462" fill="none" stroke="${accent}" stroke-width="4"/>

      <!-- Top Branch: No Plan -->
      <g transform="translate(524, 156)">
        <rect width="668" height="176" rx="6" fill="#fffdf9" stroke="#1b4b38" stroke-width="3"/>
        <rect width="668" height="44" fill="#1b4b38"/>
        <text x="22" y="28" font-family="ui-monospace, Menlo, monospace" font-size="15" font-weight="700" fill="#fffdf9" letter-spacing="1.2">WITHOUT SUBSCRIPTION ($0/MO) // REAL-TIME ONLY</text>
        <text x="26" y="84" font-family="sans-serif" font-size="18" font-weight="700" fill="#181614">Included out of the box per Ring documentation:</text>
        <text x="26" y="118" font-family="sans-serif" font-size="16" fill="#463f38">• Instant ring &amp; motion alerts   • Live View stream   • Two-way talk</text>
        <text x="26" y="150" font-family="ui-monospace, Menlo, monospace" font-size="14" font-weight="700" fill="${accent}">LIMITATION: MISSED EVENTS ARE NOT RECORDED OR SAVED</text>
      </g>

      <!-- Bottom Branch: Paid Plan -->
      <g transform="translate(524, 372)">
        <rect width="668" height="184" rx="6" fill="#fffdf9" stroke="${accent}" stroke-width="3"/>
        <rect width="668" height="44" fill="${accent}"/>
        <text x="22" y="28" font-family="ui-monospace, Menlo, monospace" font-size="15" font-weight="700" fill="#fffdf9" letter-spacing="1.2">PAID RING PLAN // SAVED VIDEO HISTORY &amp; ARCHIVE</text>
        <text x="26" y="84" font-family="sans-serif" font-size="18" font-weight="700" fill="#181614">Moved behind recurring monthly or annual billing:</text>
        <text x="26" y="118" font-family="sans-serif" font-size="16" fill="#463f38">• Cloud video recording (up to 180 days)   • Clip downloads &amp; sharing</text>
        <text x="26" y="150" font-family="sans-serif" font-size="16" fill="#463f38">• Snapshot capture &amp; package/person event history</text>
      </g>
    `;
  }

  if (variant === "doorbell") {
    return `
      <!-- Transformer Node -->
      <g transform="translate(88, 178)">
        <rect width="290" height="356" rx="6" fill="#fffdf9" stroke="#181614" stroke-width="3"/>
        <rect width="290" height="44" fill="#181614"/>
        <text x="18" y="28" font-family="ui-monospace, Menlo, monospace" font-size="15" font-weight="700" fill="#fffdf9">[01] STEP-DOWN TRANSFORMER</text>
        <rect x="65" y="92" width="160" height="130" rx="6" fill="#f4f0e8" stroke="#181614" stroke-width="3"/>
        <text x="145" y="144" text-anchor="middle" font-family="ui-monospace, Menlo, monospace" font-size="22" font-weight="700" fill="${accent}">16–24V AC</text>
        <text x="145" y="176" text-anchor="middle" font-family="ui-monospace, Menlo, monospace" font-size="15" font-weight="700" fill="#181614">10–40 VA RATING</text>
        <text x="145" y="268" text-anchor="middle" font-family="sans-serif" font-size="15" fill="#463f38">Shut off 120V breaker at panel</text>
        <text x="145" y="294" text-anchor="middle" font-family="sans-serif" font-size="15" fill="#463f38">before touching low-voltage leads</text>
      </g>

      <line x1="378" y1="356" x2="466" y2="356" stroke="${accent}" stroke-width="4"/>

      <!-- Chime Box Node -->
      <g transform="translate(466, 178)">
        <rect width="340" height="356" rx="6" fill="#fffdf9" stroke="#181614" stroke-width="3"/>
        <rect width="340" height="44" fill="${accent}"/>
        <text x="18" y="28" font-family="ui-monospace, Menlo, monospace" font-size="15" font-weight="700" fill="#fffdf9">[02] INDOOR CHIME TERMINALS</text>
        <rect x="46" y="92" width="248" height="146" rx="6" fill="#f4f0e8" stroke="#181614" stroke-width="2.5"/>
        <circle cx="96" cy="144" r="12" fill="#fffdf9" stroke="#181614" stroke-width="3"/>
        <circle cx="170" cy="144" r="12" fill="#fffdf9" stroke="#181614" stroke-width="3"/>
        <circle cx="244" cy="144" r="12" fill="#fffdf9" stroke="#181614" stroke-width="3"/>
        <text x="96" y="182" text-anchor="middle" font-family="ui-monospace, Menlo, monospace" font-size="13" font-weight="700" fill="#181614">FRONT</text>
        <text x="170" y="182" text-anchor="middle" font-family="ui-monospace, Menlo, monospace" font-size="13" font-weight="700" fill="#181614">TRANS</text>
        <text x="244" y="182" text-anchor="middle" font-family="ui-monospace, Menlo, monospace" font-size="13" font-weight="700" fill="#181614">REAR</text>
        <path d="M 96 132 Q 133 98 170 132" fill="none" stroke="${secondary}" stroke-width="3.5" stroke-dasharray="5 3"/>
        <text x="170" y="278" text-anchor="middle" font-family="sans-serif" font-size="15" fill="#463f38">Install model-specific jumper</text>
        <text x="170" y="304" text-anchor="middle" font-family="sans-serif" font-size="15" fill="#463f38">or power kit per manual</text>
      </g>

      <line x1="806" y1="356" x2="894" y2="356" stroke="${secondary}" stroke-width="4"/>

      <!-- Doorbell Jamb Node -->
      <g transform="translate(894, 178)">
        <rect width="298" height="356" rx="6" fill="#fffdf9" stroke="#181614" stroke-width="3"/>
        <rect width="298" height="44" fill="#181614"/>
        <text x="18" y="28" font-family="ui-monospace, Menlo, monospace" font-size="15" font-weight="700" fill="#fffdf9">[03] ENTRY MOUNT (48" AFF)</text>
        <rect x="94" y="82" width="110" height="174" rx="16" fill="#f4f0e8" stroke="#181614" stroke-width="3"/>
        <circle cx="149" cy="130" r="24" fill="#181614"/>
        <circle cx="149" cy="130" r="9" fill="${secondary}"/>
        <circle cx="149" cy="204" r="20" fill="#fffdf9" stroke="${accent}" stroke-width="3"/>
        <text x="149" y="294" text-anchor="middle" font-family="sans-serif" font-size="15" fill="#463f38">Check package view angle &amp;</text>
        <text x="149" y="320" text-anchor="middle" font-family="sans-serif" font-size="15" fill="#463f38">2.4 GHz Wi-Fi signal at door</text>
      </g>
    `;
  }

  if (variant === "indoor") {
    return `
      <g transform="translate(110, 166)">
        <rect width="460" height="380" rx="6" fill="#fffdf9" stroke="#181614" stroke-width="3"/>
        <rect width="460" height="44" fill="${accent}"/>
        <text x="20" y="28" font-family="ui-monospace, Menlo, monospace" font-size="15" font-weight="700" fill="#fffdf9">INTERIOR HARDWARE // PRIVACY CONTROLS</text>
        <circle cx="230" cy="176" r="76" fill="#f4f0e8" stroke="#181614" stroke-width="3.5"/>
        <circle cx="230" cy="176" r="36" fill="#181614"/>
        <path d="M 194 176 A 36 36 0 0 1 266 176 Z" fill="${secondary}"/>
        <rect x="150" y="252" width="160" height="34" rx="6" fill="#181614"/>
        <text x="230" y="324" text-anchor="middle" font-family="ui-monospace, Menlo, monospace" font-size="15" font-weight="700" fill="#181614">PHYSICAL SHUTTER + CORDED POWER</text>
        <text x="230" y="352" text-anchor="middle" font-family="sans-serif" font-size="15" fill="#463f38">Verify mechanical lens block vs app-only sleep mode</text>
      </g>
      <g transform="translate(620, 166)">
        <rect width="560" height="380" rx="6" fill="#fffdf9" stroke="#181614" stroke-width="3"/>
        <rect width="560" height="44" fill="#181614"/>
        <text x="20" y="28" font-family="ui-monospace, Menlo, monospace" font-size="15" font-weight="700" fill="#fffdf9">INDOOR BUYING BOUNDARIES</text>
        <text x="36" y="102" font-family="ui-monospace, Menlo, monospace" font-size="16" font-weight="700" fill="${accent}">01 / CONSENT &amp; PLACEMENT</text>
        <text x="36" y="132" font-family="sans-serif" font-size="16" fill="#463f38">Pointed at entry doors and common rooms — never private spaces.</text>
        <text x="36" y="196" font-family="ui-monospace, Menlo, monospace" font-size="16" font-weight="700" fill="${secondary}">02 / MICROSD OR LOCAL NAS (RTSP/ONVIF)</text>
        <text x="36" y="226" font-family="sans-serif" font-size="16" fill="#463f38">Keep interior clips on an on-device card or home recorder.</text>
        <text x="36" y="290" font-family="ui-monospace, Menlo, monospace" font-size="16" font-weight="700" fill="#181614">03 / TWO-WAY AUDIO &amp; SIREN</text>
        <text x="36" y="320" font-family="sans-serif" font-size="16" fill="#463f38">Plug-in power supports continuous recording without battery swaps.</text>
      </g>
    `;
  }

  if (variant === "arlo-plan") {
    return `
      <g transform="translate(72, 168)">
        <rect width="360" height="400" rx="6" fill="#fffdf9" stroke="${secondary}" stroke-width="3"/>
        <rect width="360" height="48" fill="${secondary}"/>
        <text x="18" y="31" font-family="ui-monospace, Menlo, monospace" font-size="15" font-weight="700" fill="#fffdf9">01 // NO PLAN · LIVE VIEW</text>
        <rect x="78" y="78" width="204" height="132" rx="16" fill="#f4f0e8" stroke="#181614" stroke-width="3"/>
        <circle cx="180" cy="144" r="36" fill="#fffdf9" stroke="#181614" stroke-width="3"/>
        <circle cx="180" cy="144" r="12" fill="${secondary}"/>
        <text x="180" y="252" text-anchor="middle" font-family="ui-monospace, Menlo, monospace" font-size="14" font-weight="700" fill="#181614">LIVE STREAM</text>
        <text x="180" y="278" text-anchor="middle" font-family="sans-serif" font-size="15" fill="#463f38">Push alerts · two-way audio</text>
        <rect x="36" y="312" width="288" height="58" rx="4" fill="#e6f0ec" stroke="${secondary}" stroke-width="2"/>
        <text x="180" y="346" text-anchor="middle" font-family="ui-monospace, Menlo, monospace" font-size="14" font-weight="700" fill="${secondary}">CLOUD HISTORY STOPS</text>
      </g>
      <g transform="translate(460, 168)">
        <rect width="360" height="400" rx="6" fill="#fffdf9" stroke="#181614" stroke-width="3"/>
        <rect width="360" height="48" fill="#181614"/>
        <text x="18" y="31" font-family="ui-monospace, Menlo, monospace" font-size="15" font-weight="700" fill="#fffdf9">02 // HUB OR CARD</text>
        <rect x="118" y="84" width="124" height="168" rx="8" fill="#f4f0e8" stroke="#181614" stroke-width="3"/>
        <rect x="136" y="108" width="88" height="18" rx="2" fill="#fffdf9" stroke="#181614" stroke-width="2"/>
        <rect x="136" y="138" width="88" height="18" rx="2" fill="#fffdf9" stroke="#181614" stroke-width="2"/>
        <rect x="148" y="176" width="64" height="40" rx="3" fill="${accent}"/>
        <text x="180" y="288" text-anchor="middle" font-family="ui-monospace, Menlo, monospace" font-size="14" font-weight="700" fill="#181614">USB · microSD</text>
        <text x="180" y="314" text-anchor="middle" font-family="sans-serif" font-size="15" fill="#463f38">Triggered clips only</text>
        <rect x="36" y="338" width="288" height="36" rx="4" fill="#fdf5e2" stroke="${accent}" stroke-width="2"/>
        <text x="180" y="361" text-anchor="middle" font-family="ui-monospace, Menlo, monospace" font-size="13" font-weight="700" fill="${accent}">NOT EVERY MODEL</text>
      </g>
      <g transform="translate(848, 168)">
        <rect width="360" height="400" rx="6" fill="#fffdf9" stroke="${accent}" stroke-width="3"/>
        <rect width="360" height="48" fill="${accent}"/>
        <text x="18" y="31" font-family="ui-monospace, Menlo, monospace" font-size="15" font-weight="700" fill="#fffdf9">03 // PAID CLOUD PLAN</text>
        <rect x="70" y="86" width="220" height="150" rx="8" fill="#f4f0e8" stroke="#181614" stroke-width="3"/>
        <text x="180" y="128" text-anchor="middle" font-family="ui-monospace, Menlo, monospace" font-size="18" font-weight="700" fill="#181614">60-DAY</text>
        <text x="180" y="156" text-anchor="middle" font-family="ui-monospace, Menlo, monospace" font-size="18" font-weight="700" fill="${accent}">VIDEO HISTORY</text>
        <text x="180" y="188" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#463f38">Activity zones · detection</text>
        <text x="180" y="276" text-anchor="middle" font-family="ui-monospace, Menlo, monospace" font-size="14" font-weight="700" fill="#181614">US STICKER · DATED</text>
        <text x="180" y="304" text-anchor="middle" font-family="sans-serif" font-size="15" fill="#463f38">Re-read the plan page</text>
        <rect x="36" y="338" width="288" height="36" rx="4" fill="#fffdf9" stroke="${accent}" stroke-width="2"/>
        <text x="180" y="361" text-anchor="middle" font-family="ui-monospace, Menlo, monospace" font-size="13" font-weight="700" fill="${accent}">ONE ADDRESS PER PLAN</text>
      </g>
    `;
  }

  return `
    <!-- Editorial Desk Dossier -->
    <g transform="translate(96, 166)">
      <rect width="520" height="380" rx="6" fill="#fffdf9" stroke="#181614" stroke-width="3"/>
      <rect width="520" height="44" fill="#181614"/>
      <text x="20" y="28" font-family="ui-monospace, Menlo, monospace" font-size="15" font-weight="700" fill="#fffdf9" letter-spacing="1.2">RESEARCH LEDGER // PRIMARY CITATIONS</text>
      <rect x="32" y="76" width="456" height="72" rx="4" fill="#f4f0e8" stroke="#181614" stroke-width="2"/>
      <text x="52" y="106" font-family="ui-monospace, Menlo, monospace" font-size="14" font-weight="700" fill="${accent}">[SOURCE 01] MANUFACTURER SPEC SHEET</text>
      <text x="52" y="130" font-family="sans-serif" font-size="15" fill="#463f38">Storage method, power requirement, and plan fine print</text>
      <rect x="32" y="168" width="456" height="72" rx="4" fill="#f4f0e8" stroke="#181614" stroke-width="2"/>
      <text x="52" y="198" font-family="ui-monospace, Menlo, monospace" font-size="14" font-weight="700" fill="${secondary}">[SOURCE 02] REGULATOR &amp; ADVISORY DOCS</text>
      <text x="52" y="222" font-family="sans-serif" font-size="15" fill="#463f38">FTC endorsement rules &amp; dated CISA security advisories</text>
      <rect x="32" y="260" width="456" height="86" rx="4" fill="#fdf5e2" stroke="${accent}" stroke-width="2"/>
      <text x="52" y="294" font-family="ui-monospace, Menlo, monospace" font-size="14" font-weight="700" fill="#593e0c">STATUS: CANDIDATE HARDWARE MARKED TODO</text>
      <text x="52" y="322" font-family="sans-serif" font-size="15" fill="#593e0c">No star scores or invented hands-on claims.</text>
    </g>
    <g transform="translate(656, 166)">
      <rect width="528" height="380" rx="6" fill="#fffdf9" stroke="#181614" stroke-width="3"/>
      <rect width="528" height="44" fill="${accent}"/>
      <text x="20" y="28" font-family="ui-monospace, Menlo, monospace" font-size="15" font-weight="700" fill="#fffdf9" letter-spacing="1.2">EDITORIAL VERIFICATION WORKFLOW</text>
      <circle cx="264" cy="184" r="78" fill="#f4f0e8" stroke="#181614" stroke-width="3"/>
      <circle cx="264" cy="184" r="52" fill="none" stroke="${accent}" stroke-width="2.5" stroke-dasharray="6 4"/>
      <circle cx="264" cy="184" r="18" fill="${accent}"/>
      <text x="264" y="308" text-anchor="middle" font-family="ui-monospace, Menlo, monospace" font-size="16" font-weight="700" fill="#181614">CAMERAREVIEWED · ANDREW VIRTS</text>
      <text x="264" y="338" text-anchor="middle" font-family="sans-serif" font-size="15" fill="#463f38">Independent buying guides for no-monthly-fee cameras</text>
    </g>
  `;
}

function heroSvg(id) {
  const meta = schematicMeta(id);
  const gridLines = [];
  for (let x = 64; x < 1280; x += 64) {
    gridLines.push(
      `<line x1="${x}" y1="64" x2="${x}" y2="656" stroke="#e4ddd0" stroke-width="1"/>`,
    );
  }
  for (let y = 64; y < 720; y += 64) {
    gridLines.push(
      `<line x1="40" y1="${y}" x2="1240" y2="${y}" stroke="#e4ddd0" stroke-width="1"/>`,
    );
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
    <rect width="1280" height="720" fill="#f4f0e8"/>
    ${gridLines.join("")}
    <!-- Outer Technical Frame -->
    <rect x="28" y="24" width="1224" height="672" fill="none" stroke="#181614" stroke-width="3"/>
    <rect x="28" y="24" width="14" height="672" fill="${meta.accent}"/>
    <!-- Top Header Strip -->
    <rect x="42" y="24" width="1210" height="68" fill="#181614"/>
    <circle cx="76" cy="58" r="9" fill="#c2410c"/>
    <text x="98" y="64" font-family="ui-monospace, Menlo, monospace" font-size="18" font-weight="700" fill="#fffdf9" letter-spacing="2">${escapeXml(meta.fig)} // ${escapeXml(meta.subtitle)}</text>
    <text x="1224" y="64" text-anchor="end" font-family="ui-monospace, Menlo, monospace" font-size="15" fill="#d6cdc0" letter-spacing="1.5">${escapeXml(meta.code)}</text>

    <!-- Main Schematic Artwork -->
    ${renderVariantArtwork(meta.variant, meta.accent, meta.secondary)}

    <!-- Bottom Specification Strip -->
    <line x1="42" y1="628" x2="1252" y2="628" stroke="#181614" stroke-width="2"/>
    <rect x="42" y="630" width="1210" height="64" fill="#ebe5d8"/>
    <text x="68" y="668" font-family="ui-monospace, Menlo, monospace" font-size="15" font-weight="700" fill="#181614" letter-spacing="1">CAMERAREVIEWED TECHNICAL ILLUSTRATION · NOT A PRODUCT PHOTOGRAPH</text>
    <text x="1224" y="668" text-anchor="end" font-family="ui-monospace, Menlo, monospace" font-size="14" fill="#463f38" letter-spacing="1">REV 2026.11 // ANDREW VIRTS</text>
  </svg>`;
}

function ogSvg(label, id) {
  const meta = schematicMeta(id);
  const lines = wrap(label, 24);
  const text = lines
    .map(
      (line, index) =>
        `<text x="84" y="${258 + index * 72}" font-family="Georgia, serif" font-weight="700" font-size="58" fill="#181614">${escapeXml(line)}</text>`,
    )
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <rect width="1200" height="630" fill="#f4f0e8"/>
    <rect x="24" y="24" width="1152" height="582" fill="none" stroke="#181614" stroke-width="3"/>
    <rect x="24" y="24" width="18" height="582" fill="${meta.accent}"/>
    <rect x="42" y="24" width="1134" height="72" fill="#181614"/>
    <circle cx="80" cy="60" r="10" fill="#c2410c"/>
    <text x="104" y="67" font-family="ui-monospace, Menlo, monospace" font-size="22" font-weight="700" letter-spacing="3" fill="#fffdf9">CAMERAREVIEWED // INDEPENDENT DESK</text>
    <text x="1146" y="67" text-anchor="end" font-family="ui-monospace, Menlo, monospace" font-size="18" fill="#d6cdc0">${escapeXml(meta.fig)}</text>
    <text x="84" y="164" font-family="ui-monospace, Menlo, monospace" font-size="18" font-weight="700" letter-spacing="2" fill="${meta.secondary}">${escapeXml(meta.subtitle)}</text>
    ${text}
    <line x1="42" y1="530" x2="1176" y2="530" stroke="#181614" stroke-width="2"/>
    <rect x="42" y="532" width="1134" height="72" fill="#ebe5d8"/>
    <text x="84" y="575" font-family="ui-monospace, Menlo, monospace" font-size="18" font-weight="700" fill="#181614">NO-SUBSCRIPTION HOME SECURITY GUIDES · BY ANDREW VIRTS</text>
  </svg>`;
}

function logoSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
    <rect width="512" height="512" rx="64" fill="#181614"/>
    <rect x="28" y="28" width="456" height="456" rx="44" fill="none" stroke="#f4f0e8" stroke-opacity="0.24" stroke-width="8"/>
    <circle cx="256" cy="256" r="144" fill="none" stroke="#f4f0e8" stroke-width="22"/>
    <circle cx="256" cy="256" r="88" fill="none" stroke="#f4f0e8" stroke-opacity="0.4" stroke-width="8" stroke-dasharray="18 12"/>
    <circle cx="256" cy="256" r="52" fill="#c2410c"/>
    <circle cx="388" cy="124" r="24" fill="#c2410c"/>
  </svg>`;
}

const illustration = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360">
  <rect width="640" height="360" fill="#f4f0e8"/>
  <rect x="14" y="14" width="612" height="332" fill="#fffdf9" stroke="#181614" stroke-width="2.5"/>
  <rect x="14" y="14" width="612" height="38" fill="#181614"/>
  <circle cx="36" cy="33" r="6" fill="#c2410c"/>
  <text x="52" y="38" font-family="ui-monospace, Menlo, monospace" font-size="13" font-weight="700" fill="#fffdf9" letter-spacing="1.5">CANDIDATE HARDWARE SCHEMATIC // VERIFY SPEC SHEET</text>
  <!-- Camera Unit -->
  <rect x="58" y="88" width="210" height="156" rx="18" fill="#f4f0e8" stroke="#181614" stroke-width="3"/>
  <circle cx="163" cy="166" r="48" fill="#fffdf9" stroke="#181614" stroke-width="3"/>
  <circle cx="163" cy="166" r="26" fill="none" stroke="#8f2d10" stroke-width="2.5" stroke-dasharray="5 3"/>
  <circle cx="163" cy="166" r="12" fill="#8f2d10"/>
  <rect x="123" y="244" width="80" height="26" rx="4" fill="#181614"/>
  <!-- Storage & Spec Checklist -->
  <line x1="268" y1="166" x2="328" y2="166" stroke="#8f2d10" stroke-width="3" stroke-dasharray="5 4"/>
  <rect x="328" y="86" width="262" height="184" rx="6" fill="#f4f0e8" stroke="#181614" stroke-width="2.5"/>
  <text x="350" y="118" font-family="ui-monospace, Menlo, monospace" font-size="13" font-weight="700" fill="#1b4b38">VERIFICATION CHECKLIST</text>
  <rect x="350" y="134" width="218" height="24" rx="3" fill="#fffdf9" stroke="#d6cdc0" stroke-width="1.5"/>
  <text x="362" y="151" font-family="ui-monospace, Menlo, monospace" font-size="12" fill="#181614">01. LOCAL STORAGE PATH</text>
  <rect x="350" y="168" width="218" height="24" rx="3" fill="#fffdf9" stroke="#d6cdc0" stroke-width="1.5"/>
  <text x="362" y="185" font-family="ui-monospace, Menlo, monospace" font-size="12" fill="#181614">02. POWER &amp; WEATHER RATING</text>
  <rect x="350" y="202" width="218" height="24" rx="3" fill="#fffdf9" stroke="#d6cdc0" stroke-width="1.5"/>
  <text x="362" y="219" font-family="ui-monospace, Menlo, monospace" font-size="12" fill="#181614">03. EXACT MODEL &amp; ASIN</text>
  <text x="350" y="252" font-family="ui-monospace, Menlo, monospace" font-size="11" fill="#463f38">ILLUSTRATION ONLY · NOT PRODUCT PHOTO</text>
  <!-- Footer Bar -->
  <rect x="16" y="304" width="608" height="40" fill="#ebe5d8"/>
  <text x="36" y="329" font-family="ui-monospace, Menlo, monospace" font-size="12" font-weight="700" fill="#181614">CAMERAREVIEWED FIELD DESK · SOURCE CITATION REQUIRED</text>
</svg>`;

const only = process.argv[2];

for (const job of jobs) {
  if (only && job.id !== only) continue;
  if (!job.id || !job.label) throw new Error(`Bad image job: ${JSON.stringify(job)}`);
  const hero = Buffer.from(heroSvg(job.id));
  await sharp(hero)
    .resize(1280, 720)
    .avif({ quality: 45 })
    .toFile(path.join(heroDir, `${job.id}-1280.avif`));
  await sharp(hero)
    .resize(640, 360)
    .avif({ quality: 42 })
    .toFile(path.join(heroDir, `${job.id}-640.avif`));
  await sharp(hero)
    .resize(1280, 720)
    .webp({ quality: 76 })
    .toFile(path.join(heroDir, `${job.id}-1280.webp`));
  await sharp(hero)
    .resize(640, 360)
    .webp({ quality: 74 })
    .toFile(path.join(heroDir, `${job.id}-640.webp`));
  await sharp(Buffer.from(ogSvg(job.label, job.id)))
    .jpeg({ quality: 84 })
    .toFile(path.join(ogDir, `${job.id}.jpg`));
}

if (!only) {
  await sharp(Buffer.from(illustration))
    .webp({ quality: 76 })
    .toFile(path.join(illustrationDir, "candidate-640.webp"));
  await sharp(Buffer.from(illustration))
    .avif({ quality: 45 })
    .toFile(path.join(illustrationDir, "candidate-640.avif"));
  await sharp(Buffer.from(logoSvg())).png().toFile(path.join(root, "public/images/logo.png"));
  await sharp(Buffer.from(logoSvg()))
    .resize(180, 180)
    .png()
    .toFile(path.join(root, "public/apple-touch-icon.png"));
}

console.log(`wrote images for ${only ?? jobs.length} pages`);
