# CONTENT_TODO (private, not served by the site)

Unresolved items, source conflicts, and missing assets. Nothing in this file appears on a page.
Note: if this repository is public on GitHub, this file is visible there. Move it or make the repo private if that matters.

## Assets still needed

| Item | Where it's used | Current state |
|---|---|---|
| Résumé PDF | `/resume` download button | No file supplied. The page shows an HTML résumé; the download button stays hidden until `site.resumePdf` in `content/site.ts` points to a file in `/public`. |
| Headshot or personal photo (optional) | About page | None supplied. I didn't crop the team slide photo without your OK. |
| Production domain | Social previews, sitemap | Set `NEXT_PUBLIC_SITE_URL` in Vercel once known. |
| Loopify interface screenshot | Loopify page | Not supplied. The page uses a simulation of its loop logic plus a real code excerpt. |
| Original micro:bit pillbox photo | TAFIA story | Not supplied. |
| Entry-Preneur blog example or archive | Entry-Preneur page | Not supplied. |
| Paramount memo or deck excerpt | Paramount page | Not supplied. |

## Links to confirm

- Live project URLs (TAFIA on Lovable, Concentration 64 and Loopify on GitHub Pages, Jobaholic on Vercel) were supplied by you and are linked. This environment's network policy blocked them, so I couldn't load them myself. Worth a click-through before sharing. The Jobaholic Vercel URL also settles the old site's github.io link.

- Email `leenalexia@outlook.com` and LinkedIn `linkedin.com/in/leennoemialexandre/` confirmed by you. GitHub `github.com/leennoemialexandre` confirmed by cloning its repos.

## Facts to confirm or recover

### TAFIA
- **~25% engagement increase:** baseline, comparison, unit, sample, dates, and calculation are missing. The public page says only that seniors stayed longer.
- **Marketing results conflict:** the deck says $100 of Meta ads produced 98 page views and 11 sign-ups (~11% conversion), plus a 49- or 50-second average session and 0% waitlist drop-off. The draft says four creatives and 1,000+ impressions in three days, with ~3% conversion. The public page says only that game-focused messaging drew the stronger early interest.
- **Team size:** the deck's team slide shows three co-founders; the draft says four people. The public page uses four.
- **Games:** the deck shows Memory Match; the draft names word searches and puzzles. The `tafiaonline` repo has both, plus others. The walkthrough uses a memory game (labeled illustrative); the story uses the draft's wording.
- Medium-tier trigger examples and complete matching logic.
- Interview recruitment, the senior/caregiver split, and unique participant count (50+ is interviews, not unique people).
- Reflection paragraphs come from your draft's *proposed* reflections. Please approve or rewrite them, since they're in first person.
- Privacy: the medication name and your name are blurred in the screenshots. The Customer Story slide (family photo and health details) and the team photos are not used.

### Concentration 64
- **Dataset counts:** the draft says 194 countries and 108,000+ names. The actual files have **196** non-empty country lines and **107,973** name lines, about 10,400 of which are case-only duplicates. The site says "196" and "about 108,000".
- Calendar dates and version history for the five iterations and three versions.
- The two of the four bugs that aren't identified.
- Grades rising from C/D to A/B and a ~3-hour TikTok reduction are **excluded** pending measurement context.
- One addition to the ported game: it stops if the visitor switches tabs. This is disclosed on the page.

### Jobaholic
- Origin story: what prompted the build.
- One concrete feedback → change → result example.
- Supabase row-level security policies (not in the repo).
- Active user count. The old site said ~20 users; that isn't published.

### Pinterest
- The 3% commission rationale and who pays it.
- Course name, dates, team size, and the division of work.
- The deck's indirect upside scenarios ($250M–$500M ad revenue) are not presented, because they aren't bottom-up modeled.
- The draft said upstream inputs weren't recoverable. The deck supplies them (25%, 1.5%, $50, 50%), so the page uses the deck's chain.

### Hospital analysis
- Source-field verification for net income ÷ net patient revenue. The site calls it the "analyzed margin ratio" and notes the paper's "operating margin" label.
- Row counts at each filter step (not recorded; none are shown).
- **Observation count:** the final sample is 3,103, but the model-2 output shows 3,033 observations. The page explains this as listwise deletion of missing predictors. Please confirm.
- **Ownership labels in the paper differ:** the SQL text calls type 5 "Proprietary–Partnership"; the chart text calls it "for-profit chain". The site uses the SQL description.
- The draft didn't know about the multivariate OLS, Ridge, and train/test work. The supplied paper documents them, so the site includes them.

### Entry-Preneur
- Role title and dates. The old site says "Product Management Intern, Aug 2023 – Feb 2024"; the draft says to confirm.
- The ~10% sales figure is excluded; the public page makes no causal sales claim.
- Recruitment, interview guide, and the competitor matrix.

### Paramount
- Dates, team size, original sources, and the memo itself.

### About and résumé
- Roles and dates come from your previous portfolio. Crisis Text Line metrics (100+ conversations, 90%+ positive feedback) and the BlackGen "leading minority-owned" description were left out until confirmed.
- The previous site described TAFIA as "Sep 2025 – Present"; the site follows the draft (Sep–Dec 2025).
- The previous site's TAFIA claims ("AI virtual care companion", "escalation logic", "~11% conversion") conflict with the draft and were not used.

## Not included by design
- GuardAI legal memo (not in the requested work list).
- Tradeparency (separate project in this repository).
