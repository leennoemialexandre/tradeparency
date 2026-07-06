export type ProductId = "IBIT" | "AAPL_CALL" | "SPYU";

export type RiskLevel = "Moderate" | "High" | "Very High";

export interface ComparisonAlternative {
  name: string;
  description: string;
  bullets: string[];
}

export interface ComparisonView {
  title: string;
  intro: string;
  alternatives: ComparisonAlternative[];
}

export interface ReadinessQuestion {
  id: string;
  prompt: string;
  options: { id: string; label: string }[];
  correctOptionId: string;
  explanationCorrect: string;
  revisit: {
    heading: string;
    body: string;
  };
}

export interface OptionContractData {
  underlying: string;
  underlyingPrice: number;
  strike: number;
  expiration: string;
  optionType: "Call";
  bid: number;
  ask: number;
  impliedVolatility: number;
  delta: number;
  theta: number;
  openInterest: number;
  contractMultiplier: number;
}

export interface Product {
  id: ProductId;
  ticker: string;
  name: string;
  productType: string;
  samplePrice: number;
  sampleExpenseRatio: number | null;
  riskLevel: RiskLevel;
  returnVolatilityNote: string;
  whatYoureBuying: string;
  whatGivesValue: string;
  whatCanGoWrong: string[];
  whoMisunderstands: string[];
  comparison: ComparisonView;
  readinessQuestions: ReadinessQuestion[];
  optionData?: OptionContractData;
}

// ---- Event instrumentation ----

export type EventType =
  | "session_started"
  | "product_selected"
  | "explainer_viewed"
  | "comparison_viewed"
  | "readiness_question_answered"
  | "adaptive_explanation_shown"
  | "user_proceeded_after_explanation"
  | "simulated_trade_confirmed"
  | "session_completed";

export type FlowStep =
  | "select_asset"
  | "explainer"
  | "comparison"
  | "readiness_check"
  | "trade_confirmation"
  | "summary";

export interface TradeparencyEvent {
  id?: string;
  session_id: string;
  event_type: EventType;
  step: FlowStep | null;
  product_id: ProductId | null;
  question_id: string | null;
  correct: boolean | null;
  metadata: Record<string, unknown> | null;
  created_at?: string;
}
