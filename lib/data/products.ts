import { Product } from "@/lib/types";

/**
 * All figures in this file are illustrative sample data for a prototype.
 * They are not live market data and should never be treated as such.
 */

export const PRODUCTS: Product[] = [
  {
    id: "IBIT",
    ticker: "IBIT",
    name: "Sample Spot Bitcoin ETF",
    productType: "Spot Bitcoin ETF",
    samplePrice: 61.42,
    sampleExpenseRatio: 0.0025,
    riskLevel: "High",
    returnVolatilityNote:
      "Illustrative: daily price moves of 3-6% are common for bitcoin-linked assets. 12-month drawdowns of 50% or more have occurred multiple times in bitcoin's trading history.",
    whatYoureBuying:
      "Shares of a fund that holds bitcoin on your behalf. You own a claim on the trust's assets — not bitcoin itself. There is no wallet, no private key, and no ability to withdraw or move the underlying coins.",
    whatGivesValue:
      "The share price is designed to track the market price of the bitcoin held by the trust, minus the fund's ongoing management fee. Value comes entirely from bitcoin's price movement — there is no yield, dividend, or interest payment underneath it.",
    whatCanGoWrong: [
      "Bitcoin is highly volatile and has no earnings, interest payments, or fundamental floor to slow a decline.",
      "The fund's management fee is a small, continuous drag versus holding bitcoin directly.",
      "Share price can drift slightly from the fund's net asset value depending on trading activity and market hours.",
      "A custodial, regulatory, or operational issue at the trust level could affect shareholders independent of bitcoin's own price.",
    ],
    whoMisunderstands: [
      "Investors who think they can redeem shares for actual bitcoin or move it to a personal wallet.",
      "Investors who assume the ETF wrapper reduces bitcoin's underlying price volatility.",
      "Investors who treat \"spot\" exposure as a guarantee of perfect, fee-free tracking.",
    ],
    comparison: {
      title: "IBIT vs. direct bitcoin vs. a bitcoin-linked stock",
      intro:
        "Three ways to get bitcoin exposure — each with a different custody model, cost structure, and risk profile.",
      alternatives: [
        {
          name: "Direct bitcoin (exchange or self-custody)",
          description:
            "You buy bitcoin on an exchange and optionally move it to a wallet you control.",
          bullets: [
            "You can hold your own private keys — full custody, full responsibility.",
            "No fund expense ratio, but exchange fees and custody risk apply.",
            "Trades 24/7, unlike ETF shares which only trade during market hours.",
            "No brokerage account protections that come with a regulated fund wrapper.",
          ],
        },
        {
          name: "MSTR (bitcoin-linked operating company)",
          description:
            "A publicly traded company whose balance sheet holds a large bitcoin position alongside its own operating business.",
          bullets: [
            "Price reflects bitcoin holdings plus business performance, debt, and equity market sentiment.",
            "Can be more volatile than bitcoin itself due to leverage and corporate financing decisions.",
            "You're taking on single-company risk on top of bitcoin risk.",
            "No direct claim on the company's bitcoin — you own equity, not the coins.",
          ],
        },
      ],
    },
    readinessQuestions: [
      {
        id: "ibit_q1",
        prompt:
          "Quick check — if you buy IBIT, can you withdraw actual bitcoin from it into your own wallet?",
        options: [
          { id: "yes", label: "Yes, I can redeem shares for bitcoin" },
          { id: "no", label: "No, I just own fund shares" },
        ],
        correctOptionId: "no",
        explanationCorrect:
          "Exactly right. IBIT holds bitcoin inside the trust — you own shares of the fund, not the coins themselves.",
        revisit: {
          heading: "Let's revisit what IBIT actually holds",
          body: "IBIT is a fund wrapper. The trust holds bitcoin on behalf of all shareholders, but individual investors cannot redeem their shares for actual bitcoin or move anything to a personal wallet. What you own is a share of the fund — its value moves with bitcoin's price, but the custody sits entirely with the fund, not with you.",
        },
      },
      {
        id: "ibit_q2",
        prompt:
          "And one more — does IBIT's share price track bitcoin exactly, dollar for dollar, with no drag over time?",
        options: [
          { id: "yes", label: "Yes, tracking is exact and free" },
          { id: "no", label: "No, fees and trading create some drift" },
        ],
        correctOptionId: "no",
        explanationCorrect:
          "Right. The management fee and normal trading activity mean IBIT's return will lag bitcoin's return slightly over time.",
        revisit: {
          heading: "Let's revisit how tracking actually works",
          body: "Every fund like this charges an expense ratio — an ongoing fee taken out of fund assets. Over time, that fee, along with small differences between share price and the fund's net asset value, means IBIT's return will not be identical to simply holding bitcoin directly. The gap is usually small day-to-day, but it compounds over years.",
        },
      },
    ],
  },
  {
    id: "AAPL_CALL",
    ticker: "AAPL 220C",
    name: "Sample AAPL Call Option Contract",
    productType: "Equity Call Option",
    samplePrice: 6.85,
    sampleExpenseRatio: null,
    riskLevel: "Very High",
    returnVolatilityNote:
      "Illustrative: option premiums can move 20-50%+ in a single session on underlying stock moves of just 1-2%, and can also decay to zero by expiration even if the stock is flat.",
    whatYoureBuying:
      "The right — but not the obligation — to buy 100 shares of AAPL at a fixed strike price, on or before a fixed expiration date. You are not buying AAPL stock. You're buying a time-limited contract whose value depends on AAPL's price, time remaining, and market volatility expectations.",
    whatGivesValue:
      "Two things: intrinsic value (how far the stock price is above the strike) and time/volatility value (how much the market thinks the stock could move before expiration). As expiration approaches, the time-value portion shrinks — this is often called time decay.",
    whatCanGoWrong: [
      "If AAPL closes below the strike at expiration, the contract can expire completely worthless — a total loss of the premium paid.",
      "Even if AAPL rises, the option can still lose value if it rises too slowly, because time decay outpaces the gain.",
      "Implied volatility can drop after you buy (sometimes right after earnings), reducing the option's value even if the stock price doesn't fall.",
      "Options are a wasting asset — unlike a stock, there is a hard deadline after which the contract ceases to exist.",
    ],
    whoMisunderstands: [
      "Investors who think buying a call is a cheaper way to \"buy the stock\" with the same risk profile.",
      "Investors who don't realize the contract can expire worthless even if their stock thesis is directionally correct but slow to play out.",
      "Investors who don't account for time decay (theta) working against them every single day they hold the position.",
    ],
    comparison: {
      title: "Buying AAPL stock vs. buying an AAPL call option",
      intro:
        "Same company, very different instruments — different capital outlay, payoff shape, and ways to lose money.",
      alternatives: [
        {
          name: "Buying AAPL shares directly",
          description:
            "You own a piece of the company outright, for as long as you want to hold it.",
          bullets: [
            "No expiration — you can hold for decades if you choose.",
            "No time decay working against your position.",
            "Full capital outlay upfront (100 shares at current price), but the most you can lose is what you paid.",
            "Eligible for dividends and shareholder voting rights.",
          ],
        },
        {
          name: "Buying an AAPL call option",
          description:
            "You control the right to 100 shares for a small fraction of the stock's full price, for a limited time.",
          bullets: [
            "Much smaller upfront cost than owning the shares outright — capital efficient.",
            "Time decay (theta) constantly erodes value, even if the stock does nothing.",
            "Can go to zero by expiration — a full loss of the premium, unlike a stock that would need to fall to $0.",
            "Value depends on strike, time to expiration, and implied volatility, not just stock price direction.",
          ],
        },
      ],
    },
    readinessQuestions: [
      {
        id: "aapl_q1",
        prompt:
          "Here's one to sanity-check — if AAPL's stock price sits flat for the next month, does this option's value also stay flat?",
        options: [
          { id: "flat", label: "Yes, no stock move means no change" },
          { id: "decay", label: "No, it likely loses value from time decay" },
        ],
        correctOptionId: "decay",
        explanationCorrect:
          "Correct. Every day that passes without the stock moving in your favor, the option loses a bit of time value — that's theta at work.",
        revisit: {
          heading: "Let's revisit time decay",
          body: "Options have a built-in countdown clock. Part of the premium you pay reflects the chance the stock could still move in your favor before expiration. As days pass with no favorable move, that time-value portion shrinks — even if the stock price itself hasn't changed at all. This is why a flat stock is actually a losing scenario for a call option holder.",
        },
      },
      {
        id: "aapl_q2",
        prompt:
          "And — if you buy one call contract, how many AAPL shares does it actually give you the right to buy?",
        options: [
          { id: "1", label: "1 share" },
          { id: "100", label: "100 shares" },
        ],
        correctOptionId: "100",
        explanationCorrect:
          "Right — one standard equity option contract always represents 100 shares of the underlying stock.",
        revisit: {
          heading: "Let's revisit contract size",
          body: "In the U.S., one standard listed equity option contract corresponds to 100 shares of the underlying stock. That's also why the premium you see quoted needs to be multiplied by 100 to get the actual dollar cost of one contract — a $6.85 premium means roughly $685 of capital at risk, not $6.85.",
        },
      },
    ],
    optionData: {
      underlying: "AAPL",
      underlyingPrice: 214.1,
      strike: 220,
      expiration: "2026-09-18",
      optionType: "Call",
      bid: 6.75,
      ask: 6.95,
      impliedVolatility: 0.29,
      delta: 0.42,
      theta: -0.081,
      openInterest: 18420,
      contractMultiplier: 100,
    },
  },
  {
    id: "SPYU",
    ticker: "SPYU",
    name: "Sample 2x Leveraged S&P 500 ETF",
    productType: "Leveraged Index ETF",
    samplePrice: 84.2,
    sampleExpenseRatio: 0.0095,
    riskLevel: "Very High",
    returnVolatilityNote:
      "Illustrative: designed to deliver 2x the daily return of the S&P 500. Over periods longer than a day, compounding can cause returns to diverge significantly from a simple 2x multiple — especially in choppy, sideways markets.",
    whatYoureBuying:
      "Shares of a fund that uses derivatives and daily rebalancing to target 2x the daily return of the S&P 500 index. It is reset every single day — it is not designed to deliver 2x your return over a month, a year, or any period longer than one trading day.",
    whatGivesValue:
      "Value is driven by the S&P 500's daily price return, amplified by the fund's target multiplier, compounded day over day. Because the multiplier resets daily, the path the index takes — not just its start and end points — determines your actual return.",
    whatCanGoWrong: [
      "In choppy or sideways markets, daily compounding can cause the fund to lose value even if the underlying index is roughly flat over the same period.",
      "Losses are also amplified — a 2x fund can fall roughly twice as fast as the index in a downturn.",
      "Holding this fund for weeks or months can produce a return that looks nothing like 2x the index's return over that same period.",
      "Higher expense ratio than a standard index fund, plus derivative and rebalancing costs embedded in performance.",
    ],
    whoMisunderstands: [
      "Investors who buy it expecting a simple \"2x my index fund\" long-term holding.",
      "Investors who don't realize daily resets mean compounding can work against them even when directionally right.",
      "Investors who size the position as if it carried the same risk as a plain index fund.",
    ],
    comparison: {
      title: "A standard index ETF vs. a leveraged ETF",
      intro:
        "Both track the S&P 500 — but one is built for long-term holding, and the other is built for short-term, actively monitored trades.",
      alternatives: [
        {
          name: "Standard S&P 500 index ETF",
          description:
            "Aims to match the S&P 500's return, roughly 1-for-1, before a small fee.",
          bullets: [
            "Designed to be held for years — no daily reset mechanics to worry about.",
            "Lower expense ratio, typically a few basis points.",
            "Return over any period closely tracks the index's return over that same period.",
            "Volatility roughly matches the broad market's own volatility.",
          ],
        },
        {
          name: "2x leveraged S&P 500 ETF",
          description:
            "Aims to match 2x the S&P 500's daily return, reset every trading day.",
          bullets: [
            "Built for short-term tactical trades, not buy-and-hold investing.",
            "Higher expense ratio and embedded derivative/financing costs.",
            "Multi-day return can diverge meaningfully from \"2x the index\" due to compounding.",
            "Amplified volatility in both directions — gains and losses move roughly twice as fast.",
          ],
        },
      ],
    },
    readinessQuestions: [
      {
        id: "spyu_q1",
        prompt:
          "Let's check this one — if the S&P 500 returns 10% over a full year, will a 2x leveraged ETF reliably return 20% over that same year?",
        options: [
          { id: "yes", label: "Yes, 2x means 2x over any period" },
          { id: "no", label: "No, daily compounding can change the outcome" },
        ],
        correctOptionId: "no",
        explanationCorrect:
          "Correct. The 2x target resets daily, so compounding over a full year can push the actual return well above or below a simple 2x multiple.",
        revisit: {
          heading: "Let's revisit how the daily reset works",
          body: "Leveraged ETFs like this one target 2x the index's return for a single trading day only, then reset. Compounding those daily results over weeks or months means the total return depends heavily on the path the market took — not just where it started and ended. In a volatile, sideways market, this can even produce a loss while the underlying index is flat.",
        },
      },
      {
        id: "spyu_q2",
        prompt:
          "One more — is this fund generally designed to be a long-term, buy-and-hold core holding?",
        options: [
          { id: "yes", label: "Yes, it works well as a long-term holding" },
          { id: "no", label: "No, it's built for short-term, monitored use" },
        ],
        correctOptionId: "no",
        explanationCorrect:
          "Right. Because of daily compounding effects, this product is generally intended for short-term, actively monitored positions rather than long-term holding.",
        revisit: {
          heading: "Let's revisit what this product is built for",
          body: "Because returns compound daily rather than tracking the index cleanly over long periods, products like this are typically built for investors who plan to monitor and potentially exit positions within days, not years. Using it as a \"set and forget\" long-term holding can produce very different results than expected, even if your view on the market direction turns out to be correct.",
        },
      },
    ],
  },
];

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getQuestionLabel(questionId: string): string {
  for (const product of PRODUCTS) {
    const question = product.readinessQuestions.find((q) => q.id === questionId);
    if (question) return `${product.ticker}: ${question.prompt}`;
  }
  return questionId;
}
