import type { Metadata } from "next";
import { ProjectShell } from "@/components/ProjectShell";
import { DecisionNotes } from "@/components/DecisionNotes";
import { TafiaWalkthrough } from "@/components/demos/TafiaWalkthrough";
import { getProject } from "@/content/projects";
import { liveLinks } from "@/content/site";
import { tafiaDecisions, tafiaStory } from "@/content/stories/tafia";

const meta = getProject("tafia");

export const metadata: Metadata = {
  title: "TAFIA",
  description:
    "TAFIA: a team capstone prototype pairing simple games with in-site medication reminders for older adults. Try an illustrative walkthrough and read the decisions behind it.",
  openGraph: { title: "TAFIA · Leen-Noemi Alexandre", description: meta.summary },
};

export default function TafiaPage() {
  return (
    <ProjectShell
      meta={meta}
      headline={
        <>
          Giving seniors a reason to <span className="hl">stay</span> for their medication reminder
        </>
      }
      lede={
        <p>
          TAFIA (Trusted Assistant for Friendship, Interaction and Adherence) was our team&rsquo;s September–December 2025 capstone: a working website
          prototype that puts medication prompts inside simple games, with a caregiver dashboard on the other side. I was co-founder and Product Lead.
        </p>
      }
      links={[{ href: liveLinks.tafia, label: "Open the original Lovable prototype", external: true }]}
      facts={[
        { term: "My role", detail: "Co-founder & Product Lead" },
        { term: "Team", detail: "Four people, three sprints" },
        { term: "Timeline", detail: "Sep–Dec 2025, academic capstone" },
        { term: "Stage", detail: "Functional prototype, not launched" },
        { term: "Built with", detail: "Lovable, React, TypeScript, Supabase" },
      ]}
      experience={{
        title: "Play, get reminded, answer, keep playing",
        intro:
          "Seniors kept leaving before a reminder could appear, so we put the reminder inside something worth staying for. Flip a few cards and the prompt arrives the way it did in the prototype.",
        content: <TafiaWalkthrough />,
      }}
      decisions={{
        title: "The decisions behind the loop",
        intro: "Open any sticker for the reasoning, the evidence, and what we gave up. The full story below covers all of it in depth.",
        content: (
          <>
            <DecisionNotes decisions={tafiaDecisions} />
            <div style={{ marginTop: 36 }}>
              <p className="kicker" style={{ marginBottom: 12 }}>
                How it works · the caregiver side
              </p>
              <ol className="flow-diagram" aria-label="How a concerning message reached the caregiver dashboard">
                <li className="flow-step">
                  <span className="kicker">1 · Senior</span>
                  <h3>Types to the companion</h3>
                  <p>Replies come from a predetermined set. No generative AI service was connected.</p>
                </li>
                <li className="flow-step">
                  <span className="kicker">2 · Rules</span>
                  <h3>Trigger phrases are sorted</h3>
                  <p>Selected phrases map to one of three severity tiers.</p>
                  <div className="tier-row" aria-hidden="true">
                    <span className="tier" style={{ background: "var(--mint)" }}>low</span>
                    <span className="tier" style={{ background: "var(--butter)" }}>medium</span>
                    <span className="tier" style={{ background: "var(--peach)" }}>high</span>
                  </div>
                </li>
                <li className="flow-step">
                  <span className="kicker">3 · Dashboard</span>
                  <h3>A flag appears for the caregiver</h3>
                  <p>Visible when the caregiver opens the dashboard, which was functional but unfinished.</p>
                </li>
                <li className="flow-step flow-step--no">
                  <span className="kicker">Not built</span>
                  <h3>Separate alert</h3>
                  <p>No push, text, or email. Nothing guaranteed that someone saw or acted on a flag.</p>
                </li>
              </ol>
            </div>
          </>
        ),
      }}
      story={tafiaStory}
    />
  );
}
