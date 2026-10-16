// Personal details and verified links. Edit here; every page reads from this file.
// Links are taken from Leen-Noemi's previously published portfolio. See CONTENT_TODO.md
// for the ones still awaiting confirmation.

export const site = {
  name: "Leen-Noemi Alexandre",
  shortName: "Leen-Noemi",
  role: "Product builder · Associate Product Manager candidate",
  description:
    "Leen-Noemi Alexandre's portfolio: playable prototypes, product decisions, and the research and analysis behind them.",
  location: "West Orange, NJ · open to relocating",
  education: "B.S. Business, Technology & Entrepreneurship, NYU Stern (STEM-certified), May 2026",
  email: "leenalexia@outlook.com",
  linkedin: "https://www.linkedin.com/in/leennoemialexandre",
  github: "https://github.com/leennoemialexandre",
  // Set to a path under /public (e.g. "/docs/resume.pdf") once a résumé PDF is supplied.
  resumePdf: null as string | null,
  // Set to an absolute URL once the production domain is known (used for social previews).
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};

// Live versions of the projects, as supplied by Leen-Noemi.
export const liveLinks = {
  tafia: "https://tafiaonline.lovable.app/",
  concentration64: "https://leennoemialexandre.github.io/minigamelibrary/games/concentration-64/index.html",
  jobaholic: "https://jobaholic.vercel.app/",
  loopify: "https://leennoemialexandre.github.io/loopify/",
};

export const nav = [
  { href: "/work", label: "All Work" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Résumé" },
  { href: "/contact", label: "Contact" },
];
