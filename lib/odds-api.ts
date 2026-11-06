import axios from 'axios'
import { OddsAPIValueBet } from './types'

const ODDS_API_BASE_URL = 'https://api.odds-api.io/v3'

export const TARGET_BOOKMAKERS = ['Superbet', 'Bet7k']
export const TARGET_SPORT = 'football'

export interface FetchValueBetsOptions {
  bookmaker: string
  sport?: string
  includeEventDetails?: boolean
}

/**
 * Fetches value bets from the Odds-API for a specific bookmaker.
 *
 * Endpoint: GET /v3/value-bets
 * Required query params:
 *   - apiKey   : your API key
 *   - bookmaker: bookmaker name (e.g. "Superbet")
 *   - sport    : sport slug   (e.g. "football")
 * Optional query params:
 *   - includeEventDetails: "true" | "false"
 */
export async function fetchValueBets(
  options: FetchValueBetsOptions
): Promise<OddsAPIValueBet[]> {
  const { bookmaker, sport = TARGET_SPORT, includeEventDetails = true } = options

  // Read at call time (not module load) so the value is never stale and the
  // missing-key path stays testable.
  const apiKey = process.env.ODDS_API_KEY

  if (!apiKey) {
    throw new Error('ODDS_API_KEY environment variable is not set')
  }

  // Build params object explicitly so nothing is accidentally omitted or
  // mis-cased. The API is case-sensitive on both keys and values.
  const params: Record<string, string> = {
    apiKey,
    bookmaker: bookmaker,
    sport: sport,
    includeEventDetails: includeEventDetails ? 'true' : 'false',
  }

  const queryString = Object.entries(params)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&')

  const url = `${ODDS_API_BASE_URL}/value-bets?${queryString}`

  console.log(`[OddsAPI] GET ${ODDS_API_BASE_URL}/value-bets?bookmaker=${bookmaker}&sport=${sport}&includeEventDetails=${includeEventDetails}`)

  const response = await axios.get<OddsAPIValueBet[]>(url, {
    timeout: 15000,
    headers: {
      Accept: 'application/json',
      'User-Agent': 'ValueBetFinder/1.0',
    },
  })

  console.log(`[OddsAPI] Response status: ${response.status}, items: ${Array.isArray(response.data) ? response.data.length : 'non-array'}`)

  if (!Array.isArray(response.data)) {
    throw new Error(
      `Unexpected response format from Odds-API: ${typeof response.data} — ${JSON.stringify(response.data).slice(0, 200)}`
    )
  }

  return response.data
}

/**
 * Fetches value bets for all target bookmakers.
 * Returns combined results; throws only if ALL bookmakers fail.
 */
export async function fetchAllTargetValueBets(): Promise<OddsAPIValueBet[]> {
  const results: OddsAPIValueBet[] = []
  const errors: string[] = []

  for (const bookmaker of TARGET_BOOKMAKERS) {
    try {
      const bets = await fetchValueBets({ bookmaker })
      results.push(...bets)
      console.log(`[OddsAPI] ✅ ${bookmaker}: ${bets.length} bets`)
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      errors.push(`${bookmaker}: ${message}`)
      console.error(`[OddsAPI] ❌ Failed to fetch for ${bookmaker}:`, message)
    }
  }

  if (errors.length === TARGET_BOOKMAKERS.length) {
    throw new Error(`All bookmaker fetches failed: ${errors.join('; ')}`)
  }

  return results
}

/**
 * Parses the bookmaker odds value for a specific bet side.
 */
export function parseOddsForSide(
  bookmakerOdds: OddsAPIValueBet['bookmakerOdds'],
  betSide: string
): number {
  const side = betSide.toLowerCase()
  const value =
    side === 'home' ? bookmakerOdds.home :
    side === 'away' ? bookmakerOdds.away :
    side === 'draw' ? bookmakerOdds.draw :
    side === 'over' ? bookmakerOdds.home :
    side === 'under' ? bookmakerOdds.away :
    bookmakerOdds.home

  return parseFloat(value || '0')
}
