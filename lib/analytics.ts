import { TradeparencyEvent } from "@/lib/types";

export interface FunnelStep {
  step: string;
  label: string;
  sessions: number;
  dropOffFromPrevious: number | null; // fraction, 0-1
}

export interface MissedQuestionStat {
  questionId: string;
  timesShown: number;
  timesMissed: number;
  missRate: number;
}

export interface ProductBreakdownStat {
  productId: string;
  count: number;
  share: number;
}

export interface AnalyticsSummary {
  totalSessions: number;
  completedSessions: number;
  completionRate: number;
  funnel: FunnelStep[];
  missedQuestions: MissedQuestionStat[];
  firstTryPassRate: number;
  pctNeededAdaptiveExplanation: number;
  pctProceededAfterMissing: number;
  productBreakdown: ProductBreakdownStat[];
  totalEvents: number;
}

const FUNNEL_DEFINITION: { step: string; label: string; eventType: TradeparencyEvent["event_type"] }[] = [
  { step: "select_asset", label: "Session started", eventType: "session_started" },
  { step: "product_selected", label: "Product selected", eventType: "product_selected" },
  { step: "explainer", label: "Viewed explainer", eventType: "explainer_viewed" },
  { step: "comparison", label: "Viewed comparison", eventType: "comparison_viewed" },
  { step: "readiness_check", label: "Answered readiness question", eventType: "readiness_question_answered" },
  { step: "trade_confirmation", label: "Confirmed simulated trade", eventType: "simulated_trade_confirmed" },
  { step: "summary", label: "Completed session", eventType: "session_completed" },
];

function distinctSessions(events: TradeparencyEvent[], type: TradeparencyEvent["event_type"]): Set<string> {
  const set = new Set<string>();
  for (const e of events) {
    if (e.event_type === type) set.add(e.session_id);
  }
  return set;
}

export function computeAnalytics(events: TradeparencyEvent[]): AnalyticsSummary {
  const sessionIds = new Set(events.map((e) => e.session_id));
  const totalSessions = sessionIds.size;

  const completedSessionIds = distinctSessions(events, "session_completed");
  const completedSessions = completedSessionIds.size;

  const funnel: FunnelStep[] = [];
  let previousCount: number | null = null;
  for (const def of FUNNEL_DEFINITION) {
    const count = distinctSessions(events, def.eventType).size;
    funnel.push({
      step: def.step,
      label: def.label,
      sessions: count,
      dropOffFromPrevious:
        previousCount === null || previousCount === 0
          ? null
          : Math.max(0, 1 - count / previousCount),
    });
    previousCount = count;
  }

  // Missed questions
  const answerEvents = events.filter((e) => e.event_type === "readiness_question_answered");
  const questionStats = new Map<string, { shown: number; missed: number }>();
  for (const e of answerEvents) {
    if (!e.question_id) continue;
    const stat = questionStats.get(e.question_id) ?? { shown: 0, missed: 0 };
    stat.shown += 1;
    if (e.correct === false) stat.missed += 1;
    questionStats.set(e.question_id, stat);
  }
  const missedQuestions: MissedQuestionStat[] = Array.from(questionStats.entries())
    .map(([questionId, stat]) => ({
      questionId,
      timesShown: stat.shown,
      timesMissed: stat.missed,
      missRate: stat.shown === 0 ? 0 : stat.missed / stat.shown,
    }))
    .sort((a, b) => b.timesMissed - a.timesMissed);

  const firstTryPassRate =
    answerEvents.length === 0
      ? 0
      : answerEvents.filter((e) => e.correct === true).length / answerEvents.length;

  // Adaptive explanation stats
  const sessionsReachedReadiness = distinctSessions(events, "readiness_question_answered");
  const sessionsWithAdaptive = distinctSessions(events, "adaptive_explanation_shown");
  const sessionsProceededAfterAdaptive = distinctSessions(events, "user_proceeded_after_explanation");

  const pctNeededAdaptiveExplanation =
    sessionsReachedReadiness.size === 0
      ? 0
      : sessionsWithAdaptive.size / sessionsReachedReadiness.size;

  const pctProceededAfterMissing =
    sessionsWithAdaptive.size === 0
      ? 0
      : sessionsProceededAfterAdaptive.size / sessionsWithAdaptive.size;

  // Product breakdown
  const productEvents = events.filter((e) => e.event_type === "product_selected" && e.product_id);
  const productCounts = new Map<string, number>();
  for (const e of productEvents) {
    productCounts.set(e.product_id as string, (productCounts.get(e.product_id as string) ?? 0) + 1);
  }
  const productBreakdown: ProductBreakdownStat[] = Array.from(productCounts.entries())
    .map(([productId, count]) => ({
      productId,
      count,
      share: productEvents.length === 0 ? 0 : count / productEvents.length,
    }))
    .sort((a, b) => b.count - a.count);

  return {
    totalSessions,
    completedSessions,
    completionRate: totalSessions === 0 ? 0 : completedSessions / totalSessions,
    funnel,
    missedQuestions,
    firstTryPassRate,
    pctNeededAdaptiveExplanation,
    pctProceededAfterMissing,
    productBreakdown,
    totalEvents: events.length,
  };
}
