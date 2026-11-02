import { defineHandler, defineHead, type InferProps } from "void";
import { listArticles, toCard } from "../src/lib/content";
import { buildHead } from "../src/lib/seo";
import { staticSeo } from "../src/lib/static-seo";
import { staticPageById } from "../src/lib/site";

const page = staticPageById("home");
const seo = staticSeo("home", { preloadHero: true });

export const loader = defineHandler(() => ({
  page,
  articles: listArticles().map(toCard),
  seo,
}));

export type Props = InferProps<typeof loader>;

export const head = defineHead<Props>((_c, props) => buildHead(props.seo));
