import type { Metadata } from "next";
import { ProjectShell } from "@/components/ProjectShell";
import { HypothesisFlip } from "@/components/demos/SmallDemos";
import { getProject } from "@/content/projects";
import { entrypreneurStory } from "@/content/stories/supporting";

const meta = getProject("entry-preneur");

export const metadata: Metadata = {
  title: "Entry-Preneur",
  description: "How 50 customer interviews reframed a startup's sales problem as a trust problem, and led to a content-first strategy.",
  openGraph: { title: "Entry-Preneur · Leen-Noemi Alexandre", description: meta.summary },
};

export default function EntryPreneurPage() {
  return (
    <ProjectShell
      meta={meta}
      headline={
        <>
          The sales problem was really a <span className="hl">trust</span> problem
        </>
      }
      lede={
        <p>
          At an education startup, leadership wanted more personalized outreach. My customer interviews pointed somewhere else, and changed what we
          shipped.
        </p>
      }
      facts={[
        { term: "Context", detail: "Internship · entrepreneurship education startup" },
        { term: "Research", detail: "50 customer interviews · 3 competitors" },
        { term: "Coordination", detail: "Action items across 16 cross-functional meetings" },
        { term: "Shipped", detail: "Blog and content strategy" },
      ]}
      experience={{
        title: "Flip the hypothesis",
        intro: "Three cards, in the order it happened. Tap each one.",
        content: <HypothesisFlip />,
      }}
      story={entrypreneurStory}
      storyIntro="The research, the recommendation, the coordination behind it, and what I can and can't claim."
    />
  );
}
