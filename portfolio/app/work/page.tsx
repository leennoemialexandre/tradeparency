import type { Metadata } from "next";
import { WorkIndex } from "@/components/WorkIndex";
import { Sparkle } from "@/components/Doodles";

export const metadata: Metadata = {
  title: "All Work",
  description: "Every project: prototypes, games, web apps, strategy proposals, and data analysis, filterable by kind of work.",
};

export default function WorkPage() {
  return (
    <>
      <section className="page-intro">
        <div className="wrap" style={{ position: "relative" }}>
          <Sparkle className="float-shape" color="var(--butter)" style={{ width: 48, right: "8%", top: 0 }} />
          <p className="kicker">All work · 8 projects</p>
          <h1 className="display-l">Things I&rsquo;ve built, modeled, and figured out.</h1>
          <p className="lede">Products you can try, strategy you can push on, and analysis you can check. Filter by the kind of work you care about.</p>
        </div>
      </section>
      <section aria-label="Project list">
        <div className="wrap">
          <WorkIndex />
        </div>
      </section>
    </>
  );
}
