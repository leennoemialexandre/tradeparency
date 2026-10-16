import type { Metadata } from "next";
import { ProjectShell } from "@/components/ProjectShell";
import { DecisionNotes } from "@/components/DecisionNotes";
import { PinterestModel } from "@/components/demos/PinterestModel";
import { getProject } from "@/content/projects";
import { pinterestDecisions, pinterestStory } from "@/content/stories/pinterest";

const meta = getProject("pinterest");

export const metadata: Metadata = {
  title: "Pinterest Creator Monetization",
  description:
    "An academic team proposal for an in-house Pinterest affiliate program, with an explorable bottom-up model of modeled platform revenue.",
  openGraph: { title: "Pinterest Creator Monetization · Leen-Noemi Alexandre", description: meta.summary },
};

export default function PinterestPage() {
  return (
    <ProjectShell
      meta={meta}
      headline={
        <>
          Where discovery happens, should the <span className="hl">economics</span> follow?
        </>
      }
      lede={
        <p>
          An NYU Stern team proposal (&ldquo;Pinsionaries&rdquo;) for an in-house affiliate program inside Pinterest&rsquo;s Creator Program. I worked on the
          research, the trust considerations, and the bottom-up model behind a <strong>$18.15M modeled annual platform revenue</strong> estimate.
        </p>
      }
      facts={[
        { term: "Context", detail: "NYU Stern academic team project" },
        { term: "My role", detail: "Research, leakage analysis, model, recommendations" },
        { term: "Output", detail: "Strategy, financial model, roadmap, presentation" },
        { term: "Status", detail: "Proposal only; not implemented by Pinterest" },
      ]}
      experience={{
        title: "Walk the model, then push on it",
        intro: "Each step of the team's revenue chain is visible. Change an assumption to see how much the headline depends on it.",
        content: <PinterestModel />,
      }}
      decisions={{
        title: "The calls behind the recommendation",
        content: <DecisionNotes decisions={pinterestDecisions} />,
      }}
      story={pinterestStory}
    />
  );
}
