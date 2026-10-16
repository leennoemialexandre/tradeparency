import type { Metadata } from "next";
import { ProjectShell } from "@/components/ProjectShell";
import { DecisionNotes } from "@/components/DecisionNotes";
import { JobaholicSandbox } from "@/components/demos/JobaholicSandbox";
import { getProject } from "@/content/projects";
import { liveLinks, site } from "@/content/site";
import { jobaholicDecisions, jobaholicStory } from "@/content/stories/jobaholic";

const meta = getProject("jobaholic");

export const metadata: Metadata = {
  title: "Jobaholic",
  description:
    "Explore a sample Jobaholic workspace: Kanban and list views, deadline warnings, interview prep with mock mode, and a statistics dashboard, all with synthetic data.",
  openGraph: { title: "Jobaholic · Leen-Noemi Alexandre", description: meta.summary },
};

export default function JobaholicPage() {
  return (
    <ProjectShell
      meta={meta}
      headline={
        <>
          One workspace for the <span className="hl">whole</span> job search
        </>
      }
      lede={
        <p>
          Jobaholic keeps applications, deadlines, documents, and company-specific interview prep in one place, so an application stays useful after
          you&rsquo;ve clicked Apply. I designed, built, and deployed it on my own.
        </p>
      }
      links={[
        { href: liveLinks.jobaholic, label: "Live app (needs an account)", external: true },
        { href: `${site.github}/jobaholic`, label: "Source on GitHub", external: true },
      ]}
      facts={[
        { term: "My role", detail: "Independent creator: features, UX, AI-assisted build, deployment" },
        { term: "Stack", detail: "Next.js, React, Supabase (Postgres, Auth, Storage), Vercel" },
        { term: "Core loop", detail: "Track → get warned → prepare → review" },
      ]}
      experience={{
        title: "Poke around a sample workspace",
        intro:
          "Switch between the board and the list, open an application, move it through stages, then open its interview prep and try mock mode. The dashboard recalculates as you go.",
        content: <JobaholicSandbox />,
      }}
      decisions={{
        title: "Why it's built this way",
        intro: "The reasoning behind the views, the prep pages, the warnings, and the numbers.",
        content: <DecisionNotes decisions={jobaholicDecisions} />,
      }}
      story={jobaholicStory}
    />
  );
}
