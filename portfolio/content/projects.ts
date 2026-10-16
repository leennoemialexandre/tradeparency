// Index of every project shown on the site. The homepage uses the three `featured` entries;
// All Work lists everything. Long-form narratives live in content/stories/.

export type Category =
  | "Product & Technology"
  | "Strategy & Research"
  | "Finance & Analytics"
  | "Operations";

export const categories: Category[] = [
  "Product & Technology",
  "Strategy & Research",
  "Finance & Analytics",
  "Operations",
];

export type Theme =
  | "tafia"
  | "concentration"
  | "jobaholic"
  | "pinterest"
  | "hospital"
  | "entrypreneur"
  | "paramount"
  | "loopify";

export interface ProjectMeta {
  slug: string;
  title: string;
  /** Short label describing what kind of artifact this is. */
  kind: string;
  summary: string;
  categories: Category[];
  theme: Theme;
  /** Row color on the All Work index. */
  color: string;
  featured?: boolean;
  when?: string;
}

export const projects: ProjectMeta[] = [
  {
    slug: "tafia",
    title: "TAFIA",
    kind: "Website prototype · team capstone",
    summary:
      "Medication support for older adults that pairs reminders with simple games, so seniors stay long enough to see the prompt.",
    categories: ["Product & Technology", "Strategy & Research", "Operations"],
    theme: "tafia",
    color: "var(--lavender)",
    featured: true,
    when: "Sep–Dec 2025",
  },
  {
    slug: "concentration-64",
    title: "Concentration 64",
    kind: "Browser game · independent build",
    summary:
      "A turn-based recall game against a CPU. Real players reshaped its timer, word lists, and feedback.",
    categories: ["Product & Technology"],
    theme: "concentration",
    color: "var(--butter)",
    featured: true,
  },
  {
    slug: "jobaholic",
    title: "Jobaholic",
    kind: "Full-stack web app · independent build",
    summary:
      "One workspace for a job search: a seven-stage pipeline, deadline warnings, company-specific interview prep, and search statistics.",
    categories: ["Product & Technology"],
    theme: "jobaholic",
    color: "var(--mint)",
    featured: true,
  },
  {
    slug: "pinterest",
    title: "Pinterest Creator Monetization",
    kind: "Strategy proposal · academic team",
    summary:
      "An in-house affiliate program for Pinterest creators, with a bottom-up model of the platform revenue it could capture.",
    categories: ["Strategy & Research", "Finance & Analytics"],
    theme: "pinterest",
    color: "var(--peach)",
  },
  {
    slug: "hospital-analysis",
    title: "Hospital Financial Performance",
    kind: "Data analysis · independent academic",
    summary:
      "Cleaning 2023 Medicare cost-report data into a comparable sample of 3,103 hospitals, then reading weak associations carefully.",
    categories: ["Finance & Analytics", "Operations"],
    theme: "hospital",
    color: "#b9c6ff",
    when: "Spring 2026",
  },
  {
    slug: "entry-preneur",
    title: "Entry-Preneur",
    kind: "Internship · customer discovery",
    summary:
      "Fifty customer interviews showed the sales problem was trust, not personalization, and led to a content-first strategy.",
    categories: ["Strategy & Research", "Operations"],
    theme: "entrypreneur",
    color: "var(--butter)",
  },
  {
    slug: "paramount",
    title: "Paramount",
    kind: "Corporate strategy · academic team",
    summary:
      "Weighing a traditional TV business against future streaming audiences, plus my own memo on new creative voices.",
    categories: ["Strategy & Research"],
    theme: "paramount",
    color: "var(--lavender)",
  },
  {
    slug: "loopify",
    title: "Loopify",
    kind: "Browser tool · independent build",
    summary:
      "A small tool that loops YouTube videos and playlists for repeated listening, built on the YouTube IFrame API.",
    categories: ["Product & Technology"],
    theme: "loopify",
    color: "var(--mint)",
  },
];

export function getProject(slug: string): ProjectMeta {
  const p = projects.find((x) => x.slug === slug);
  if (!p) throw new Error(`Unknown project: ${slug}`);
  return p;
}

export function nextProject(slug: string): ProjectMeta {
  const i = projects.findIndex((x) => x.slug === slug);
  return projects[(i + 1) % projects.length];
}
