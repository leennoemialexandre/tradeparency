import { TradeparencyEvent } from "@/lib/types";

/**
 * Storage abstraction for event logging.
 *
 * Preference order, matching the project brief:
 *   1. Supabase (set NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY)
 *   2. Local SQLite file (automatic fallback, dev-friendly, no setup)
 *
 * Both backends share the same `events` shape (see supabase/schema.sql),
 * so switching a deployment from SQLite to Supabase only requires setting
 * the two env vars below — no code changes needed.
 */

type Backend = "supabase" | "sqlite";

function backend(): Backend {
  return process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
    ? "supabase"
    : "sqlite";
}

export function activeBackend(): Backend {
  return backend();
}

// ---------------------------------------------------------------------------
// Supabase backend
// ---------------------------------------------------------------------------

async function getSupabaseClient() {
  const { createClient } = await import("@supabase/supabase-js");
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(url, key, {
    auth: { persistSession: false },
  });
}

async function supabaseLogEvent(event: TradeparencyEvent) {
  const supabase = await getSupabaseClient();
  const { error } = await supabase.from("events").insert({
    session_id: event.session_id,
    event_type: event.event_type,
    step: event.step,
    product_id: event.product_id,
    question_id: event.question_id,
    correct: event.correct,
    metadata: event.metadata,
  });
  if (error) throw error;
}

async function supabaseGetAllEvents(): Promise<TradeparencyEvent[]> {
  const supabase = await getSupabaseClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data ?? []) as TradeparencyEvent[];
}

// ---------------------------------------------------------------------------
// SQLite fallback backend
// ---------------------------------------------------------------------------

let sqliteDb: import("better-sqlite3").Database | null = null;

function getSqliteDb() {
  if (sqliteDb) return sqliteDb;

  // Loaded lazily + via require so this native module is never pulled into
  // a build path that doesn't need it (e.g. when Supabase is configured).
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const Database = require("better-sqlite3");
  const path = require("path");
  const fs = require("fs");

  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

  const db = new Database(path.join(dataDir, "tradeparency.db"));
  db.pragma("journal_mode = WAL");
  db.exec(`
    create table if not exists events (
      id text primary key,
      session_id text not null,
      event_type text not null,
      step text,
      product_id text,
      question_id text,
      correct integer,
      metadata text,
      created_at text not null
    );
    create index if not exists events_session_id_idx on events (session_id);
    create index if not exists events_event_type_idx on events (event_type);
  `);

  sqliteDb = db;
  return db;
}

function sqliteLogEvent(event: TradeparencyEvent) {
  const db = getSqliteDb();
  const stmt = db.prepare(`
    insert into events
      (id, session_id, event_type, step, product_id, question_id, correct, metadata, created_at)
    values (@id, @session_id, @event_type, @step, @product_id, @question_id, @correct, @metadata, @created_at)
  `);
  stmt.run({
    id: crypto.randomUUID(),
    session_id: event.session_id,
    event_type: event.event_type,
    step: event.step,
    product_id: event.product_id,
    question_id: event.question_id,
    correct: event.correct === null || event.correct === undefined ? null : event.correct ? 1 : 0,
    metadata: event.metadata ? JSON.stringify(event.metadata) : null,
    created_at: new Date().toISOString(),
  });
}

function sqliteGetAllEvents(): TradeparencyEvent[] {
  const db = getSqliteDb();
  const rows = db.prepare(`select * from events order by created_at asc`).all() as any[];
  return rows.map((row) => ({
    id: row.id,
    session_id: row.session_id,
    event_type: row.event_type,
    step: row.step,
    product_id: row.product_id,
    question_id: row.question_id,
    correct: row.correct === null ? null : Boolean(row.correct),
    metadata: row.metadata ? JSON.parse(row.metadata) : null,
    created_at: row.created_at,
  }));
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export async function logEvent(event: TradeparencyEvent): Promise<void> {
  if (backend() === "supabase") {
    await supabaseLogEvent(event);
  } else {
    sqliteLogEvent(event);
  }
}

export async function getAllEvents(): Promise<TradeparencyEvent[]> {
  if (backend() === "supabase") {
    return supabaseGetAllEvents();
  }
  return sqliteGetAllEvents();
}
