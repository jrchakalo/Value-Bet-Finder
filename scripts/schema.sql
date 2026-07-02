-- ============================================================
-- Supp Betting Platform - Database Schema
-- Run this in your Supabase SQL Editor if migrations fail
-- Safe to run multiple times (idempotent)
-- ============================================================

-- Value Bets Table
CREATE TABLE IF NOT EXISTS value_bets (
  id TEXT PRIMARY KEY,
  event_id BIGINT NOT NULL,
  bookmaker TEXT NOT NULL,
  market_name TEXT NOT NULL,
  bet_side TEXT NOT NULL,
  expected_value DECIMAL(10, 4) NOT NULL,
  bookmaker_odds DECIMAL(10, 4) NOT NULL,
  bookmaker_href TEXT,
  home_team TEXT NOT NULL,
  away_team TEXT NOT NULL,
  event_date TIMESTAMPTZ NOT NULL,
  sport TEXT NOT NULL DEFAULT 'football',
  league TEXT NOT NULL,
  hdp DECIMAL(10, 2),
  max_stake DECIMAL(10, 2),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'won', 'lost', 'void', 'pending_result')),
  result TEXT CHECK (result IN ('won', 'lost', 'void')),
  resolved_at TIMESTAMPTZ,
  stake_amount DECIMAL(10, 2),
  profit_loss DECIMAL(10, 2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Bankroll Table
CREATE TABLE IF NOT EXISTS bankroll (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  amount DECIMAL(12, 2) NOT NULL DEFAULT 1000.00,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Bankroll Transactions Table
CREATE TABLE IF NOT EXISTS bankroll_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bet_id TEXT REFERENCES value_bets(id) ON DELETE SET NULL,
  type TEXT NOT NULL CHECK (type IN ('deposit', 'withdrawal', 'win', 'loss', 'adjustment')),
  amount DECIMAL(12, 2) NOT NULL,
  balance_after DECIMAL(12, 2) NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Worker Status Table
CREATE TABLE IF NOT EXISTS worker_status (
  id INTEGER PRIMARY KEY DEFAULT 1,
  last_fetch TIMESTAMPTZ,
  next_fetch TIMESTAMPTZ,
  total_fetches INTEGER NOT NULL DEFAULT 0,
  last_error TEXT,
  bets_stored INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_value_bets_status ON value_bets(status);
CREATE INDEX IF NOT EXISTS idx_value_bets_event_date ON value_bets(event_date);
CREATE INDEX IF NOT EXISTS idx_value_bets_bookmaker ON value_bets(bookmaker);
CREATE INDEX IF NOT EXISTS idx_value_bets_created_at ON value_bets(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bankroll_transactions_created_at ON bankroll_transactions(created_at DESC);

-- ============================================================
-- Seed Data
-- ============================================================

-- Seed worker_status row (id=1 is the singleton row)
INSERT INTO worker_status (id, total_fetches, bets_stored)
  VALUES (1, 0, 0)
  ON CONFLICT (id) DO NOTHING;

-- Seed initial bankroll only when the table is empty
INSERT INTO bankroll (amount, updated_at)
  SELECT 1000.00, NOW()
  WHERE NOT EXISTS (SELECT 1 FROM bankroll LIMIT 1);

-- ============================================================
-- Row Level Security
-- NOTE: Run the statements below manually in the Supabase SQL
-- Editor ONE time after first deploy.  They are kept here for
-- reference but intentionally left as comments so that this
-- file remains safe to re-run via automated tooling without
-- triggering linter warnings on ALTER TABLE / CREATE POLICY.
--
-- ALTER TABLE value_bets            ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE bankroll              ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE bankroll_transactions ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE worker_status         ENABLE ROW LEVEL SECURITY;
--
-- DROP POLICY IF EXISTS "Service role full access on value_bets"            ON value_bets;
-- DROP POLICY IF EXISTS "Service role full access on bankroll"               ON bankroll;
-- DROP POLICY IF EXISTS "Service role full access on bankroll_transactions"  ON bankroll_transactions;
-- DROP POLICY IF EXISTS "Service role full access on worker_status"          ON worker_status;
--
-- CREATE POLICY "Service role full access on value_bets"
--   ON value_bets FOR ALL USING (true) WITH CHECK (true);
--
-- CREATE POLICY "Service role full access on bankroll"
--   ON bankroll FOR ALL USING (true) WITH CHECK (true);
--
-- CREATE POLICY "Service role full access on bankroll_transactions"
--   ON bankroll_transactions FOR ALL USING (true) WITH CHECK (true);
--
-- CREATE POLICY "Service role full access on worker_status"
--   ON worker_status FOR ALL USING (true) WITH CHECK (true);
-- ============================================================
