import { GuideList } from "../src/components/GuideList";
import { HeroImage } from "../src/components/HeroImage";
import type { Props } from "./index.server";

export default function HomePage({ page, articles }: Props) {
  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-hero-meta">
          <p className="kicker kicker-pill">Independent desk &middot; no lab scores yet</p>
          <span className="edition-badge">EDITION 2026.11 // 5 LIVE BRIEFINGS</span>
        </div>
        <h1>{page.h1}</h1>
        <p className="lede">
          CameraReviewed explains home security cameras and video doorbells for people who want
          footage without a monthly bill. The first guides are research drafts. They cite
          manufacturer pages and public guidance. They do not pretend a camera was mounted here last
          weekend.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="/security-cameras-without-subscription/">
            Start with the no-subscription guide &rarr;
          </a>
          <a className="button button-secondary" href="/articles/">
            Browse all {articles.length} guides
          </a>
        </div>
        <HeroImage
          id="home"
          priority
          alt="Illustration of a small house, an outdoor camera, and a memory card. Not a product photo."
          caption="Three local recording architectures compared: on-camera microSD card, indoor hub/chime storage, and wired PoE NVR."
        />
      </section>

      <section className="topology-strip" aria-label="Storage architecture comparison">
        <div className="topology-card">
          <span className="topology-num">01 // MICROSD IN CAMERA</span>
          <strong>Lowest upfront cost</strong>
          <p>
            Clips write to a card inside the housing. Simple, no hub required, but the footage walks
            away if someone steals the outdoor camera.
          </p>
        </div>
        <div className="topology-card">
          <span className="topology-num">02 // IN-HOME HUB OR CHIME</span>
          <strong>Indoor clip archive</strong>
          <p>
            Wireless cameras stream to a HomeBase, Hub, or plug-in chime inside the house so clips
            survive outdoor tampering.
          </p>
        </div>
        <div className="topology-card">
          <span className="topology-num">03 // WIRED POE NVR</span>
          <strong>24/7 continuous &amp; offline</strong>
          <p>
            One Ethernet cable carries power and video back to a multi-terabyte recorder. Works
            without Wi-Fi or an internet connection.
          </p>
        </div>
        <div className="topology-card topology-card-warn">
          <span className="topology-num">04 // CLOUD-ONLY HARDWARE</span>
          <strong>Live view only at $0/mo</strong>
          <p>
            Doorbells like Ring still chime and show live video without a plan, but saved event
            history sits behind a monthly bill.
          </p>
        </div>
      </section>

      <section className="home-section">
        <div className="section-heading-bar">
          <span className="section-code">01 // DECISION TREE</span>
          <h2>Start with the buying question</h2>
        </div>
        <div className="cluster">
          <a href="/security-cameras-without-subscription/">
            <div className="cluster-meta">
              <span className="cluster-num">BRIEFING 01</span>
              <span className="cluster-tag">PILLAR GUIDE</span>
            </div>
            <strong>Security cameras without a subscription</strong>
            <span className="cluster-desc">
              What that phrase actually buys you, and the three ways footage gets stored.
            </span>
            <span className="cluster-cta" aria-hidden="true">
              Open guide &rarr;
            </span>
          </a>
          <a href="/outdoor-security-cameras-without-subscription/">
            <div className="cluster-meta">
              <span className="cluster-num">BRIEFING 02</span>
              <span className="cluster-tag">EXTERIOR HARDWARE</span>
            </div>
            <strong>Outdoor cameras, no monthly fee</strong>
            <span className="cluster-desc">
              Weather, power, and where the recording sits if someone takes the camera.
            </span>
            <span className="cluster-cta" aria-hidden="true">
              Open guide &rarr;
            </span>
          </a>
          <a href="/security-cameras-without-wifi/">
            <div className="cluster-meta">
              <span className="cluster-num">BRIEFING 03</span>
              <span className="cluster-tag">OFFLINE &amp; POE</span>
            </div>
            <strong>Cameras that work without Wi-Fi</strong>
            <span className="cluster-desc">
              PoE recorders, coax, and why a cellular camera is a different kind of bill.
            </span>
            <span className="cluster-cta" aria-hidden="true">
              Open guide &rarr;
            </span>
          </a>
          <a href="/ring-subscription/">
            <div className="cluster-meta">
              <span className="cluster-num">BRIEFING 04</span>
              <span className="cluster-tag">PLAN BREAKDOWN</span>
            </div>
            <strong>Do you need a Ring subscription?</strong>
            <span className="cluster-desc">
              What Ring&rsquo;s own plan page says still works, and what video history costs.
            </span>
            <span className="cluster-cta" aria-hidden="true">
              Open guide &rarr;
            </span>
          </a>
        </div>
      </section>

      <section className="home-section">
        <div className="section-heading-bar">
          <span className="section-code">02 // TOPIC HUBS</span>
          <h2>Browse by hardware category</h2>
        </div>
        <div className="hub-strip">
          <a className="hub-pill-card" href="/no-subscription/">
            <span className="hub-pill-code">HUB // 01</span>
            <strong>No monthly fee</strong>
            <span>Local microSD, hubs, and NVR storage</span>
          </a>
          <a className="hub-pill-card" href="/outdoor-cameras/">
            <span className="hub-pill-code">HUB // 02</span>
            <strong>Outdoor cameras</strong>
            <span>Weather seals, power runs, and theft resistance</span>
          </a>
          <a className="hub-pill-card" href="/video-doorbells/">
            <span className="hub-pill-code">HUB // 03</span>
            <strong>Video doorbells</strong>
            <span>16&ndash;24V AC wiring, chimes, and plan rules</span>
          </a>
          <a className="hub-pill-card" href="/indoor-cameras/">
            <span className="hub-pill-code">HUB // 04</span>
            <strong>Indoor cameras</strong>
            <span>Plug-in power, privacy shutters, and placement</span>
          </a>
        </div>
      </section>

      <section className="home-section">
        <div className="desk-charter">
          <div className="desk-charter-header">
            <span className="section-code">03 // EDITORIAL CHARTER</span>
            <h2>Read this before you trust a pick</h2>
          </div>
          <div className="prose desk-charter-body">
            <ul>
              <li>
                Product cards are marked <strong>TODO</strong> until Andrew Virts checks the current
                model and adds a real ASIN.
              </li>
              <li>
                &ldquo;No monthly fee&rdquo; is not the same as &ldquo;no account,&rdquo; &ldquo;no
                internet,&rdquo; or &ldquo;no firmware updates.&rdquo;
              </li>
              <li>
                The method is written down on the <a href="/editorial-policy/">how we choose</a>{" "}
                page, and the byline belongs to <a href="/author/andrew-virts/">Andrew Virts</a>.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="section-heading-bar">
          <span className="section-code">04 // COMPLETE INDEX</span>
          <h2>All guides</h2>
        </div>
        <GuideList articles={articles} />
      </section>
    </div>
  );
}
