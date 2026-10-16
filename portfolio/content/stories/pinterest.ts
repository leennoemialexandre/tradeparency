import type { Decision, Story } from "@/lib/story";

export const pinterestDecisions: Decision[] = [
  {
    id: "inhouse",
    prompt: "Why we chose this",
    label: "Build it in-house",
    icon: "📌",
    title: "Discovery happened on Pinterest; the affiliate economics happened elsewhere",
    body: [
      "Creators could already use affiliate links on Pinterest, but through outside programs like LTK, ShopMy, and Amazon Associates. Our thesis was that Pinterest could connect discovery, creator incentives, and affiliate monetization through its own program inside the Creator Program.",
    ],
    cells: [
      { term: "Alternatives (looking back)", detail: "Leave the workflow unchanged, or partner more closely with external affiliate providers." },
      { term: "Tradeoff", detail: "Pinterest would take on operational, technical, merchant, and trust responsibilities it doesn't carry today." },
      { term: "Caveat", detail: "Existing external arrangements can't simply be assumed to migrate. Pinterest would have to earn creators' and merchants' participation." },
    ],
    more: { href: "#decisions-detail", label: "Read the full decision" },
  },
  {
    id: "take",
    prompt: "My contribution",
    label: "Model a 3% commission",
    icon: "%",
    title: "Make the revenue mechanism explicit",
    body: [
      "I worked on the bottom-up assumptions and model. The model applied a 3% platform commission to recaptured sales, with 15% assumed to stay with creators. At the base case, that's the $18.15M figure.",
      "Looking back, the commission and adoption shouldn't be treated as independent. A take rate that improves modeled revenue could reduce the creator or merchant participation the revenue depends on.",
    ],
    more: { href: "#model", label: "Walk through the model" },
  },
  {
    id: "trust",
    prompt: "What we weighed",
    label: "Trust is part of the business case",
    icon: "◐",
    title: "Monetized recommendations change how users read them",
    body: [
      "We considered disclosure, transparency, user experience, and privacy alongside monetization. A program can encourage monetized content while changing how users interpret recommendations, so the strategy had to explain commercial relationships without overwhelming discovery.",
      "Specific disclosure designs and user reactions were not tested. They remain design and validation work.",
    ],
    more: { href: "#decisions-detail", label: "Read more" },
  },
  {
    id: "next",
    prompt: "What I'd do next",
    label: "Pilot before scaling",
    icon: "→",
    title: "Gate expansion on evidence",
    body: [
      "Our roadmap ran through development, testing, scaling, and marketing. If I revisited it, I'd make each step conditional: can creators use the workflow without friction, can sales be attributed and reconciled, will creators and merchants join on these terms, do users still trust what they see, and does revenue cover the cost of running it?",
    ],
    more: { href: "#roadmap", label: "See the proposed gates" },
  },
];

export const pinterestStory: Story = {
  glance: [
    { label: "The question", text: "When creator content helps people discover products on Pinterest, could Pinterest take part more directly in the affiliate economics that discovery creates?" },
    { label: "Our proposal", text: "An in-house affiliate program inside the Creator Program, with creator incentives, clear disclosures, and a staged rollout." },
    { label: "My role", text: "Platform, monetization, and competitive research, the bottom-up assumptions and model, trust considerations, recommendations, and the presentation. The final proposal was a team output." },
  ],
  sections: [
    {
      id: "thesis",
      kicker: "01 · The thesis",
      title: "Discovery created value that other platforms monetized",
      blocks: [
        { type: "p", text: "Our NYU Stern team examined Pinterest as a visual discovery platform with a growing connection to commerce. In the data we used, Pinterest reported 537 million monthly active users in Q3 2024, and 55% of users described it as a place to shop." },
        { type: "p", text: "The monetization problem we identified was a separation between where users discovered products and where affiliate economics were captured. Pinterest permitted affiliate links, but through third-party systems such as LTK, ShopMy, and Amazon Associates, and it had no integrated in-house program." },
        { type: "callout", tone: "limit", title: "A hypothesis, not proof", text: "Not every off-platform purchase is lost Pinterest revenue. External platforms supply merchant relationships, attribution, tools, and services that help make transactions happen. The case depends on the share Pinterest could realistically serve and recapture." },
      ],
    },
    {
      id: "contribution",
      kicker: "02 · Ownership",
      title: "I worked on both the strategy and its financial assumptions",
      blocks: [
        { type: "p", text: "My work included company and platform research, creator-monetization analysis, affiliate-leakage analysis, competitive analysis, user-experience and trust considerations, strategic recommendations, the bottom-up financial assumptions and model, and presentation development." },
        { type: "p", text: "I use \"I\" for those contributions and \"we\" for the recommendation and final presentation, which belonged to the team." },
      ],
    },
    {
      id: "participants",
      kicker: "03 · Definition",
      title: "The proposal had to work for three participants",
      blocks: [
        {
          type: "table",
          head: ["Participant", "Need addressed", "Assumption to validate"],
          rows: [
            ["Creators", "Generate affiliate links inside the platform's own creator workflow", "The economics and workflow are attractive enough to adopt"],
            ["Users", "Discover shoppable products with understandable commercial relationships", "Affiliate content stays useful and trustworthy"],
            ["Pinterest", "Take part in the commerce value that discovery creates", "Captured commission exceeds the cost and risk of running the program"],
          ],
        },
        { type: "question", text: "How might Pinterest capture a viable share of creator-led affiliate commerce while preserving the discovery experience?" },
      ],
    },
    {
      id: "research",
      kicker: "04 · Research",
      title: "Platform and competitive analysis",
      blocks: [
        { type: "p", text: "We analyzed Pinterest's platform, creator monetization, affiliate leakage, and the competitive environment. TikTok offered high engagement and integrated e-commerce; Amazon's program offered direct control, analytics, and strong conversion. We saw Pinterest's mix of inspiration, creativity, and shopping as a potential differentiator." },
        { type: "p", text: "Creators faced their own friction: a fragmented workflow, variable commissions, and limited integration. We used BCG growth-share framing to describe Pinterest as a \"Star\" whose position needed maintaining." },
        { type: "p", text: "This was secondary research: platform and competitive analysis, without creator interviews, surveys, or usability tests." },
      ],
    },
    {
      id: "recommendation",
      kicker: "05 · Recommendation",
      title: "Put affiliate-link creation inside the creator workflow",
      blocks: [
        { type: "p", text: "We proposed an in-house affiliate program integrated into Pinterest's Creator Program: a one-stop place to generate affiliate links during Pin creation, track clicks, conversions, and commission in a dashboard, and receive payouts directly." },
        {
          type: "figure",
          src: "/images/pinterest/affiliate-concept.jpg",
          width: 677,
          height: 1321,
          label: "Team concept mockup",
          alt: "A phone mockup of Pinterest's Create Pin screen with a new field labeled Generate Affiliate Link circled in red, between the description and Pick a board.",
          caption: "Our concept, from the deck: a \"Generate Affiliate Link\" field added to the existing Create Pin flow. It's a mockup of a proposal, not a shipped Pinterest feature.",
        },
        { type: "p", text: "The project considered creator incentives, commission structure, user experience, disclosure, data security and privacy, engagement, implementation, and competitive differentiation. The intended chain was creator content → product discovery → attributable commerce → affiliate economics." },
        { type: "p", text: "We didn't specify checkout, attribution windows, or the full payout mechanics, so it's a strategy and product concept, not a payment or tracking system design." },
      ],
    },
    {
      id: "decisions-detail",
      kicker: "06 · Decisions",
      title: "Three strategic choices frame the proposal",
      blocks: [
        { type: "h3", text: "Build in-house rather than leave the workflow unchanged" },
        {
          type: "table",
          head: ["Element", "Explanation"],
          rows: [
            ["Evidence", "Third parties captured affiliate economics associated with discovery on Pinterest"],
            ["Chosen direction", "Integrate an in-house affiliate program into the Creator Program"],
            ["Alternatives (looking back)", "Keep the existing workflow, or partner more closely with external providers"],
            ["Benefit to test", "More direct participation in commerce and a more connected creator workflow"],
            ["Tradeoff", "Pinterest assumes operational, technical, merchant, and trust responsibilities"],
            ["Outcome", "A team proposal and financial model; not adopted by Pinterest as far as I know"],
          ],
        },
        { type: "h3", text: "Model a 3% platform commission" },
        { type: "p", text: "The model applied a 3% Pinterest commission to recaptured sales, assuming creators kept 15%. That makes the revenue mechanism explicit. What it doesn't settle is who pays the fee, how it was benchmarked, and how it interacts with adoption, all of which matter to the business case." },
        { type: "h3", text: "Treat trust as part of the commercial design" },
        { type: "p", text: "We weighed disclosure, transparency, and privacy alongside monetization. The strategy needed to explain commercial relationships without overwhelming discovery. Specific disclosure designs and tested user reactions weren't part of the project." },
      ],
    },
    {
      id: "model",
      kicker: "07 · The model",
      title: "The financial case is a modeled opportunity, not realized revenue",
      blocks: [
        { type: "p", text: "The model is a chain of assumptions. Here it is exactly as the deck presents it:" },
        {
          type: "table",
          numeric: [2],
          head: ["Step", "Assumption", "Result"],
          rows: [
            ["Monthly active users", "Q3 2024 reported figure", "537M"],
            ["Shopping-focused users", "25% of MAUs actively shop", "134.25M"],
            ["Monthly affiliate sales", "× 1.5% conversion × $50 average order", "$100.69M"],
            ["Annual affiliate sales", "× 12 months", "≈ $1.21B"],
            ["Recapturable sales", "50% assumed to leak to Amazon/LTK", "$605M"],
            ["**Platform revenue**", "× 3% commission", "**$18.15M / year**"],
            ["Full-recapture scenario", "All $1.21B × 3%", "$36.3M / year"],
          ],
        },
        { type: "callout", tone: "limit", title: "How to read these numbers", text: "**$18.15M is modeled annual platform revenue**, before any costs. It isn't actual revenue, and it isn't profit. The chain treats each shopping user as converting at 1.5% a month, which is a simplification of how often people actually buy. The deck also rounds annual sales to $1.21B before the last steps; unrounded, the chain gives about $18.12M." },
      ],
    },
    {
      id: "sensitivity",
      kicker: "08 · Sensitivity",
      title: "What the headline depends on",
      blocks: [
        { type: "p", text: "The table below is **new arithmetic I added afterwards** to show how directly the result moves. It wasn't part of the original project, and no scenario is more likely than another." },
        {
          type: "table",
          caption: "Illustrative: annual platform revenue by recaptured sales volume and commission rate.",
          numeric: [1, 2, 3],
          head: ["Annual recaptured sales", "2% commission", "3% commission", "4% commission"],
          rows: [
            ["$302.5M (half the base)", "$6.05M", "$9.08M", "$12.10M"],
            ["$605M (team base)", "$12.10M", "**$18.15M**", "$24.20M"],
            ["$1.21B (full recapture)", "$24.20M", "**$36.30M**", "$48.40M"],
          ],
        },
        { type: "p", text: "The harder strategic question is whether those inputs move independently. A higher commission could make adoption less attractive, and aggressive monetization could affect trust. Without implementation and operating costs, none of these figures establishes profit or return on investment." },
      ],
    },
    {
      id: "roadmap",
      kicker: "09 · Implementation",
      title: "From a four-stage roadmap to evidence gates",
      blocks: [
        { type: "p", text: "Our roadmap ran through development, testing, scaling, and marketing. Looking back, I would make expansion conditional on evidence:" },
        {
          type: "table",
          caption: "Proposed gates, added in hindsight; not part of the original roadmap.",
          head: ["Gate", "What would need to be learned"],
          rows: [
            ["Creator workflow", "Can creators generate and use links without avoidable friction?"],
            ["Attribution", "Can eligible transactions be measured consistently and reconciled?"],
            ["Incentives", "Will creators and merchants participate on the proposed terms?"],
            ["Trust", "Do users understand the relationship and still find recommendations useful?"],
            ["Economics", "Does revenue justify acquisition, support, technical, and operating costs?"],
          ],
        },
      ],
    },
    {
      id: "technical",
      kicker: "10 · Technical understanding",
      title: "Specify what must happen before naming a stack",
      blocks: [
        { type: "p", text: "This project didn't produce a working affiliate system. Its technical side is understanding what a real one would require: connecting a creator and an eligible product link to a Pin, attributing qualifying purchases, and reconciling commission records." },
        { type: "p", text: "Open questions include attribution windows, cross-device behavior, duplicate credit, cancellations and returns, fraud, reporting delays, merchant integration, and creators' access to earnings data. The concept doesn't need AI, and I don't add it to sound technical." },
      ],
    },
    {
      id: "limits",
      kicker: "11 · Outcome and limits",
      title: "What we produced, and what it doesn't show",
      blocks: [
        { type: "p", text: "We produced a proposal for an in-house affiliate program, an implementation roadmap, and a modeled $18.15M annual platform-revenue opportunity under base assumptions ($36.3M under full recapture)." },
        {
          type: "list",
          items: [
            "Adoption and recapture were assumptions, not observations.",
            "Costs weren't modeled, so there's no profit or ROI claim.",
            "Trust and technical feasibility weren't validated with a live test.",
            "The user figures are historical, from Q3 2024.",
          ],
        },
        { type: "p", text: "Proposed validation would measure creator activation and repeat use, qualifying sales, net commission after reversals, user comprehension of disclosures, and operating effort." },
      ],
    },
    {
      id: "reflection",
      kicker: "12 · Reflection",
      title: "Strategy has to explain why people change behavior",
      blocks: [
        { type: "p", text: "This project helped me connect product strategy with the mechanics of a revenue model. Identifying value a platform helps create is only the beginning; the strategy also has to explain why participants would change behavior and what the platform would have to operate." },
        { type: "p", text: "If I repeated the analysis, I'd make the assumptions visible from the start, separate sales volume, platform revenue, and contribution after costs, then test which assumptions move the recommendation most." },
        { type: "p", text: "I'd also treat creator incentives and user trust as drivers of the financial outcome. A higher commission looks attractive in isolation, but it isn't an improvement if it discourages adoption or weakens the experience." },
      ],
    },
    {
      id: "future",
      kicker: "13 · What's next",
      title: "A small pilot first",
      blocks: [
        { type: "p", text: "**Proposed vision:** a creator-commerce workflow connecting inspiration, transparent affiliate participation, and useful performance feedback." },
        { type: "p", text: "A smaller first experiment would test link generation and clear disclosures with a limited group of consenting creators and merchants, comparing workflow use, attribution quality, and user understanding before expanding. This is a future concept, not delivered work." },
      ],
    },
  ],
};
