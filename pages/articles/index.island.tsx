import { Breadcrumbs } from "../../src/components/Breadcrumbs";
import { GuideList } from "../../src/components/GuideList";
import { HeroImage } from "../../src/components/HeroImage";
import type { Props } from "./index.server";

export default function ArticlesPage({ seo, articles }: Props) {
  return (
    <>
      <Breadcrumbs items={seo.crumbs} />
      <p className="kicker">Index</p>
      <h1>{seo.h1}</h1>
      <p className="lede">
        Five drafts are live. Each one answers a buying or setup question, links to the pages it
        depends on, and marks product names Andrew still has to verify. Start with the subscription
        guide if you are choosing hardware. Start with the Ring pages if you already own a doorbell.
      </p>
      <HeroImage
        id="articles"
        alt="Illustration of a stack of notes and a small camera. Not a product photo."
        priority
      />
      <GuideList articles={articles} />
    </>
  );
}
