-- ============================================================
-- Value Bet Finder — Database schema & security baseline
-- Target: Supabase / PostgreSQL
-- This migration is idempotent and safe to run more than once.
-- ============================================================

-- gen_random_uuid() for portability outside Supabase-managed projects.
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ============================================================
-- Tables
-- ============================================================

CREATE TABLE IF NOT EXISTS public.value_bets (
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
  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'inactive', 'won', 'lost', 'void', 'pending_result')),
  result TEXT CHECK (result IN ('won', 'lost', 'void')),
  resolved_at TIMESTAMPTZ,
  stake_amount DECIMAL(10, 2),
  profit_loss DECIMAL(10, 2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.bankroll (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  amount DECIMAL(12, 2) NOT NULL DEFAULT 1000.00,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.bankroll_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bet_id TEXT REFERENCES public.value_bets(id) ON DELETE SET NULL,
  type TEXT NOT NULL CHECK (type IN ('deposit', 'withdrawal', 'win', 'loss', 'adjustment')),
  amount DECIMAL(12, 2) NOT NULL,
  balance_after DECIMAL(12, 2) NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.worker_status (
  id INTEGER PRIMARY KEY DEFAULT 1,
  last_fetch TIMESTAMPTZ,
  next_fetch TIMESTAMPTZ,
  total_fetches INTEGER NOT NULL DEFAULT 0,
  last_error TEXT,
  bets_stored INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- Status constraint upgrade
-- Older deployments only accepted: active, won, lost, void,
-- pending_result. The worker now also writes `inactive` when a
-- value bet disappears from the provider feed.
-- ============================================================

ALTER TABLE public.value_bets
  DROP CONSTRAINT IF EXISTS value_bets_status_check;

ALTER TABLE public.value_bets
  ADD CONSTRAINT value_bets_status_check
  CHECK (status IN ('active', 'inactive', 'won', 'lost', 'void', 'pending_result'));

-- ============================================================
-- Indexes
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_value_bets_status
  ON public.value_bets(status);
CREATE INDEX IF NOT EXISTS idx_value_bets_status_event_date
  ON public.value_bets(status, event_date);
CREATE INDEX IF NOT EXISTS idx_value_bets_event_date
  ON public.value_bets(event_date);
CREATE INDEX IF NOT EXISTS idx_value_bets_bookmaker
  ON public.value_bets(bookmaker);
CREATE INDEX IF NOT EXISTS idx_value_bets_created_at
  ON public.value_bets(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bankroll_transactions_created_at
  ON public.bankroll_transactions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bankroll_transactions_bet_id
  ON public.bankroll_transactions(bet_id);

-- ============================================================
-- Seed data
-- ============================================================

INSERT INTO public.worker_status (id, total_fetches, bets_stored)
VALUES (1, 0, 0)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.bankroll (amount, updated_at)
SELECT 1000.00, NOW()
WHERE NOT EXISTS (SELECT 1 FROM public.bankroll LIMIT 1);

-- ============================================================
-- RPC used by /api/cron/update
-- The route calls supabaseAdmin.rpc('increment_total_fetches').
-- SECURITY DEFINER keeps the counter update atomic, while the
-- explicit REVOKE prevents anon/authenticated clients from
-- invoking it through PostgREST.
-- ============================================================

CREATE OR REPLACE FUNCTION public.increment_total_fetches()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  UPDATE public.worker_status
  SET total_fetches = total_fetches + 1,
      updated_at = NOW()
  WHERE id = 1;
$$;

REVOKE ALL ON FUNCTION public.increment_total_fetches() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.increment_total_fetches() TO service_role;

COMMENT ON FUNCTION public.increment_total_fetches()
  IS 'Atomically increments worker_status.total_fetches (service_role only).';

-- ============================================================
-- Row Level Security (RLS)
-- The application accesses data exclusively through the
-- service_role key on the server. RLS is enabled on every table
-- and no policy is granted to anon/authenticated, so a leaked
-- anon key cannot read or mutate user data.
-- service_role bypasses RLS and receives an explicit policy so
-- the intent is documented and Supabase linters stay quiet.
-- ============================================================

ALTER TABLE public.value_bets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bankroll ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bankroll_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.worker_status ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "service_role_full_access_value_bets" ON public.value_bets;
CREATE POLICY "service_role_full_access_value_bets"
  ON public.value_bets
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "service_role_full_access_bankroll" ON public.bankroll;
CREATE POLICY "service_role_full_access_bankroll"
  ON public.bankroll
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "service_role_full_access_bankroll_transactions" ON public.bankroll_transactions;
CREATE POLICY "service_role_full_access_bankroll_transactions"
  ON public.bankroll_transactions
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "service_role_full_access_worker_status" ON public.worker_status;
CREATE POLICY "service_role_full_access_worker_status"
  ON public.worker_status
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ============================================================
-- Table privileges (defense in depth)
-- RLS already blocks anon/authenticated, but removing their
-- table grants prevents access even if a policy is added later
-- by mistake. Only service_role (server-side) gets privileges.
-- ============================================================

REVOKE ALL ON TABLE public.value_bets FROM anon, authenticated;
REVOKE ALL ON TABLE public.bankroll FROM anon, authenticated;
REVOKE ALL ON TABLE public.bankroll_transactions FROM anon, authenticated;
REVOKE ALL ON TABLE public.worker_status FROM anon, authenticated;

GRANT ALL ON TABLE public.value_bets TO service_role;
GRANT ALL ON TABLE public.bankroll TO service_role;
GRANT ALL ON TABLE public.bankroll_transactions TO service_role;
GRANT ALL ON TABLE public.worker_status TO service_role;

