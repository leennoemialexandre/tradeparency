import type { Metadata } from "next";
import { ProjectShell } from "@/components/ProjectShell";
import { LoopifyLogic } from "@/components/demos/SmallDemos";
import { getProject } from "@/content/projects";
import { liveLinks, site } from "@/content/site";
import { loopifyStory } from "@/content/stories/supporting";

const meta = getProject("loopify");

export const metadata: Metadata = {
  title: "Loopify",
  description: "A small browser tool that loops YouTube videos and playlists for repeated listening, built on the YouTube IFrame API.",
  openGraph: { title: "Loopify · Leen-Noemi Alexandre", description: meta.summary },
};

export default function LoopifyPage() {
  return (
    <ProjectShell
      meta={meta}
      headline={
        <>
          A tiny tool with a <span className="hl">precise</span> promise
        </>
      }
      lede={
        <p>
          Loopify loops a YouTube video or playlist so you can listen again and again. The interesting product work was being exact about what it controls,
          and what it doesn&rsquo;t.
        </p>
      }
      links={[
        { href: liveLinks.loopify, label: "Try Loopify live", external: true },
        { href: `${site.github}/loopify`, label: "Source on GitHub", external: true },
      ]}
      facts={[
        { term: "My role", detail: "Independent: problem, design, loop logic, deployment" },
        { term: "Built with", detail: "YouTube IFrame API · HTML, CSS, JS" },
        { term: "Hosting", detail: "GitHub Pages" },
      ]}
      experience={{
        title: "Trigger the loop logic",
        intro: "What happens when a video ends depends on what you loaded and whether looping is on. Try each case.",
        content: <LoopifyLogic />,
      }}
      story={loopifyStory}
      storyIntro="The problem, how it works, the tradeoff of building on someone else's player, and what shipped."
    />
  );
}
