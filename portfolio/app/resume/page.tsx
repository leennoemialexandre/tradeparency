import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { education, experience, toolkit } from "@/content/about";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Résumé",
  description: "Résumé of Leen-Noemi Alexandre: experience, education, projects, and tools.",
};

export default function ResumePage() {
  return (
    <>
      <section className="page-intro">
        <div className="wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: 24, flexWrap: "wrap" }}>
          <div>
            <p className="kicker">Résumé</p>
            <h1 className="display-l">The one-page version.</h1>
          </div>
          {site.resumePdf ? (
            <a className="btn" href={site.resumePdf} download>
              Download PDF
            </a>
          ) : null}
        </div>
      </section>
      <section aria-label="Résumé">
        <div className="wrap">
          <div className="resume-sheet">
            <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 26 }}>
              <div>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 650, margin: 0, lineHeight: 1 }}>{site.name}</p>
                <p style={{ margin: "8px 0 0", color: "var(--ink-soft)" }}>{site.location}</p>
              </div>
              <p style={{ margin: 0, textAlign: "right" }}>
                <a href={`mailto:${site.email}`}>{site.email}</a>
                <br />
                <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn<span className="sr-only"> (opens in a new tab)</span>
                </a>{" "}
                ·{" "}
                <a href={site.github} target="_blank" rel="noopener noreferrer">
                  GitHub<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </p>
            </div>

            <h2>Education</h2>
            {education.map((e) => (
              <div className="resume-item" key={e.title}>
                <h3>{e.title}</h3>
                <span className="when">{e.when}</span>
                {e.detail ? <p>{e.detail}</p> : null}
              </div>
            ))}

            <h2>Experience</h2>
            {experience.map((e) => (
              <div className="resume-item" key={e.title}>
                <h3>{e.title}</h3>
                <span className="when">{e.when}</span>
                {e.detail ? <p>{e.detail}</p> : null}
              </div>
            ))}

            <h2>Selected projects</h2>
            {projects.map((p) => (
              <div className="resume-item" key={p.slug}>
                <h3>
                  <Link href={`/work/${p.slug}`}>{p.title}</Link>
                </h3>
                <span className="when">{p.kind}</span>
                <p>{p.summary}</p>
              </div>
            ))}

            <h2>Tools &amp; methods</h2>
            <p style={{ margin: 0, color: "var(--ink-soft)" }}>{toolkit.join(" · ")}</p>
          </div>
        </div>
      </section>
    </>
  );
}
