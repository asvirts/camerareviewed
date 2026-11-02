import { GuideList } from "../src/components/GuideList";
import { HeroImage } from "../src/components/HeroImage";
import type { Props } from "./index.server";

export default function HomePage({ page, articles }: Props) {
  return (
    <>
      <p className="kicker">Independent desk · no lab scores yet</p>
      <h1>{page.h1}</h1>
      <p className="lede">
        CameraReviewed explains home security cameras and video doorbells for people who want
        footage without a monthly bill. The first guides are research drafts. They cite manufacturer
        pages and public guidance. They do not pretend a camera was mounted here last weekend.
      </p>
      <HeroImage
        id="home"
        priority
        alt="Illustration of a small house, an outdoor camera, and a memory card. Not a product photo."
      />
      <section>
        <h2>Start with the buying question</h2>
        <div className="cluster">
          <a href="/security-cameras-without-subscription/">
            <strong>Security cameras without a subscription</strong>
            What that phrase actually buys you, and the three ways footage gets stored.
          </a>
          <a href="/outdoor-security-cameras-without-subscription/">
            <strong>Outdoor cameras, no monthly fee</strong>
            Weather, power, and where the recording sits if someone takes the camera.
          </a>
          <a href="/security-cameras-without-wifi/">
            <strong>Cameras that work without Wi-Fi</strong>
            PoE recorders, coax, and why a cellular camera is a different kind of bill.
          </a>
          <a href="/ring-subscription/">
            <strong>Do you need a Ring subscription?</strong>
            What Ring’s own plan page says still works, and what video history costs.
          </a>
        </div>
      </section>
      <section>
        <h2>Read this before you trust a pick</h2>
        <div className="prose">
          <ul>
            <li>
              Product cards are marked TODO until Andrew Virts checks the current model and adds a
              real ASIN.
            </li>
            <li>
              “No monthly fee” is not the same as “no account,” “no internet,” or “no firmware
              updates.”
            </li>
            <li>
              The method is written down on the <a href="/editorial-policy/">how we choose</a> page,
              and the byline belongs to <a href="/author/andrew-virts/">Andrew Virts</a>.
            </li>
          </ul>
        </div>
      </section>
      <section>
        <h2>All guides</h2>
        <GuideList articles={articles} />
      </section>
    </>
  );
}
