import type { Metadata } from "next";
import { ProjectShell } from "@/components/ProjectShell";
import { ParamountBalance } from "@/components/demos/SmallDemos";
import { getProject } from "@/content/projects";
import { paramountStory } from "@/content/stories/supporting";

const meta = getProject("paramount");

export const metadata: Metadata = {
  title: "Paramount",
  description: "A team strategy analysis of Paramount's traditional TV and streaming tension, plus an individually written memo on new creative voices.",
  openGraph: { title: "Paramount · Leen-Noemi Alexandre", description: meta.summary },
};

export default function ParamountPage() {
  return (
    <ProjectShell
      meta={meta}
      headline={
        <>
          Building for <span className="hl">future</span> audiences while managing the business you have
        </>
      }
      lede={
        <p>
          An NYU Stern corporate strategy project on the pull between traditional TV and streaming. Alongside the team&rsquo;s recommendations, I wrote my
          own memo on new creative talent and mentorship.
        </p>
      }
      facts={[
        { term: "Context", detail: "NYU Stern group project" },
        { term: "My part", detail: "Research, audience analysis, recommendations, presentation" },
        { term: "Individual", detail: "Strategic-action memo" },
        { term: "Status", detail: "Academic recommendation only" },
      ]}
      experience={{
        title: "Feel the tension",
        intro: "Toggle the levers our team weighed and watch which way each one pulls.",
        content: <ParamountBalance />,
      }}
      story={paramountStory}
      storyIntro="The tension, our analysis, the portfolio tradeoff, my memo, and what the work doesn't prove."
    />
  );
}
