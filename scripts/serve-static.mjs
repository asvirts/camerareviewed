import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import path from "node:path";
import { createGzip, createBrotliCompress } from "node:zlib";

const root = path.resolve("dist/client");
const port = Number(process.env.PORT || 4321);

const headers = {
  "Content-Security-Policy":
    "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; img-src 'self' data:; font-src 'self'; style-src 'self'; script-src 'self'; connect-src 'self'; upgrade-insecure-requests",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Frame-Options": "DENY",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
};

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
};

function fileFor(urlPath) {
  const clean = decodeURIComponent(urlPath.split("?")[0]);
  if (clean === "/") return path.join(root, "index.html");
  const rel = clean.replace(/^\//, "");
  const direct = path.join(root, rel);
  if (existsSync(direct) && statSync(direct).isFile()) return direct;
  if (clean.endsWith("/")) {
    const html = path.join(root, `${rel.slice(0, -1)}.html`);
    if (existsSync(html)) return html;
  }
  return null;
}

const server = createServer((req, res) => {
  const url = new URL(req.url || "/", "http://127.0.0.1");
  const pathname = url.pathname;
  if (pathname !== "/" && !pathname.endsWith("/") && !path.extname(pathname)) {
    res.writeHead(301, { Location: `${pathname}/${url.search}` });
    res.end();
    return;
  }
  if (pathname.endsWith(".html")) {
    const canonical = pathname === "/index.html" ? "/" : pathname.replace(/\.html$/, "/");
    res.writeHead(301, { Location: canonical });
    res.end();
    return;
  }
  const file = fileFor(pathname);
  if (!file) {
    res.writeHead(404, { ...headers, "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" });
    createReadStream(path.join(root, "404.html")).pipe(res);
    return;
  }
  const ext = path.extname(file);
  const cache = ext === ".html" || ext === ".xml" || ext === ".txt"
    ? "public, max-age=0, must-revalidate"
    : file.includes(`${path.sep}assets${path.sep}`)
      ? "public, max-age=31536000, immutable"
      : "public, max-age=604800";
  const encoding = req.headers["accept-encoding"] || "";
  const compressible = [".html", ".css", ".js", ".svg", ".xml", ".txt"].includes(ext);
  res.setHeader("Content-Type", types[ext] || "application/octet-stream");
  res.setHeader("Cache-Control", cache);
  for (const [key, value] of Object.entries(headers)) res.setHeader(key, value);
  if (compressible && encoding.includes("br")) {
    res.setHeader("Content-Encoding", "br");
    createReadStream(file).pipe(createBrotliCompress()).pipe(res);
    return;
  }
  if (compressible && encoding.includes("gzip")) {
    res.setHeader("Content-Encoding", "gzip");
    createReadStream(file).pipe(createGzip()).pipe(res);
    return;
  }
  createReadStream(file).pipe(res);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`static ${root} on http://127.0.0.1:${port}`);
});
