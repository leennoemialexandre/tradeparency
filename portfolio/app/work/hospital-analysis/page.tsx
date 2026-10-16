import type { Metadata } from "next";
import { ProjectShell } from "@/components/ProjectShell";
import { DecisionNotes } from "@/components/DecisionNotes";
import { HospitalExplorer } from "@/components/demos/HospitalExplorer";
import { getProject } from "@/content/projects";
import { hospitalDecisions, hospitalStory } from "@/content/stories/hospital";

const meta = getProject("hospital-analysis");

export const metadata: Metadata = {
  title: "Hospital Financial Performance",
  description:
    "Cleaning 2023 Medicare cost-report data into a comparable sample of 3,103 short-term hospitals, and reading weak associations with care.",
  openGraph: { title: "Hospital Financial Performance · Leen-Noemi Alexandre", description: meta.summary },
};

export default function HospitalPage() {
  return (
    <ProjectShell
      meta={meta}
      headline={
        <>
          Building a <span className="hl">comparable</span> dataset before interpreting the numbers
        </>
      }
      lede={
        <p>
          An independent analysis of 2023 Medicare Hospital Cost Report data. The interesting part wasn&rsquo;t the regression. It was discovering that
          some &ldquo;margins&rdquo; were below &minus;100,000,000% and working out why.
        </p>
      }
      links={[{ href: "/docs/hospital-operating-margin-analysis.pdf", label: "Read the original paper (PDF)" }]}
      facts={[
        { term: "My role", detail: "Independent, with ChatGPT assistance" },
        { term: "Data", detail: "2023 Medicare Hospital Cost Report" },
        { term: "Tools", detail: "PostgreSQL, SQL, Python, Jupyter" },
        { term: "Sample", detail: "3,103 short-term hospitals" },
      ]}
      experience={{
        title: "Follow the data from messy to meaningful",
        content: <HospitalExplorer />,
      }}
      decisions={{
        title: "The judgment calls",
        content: <DecisionNotes decisions={hospitalDecisions} />,
      }}
      story={hospitalStory}
    />
  );
}
