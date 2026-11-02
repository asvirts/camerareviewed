import type { ReactNode } from "react";
import { SiteFooter } from "../src/components/SiteFooter";
import { SiteHeader } from "../src/components/SiteHeader";
import "../src/styles/site.css";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <a className="skip" href="#content">
        Skip to content
      </a>
      <SiteHeader />
      <main className="site-main" id="content">
        <div className="wrap">{children}</div>
      </main>
      <SiteFooter />
    </>
  );
}
