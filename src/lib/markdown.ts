import { Marked, type Tokens } from "marked";
import { escapeHtml, uniqueSlug } from "./text";

export type Heading = {
  depth: 2 | 3;
  id: string;
  text: string;
};

type RendererThis = {
  parser: {
    parseInline: (tokens: Tokens.Generic[]) => string;
  };
};

function plainText(html: string): string {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"');
}

export function renderMarkdown(source: string): { html: string; headings: Heading[] } {
  const headings: Heading[] = [];
  const used = new Set<string>();
  const marked = new Marked({ gfm: true, breaks: false });
  marked.use({
    renderer: {
      heading(this: RendererThis, token: Tokens.Heading) {
        const inner = this.parser.parseInline(token.tokens);
        const text = plainText(inner).trim();
        if (token.depth === 1) {
          throw new Error(
            `Article markdown contains an H1 ("${text}"). The template owns the only H1.`,
          );
        }
        const id = uniqueSlug(text, used);
        if (token.depth === 2 || token.depth === 3) {
          headings.push({ depth: token.depth, id, text });
        }
        return `<h${token.depth} id="${escapeHtml(id)}">${inner}</h${token.depth}>\n`;
      },
      link(this: RendererThis, token: Tokens.Link) {
        const inner = this.parser.parseInline(token.tokens);
        const href = token.href;
        const title = token.title ? ` title="${escapeHtml(token.title)}"` : "";
        const amazon = /^https:\/\/www\.amazon\.[a-z.]+/i.test(href);
        if (amazon) {
          return `<a href="${escapeHtml(href)}"${title} rel="sponsored nofollow noopener" target="_blank">${inner}</a>`;
        }
        if (/^https?:\/\//i.test(href)) {
          return `<a href="${escapeHtml(href)}"${title} rel="noopener noreferrer" target="_blank">${inner}</a>`;
        }
        return `<a href="${escapeHtml(href)}"${title}>${inner}</a>`;
      },
    },
  });
  const html = marked.parse(source);
  if (typeof html !== "string") {
    throw new Error("Markdown renderer returned a promise. Keep marked synchronous.");
  }
  return { html, headings };
}

export function renderInline(source: string): string {
  return renderMarkdown(source).html.replace(/^<p>|<\/p>\n?$/g, "");
}
