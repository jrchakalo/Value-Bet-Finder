import { describe, it, expect, vi, beforeEach } from 'vitest'
import { parseOddsForSide, TARGET_BOOKMAKERS, TARGET_SPORT } from '../lib/odds-api'
import type { OddsAPIValueBet } from '../lib/types'

// Mock axios
vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
  },
}))

const mockBet: OddsAPIValueBet = {
  id: 'test-bet-123',
  eventId: 123456,
  bookmaker: 'Superbet',
  market: {
    name: 'ML',
    hdp: null,
    home: '2.10',
    away: '3.20',
    max: 150,
  },
  betSide: 'home',
  expectedValue: 5.23,
  expectedValueUpdatedAt: '2025-10-04T10:30:00Z',
  bookmakerOdds: {
    home: '2.10',
    away: '3.20',
    draw: '3.40',
    href: 'https://superbet.com/bet/123',
  },
  event: {
    home: 'Manchester United',
    away: 'Liverpool',
    date: '2025-10-15T15:00:00Z',
    sport: 'Football',
    league: 'England - Premier League',
  },
}

describe('Odds API Module', () => {
  describe('Constants', () => {
    it('should target correct bookmakers', () => {
      expect(TARGET_BOOKMAKERS).toContain('Superbet')
      expect(TARGET_BOOKMAKERS).toContain('Bet7k')
      expect(TARGET_BOOKMAKERS).toHaveLength(2)
    })

    it('should target football sport', () => {
      expect(TARGET_SPORT).toBe('football')
    })
  })

  describe('parseOddsForSide', () => {
    it('should parse home odds correctly', () => {
      const odds = parseOddsForSide(mockBet.bookmakerOdds, 'home')
      expect(odds).toBe(2.10)
    })

    it('should parse away odds correctly', () => {
      const odds = parseOddsForSide(mockBet.bookmakerOdds, 'away')
      expect(odds).toBe(3.20)
    })

    it('should parse draw odds correctly', () => {
      const odds = parseOddsForSide(mockBet.bookmakerOdds, 'draw')
      expect(odds).toBe(3.40)
    })

    it('should handle case-insensitive bet sides', () => {
      expect(parseOddsForSide(mockBet.bookmakerOdds, 'HOME')).toBe(2.10)
      expect(parseOddsForSide(mockBet.bookmakerOdds, 'Away')).toBe(3.20)
    })

    it('should return 0 for missing odds', () => {
      const oddsWithoutDraw = { home: '2.10', away: '3.20', href: '' }
      const result = parseOddsForSide(oddsWithoutDraw, 'draw')
      expect(result).toBe(0)
    })

    it('should handle over/under sides', () => {
      const overUnderOdds = { home: '1.90', away: '1.90', href: '' }
      expect(parseOddsForSide(overUnderOdds, 'over')).toBe(1.90)
      expect(parseOddsForSide(overUnderOdds, 'under')).toBe(1.90)
    })
  })

  describe('fetchValueBets', () => {
    beforeEach(() => {
      vi.clearAllMocks()
    })

    it('should throw when API key is missing', async () => {
      const originalKey = process.env.ODDS_API_KEY
      delete process.env.ODDS_API_KEY

      const { fetchValueBets } = await import('../lib/odds-api')
      await expect(fetchValueBets({ bookmaker: 'Superbet' })).rejects.toThrow('ODDS_API_KEY')

      process.env.ODDS_API_KEY = originalKey
    })

    it('should call correct endpoint with correct params', async () => {
      const axios = await import('axios')
      const mockGet = vi.mocked(axios.default.get)
      mockGet.mockResolvedValueOnce({ data: [mockBet] })

      process.env.ODDS_API_KEY = 'test-key'
      const { fetchValueBets } = await import('../lib/odds-api')
      const result = await fetchValueBets({ bookmaker: 'Superbet', sport: 'football' })

      expect(mockGet).toHaveBeenCalledWith(
        expect.stringContaining('/v3/value-bets'),
        expect.any(Object)
      )
      expect(mockGet).toHaveBeenCalledWith(
        expect.stringContaining('bookmaker=Superbet'),
        expect.any(Object)
      )
      expect(mockGet).toHaveBeenCalledWith(
        expect.stringContaining('sport=football'),
        expect.any(Object)
      )
      expect(result).toEqual([mockBet])
    })

    it('should throw on non-array response', async () => {
      const axios = await import('axios')
      const mockGet = vi.mocked(axios.default.get)
      mockGet.mockResolvedValueOnce({ data: { error: 'bad' } })

      process.env.ODDS_API_KEY = 'test-key'
      const { fetchValueBets } = await import('../lib/odds-api')
      await expect(fetchValueBets({ bookmaker: 'Superbet' })).rejects.toThrow('Unexpected response format')
    })
  })
})
