// Content model for long-form case studies and decision stories.
// Inline text supports **bold**, *italic* and `code`.

export type Block =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "table"; head: string[]; rows: string[][]; caption?: string; numeric?: number[] }
  | { type: "callout"; title?: string; text: string; tone?: "note" | "limit" }
  | { type: "question"; text: string }
  | { type: "figure"; src: string; alt: string; caption: string; width: number; height: number; label?: string };

export interface StorySection {
  id: string;
  kicker?: string;
  title: string;
  blocks: Block[];
}

export interface Glance {
  label: string;
  text: string;
}

export interface Story {
  glance: Glance[];
  sections: StorySection[];
}

/** A decision story opened from a sticker near the experience. */
export interface Decision {
  id: string;
  /** Short contextual entry label, e.g. "Why I chose this". */
  prompt: string;
  /** Sticker title. */
  label: string;
  title: string;
  icon?: string;
  cells?: { term: string; detail: string }[];
  body?: string[];
  /** Anchor in the full story for further reading. */
  more?: { href: string; label: string };
}
