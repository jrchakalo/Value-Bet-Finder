export interface ValueBet {
  id: string
  event_id: number
  bookmaker: string
  market_name: string
  bet_side: string
  expected_value: number
  bookmaker_odds: number
  bookmaker_href: string | null
  home_team: string
  away_team: string
  event_date: string
  sport: string
  league: string
  hdp: number | null
  max_stake: number | null
  status: BetStatus
  created_at: string
  updated_at: string
  // Resolved fields
  resolved_at: string | null
  result: BetResult | null
  stake_amount: number | null
  profit_loss: number | null
}

export type BetStatus = 'active' | 'won' | 'lost' | 'void' | 'pending_result'
export type BetResult = 'won' | 'lost' | 'void'

export interface Bankroll {
  id: string
  amount: number
  updated_at: string
}

export interface BankrollTransaction {
  id: string
  bet_id: string | null
  type: 'deposit' | 'withdrawal' | 'win' | 'loss' | 'adjustment'
  amount: number
  balance_after: number
  description: string
  created_at: string
}

export interface DailyAnalytics {
  date: string
  total_bets: number
  won_bets: number
  lost_bets: number
  hit_rate: number
  actual_profit_loss: number
  total_ev_generated: number
  potential_profit: number
  total_staked: number
}

export interface KellyResult {
  full_kelly_fraction: number
  fractional_kelly_fraction: number
  recommended_stake: number
  kelly_percentage: number
}

export interface OddsAPIValueBet {
  id: string
  eventId: number
  bookmaker: string
  market: {
    name: string
    hdp: number | null
    home: string
    away: string
    max: number | null
  }
  betSide: string
  expectedValue: number
  expectedValueUpdatedAt: string
  bookmakerOdds: {
    home: string
    away: string
    draw?: string
    hdp?: string
    href: string
  }
  event: {
    home: string
    away: string
    date: string
    sport: string
    league: string
  }
}

export interface WorkerStatus {
  last_fetch: string | null
  next_fetch: string | null
  total_fetches: number
  last_error: string | null
  bets_stored: number
}

export interface ApiResponse<T> {
  data: T | null
  error: string | null
  success: boolean
}
