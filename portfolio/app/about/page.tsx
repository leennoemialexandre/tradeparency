import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { experience, patterns, toolkit } from "@/content/about";
import { Sparkle, Squiggle } from "@/components/Doodles";

export const metadata: Metadata = {
  title: "About",
  description: "About Leen-Noemi Alexandre: NYU Stern Business, Technology & Entrepreneurship graduate pursuing Associate Product Manager roles.",
};

export default function AboutPage() {
  return (
    <>
      <section className="page-intro">
        <div className="wrap split">
          <div style={{ position: "relative" }}>
            <p className="kicker">About</p>
            <h1 className="display-l">
              Business school brain,{" "}
              <span className="squiggle-under" style={{ fontStyle: "italic" }}>
                builder
                <Squiggle color="#cfc0ff" />
              </span>{" "}
              hands.
            </h1>
          </div>
          <div style={{ fontSize: "1.15rem", lineHeight: 1.6 }}>
            <p>
              I&rsquo;m {site.name}. I graduated from NYU Stern in May 2026 with a B.S. in Business, Technology &amp; Entrepreneurship (STEM-certified),
              and I&rsquo;m pursuing Associate Product Manager roles. Product operations, strategy, and BizOps are close seconds.
            </p>
            <p>
              My projects range from a medication-support prototype for older adults to a recall game, a job-search workspace, a platform monetization model,
              and a hospital finance analysis. I&rsquo;m especially interested in where healthcare meets business, including how financial incentives shape the way care
              gets delivered.
            </p>
            <p style={{ marginBottom: 0 }}>
              I&rsquo;m based in West Orange, New Jersey, and open to relocating.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="patterns-h" style={{ padding: "24px 0 0" }}>
        <div className="wrap">
          <h2 id="patterns-h" className="display-m" style={{ marginBottom: 20 }}>
            What you&rsquo;ll notice across the work
          </h2>
          <div className="contact-cards">
            {patterns.map((p) => (
              <Link key={p.title} href={p.href} className="contact-card" style={{ background: p.color }}>
                <Sparkle color="var(--ink)" style={{ width: 22 }} />
                <h3 style={{ fontSize: "1.5rem", margin: "12px 0 8px" }}>{p.title}</h3>
                <p>{p.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="exp-h" style={{ padding: "64px 0 0" }}>
        <div className="wrap split">
          <div>
            <h2 id="exp-h" className="display-m" style={{ marginBottom: 20 }}>
              Where I&rsquo;ve been
            </h2>
            <ul className="timeline">
              {experience.map((e) => (
                <li key={e.title}>
                  <span className="when">{e.when}</span>
                  <div>
                    <h3>{e.href ? <Link href={e.href}>{e.title}</Link> : e.title}</h3>
                    {e.detail ? <p>{e.detail}</p> : null}
                  </div>
                </li>
              ))}
            </ul>
            <p style={{ marginTop: 20 }}>
              <Link href="/resume" className="link-arrow">
                Full résumé <span aria-hidden="true">→</span>
              </Link>
            </p>
          </div>
          <div>
            <h2 className="display-m" style={{ marginBottom: 20 }}>
              What I work with
            </h2>
            <div className="interest-cloud">
              {toolkit.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
            <div className="callout" style={{ marginTop: 28, background: "var(--peach-soft)" }}>
              <span className="callout-title">A note on AI tools</span>
              <p>
                I build with AI assistants (Lovable, Claude Code, ChatGPT) and say so on every project. What I own is the problem, the decisions, and checking
                that the result does what I claim.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
