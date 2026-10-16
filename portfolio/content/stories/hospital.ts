import type { Decision, Story } from "@/lib/story";

export const hospitalDecisions: Decision[] = [
  {
    id: "floor",
    prompt: "Why I chose this",
    label: "A $1M revenue floor",
    icon: "$",
    title: "Tiny denominators were inventing catastrophes",
    body: [
      "My first margin calculation returned values below −100,000,000%. Some hospitals reported net patient revenue of 1 or similarly tiny amounts, so any loss divided by them exploded.",
      "I set a $1M floor, then also limited the ratio to −1 through +1 because outliers remained.",
    ],
    cells: [
      { term: "Benefit", detail: "Reduces the pull of unstable observations on the working sample." },
      { term: "Tradeoff", detail: "Could exclude genuine financial distress or unusually high values." },
      { term: "Still open", detail: "How sensitive the findings are to these particular thresholds." },
    ],
    more: { href: "#cleaning", label: "Read the full decision" },
  },
  {
    id: "sth",
    prompt: "Why I chose this",
    label: "Short-Term Hospitals only",
    icon: "▤",
    title: "Narrow the comparison so it means something",
    body: [
      "I restricted the analysis to Short-Term Hospitals instead of treating every facility type as interchangeable. A focused sample is easier to interpret, but its statistics describe that sector, not every hospital in the source data.",
    ],
    more: { href: "#comparability", label: "Read the full decision" },
  },
  {
    id: "assoc",
    prompt: "How to read it",
    label: "Associations, not prescriptions",
    icon: "≈",
    title: "Weak relationships are questions, not instructions",
    body: [
      "Occupancy had a weak positive association with the margin ratio; labor-cost and uncompensated-care shares had weak negative ones. Even the fullest model explained under 10% of the variation.",
      "None of this says a hospital should cut labor or chase occupancy. It says these measures move together slightly across hospitals, and that most of what drives margins (payer mix, market power, management, regulation) isn't in the model.",
    ],
    more: { href: "#findings", label: "See the findings" },
  },
  {
    id: "ridge",
    prompt: "What I tested",
    label: "Did Ridge regression help?",
    icon: "↯",
    title: "Shrinking the coefficients didn't improve anything",
    body: [
      "Heavy-tailed residuals made me check whether a regularized model would be more stable. Cross-validated Ridge (α ≈ 104.8) fit almost identically in-sample (R² 0.0698 vs 0.070) and did slightly worse on held-out data (test R² 0.0407 vs 0.0589 for OLS).",
      "So I kept the simpler OLS specification. Multicollinearity didn't look like the problem.",
    ],
    more: { href: "#models", label: "See the model comparison" },
  },
];

export const hospitalStory: Story = {
  glance: [
    { label: "The question", text: "How does financial performance vary across hospitals, and how is a margin ratio associated with occupancy, labor costs, uncompensated care, and ownership?" },
    { label: "The challenge", text: "Extreme ratios and differences between hospital types made direct comparisons hard to interpret." },
    { label: "The result", text: "A cleaned sample of 3,103 short-term hospitals, weak but consistent associations, and a model that explains under 10% of the variation, which is itself the finding." },
  ],
  sections: [
    {
      id: "question",
      kicker: "01 · The question",
      title: "Start with the comparison the data can support",
      blocks: [
        { type: "p", text: "For a Spring 2026 data course, I used the 2023 Medicare Hospital Cost Report dataset, which holds hospital-level financial, operational, cost, and structural information. I chose it because I'm interested in where healthcare meets business, especially how financial incentives shape hospital operations." },
        { type: "p", text: "The project had two related tasks: build a dataset that could be queried consistently, then interpret financial and operational relationships without overstating them." },
        { type: "question", text: "Which patterns stay interpretable after accounting for obvious data-quality and comparability problems?" },
        { type: "callout", tone: "limit", title: "About the label", text: "The ratio I analyzed is **net income ÷ net patient revenue**. My original paper calls it \"operating margin\". Until I've checked those source fields against the dataset documentation, I call it the **analyzed margin ratio** here. Every number below refers to that calculation and the filtered sample." },
      ],
    },
    {
      id: "ownership",
      kicker: "02 · Ownership",
      title: "I owned the analytical workflow, with AI assistance",
      blocks: [
        { type: "p", text: "I completed the project independently, with ChatGPT assisting. I imported the data into PostgreSQL, organized it into relational tables, built the integrated analytic dataset, investigated extreme values, applied the cleaning rules, ran the analysis in a Jupyter notebook, and interpreted the results in a business context." },
        { type: "p", text: "This was an academic analysis, not consulting work. No hospital acted on it." },
      ],
    },
    {
      id: "schema",
      kicker: "03 · Data model",
      title: "Organize the data before asking cross-domain questions",
      blocks: [
        { type: "p", text: "The source arrived as one CSV. I normalized it into four tables, following third-normal-form principles to cut redundancy, all keyed on `provider_ccn`." },
        {
          type: "table",
          head: ["Table", "What it holds", "Used for"],
          rows: [
            ["hospitals", "Name, location, rural/urban, facility type, provider type, type of control, beds", "Defining hospital types and ownership"],
            ["financials", "Net patient revenue, net income, total income, total patient revenue", "The margin ratio"],
            ["costs", "Total costs, adjusted salaries, unreimbursed and uncompensated care, charity care, bad debt, depreciation", "Labor and uncompensated-care ratios"],
            ["utilization", "FTEs, total patient days, bed-days available, discharges", "Occupancy"],
          ],
        },
        { type: "p", text: "A shared identifier doesn't by itself prove one-to-one joins. Auditing record grain, duplicates, and reporting periods is on my list of checks." },
      ],
    },
    {
      id: "metrics",
      kicker: "04 · Metrics",
      title: "Define the metrics explicitly",
      blocks: [
        { type: "p", text: "Each measure was built directly in SQL with explicit numeric casts:" },
        {
          type: "table",
          head: ["Measure", "Calculation", "Reading it carefully"],
          rows: [
            ["Analyzed margin ratio", "Net income ÷ net patient revenue", "The financial label needs verifying against source definitions"],
            ["Occupancy rate", "Total days (all payers) ÷ total bed-days available", "Numerator and denominator should cover the same period and population"],
            ["Labor cost ratio", "Adjusted salaries ÷ total costs", "A cost share, not a measure of staffing adequacy or productivity"],
            ["Uncompensated care ratio", "Unreimbursed and uncompensated care ÷ total costs", "Component definitions and overlaps need confirming"],
          ],
        },
        { type: "p", text: "Explicit formulas matter because a familiar label can hide a different calculation. If the source-field review changes the intended measure, the right move is to recalculate and rerun, not just relabel the old result." },
      ],
    },
    {
      id: "cleaning",
      kicker: "05 · Decision one",
      title: "Investigate extreme ratios before interpreting averages",
      blocks: [
        { type: "p", text: "The first calculation produced economically implausible margins, some below −100,000,000%. Looking closer, several hospitals reported net patient revenue of 1 or other tiny values, creating explosive ratios." },
        { type: "p", text: "I applied a **$1 million net patient revenue floor**, removed null and invalid-denominator cases, and restricted the ratio to **−1 through +1**." },
        {
          type: "table",
          head: ["Element", "Choice"],
          rows: [
            ["Problem", "Extreme ratios driven by very small denominators"],
            ["Evidence", "Inspection linked distorted ratios to tiny net patient revenue values"],
            ["Action", "A $1M floor, denominator checks, and a −100% to +100% restriction"],
            ["Benefit", "Less influence from unstable observations"],
            ["Tradeoff", "May exclude genuine financial distress or unusually high values"],
            ["Still open", "How sensitive the results are to these thresholds"],
          ],
        },
        { type: "p", text: "These are analytical exclusions, not proof that every excluded record was wrong. The filter changes who the results represent. Flagging rather than dropping, or comparing several thresholds, would be good next checks." },
      ],
    },
    {
      id: "comparability",
      kicker: "06 · Decision two",
      title: "Restrict the sample for comparability",
      blocks: [
        { type: "p", text: "The final analysis includes only **Short-Term Hospitals**, narrowing the comparison rather than treating every hospital category as interchangeable. The final sample is **3,103 hospitals**." },
        { type: "p", text: "The tradeoff is scope: a focused sample is easier to interpret, but its statistics shouldn't be read as a summary of every hospital in the source data." },
      ],
    },
    {
      id: "findings",
      kicker: "07 · Findings",
      title: "What the descriptive analysis found",
      blocks: [
        {
          type: "table",
          numeric: [1],
          head: ["Result", "Value", "Supported reading"],
          rows: [
            ["Final filtered sample", "3,103", "Short-term hospitals after all exclusions"],
            ["Mean ratio", "≈ 4.3%", "Descriptive average in this sample"],
            ["Median ratio", "≈ 4.55%", "Close to the mean, so the tails don't dominate"],
            ["Interquartile range", "−3.3% to 13.0%", "The middle half of hospitals"],
            ["Occupancy, r", "+0.197", "Weak positive association"],
            ["Labor cost ratio, r", "−0.127", "Weak negative association"],
            ["Uncompensated care ratio, r", "−0.133", "Weak negative association"],
          ],
        },
        { type: "p", text: "Ownership mattered descriptively: proprietary partnerships averaged about 12% and proprietary corporations about 8%, while city-county and county government hospitals averaged below zero. Government hospital districts were an exception among public hospitals at about 6%. Public hospitals often serve safety-net roles, and some public subsidies may not show up in net patient revenue." },
        { type: "callout", tone: "limit", title: "Reading coefficients", text: "A correlation of +0.197 is not a 19.7% increase in margin, and −0.127 is not a 12.7% reduction. These describe association, not the effect of changing anything. They don't justify telling a hospital to increase occupancy or cut labor." },
      ],
    },
    {
      id: "models",
      kicker: "08 · Models",
      title: "Adding predictors, then checking stability",
      blocks: [
        { type: "p", text: "I then fit a sequence of regressions to see how much of the variation these measures could account for together." },
        {
          type: "table",
          numeric: [1],
          head: ["Model", "R²", "What changed"],
          rows: [
            ["1 · Occupancy only (OLS)", "0.039", "Positive, statistically significant slope"],
            ["2 · + labor and uncompensated-care ratios", "0.070", "All three significant; uncompensated care has the largest negative coefficient"],
            ["3 · + ownership type (dummies)", "0.098", "Ownership adds explanatory power; earlier predictors keep their signs"],
            ["Ridge check (vs. model 2)", "0.0698", "Strong shrinkage, no improvement in fit"],
          ],
        },
        { type: "p", text: "On an 80/20 train/test split, OLS held up slightly better than Ridge (test R² 0.0589 vs. 0.0407; RMSE 0.1648 vs. 0.1664), so I kept the simpler model." },
        { type: "p", text: "Residuals were heavy-tailed (kurtosis ≈ 8.7, Jarque–Bera strongly rejecting normality) but centered on zero without obvious curvature. With about 3,000 observations, the coefficient estimates are reasonably stable, though the tails are a reason for caution." },
        {
          type: "figure",
          src: "/images/hospital/ols.png",
          width: 1342,
          height: 1194,
          label: "statsmodels OLS summary · model 2",
          alt: "statsmodels OLS regression results for operating margin on occupancy rate, labor cost ratio and uncompensated ratio: R-squared 0.070, 3,033 observations, coefficients 0.1409, −0.1816 and −0.3048, all with p-values of 0.000, kurtosis 8.694.",
          caption: "The original regression output for model 2. Note it uses 3,033 complete observations, slightly fewer than the 3,103-hospital sample, because rows missing any predictor drop out.",
        },
        { type: "p", text: "**The modest R² is the substantive finding.** Margins are shaped by forces this dataset doesn't capture well: regional market power, payer mix, competition, management, and regulation." },
      ],
    },
    {
      id: "workflow",
      kicker: "09 · Workflow",
      title: "How the analysis fits together",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Import the source CSV into PostgreSQL.",
            "Normalize it into hospitals, financials, utilization, and cost tables.",
            "Join them on `provider_ccn` into one analytic query.",
            "Inspect ratio behavior and address extreme values.",
            "Restrict to Short-Term Hospitals and build the final sample.",
            "Compute descriptive statistics, ownership comparisons, and correlations.",
            "Fit OLS models in Python (statsmodels, SciPy), check residuals, compare with Ridge, and validate on held-out data.",
            "Translate the results into a business discussion with explicit limits.",
          ],
        },
        { type: "p", text: "There's no user-facing application or AI model here. The technical depth is in data modeling, SQL, metric construction, cleaning, and reproducibility." },
      ],
    },
    {
      id: "validation",
      kicker: "10 · Validation",
      title: "Checks I'd add",
      blocks: [
        { type: "p", text: "Completed: investigating extreme values, denominator checks, removing null and invalid records, restricting the hospital category, regression diagnostics, a Ridge comparison, and a held-out test. These would make it stronger:" },
        {
          type: "table",
          head: ["Check", "Why it matters"],
          rows: [
            ["Reconcile row counts at each filter", "Make every exclusion visible"],
            ["Audit uniqueness and join cardinality", "Catch multiplied or lost hospital records"],
            ["Verify fields against the data dictionary", "Make sure the financial label matches the calculation"],
            ["Inspect excluded groups", "Understand who the final sample represents"],
            ["Vary the revenue floor and ratio limits", "See whether findings depend on discretionary thresholds"],
            ["Report valid pairs for each correlation", "Make sample differences visible"],
          ],
        },
      ],
    },
    {
      id: "implications",
      kicker: "11 · Implications",
      title: "Business implications stay hypotheses",
      blocks: [
        { type: "p", text: "For an analytical audience, the value of this project is the link between data quality and interpretation. An apparently precise relationship is hard to use if the metric, population, or denominator is poorly understood." },
        { type: "p", text: "Occupancy's weak positive association raises a question about capacity utilization. The cost-share associations raise questions about operating context and care burden. Each would need more controls, definitions, and institutional knowledge before it could inform a real decision." },
        { type: "p", text: "Limits: the unresolved financial label, discretionary exclusions, a single reporting year that doesn't describe current conditions, and no causal design." },
      ],
    },
    {
      id: "reflection",
      kicker: "12 · Reflection",
      title: "Question a ratio before explaining its average",
      blocks: [
        { type: "p", text: "A small denominator can create an extreme value, but removing it also changes the story the dataset can tell. Cleaning is an analytical decision that needs justification and transparency." },
        { type: "p", text: "If I repeated the project, I'd build a data dictionary and exclusion log alongside the queries, and test whether the main findings hold under reasonable alternative thresholds before emphasizing individual coefficients." },
        { type: "p", text: "Most of all, I'd verify the financial measure's definition at the very beginning, so the title, formula, and interpretation all refer to the same thing." },
      ],
    },
    {
      id: "future",
      kicker: "13 · What's next",
      title: "A reproducible report",
      blocks: [
        { type: "p", text: "**Proposed direction:** a reproducible report where a reviewer can inspect metric definitions, exclusions, and subgroup findings together. A first step is to reproduce the analysis from its source extract, publish an exclusion log, and compare a few threshold scenarios. Extending to multiple reporting years would need consistent identifiers and aligned periods." },
      ],
    },
  ],
};
