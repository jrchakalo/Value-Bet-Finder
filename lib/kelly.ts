import { KellyResult } from './types'

/**
 * Calculate Kelly Criterion stake recommendation.
 *
 * Formula:  f* = (b·p − q) / b
 *   b = bookmakerOdds − 1   (net profit per unit staked)
 *   p = true win probability (derived from EV and decimal odds)
 *   q = 1 − p
 *
 * True probability derivation:
 *   EV% = (p · decimalOdds − 1) · 100
 *   → p  = (EV/100 + 1) / decimalOdds
 *
 * @param bookmakerOdds  Decimal odds (e.g. 2.10)
 * @param expectedValue  EV as a percentage (e.g. 5.3 means +5.3 %)
 * @param bankroll       Current bankroll in dollars
 * @param kellyFraction  Fractional Kelly multiplier — default 0.25 (quarter Kelly)
 * @param bookmaker      Bookmaker name used to apply a minimum stake floor
 */
export function calculateKelly(
  bookmakerOdds: number,
  expectedValue: number,
  bankroll: number,
  bookmaker: string,
  kellyFraction: number = 0.25
): KellyResult {
  // Guard: return zero stake for degenerate inputs
  if (bookmakerOdds <= 1 || bankroll <= 0 || kellyFraction <= 0) {
    return {
      full_kelly_fraction: 0,
      fractional_kelly_fraction: 0,
      recommended_stake: 0,
      kelly_percentage: 0,
    }
  }

  const b = bookmakerOdds - 1
  const p = (expectedValue / 100 + 1) / bookmakerOdds
  const q = 1 - p

  const fullKelly = (b * p - q) / b

  // Clamp to [0, 1] — never bet more than the whole bankroll
  const clampedFullKelly = Math.max(0, Math.min(1, fullKelly))
  const fractionalKelly = clampedFullKelly * kellyFraction
  const rawStake = Math.round(fractionalKelly * bankroll * 100) / 100
  const minStake = bookmaker.trim().toLowerCase() === 'bet7k' ? 0.75 : 0.5
  const recommendedStake =
    rawStake > 0 && rawStake < minStake
      ? minStake
      : rawStake === minStake
      ? minStake
      : rawStake > minStake
      ? Math.round(rawStake * 2) / 2
      : 0

  return {
    full_kelly_fraction: clampedFullKelly,
    fractional_kelly_fraction: fractionalKelly,
    recommended_stake: recommendedStake,
    kelly_percentage: fractionalKelly * 100,
  }
}

/**
 * Implied probability from decimal odds.
 */
export function impliedProbability(decimalOdds: number): number {
  if (decimalOdds <= 0) throw new Error('Odds must be positive')
  return 1 / decimalOdds
}

/**
 * Expected value given true probability and decimal odds.
 * Returns a decimal (e.g. 0.053 = +5.3 % EV).
 */
export function calculateEV(trueProbability: number, decimalOdds: number): number {
  return trueProbability * decimalOdds - 1
}

/**
 * Minimum decimal odds required for a bet to have positive EV.
 */
export function minOddsForPositiveEV(trueProbability: number): number {
  if (trueProbability <= 0 || trueProbability >= 1) return Infinity
  return 1 / trueProbability
}

/**
 * Edge: how much better the true probability is vs the implied probability,
 * expressed as a percentage.
 */
export function calculateEdge(trueProbability: number, decimalOdds: number): number {
  const implied = impliedProbability(decimalOdds)
  return ((trueProbability - implied) / implied) * 100
}

/**
 * Format a monetary amount as Brazilian Real (BRL).
 */
export function formatStake(amount: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}
