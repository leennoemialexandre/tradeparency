import Link from "next/link";
import type { ProjectMeta } from "@/content/projects";
import { nextProject } from "@/content/projects";
import type { Story } from "@/lib/story";
import { StoryView } from "./StoryView";
import { LayerNav } from "./LayerNav";
import { Arrow, Sparkle } from "./Doodles";

interface Layer {
  title: string;
  intro?: React.ReactNode;
  content: React.ReactNode;
}

interface ProjectShellProps {
  meta: ProjectMeta;
  /** Headline; wrap a phrase in <span className="hl"> to highlight it. */
  headline: React.ReactNode;
  lede: React.ReactNode;
  facts: { term: string; detail: string }[];
  experience: Layer;
  decisions?: Layer;
  story: Story;
  storyIntro?: React.ReactNode;
  links?: { href: string; label: string; external?: boolean }[];
}

export function ProjectShell({ meta, headline, lede, facts, experience, decisions, story, storyIntro, links }: ProjectShellProps) {
  const next = nextProject(meta.slug);
  const layers = [
    { id: "experience", label: experience.title, color: "var(--accent-pop)" },
    ...(decisions ? [{ id: "decisions", label: decisions.title, color: "var(--butter)" }] : []),
    { id: "story", label: "Full story", color: "var(--mint)" },
  ];

  return (
    <div data-theme={meta.theme}>
      <section className="project-hero">
        <div className="wrap">
          <Link href="/work" className="crumb">
            <span aria-hidden="true">←</span> All work
          </Link>
          <p className="kicker">{meta.kind}</p>
          <h1 className="display-l" style={{ marginTop: 10 }}>
            {headline}
          </h1>
          <div className="lede" style={{ maxWidth: "52ch" }}>
            {lede}
          </div>
          {links?.length ? (
            <p style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 18 }}>
              {links.map((l) => (
                <a
                  key={l.href}
                  className="link-arrow"
                  href={l.href}
                  {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {l.label}
                  {l.external ? <span className="sr-only"> (opens in a new tab)</span> : null}
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
            </p>
          ) : null}
          <dl className="facts">
            {facts.map((f) => (
              <div className="fact" key={f.term}>
                <dt>{f.term}</dt>
                <dd>{f.detail}</dd>
              </div>
            ))}
          </dl>
          <LayerNav layers={layers} />
        </div>
      </section>

      <section id="experience" className="layer" aria-labelledby="experience-h">
        <div className="wrap">
          <div className="layer-head">
            <span className="layer-num">01 · Experience</span>
            <h2 id="experience-h">{experience.title}</h2>
            {experience.intro ? <p>{experience.intro}</p> : null}
          </div>
          {experience.content}
        </div>
      </section>

      {decisions ? (
        <section id="decisions" className="layer" aria-labelledby="decisions-h">
          <div className="wrap">
            <div className="layer-head">
              <span className="layer-num">02 · Discover</span>
              <h2 id="decisions-h">{decisions.title}</h2>
              {decisions.intro ? <p>{decisions.intro}</p> : null}
            </div>
            {decisions.content}
          </div>
        </section>
      ) : null}

      <section id="story" className="layer" aria-labelledby="story-h">
        <div className="wrap">
          <div className="layer-head">
            <span className="layer-num">{decisions ? "03" : "02"} · Read deeply</span>
            <h2 id="story-h">The full story</h2>
            <p>{storyIntro ?? "Research, decisions, build, testing, results, limits, and what I would do next."}</p>
          </div>
          <StoryView story={story} />
        </div>
      </section>

      <section className="layer" aria-label="Next project">
        <div className="wrap">
          <Link
            href={`/work/${next.slug}`}
            className="stage"
            style={{ ["--stage-bg" as string]: next.color, textDecoration: "none", color: "var(--ink)", gridTemplateColumns: "1fr auto" }}
          >
            <div>
              <p className="kicker">Next up · {next.kind}</p>
              <p className="display-m" style={{ fontFamily: "var(--font-display)", fontWeight: 600, margin: "8px 0 6px" }}>
                {next.title}
              </p>
              <p style={{ margin: 0, maxWidth: "52ch" }}>{next.summary}</p>
            </div>
            <span className="work-arrow" aria-hidden="true" style={{ width: 64, height: 64 }}>
              <Arrow />
            </span>
            <Sparkle className="float-shape" color="var(--paper)" style={{ width: 46, right: 30, top: 18, zIndex: 0 }} />
          </Link>
        </div>
      </section>
    </div>
  );
}
