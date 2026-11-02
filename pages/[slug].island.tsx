import { ArticleView } from "../src/components/ArticleView";
import { Breadcrumbs } from "../src/components/Breadcrumbs";
import { GuideList } from "../src/components/GuideList";
import { HeroImage } from "../src/components/HeroImage";
import type { Props } from "./[slug].server";

export default function SlugPage({ page, related, category }: Props) {
  if (page.kind === "article") {
    return <ArticleView article={page.article} category={category} related={related} />;
  }
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: page.category.name, path: page.category.path },
        ]}
      />
      <p className="kicker">Category</p>
      <h1>{page.category.h1}</h1>
      <HeroImage
        id={page.category.slug}
        alt={`${page.category.h1}. Illustration, not a product photo.`}
        priority
      />
      <div className="prose" dangerouslySetInnerHTML={{ __html: page.category.html }} />
      <section>
        <h2>Guides in this category</h2>
        <GuideList articles={page.articles} />
      </section>
    </>
  );
}
