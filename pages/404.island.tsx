import { Breadcrumbs } from "../src/components/Breadcrumbs";
import type { Props } from "./404.server";

export default function NotFoundPage({ seo }: Props) {
  return (
    <>
      <Breadcrumbs items={seo.crumbs} />
      <h1>{seo.h1}</h1>
      <p className="lede">
        The address does not match a guide. Nothing was moved in secret; this first edition is
        small.
      </p>
      <p>
        <a href="/articles/">Browse the guides</a> or go back <a href="/">home</a>.
      </p>
    </>
  );
}
