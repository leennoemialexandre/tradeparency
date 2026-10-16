import type { Metadata } from "next";
import { site } from "@/content/site";
import { Sparkle } from "@/components/Doodles";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Leen-Noemi Alexandre by email or LinkedIn, or browse her code on GitHub.",
};

export default function ContactPage() {
  return (
    <>
      <section className="page-intro">
        <div className="wrap" style={{ position: "relative" }}>
          <Sparkle className="float-shape" color="var(--coral)" style={{ width: 40, right: "12%", top: 10 }} />
          <p className="kicker">Contact</p>
          <h1 className="display-l">Let&rsquo;s talk products.</h1>
          <p className="lede">
            I&rsquo;m looking for Associate Product Manager roles, with product operations, strategy, and BizOps as close seconds. Email is the fastest way to
            reach me.
          </p>
        </div>
      </section>
      <section aria-label="Ways to reach me">
        <div className="wrap contact-cards">
          <a className="contact-card" href={`mailto:${site.email}`}>
            <span className="kicker">Email</span>
            <h2>Write to me</h2>
            <p>{site.email}</p>
          </a>
          <a className="contact-card" href={site.linkedin} target="_blank" rel="noopener noreferrer">
            <span className="kicker">LinkedIn</span>
            <h2>Connect</h2>
            <p>
              leennoemialexandre<span className="sr-only"> (opens in a new tab)</span>
            </p>
          </a>
          <a className="contact-card" href={site.github} target="_blank" rel="noopener noreferrer">
            <span className="kicker">GitHub</span>
            <h2>Read the code</h2>
            <p>
              leennoemialexandre<span className="sr-only"> (opens in a new tab)</span>
            </p>
          </a>
        </div>
      </section>
    </>
  );
}
