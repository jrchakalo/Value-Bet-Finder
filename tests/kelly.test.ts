import { describe, it, expect } from 'vitest'
import { calculateKelly, impliedProbability, calculateEV, formatStake } from '../lib/kelly'

describe('Kelly Criterion', () => {
  describe('calculateKelly', () => {
    it('should calculate correct fractional Kelly stake for a standard value bet', () => {
      // Bookmaker odds: 2.10, EV: 5.23%, Bankroll: $1000, Kelly fraction: 25%
      const result = calculateKelly(2.10, 5.23, 1000, 'Superbet', 0.25)

      expect(result.recommended_stake).toBeGreaterThan(0)
      expect(result.recommended_stake).toBeLessThan(1000)
      expect(result.full_kelly_fraction).toBeGreaterThan(0)
      expect(result.full_kelly_fraction).toBeLessThanOrEqual(1)
      expect(result.fractional_kelly_fraction).toBe(result.full_kelly_fraction * 0.25)
    })

    it('should return 25% of full Kelly by default', () => {
      const fullKelly = calculateKelly(2.10, 5.23, 1000, 'Superbet', 1.0)
      const quarterKelly = calculateKelly(2.10, 5.23, 1000, 'Superbet', 0.25)

      expect(quarterKelly.recommended_stake).toBeCloseTo(fullKelly.recommended_stake * 0.25, 0)
    })

    it('should scale stake proportionally with bankroll', () => {
      const result1000 = calculateKelly(2.10, 5.23, 1000, 'Superbet', 0.25)
      const result2000 = calculateKelly(2.10, 5.23, 2000, 'Superbet', 0.25)

      expect(result2000.recommended_stake).toBeCloseTo(result1000.recommended_stake * 2, 1)
    })

    it('should return zero stake for negative EV', () => {
      // Negative EV means no value — Kelly should return 0
      const result = calculateKelly(1.50, -5.0, 1000, 'Superbet', 0.25)
      expect(result.recommended_stake).toBe(0)
      expect(result.full_kelly_fraction).toBe(0)
    })

    it('should handle high EV bets correctly', () => {
      // Very high EV like 110.73% from the API example
      const result = calculateKelly(1.85, 110.73, 1000, 'Superbet', 0.25)
      expect(result.recommended_stake).toBeGreaterThan(0)
      expect(result.recommended_stake).toBeLessThanOrEqual(1000)
      // Full Kelly should be clamped to 1 (100% of bankroll max)
      expect(result.full_kelly_fraction).toBeLessThanOrEqual(1)
    })

    it('should return zero stake for invalid odds (<=1)', () => {
      const result = calculateKelly(1.0, 5.0, 1000, 'Superbet')
      expect(result.recommended_stake).toBe(0)
      expect(result.full_kelly_fraction).toBe(0)
    })

    it('should return zero stake for non-positive bankroll', () => {
      const result = calculateKelly(2.10, 5.0, 0, 'Superbet')
      expect(result.recommended_stake).toBe(0)
    })

    it('should return zero stake for invalid Kelly fraction', () => {
      const result = calculateKelly(2.10, 5.0, 1000, 'Superbet', 0)
      expect(result.recommended_stake).toBe(0)
    })

    it('should produce kelly_percentage equal to fractional_kelly_fraction * 100', () => {
      const result = calculateKelly(2.10, 5.23, 1000, 'Superbet', 0.25)
      expect(result.kelly_percentage).toBeCloseTo(result.fractional_kelly_fraction * 100, 5)
    })

    it('should round recommended_stake to 2 decimal places', () => {
      const result = calculateKelly(2.10, 5.23, 1000, 'Superbet', 0.25)
      const decimalPlaces = (result.recommended_stake.toString().split('.')[1] || '').length
      expect(decimalPlaces).toBeLessThanOrEqual(2)
    })

    it('should handle odds of 2.0 (even money) correctly', () => {
      // At 2.0 odds with 5% EV: p = (1.05) / 2.0 = 0.525, q = 0.475
      // Kelly = (1 * 0.525 - 0.475) / 1 = 0.05
      const result = calculateKelly(2.0, 5.0, 1000, 'Superbet', 1.0)
      expect(result.full_kelly_fraction).toBeCloseTo(0.05, 3)
      expect(result.recommended_stake).toBeCloseTo(50, 1)
    })

    it('should handle different Kelly fractions correctly', () => {
      const half = calculateKelly(2.10, 5.23, 1000, 'Superbet', 0.5)
      const quarter = calculateKelly(2.10, 5.23, 1000, 'Superbet', 0.25)
      expect(half.recommended_stake).toBeCloseTo(quarter.recommended_stake * 2, 1)
    })

    it('should apply Bet7k minimum stake floor', () => {
      const result = calculateKelly(2.05, 1.2, 100, 'Bet7k', 0.25)
      expect(result.recommended_stake).toBeGreaterThanOrEqual(0.75)
    })

    it('should apply a 0.50 minimum stake floor for other bookmakers', () => {
      const result = calculateKelly(2.05, 1.2, 100, 'Superbet', 0.25)
      expect(result.recommended_stake).toBeGreaterThanOrEqual(0.5)
    })
  })

  describe('impliedProbability', () => {
    it('should calculate correct implied probability from decimal odds', () => {
      expect(impliedProbability(2.0)).toBeCloseTo(0.5, 5)
      expect(impliedProbability(4.0)).toBeCloseTo(0.25, 5)
      expect(impliedProbability(1.5)).toBeCloseTo(0.6667, 3)
    })

    it('should throw for zero or negative odds', () => {
      expect(() => impliedProbability(0)).toThrow()
      expect(() => impliedProbability(-1)).toThrow()
    })
  })

  describe('calculateEV', () => {
    it('should return positive EV for value bets', () => {
      // True prob 0.55, odds 2.0 → EV = 0.55 * 2.0 - 1 = 0.10 (10%)
      expect(calculateEV(0.55, 2.0)).toBeCloseTo(0.10, 5)
    })

    it('should return negative EV for overpriced bets', () => {
      // True prob 0.45, odds 2.0 → EV = 0.45 * 2.0 - 1 = -0.10
      expect(calculateEV(0.45, 2.0)).toBeCloseTo(-0.10, 5)
    })

    it('should return zero EV for fair odds', () => {
      // True prob 0.5, odds 2.0 → EV = 0.5 * 2.0 - 1 = 0
      expect(calculateEV(0.5, 2.0)).toBeCloseTo(0, 5)
    })
  })

  describe('formatStake', () => {
    it('should format amounts as USD currency', () => {
      expect(formatStake(100)).toBe('R$\u00a0100,00')
      expect(formatStake(1234.56)).toBe('R$\u00a01.234,56')
      expect(formatStake(0.5)).toBe('R$\u00a00,50')
    })

    it('should handle zero', () => {
      expect(formatStake(0)).toBe('R$\u00a00,00')
    })
  })
})
