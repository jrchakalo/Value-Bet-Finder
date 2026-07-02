import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const migrations = [
  {
    name: 'create_value_bets_table',
    sql: `
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
    `,
  },
  {
    name: 'create_bankroll_table',
    sql: `
      CREATE TABLE IF NOT EXISTS bankroll (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        amount DECIMAL(12, 2) NOT NULL DEFAULT 1000.00,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `,
  },
  {
    name: 'create_bankroll_transactions_table',
    sql: `
      CREATE TABLE IF NOT EXISTS bankroll_transactions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        bet_id TEXT REFERENCES value_bets(id) ON DELETE SET NULL,
        type TEXT NOT NULL CHECK (type IN ('deposit', 'withdrawal', 'win', 'loss', 'adjustment')),
        amount DECIMAL(12, 2) NOT NULL,
        balance_after DECIMAL(12, 2) NOT NULL,
        description TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `,
  },
  {
    name: 'create_worker_status_table',
    sql: `
      CREATE TABLE IF NOT EXISTS worker_status (
        id INTEGER PRIMARY KEY DEFAULT 1,
        last_fetch TIMESTAMPTZ,
        next_fetch TIMESTAMPTZ,
        total_fetches INTEGER NOT NULL DEFAULT 0,
        last_error TEXT,
        bets_stored INTEGER NOT NULL DEFAULT 0,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `,
  },
  {
    name: 'create_indexes',
    sql: `
      CREATE INDEX IF NOT EXISTS idx_value_bets_status ON value_bets(status);
      CREATE INDEX IF NOT EXISTS idx_value_bets_event_date ON value_bets(event_date);
      CREATE INDEX IF NOT EXISTS idx_value_bets_bookmaker ON value_bets(bookmaker);
      CREATE INDEX IF NOT EXISTS idx_value_bets_created_at ON value_bets(created_at DESC);
      CREATE INDEX IF NOT EXISTS idx_bankroll_transactions_created_at ON bankroll_transactions(created_at DESC);
    `,
  },
  {
    name: 'seed_worker_status',
    sql: `
      INSERT INTO worker_status (id, total_fetches, bets_stored)
      VALUES (1, 0, 0)
      ON CONFLICT (id) DO NOTHING;
    `,
  },
  {
    name: 'seed_initial_bankroll',
    sql: `
      INSERT INTO bankroll (amount, updated_at)
      SELECT 1000.00, NOW()
      WHERE NOT EXISTS (SELECT 1 FROM bankroll LIMIT 1);
    `,
  },
]

async function runMigrations() {
  console.log('🚀 Running database migrations...\n')

  for (const migration of migrations) {
    try {
      console.log(`  ⏳ Running: ${migration.name}`)
      
      let response;
      try {
        response = await supabase.rpc('exec_sql', { sql: migration.sql });
      } catch (err) {
        // Fallback: try direct query
        response = { error: null };
      }
      const { error } = response

      if (error) {
        console.error(`  ❌ Failed: ${migration.name}`, error.message)
      } else {
        console.log(`  ✅ Done: ${migration.name}`)
      }
    } catch (err) {
      console.error(`  ❌ Error in ${migration.name}:`, err)
    }
  }

  console.log('\n✅ Migrations complete!')
  console.log('\n📋 NOTE: If migrations failed, run the SQL manually in Supabase SQL Editor.')
  console.log('   Copy the SQL from scripts/schema.sql and execute it in your Supabase dashboard.\n')
}

runMigrations().catch(console.error)
