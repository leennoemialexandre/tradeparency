import type { Metadata } from "next";
import { ProjectShell } from "@/components/ProjectShell";
import { DecisionNotes } from "@/components/DecisionNotes";
import { Concentration64 } from "@/components/demos/Concentration64";
import { getProject } from "@/content/projects";
import { site } from "@/content/site";
import { c64Decisions, c64Story } from "@/content/stories/concentration-64";

const meta = getProject("concentration-64");

export const metadata: Metadata = {
  title: "Concentration 64",
  description:
    "Play Concentration 64, a turn-based recall game against a CPU, and see how real players changed its timer, word lists, and feedback.",
  openGraph: { title: "Concentration 64 · Leen-Noemi Alexandre", description: meta.summary },
};

const annotations = [
  { where: "The whole thing", title: "It runs in your browser", decision: c64Decisions.browser },
  { where: "Difficulty buttons", title: "Three speeds, not one", decision: c64Decisions.difficulty },
  { where: "Category counts", title: "Lists big enough to be fair", decision: c64Decisions.datasets },
  { where: "Try \"USA\" in Countries", title: "Aliases for natural names", decision: c64Decisions.aliases },
  { where: "Type a wrong answer", title: "Two different error messages", decision: c64Decisions.feedback },
];

export default function Concentration64Page() {
  return (
    <ProjectShell
      meta={meta}
      headline={
        <>
          A recall game that makes <span className="hl">knowing more</span> worth it
        </>
      }
      lede={
        <p>
          Name an animal, a country, or a name before the clock runs out, then the CPU fires one back. I built Concentration 64 independently in two days,
          and the students who played it reshaped almost every rule.
        </p>
      }
      links={[{ href: `${site.github}/minigamelibrary`, label: "Source on GitHub", external: true }]}
      facts={[
        { term: "My role", detail: "Independent creator, built with Claude Code" },
        { term: "Players", detail: "25+ students" },
        { term: "Build", detail: "2 days · 5 iterations · 3 versions" },
        { term: "Stack", detail: "HTML, CSS, vanilla JS · GitHub Pages" },
      ]}
      experience={{
        title: "Play the real game",
        intro:
          "This is the actual game logic, word lists, aliases, and timings from the deployed version, restyled to sit on this page. The stickers beside it explain why each rule exists.",
        content: (
          <div className="c64-layout">
            <div>
              <Concentration64 />
              <p style={{ fontSize: "0.88rem", color: "var(--ink-soft)", marginTop: 12 }}>
                One small addition for this page: the game stops if you switch tabs, so the timer never runs out behind your back. Nothing is saved.
              </p>
            </div>
            <ul className="annot-list" aria-label="Decisions behind the game">
              {annotations.map((a) => (
                <li key={a.decision.id} className="annot">
                  <span className="kicker">{a.where}</span>
                  <h3>{a.title}</h3>
                  <DecisionNotes decisions={[a.decision]} />
                </li>
              ))}
            </ul>
          </div>
        ),
      }}
      story={c64Story}
    />
  );
}
