import { supabaseAdmin } from './supabase'
import { OddsAPIValueBet, ValueBet, Bankroll, BankrollTransaction, DailyAnalytics, BetResult } from './types'
import { parseOddsForSide } from './odds-api'

/**
 * Upserts value bets into the database
 * Uses the bet ID from the API as the unique key to prevent duplicates
 */
export async function upsertValueBets(bets: OddsAPIValueBet[]): Promise<number> {
  if (bets.length === 0) return 0

  const records = bets.map((bet) => ({
    id: bet.id,
    event_id: bet.eventId,
    bookmaker: bet.bookmaker,
    market_name: bet.market.name,
    bet_side: bet.betSide,
    expected_value: bet.expectedValue,
    bookmaker_odds: parseOddsForSide(bet.bookmakerOdds, bet.betSide),
    bookmaker_href: bet.bookmakerOdds.href || null,
    home_team: bet.event.home,
    away_team: bet.event.away,
    event_date: bet.event.date,
    sport: bet.event.sport,
    league: bet.event.league,
    hdp: bet.market.hdp || null,
    max_stake: bet.market.max || null,
    status: 'active' as const,
    updated_at: new Date().toISOString(),
  }))

  const { error, data } = await supabaseAdmin
    .from('value_bets')
    .upsert(records, {
      onConflict: 'id',
      ignoreDuplicates: false,
    })
    .select('id')

  if (error) {
    throw new Error(`Database upsert failed: ${error.message}`)
  }

  return data?.length ?? 0
}

/**
 * Fetches all active value bets from the database.
 * Only returns bets with status = 'active' AND event_date in the future.
 */
export async function getActiveValueBets(): Promise<ValueBet[]> {
  const now = new Date().toISOString()

  const { data, error } = await supabaseAdmin
    .from('value_bets')
    .select('*')
    .eq('status', 'active')
    .gte('event_date', now)
    .order('expected_value', { ascending: false })

  if (error) {
    throw new Error(`Failed to fetch active bets: ${error.message}`)
  }

  return data as ValueBet[]
}

/**
 * Fetches all value bets (for history page)
 */
export async function getAllValueBets(limit = 500): Promise<ValueBet[]> {
  const { data, error } = await supabaseAdmin
    .from('value_bets')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    throw new Error(`Failed to fetch all bets: ${error.message}`)
  }

  return data as ValueBet[]
}

/**
 * Updates a bet's result and triggers bankroll update
 */
export async function resolveBet(
  betId: string,
  result: BetResult,
  stakeAmount: number
): Promise<void> {
  const profitLoss =
    result === 'won'
      ? stakeAmount * ((await getBetOdds(betId)) - 1)
      : result === 'lost'
      ? -stakeAmount
      : 0

  const { error } = await supabaseAdmin
    .from('value_bets')
    .update({
      status: result,
      result,
      resolved_at: new Date().toISOString(),
      stake_amount: stakeAmount,
      profit_loss: profitLoss,
    })
    .eq('id', betId)

  if (error) {
    throw new Error(`Failed to resolve bet: ${error.message}`)
  }

  // Update bankroll
  await updateBankrollFromBet(profitLoss, betId, result)
}

async function getBetOdds(betId: string): Promise<number> {
  const { data, error } = await supabaseAdmin
    .from('value_bets')
    .select('bookmaker_odds')
    .eq('id', betId)
    .single()

  if (error || !data) return 1
  return data.bookmaker_odds
}

/**
 * Gets the current bankroll
 */
export async function getBankroll(): Promise<Bankroll> {
  const { data, error } = await supabaseAdmin
    .from('bankroll')
    .select('*')
    .order('updated_at', { ascending: false })
    .limit(1)
    .single()

  if (error) {
    // Initialize bankroll if it doesn't exist
    const { data: newData, error: insertError } = await supabaseAdmin
      .from('bankroll')
      .insert({ amount: 1000, updated_at: new Date().toISOString() })
      .select()
      .single()

    if (insertError) throw new Error(`Failed to initialize bankroll: ${insertError.message}`)
    return newData as Bankroll
  }

  return data as Bankroll
}

/**
 * Updates the bankroll amount directly
 */
export async function updateBankroll(newAmount: number): Promise<Bankroll> {
  const current = await getBankroll()

  const { data, error } = await supabaseAdmin
    .from('bankroll')
    .update({ amount: newAmount, updated_at: new Date().toISOString() })
    .eq('id', current.id)
    .select()
    .single()

  if (error) throw new Error(`Failed to update bankroll: ${error.message}`)

  // Log transaction
  await supabaseAdmin.from('bankroll_transactions').insert({
    bet_id: null,
    type: 'adjustment',
    amount: newAmount - current.amount,
    balance_after: newAmount,
    description: 'Manual bankroll adjustment',
    created_at: new Date().toISOString(),
  })

  return data as Bankroll
}

async function updateBankrollFromBet(
  profitLoss: number,
  betId: string,
  result: BetResult
): Promise<void> {
  const current = await getBankroll()
  const newAmount = current.amount + profitLoss

  await supabaseAdmin
    .from('bankroll')
    .update({ amount: newAmount, updated_at: new Date().toISOString() })
    .eq('id', current.id)

  await supabaseAdmin.from('bankroll_transactions').insert({
    bet_id: betId,
    type: result === 'won' ? 'win' : result === 'lost' ? 'loss' : 'adjustment',
    amount: profitLoss,
    balance_after: newAmount,
    description: `Bet ${result}: ${betId}`,
    created_at: new Date().toISOString(),
  })
}

/**
 * Computes daily analytics from stored bets
 */
export async function getDailyAnalytics(): Promise<DailyAnalytics[]> {
  const { data, error } = await supabaseAdmin
    .from('value_bets')
    .select('*')
    .in('status', ['won', 'lost', 'void'])
    .order('created_at', { ascending: false })

  if (error) throw new Error(`Failed to fetch analytics data: ${error.message}`)

  const bets = data as ValueBet[]

  // Group by date
  const grouped: Record<string, ValueBet[]> = {}
  for (const bet of bets) {
    const date = bet.created_at.split('T')[0]
    if (!grouped[date]) grouped[date] = []
    grouped[date].push(bet)
  }

  const analytics: DailyAnalytics[] = Object.entries(grouped).map(([date, dayBets]) => {
    const wonBets = dayBets.filter((b) => b.result === 'won')
    const lostBets = dayBets.filter((b) => b.result === 'lost')
    const totalStaked = dayBets.reduce((sum, b) => sum + (b.stake_amount || 0), 0)
    const actualPL = dayBets.reduce((sum, b) => sum + (b.profit_loss || 0), 0)
    const totalEV = dayBets.reduce((sum, b) => sum + b.expected_value, 0)

    return {
      date,
      total_bets: dayBets.length,
      won_bets: wonBets.length,
      lost_bets: lostBets.length,
      hit_rate: dayBets.length > 0 ? wonBets.length / dayBets.length : 0,
      actual_profit_loss: actualPL,
      total_ev_generated: totalEV,
      potential_profit: totalStaked * (totalEV / 100),
      total_staked: totalStaked,
    }
  })

  return analytics.sort((a, b) => b.date.localeCompare(a.date))
}

/**
 * Marks stale active bets as pending_result if event date has passed
 */
export async function markStaleActiveBets(): Promise<number> {
  const now = new Date().toISOString()

  const { data, error } = await supabaseAdmin
    .from('value_bets')
    .update({ status: 'pending_result', updated_at: now })
    .eq('status', 'active')
    .lt('event_date', now)
    .select('id')

  if (error) throw new Error(`Failed to mark stale bets: ${error.message}`)
  return data?.length ?? 0
}
