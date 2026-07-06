import { NextRequest, NextResponse } from "next/server";
import { logEvent } from "@/lib/db";
import { EventType, TradeparencyEvent } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VALID_EVENT_TYPES: EventType[] = [
  "session_started",
  "product_selected",
  "explainer_viewed",
  "comparison_viewed",
  "readiness_question_answered",
  "adaptive_explanation_shown",
  "user_proceeded_after_explanation",
  "simulated_trade_confirmed",
  "session_completed",
];

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (typeof body.session_id !== "string" || body.session_id.length === 0) {
    return NextResponse.json({ error: "session_id is required" }, { status: 400 });
  }
  if (!VALID_EVENT_TYPES.includes(body.event_type as EventType)) {
    return NextResponse.json({ error: "Invalid event_type" }, { status: 400 });
  }

  const event: TradeparencyEvent = {
    session_id: body.session_id,
    event_type: body.event_type as EventType,
    step: (body.step as TradeparencyEvent["step"]) ?? null,
    product_id: (body.product_id as TradeparencyEvent["product_id"]) ?? null,
    question_id: typeof body.question_id === "string" ? body.question_id : null,
    correct: typeof body.correct === "boolean" ? body.correct : null,
    metadata: (body.metadata as Record<string, unknown>) ?? null,
  };

  try {
    await logEvent(event);
  } catch (err) {
    console.error("Failed to log event", err);
    return NextResponse.json({ error: "Failed to log event" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
