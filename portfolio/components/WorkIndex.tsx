"use client";

import Link from "next/link";
import { useState } from "react";
import { categories, projects, type Category } from "@/content/projects";
import { Arrow } from "./Doodles";

export function WorkIndex() {
  // Filters overlap: a project appears under every category it belongs to.
  const [active, setActive] = useState<Category | "All">("All");
  const shown = active === "All" ? projects : projects.filter((p) => p.categories.includes(active));

  return (
    <>
      <div className="filter-bar" role="group" aria-label="Filter projects">
        <button type="button" className="chip" aria-pressed={active === "All"} onClick={() => setActive("All")}>
          All<span className="count">{projects.length}</span>
        </button>
        {categories.map((c) => (
          <button key={c} type="button" className="chip" aria-pressed={active === c} onClick={() => setActive(c)}>
            {c}
            <span className="count">{projects.filter((p) => p.categories.includes(c)).length}</span>
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {shown.length} {shown.length === 1 ? "project" : "projects"}
        {active === "All" ? "" : ` in ${active}`}.
      </p>
      <ol className="work-index">
        {shown.map((p) => (
          <li key={p.slug} className="work-row">
            <Link href={`/work/${p.slug}`} className="work-link" style={{ ["--row-color" as string]: p.color }}>
              <span className="work-num" aria-hidden="true">
                {String(projects.indexOf(p) + 1).padStart(2, "0")}
              </span>
              <span>
                <span className="work-title">{p.title}</span>
                <span className="kicker work-type">
                  {p.kind}
                  {p.when ? ` · ${p.when}` : ""}
                </span>
              </span>
              <p className="work-summary">{p.summary}</p>
              <span className="work-end">
                <span className="work-tags">
                  {p.categories.map((c) => (
                    <span key={c} className="tag" style={{ fontSize: "0.64rem" }}>
                      {c}
                    </span>
                  ))}
                </span>
                <span className="work-arrow" aria-hidden="true">
                  <Arrow />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </>
  );
}
