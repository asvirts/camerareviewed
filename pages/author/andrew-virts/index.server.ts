import { defineHandler, defineHead, type InferProps } from "void";
import { buildHead } from "../../../src/lib/seo";
import { staticSeo } from "../../../src/lib/static-seo";

const seo = staticSeo("author", { profile: true });

export const loader = defineHandler(() => ({ seo }));

export type Props = InferProps<typeof loader>;

export const head = defineHead<Props>((_c, props) => buildHead(props.seo));
