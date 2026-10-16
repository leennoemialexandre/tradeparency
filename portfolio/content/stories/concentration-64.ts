import type { Decision, Story } from "@/lib/story";

// Decision stories pinned next to the parts of the game they explain.
export const c64Decisions: Record<"browser" | "difficulty" | "datasets" | "aliases" | "feedback", Decision> = {
  browser: {
    id: "browser",
    prompt: "Why I chose this",
    label: "Python terminal → browser",
    icon: "⌘",
    title: "The first version asked players to install Python",
    body: [
      "The original game ran in a Python terminal, so anyone who wanted to play had to have Python set up first. That was an access barrier before a single turn.",
      "I rebuilt it with HTML, CSS, and vanilla JavaScript and deployed it as a static site on GitHub Pages. No backend, no framework, no build step: the content files are fetched in the browser.",
    ],
    cells: [
      { term: "Evidence", detail: "Players needed Python to run the original version." },
      { term: "Constraint", detail: "A fast independent build that had to be easy to share." },
      { term: "Tradeoff", detail: "Stay within what a static app can do, rather than add backend-dependent features." },
      { term: "Outcome", detail: "Students could play in a browser without installing anything." },
    ],
    more: { href: "#browser", label: "Read the full decision" },
  },
  difficulty: {
    id: "difficulty",
    prompt: "What users changed",
    label: "Five seconds → three speeds",
    icon: "⏱",
    title: "One speed shut out the players I wanted",
    body: [
      "The original game allowed only five seconds per answer. That was too hard for younger and casual players.",
      "Instead of removing time pressure, I kept it and made it adjustable: Easy (30s), Medium (15s), and Hard (5s). The competitive idea survives, and more people can join in.",
    ],
    cells: [
      { term: "Tradeoff", detail: "Changing the time changes the challenge itself." },
      { term: "Not yet measured", detail: "Completion rates or preferences by level, or whether these intervals are the right ones." },
    ],
    more: { href: "#difficulty", label: "Read the full decision" },
  },
  datasets: {
    id: "datasets",
    prompt: "What users changed",
    label: "Rejected animals → bigger lists",
    icon: "🦁",
    title: "When a real animal is \"not valid\", the game feels unfair",
    body: [
      "Players typed common animals that the game rejected, because the original hardcoded list held only about 300 entries. A correct answer being refused tells a player their knowledge doesn't count.",
      "I replaced the list with external data files loaded at runtime, cleaned and split into lowercase lookups for case-insensitive validation. The files hold 2,788 animals, 196 countries, and about 108,000 names.",
    ],
    cells: [
      { term: "Keep the list", detail: "Simpler, but legitimate answers keep getting excluded." },
      { term: "Patch entries", detail: "Fixes known gaps but keeps a narrow, hand-maintained list. (A retrospective comparison.)" },
      { term: "Load bigger datasets", detail: "Broader coverage and content separated from logic, with loading and data-quality work to handle." },
    ],
    more: { href: "#validation", label: "Read the full decision" },
  },
  aliases: {
    id: "aliases",
    prompt: "How it works",
    label: "\"USA\" counts as United States",
    icon: "🌍",
    title: "Natural names map to one stored answer",
    body: [
      "Players wrote countries the way they say them, which didn't always match the stored label. A small alias table maps those variations to one entry: USA, US, and America all count as United States; UK, Britain, and England as United Kingdom; plus UAE, Russia, North and South Korea, Burma, and Trinidad.",
      "Because aliases resolve before the duplicate check, saying \"USA\" after \"United States\" is caught as a repeat. Try it in the Countries category.",
    ],
    more: { href: "#validation", label: "Read about validation" },
  },
  feedback: {
    id: "feedback",
    prompt: "What users changed",
    label: "Invalid vs. already used",
    icon: "✗",
    title: "Tell players which rule they broke",
    body: [
      "A wrong answer and a repeated answer are different mistakes, so the game says so: \"is not valid\" versus \"was already used!\" Either way, the input shakes and your turn continues while the clock keeps running.",
      "Clear feedback keeps the competition feeling fair. You know whether to think of something new or check your spelling.",
    ],
    more: { href: "#how-it-works", label: "How a turn is processed" },
  },
};

export const c64Story: Story = {
  glance: [
    { label: "The problem", text: "Access to educational content didn't necessarily give students a reason to engage with it." },
    { label: "The idea", text: "Turn recall into a competition, where knowing more helps you win right now." },
    { label: "The result", text: "A deployed browser game used by 25+ students, some of whom started researching countries, animals, and names on their own to do better." },
  ],
  sections: [
    {
      id: "opportunity",
      kicker: "01 · The opportunity",
      title: "Motivation, not another content library",
      blocks: [
        { type: "p", text: "Concentration 64 grew around a simple premise: knowledge becomes more compelling when someone has a reason to use it. Students already had access to information. The opportunity was to make recalling, and acquiring, that information part of an enjoyable challenge." },
        { type: "p", text: "You compete against a CPU across Animals, Countries, and Names. A countdown, scoring, and a visible game log give each round a competitive structure. You have to give valid entries, avoid repeating used ones, and answer before time expires." },
        { type: "p", text: "The important behavioral observation was what happened beyond a turn: students began independently researching material so they could do better at the game. That suggests the game created a reason to learn, though it doesn't establish lasting learning gains." },
      ],
    },
    {
      id: "ownership",
      kicker: "02 · Ownership",
      title: "I owned the product and used AI assistance to build it",
      blocks: [
        { type: "p", text: "This was an independent project. I conceived the product, directed development using Claude Code, and iterated on the experience after watching how people played." },
        { type: "p", text: "My work included moving the original Python terminal game into the browser, introducing three difficulty levels, replacing a restrictive hardcoded animal list, supporting natural country-name aliases, improving validation feedback, and debugging issues through the browser console." },
        { type: "p", text: "Claude Code assisted the build, so I don't describe the game as hand-coded without AI. Using Claude Code doesn't explain the decisions either. The product story is the problems I recognized, the changes I directed, and the behavior those changes were meant to improve." },
        { type: "p", text: "The build took two days, across five iterations, with four bugs resolved and three versions shipped." },
      ],
    },
    {
      id: "research",
      kicker: "03 · Learning from play",
      title: "Actual play exposed barriers the first design missed",
      blocks: [
        { type: "p", text: "The strongest evidence here comes from live use and feedback rather than a formal interview program." },
        {
          type: "table",
          head: ["Observation", "Interpretation", "Response"],
          rows: [
            ["Running the original version required Python", "Setup was an access barrier", "Move the game to the browser"],
            ["Five seconds was too hard for younger and casual players", "One speed excluded some intended users", "Add 30-, 15-, and 5-second options"],
            ["Common animals were rejected", "The list was narrower than legitimate player knowledge", "Replace the ~300-entry animal list"],
            ["Players typed natural country-name variations", "Valid knowledge could differ from the stored label", "Support aliases"],
            ["Players researched new entries to perform better", "Competition could motivate voluntary learning", "Preserve the competitive recall structure"],
          ],
        },
        { type: "p", text: "More than 25 students played, and all three categories got used. I didn't run a formal recruitment or feedback protocol, so I describe what I observed rather than quote interviews." },
      ],
    },
    {
      id: "definition",
      kicker: "04 · Problem definition",
      title: "A fair, accessible challenge",
      blocks: [
        { type: "p", text: "The game needed to do more than ask questions. Players had to be able to get in easily, understand why an answer succeeded or failed, and find a level of challenge they could actually take part in." },
        { type: "question", text: "How might a recall game give students a reason to learn while avoiding unnecessary barriers to participation?" },
        { type: "p", text: "That framing connects access, difficulty, and validation. A Python requirement could stop someone before playing. An overly short timer could make playing frustrating. A real animal rejected by an incomplete list could make the whole competition feel arbitrary." },
      ],
    },
    {
      id: "browser",
      kicker: "05 · Decision one",
      title: "Remove setup friction with a browser version",
      blocks: [
        {
          type: "table",
          head: ["Element", "Decision story"],
          rows: [
            ["Choice", "Keep the Python terminal game, or convert it into a browser application"],
            ["Evidence", "Players needed Python to run the original version"],
            ["Constraint", "A rapid independent build needed straightforward distribution"],
            ["Decision", "Build with HTML, CSS, and vanilla JavaScript; deploy through GitHub Pages"],
            ["Tradeoff", "Keep scope within a static application rather than add backend-dependent capabilities"],
            ["Outcome", "Players could use the game without installing or running Python"],
          ],
        },
        { type: "p", text: "The architecture is fully static: no backend, no frontend framework, no build system. The word lists are still separate files fetched with `fetch()`; dependency-free doesn't mean there's nothing to load." },
        { type: "p", text: "My reason was simple deployment. I didn't run a formal comparison of frameworks or hosting options." },
      ],
    },
    {
      id: "difficulty",
      kicker: "06 · Decision two",
      title: "Preserve challenge while making speed adjustable",
      blocks: [
        { type: "p", text: "The original game allowed only five seconds per response, which was too difficult for younger and casual players. I added three levels:" },
        {
          type: "table",
          head: ["Difficulty", "Response time"],
          numeric: [1],
          rows: [
            ["Easy", "30 seconds"],
            ["Medium (default)", "15 seconds"],
            ["Hard", "5 seconds"],
          ],
        },
        { type: "p", text: "Rather than removing time pressure entirely, this keeps the competitive idea while letting more players take part. It's a concrete accessibility improvement to the difficulty design, not a complete accessibility audit." },
        { type: "p", text: "The tradeoff is that changing the time changes the challenge. I haven't measured completion rates or preferences by level, or whether these intervals are optimal. Those would be useful next measurements." },
      ],
    },
    {
      id: "validation",
      kicker: "07 · Decision three",
      title: "Fix the validation system rather than blame the answer",
      blocks: [
        { type: "p", text: "Real players typed common animals that the game rejected, because the original hardcoded list contained only about 300 entries." },
        { type: "p", text: "I replaced that approach with data files loaded at runtime. The current files hold **2,788 animals, 196 country entries, and about 108,000 names**. The game splits and cleans each file, then builds lowercase lookups so validation is case-insensitive." },
        { type: "p", text: "Country aliases address a related problem: a player's natural name for a country can differ from the stored entry. The game also uses different messages for invalid and duplicate answers, so players know which rule they broke." },
        {
          type: "table",
          caption: "Only the replacement was a decision at the time; the middle row is a retrospective comparison.",
          head: ["Option", "Implication"],
          rows: [
            ["Keep the original animal list", "Simpler content handling, but legitimate answers continue to be excluded"],
            ["Patch individual missing entries", "Addresses known examples while keeping a narrow, hand-maintained list"],
            ["Load larger datasets", "Broader coverage and better content separation, with loading and data-quality concerns to handle"],
          ],
        },
        { type: "p", text: "A larger dataset improves coverage but doesn't guarantee correct or appropriate content. The names file, for instance, contains many case-only duplicates. Provenance, duplicates, and alias completeness are still worth reviewing." },
      ],
    },
    {
      id: "play-loop",
      kicker: "08 · Scope",
      title: "From prototype to a complete play loop",
      blocks: [
        { type: "p", text: "The deployed game includes category and difficulty choices, a live countdown with a visual timer bar, a CPU \"thinking\" state, scoring, a used-entry counter, and a real-time game log. Results lead to win, loss, or draw, then to replay or the menu." },
        { type: "p", text: "That scope made it a usable game rather than an isolated validation demo. The CPU is deliberately simple and predictable: after a 2.5-second pause, it picks a random unused entry from the same list." },
        { type: "p", text: "I didn't use a named prioritization framework for this project. Looking back, the delivered scope put the complete play loop, fair validation, and simple deployment first." },
      ],
    },
    {
      id: "how-it-works",
      kicker: "09 · How it works",
      title: "Loading content and processing a turn",
      blocks: [
        { type: "h3", text: "Loading content" },
        { type: "p", text: "The browser loads the static interface and script, then fetches the category word lists as plain-text files. Each file is split into lines, trimmed, and turned into a lowercase lookup that maps back to the display label. These are content files, not a live animal, country, or name API." },
        { type: "h3", text: "Processing a turn" },
        {
          type: "list",
          ordered: true,
          items: [
            "Your timer starts at the chosen limit (30, 15, or 5 seconds).",
            "Your answer is trimmed and lowercased, and any alias is resolved to its stored entry.",
            "If it isn't in the list: **\"is not valid\"**. The input shakes and your clock keeps running.",
            "If it's already been used by either player: **\"was already used!\"**. Same treatment.",
            "If it's valid and new: you score, the timer stops, and the CPU \"thinks\" for 2.5 seconds before naming a random unused entry and scoring.",
            "Your timer restarts. If it reaches zero, the game ends and the higher score wins; if every entry is used, the category is exhausted.",
          ],
        },
        { type: "h3", text: "Rules versus AI" },
        { type: "p", text: "Claude Code assisted the build, but gameplay uses programmed validation and a simple CPU. There's no generative model in the runtime experience, and it would be inaccurate to call the CPU an AI just because it's automated. The game has no backend and no accounts." },
      ],
    },
    {
      id: "debugging",
      kicker: "10 · Testing and debugging",
      title: "A code failure and a state-update problem",
      blocks: [
        { type: "p", text: "Two concrete fixes stand out:" },
        {
          type: "list",
          items: [
            "**A curly-apostrophe syntax error broke JavaScript execution.** I used the browser console to diagnose it and corrected the syntax so the game could run again.",
            "**Menu entry counts went stale** after I introduced dynamic content loading. I fixed the display so the menu reflects the data that actually loaded.",
          ],
        },
        { type: "p", text: "The animal-validation failure was also discovered through live player feedback, and it led to the broader change in how content is loaded." },
      ],
    },
    {
      id: "results",
      kicker: "11 · Outcome",
      title: "Evidence supports adoption and voluntary research",
      blocks: [
        {
          type: "table",
          head: ["Evidence", "Supported takeaway", "Limitation"],
          rows: [
            ["25+ students played the game", "Real people played beyond a solo demo", "Unique users and measurement period weren't formally tracked"],
            ["All three categories were used", "The experience extended beyond one content set", "No usage breakdown by category"],
            ["Students researched countries, animals, and names", "Some players sought out knowledge to perform better", "Frequency and durability aren't quantified"],
            ["Five iterations, three versions", "The product changed in response to play", "Version chronology isn't fully documented"],
          ],
        },
        { type: "p", text: "The outcome I can defend is that students used the game and some started researching on their own. Claims about grades or screen time would need much stronger measurement before I'd make them." },
      ],
    },
    {
      id: "strategy",
      kicker: "12 · Strategy",
      title: "The next useful experiment",
      blocks: [
        { type: "p", text: "**Target user:** students who could use a motivating reason to engage with knowledge; younger and casual players needed adjustable difficulty." },
        { type: "p", text: "**Value proposition:** a quick competitive recall game that makes knowing more useful immediately." },
        { type: "p", text: "**Strategic choice:** keep access and deployment simple, then improve the fairness and usability of the core loop based on actual play." },
        { type: "p", text: "**Proposed success measures:** completed games, voluntary replays, return play, invalid-answer complaints, and performance across difficulty levels. A separate learning assessment would be needed to evaluate retained knowledge." },
        { type: "p", text: "**Tradeoff:** time pressure creates excitement and can also discourage participation. Larger content sets improve coverage while increasing loading and quality-control demands." },
        { type: "p", text: "**Next step:** test whether players complete a first game and choose to replay, with observations separated by difficulty. These are recommendations, not experiments I've already run." },
      ],
    },
    {
      id: "reflection",
      kicker: "13 · Reflection",
      title: "Small implementation choices decide whether a challenge feels fair",
      blocks: [
        { type: "p", text: "A rejected animal wasn't simply a dataset issue: it told a player that their correct knowledge didn't count. The five-second timer created a similar mismatch between the intended challenge and the people who wanted to play." },
        { type: "p", text: "If I repeated the project, I'd keep the rapid feedback loop but document observations more systematically: what happened, which version the player used, what changed, and whether the change solved the problem. I'd also separate engagement evidence from learning evidence from the beginning." },
        { type: "p", text: "The most encouraging observation was students choosing to research new material so they could perform better. The next question is whether that motivation persists and produces knowledge they keep beyond a session." },
      ],
    },
    {
      id: "future",
      kicker: "14 · What's next",
      title: "A small library of recall games",
      blocks: [
        { type: "p", text: "**Proposed vision:** a small library of recall games where students explore new categories and practice at an appropriate challenge level." },
        { type: "p", text: "The hard part is keeping content quality and fairness as categories and player needs expand. A smaller first experiment would add one reviewed category and watch first-game completion, replay, and answer disputes. Personalized progression stays a future concept until evidence justifies its complexity." },
      ],
    },
  ],
};
