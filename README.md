# Tradeparency

Tradeparency is a small, functional prototype of a **readiness and education flow** for complex investing products. It is inspired by the product challenges self-directed investing platforms face when customers can tap a few buttons and end up holding something they don't fully understand — a leveraged ETF, an options contract, a spot Bitcoin ETF.

**This is a portfolio piece for a product management interview.** It is not a real trading app, not investment advice, and not affiliated with JPMorgan Chase or any brokerage. No real orders are ever placed and no money moves.

## Product thesis

> Help self-directed investors understand what they are actually buying before they act, without taking away their agency.

Most compliance-driven "education" in trading apps is a wall of legal text nobody reads, or a hard gate that blocks a comprehension quiz until you guess the right answer. Neither actually builds understanding, and both create resentment. Tradeparency tries a third path: **plain-English explanation, a real comparison to adjacent alternatives, a conversational readiness check that never blocks you, and a clearly-labeled simulated trade** — all instrumented so a product team can see exactly where comprehension breaks down.

## The user flow

1. **Select an asset** — three sample complex products: `IBIT` (spot Bitcoin ETF), an `AAPL` call option contract, and `SPYU` (a sample 2x leveraged S&P 500 ETF).
2. **Plain-English explainer** — what you're actually buying, what gives it value, what can go wrong, and who tends to misunderstand it. The AAPL option step also renders realistic sample option-chain data (strike, expiration, bid/ask, IV, delta, theta, open interest).
3. **Comparison view** — the product next to its closest adjacent alternatives (IBIT vs. direct bitcoin vs. MSTR; AAPL stock vs. an AAPL call; a standard index ETF vs. a leveraged ETF).
4. **Readiness check** — two short, conversational comprehension questions.
5. **Adaptive branch** — missing a question never hard-blocks the user. They see a short "let's revisit this" explanation, then continue.
6. **Simulated trade confirmation** — clearly labeled as simulated, with a risk acknowledgement checkbox before "confirming."
7. **Summary** — a personal recap, plus a link to the PM dashboard.

Every step above is logged as an event (see [Instrumentation](#instrumentation--data-model) below), and `/admin` aggregates those events in real time.

## Tech stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS** for styling
- **Supabase** (Postgres) for persistence, preferred — with an automatic **SQLite** fallback for zero-config local development
- Deployable to **Vercel**

## Getting started (one command)

```bash
npm install && npm run dev
```

Then open `http://localhost:3000`. That's it — with no environment variables set, Tradeparency automatically logs events to a local SQLite file at `./data/tradeparency.db`, created on first run.

- `/` — landing page and product thesis
- `/flow` — the guided readiness flow
- `/admin` — the real-time PM dashboard

## Environment variables

Copy `.env.example` to `.env.local` if you want to use Supabase instead of the local SQLite fallback:

```bash
cp .env.example .env.local
```

| Variable | Required? | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Optional | Your Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Optional | Server-side-only key used to write/read event data (never exposed to the browser) |

If both are set, Tradeparency uses Supabase. If either is missing, it silently falls back to the local SQLite file. This means the exact same codebase runs with zero setup locally and with real persistence in production — see `lib/db.ts` for the small abstraction that makes this possible.

### Setting up Supabase (recommended for a real deployment)

1. Create a project at [supabase.com](https://supabase.com).
2. Open the SQL editor and run the contents of [`supabase/schema.sql`](./supabase/schema.sql). This creates a single `events` table with row-level security enabled (the app only ever talks to it through the server-side service role key, never the browser).
3. Copy your project URL and `service_role` key (Project Settings → API) into `.env.local` (locally) or your Vercel project's environment variables (in production).

## Deploying to Vercel

1. Push this repo to GitHub.
2. Import it into [Vercel](https://vercel.com/new).
3. If you want persistent, real analytics in production, set `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` as Vercel project environment variables (Settings → Environment Variables) *before* your first deploy.
   - Without these set, the app still builds and runs on Vercel, but the SQLite fallback writes to Vercel's ephemeral filesystem — event data will not persist reliably across requests/deploys. Supabase is the supported path for a real deployment.
4. Deploy. No other configuration is required.

## Instrumentation & data model

Nothing about the data below is decorative — every event listed here is written by the running app during a real user session, and `/admin` reads it back live.

Events logged, one row per event, all sharing a single `events` table (`supabase/schema.sql`, mirrored in the SQLite fallback):

- `session_started`
- `product_selected`
- `explainer_viewed`
- `comparison_viewed`
- `readiness_question_answered` (includes whether the answer was correct)
- `adaptive_explanation_shown`
- `user_proceeded_after_explanation`
- `simulated_trade_confirmed`
- `session_completed`

Each event carries a `session_id`, the flow `step`, the `product_id` (when applicable), a `question_id` (for readiness events), a `correct` boolean (for readiness answers), and a small `metadata` JSON blob. See `lib/types.ts` for the full shape and `lib/analytics.ts` for how raw events are turned into dashboard metrics.

The `/admin` dashboard (`app/admin/page.tsx`) computes, live, on every page load:

- **Drop-off rate by step** — distinct sessions reaching each stage of the funnel, and the percentage lost at each transition
- **Most missed readiness questions** — ranked by how often each question was answered incorrectly
- **First-try pass rate** — the share of readiness answers correct on the first attempt
- **% of users who needed the adaptive explanation** — of sessions that reached the readiness check
- **% who proceeded after missing a question** — of sessions shown the adaptive explanation
- **Selected product breakdown** — which of the three sample products users chose

## Design direction

The visual language is intentionally institutional rather than flashy: an off-white background, deep navy text, a single restrained blue accent, serif headers for authority, sans-serif body copy, and monospace for data labels and figures. No neon, no gamified trading aesthetics — the goal is to feel like a responsible investing product layer, not a consumer crypto app.

## Content & data disclaimers

- This is an **educational prototype**. It is **not investment advice**.
- This is **not a real trading platform** — **no orders are ever placed** and no money moves.
- All product data (prices, expense ratios, option Greeks, open interest, etc.) is **illustrative or delayed sample data**, clearly labeled as such throughout the app. Nothing implies live market data unless a real market data source is actually connected.
- Tradeparency is **not affiliated with, endorsed by, or representing JPMorgan Chase & Co.** or any brokerage.

## Why this matters for product management

This prototype is a small, working argument about a set of tensions that show up constantly in self-directed investing products, and in regulated fintech more broadly:

- **Trust vs. innovation** — spot Bitcoin ETFs, 0DTE options, and leveraged ETFs are legitimately useful to some investors and legitimately dangerous to others. A platform that wants to offer them responsibly has to design for both truths at once, not pick one.
- **Intentional friction** — the readiness check is friction added on purpose. The bet this prototype makes is that a few seconds of "let's make sure this is landing correctly" produces better outcomes than either no friction (pure self-service) or hard-gated friction (a quiz you must pass to proceed).
- **Product comprehension** — the explainer, comparison, and readiness check are all attempts to make one thing measurable: does the user actually understand the mechanics of what they're about to buy, not just the vibe of it.
- **Complex product education at the moment of decision** — education embedded in the transaction flow itself, not a separate help-center article the user has to go looking for.
- **User agency** — the adaptive branch is the core design decision here. Missing a question surfaces more explanation; it never blocks the user from proceeding. The product should inform judgment, not override it.
- **Self-directed investing behavior** — the flow assumes the user is the decision-maker. The job of the product is to make sure that decision is well-informed, not to make the decision for them or stop them from making it.
- **Measurable product outcomes** — every step is instrumented specifically so a PM can answer questions like "where do people drop off," "which concept do people misunderstand most," and "does showing more explanation actually change completion rates" with real data instead of intuition. The `/admin` dashboard is the artifact that turns "we added an education flow" into "here's what it changed."

## Repository structure

```
app/
  page.tsx              landing page
  flow/page.tsx          the guided readiness flow (client-side state machine)
  admin/page.tsx         real-time PM dashboard (server component)
  api/events/route.ts    event-logging API route
components/              UI building blocks (explainer, comparison, readiness card, trade ticket, etc.)
lib/
  data/products.ts       seeded sample product + readiness question data
  types.ts               shared TypeScript types
  db.ts                  storage abstraction (Supabase, with automatic SQLite fallback)
  analytics.ts           turns raw events into dashboard metrics
  track.ts               client-side event tracking + session id helpers
supabase/schema.sql       Postgres schema for the Supabase backend
```
