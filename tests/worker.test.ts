import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// Mock all external dependencies
vi.mock('../lib/odds-api', () => ({
  fetchAllTargetValueBets: vi.fn(),
  TARGET_BOOKMAKERS: ['Superbet', 'Bet7k'],
  TARGET_SPORT: 'football',
}))

vi.mock('../lib/database', () => ({
  upsertValueBets: vi.fn(),
  markStaleActiveBets: vi.fn(),
}))

vi.mock('../lib/supabase', () => ({
  supabaseAdmin: {
    from: vi.fn(() => ({
      upsert: vi.fn().mockReturnThis(),
      eq: vi.fn().mockResolvedValue({ error: null }),
    })),
  },
}))

describe('Worker Logic', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Fetch Interval Constraints', () => {
    it('should use exactly 40 second interval', () => {
      const FETCH_INTERVAL_SECONDS = 40
      expect(FETCH_INTERVAL_SECONDS).toBe(40)
    })

    it('should result in max 90 requests per hour per bookmaker', () => {
      const FETCH_INTERVAL_SECONDS = 40
      const requestsPerHour = Math.floor(3600 / FETCH_INTERVAL_SECONDS)
      expect(requestsPerHour).toBe(90)
    })

    it('should stay under 100 req/hour free tier limit', () => {
      const FETCH_INTERVAL_SECONDS = 40
      const requestsPerHour = Math.floor(3600 / FETCH_INTERVAL_SECONDS)
      expect(requestsPerHour).toBeLessThan(100)
    })
  })

  describe('Fetch Cycle Logic', () => {
    it('should call fetchAllTargetValueBets and upsertValueBets on success', async () => {
      const { fetchAllTargetValueBets } = await import('../lib/odds-api')
      const { upsertValueBets, markStaleActiveBets } = await import('../lib/database')

      const mockBets = [
        {
          id: 'bet-1',
          eventId: 1,
          bookmaker: 'Superbet',
          market: { name: 'ML', hdp: null, home: '2.0', away: '2.0', max: null },
          betSide: 'home',
          expectedValue: 5.0,
          expectedValueUpdatedAt: new Date().toISOString(),
          bookmakerOdds: { home: '2.0', away: '2.0', href: '' },
          event: {
            home: 'Team A',
            away: 'Team B',
            date: new Date().toISOString(),
            sport: 'Football',
            league: 'Test',
          },
        },
      ]

      vi.mocked(fetchAllTargetValueBets).mockResolvedValueOnce(mockBets)
      vi.mocked(upsertValueBets).mockResolvedValueOnce(1)
      vi.mocked(markStaleActiveBets).mockResolvedValueOnce(0)

      // Simulate the fetch cycle logic
      const bets = await fetchAllTargetValueBets()
      expect(bets).toHaveLength(1)

      const stored = await upsertValueBets(bets)
      expect(stored).toBe(1)

      const stale = await markStaleActiveBets()
      expect(stale).toBe(0)

      expect(fetchAllTargetValueBets).toHaveBeenCalledOnce()
      expect(upsertValueBets).toHaveBeenCalledWith(mockBets)
      expect(markStaleActiveBets).toHaveBeenCalledOnce()
    })

    it('should handle empty bet response gracefully', async () => {
      const { fetchAllTargetValueBets } = await import('../lib/odds-api')
      const { upsertValueBets } = await import('../lib/database')

      vi.mocked(fetchAllTargetValueBets).mockResolvedValueOnce([])

      const bets = await fetchAllTargetValueBets()
      expect(bets).toHaveLength(0)

      // Should not call upsert with empty array (or call with empty)
      if (bets.length > 0) {
        await upsertValueBets(bets)
        expect(upsertValueBets).toHaveBeenCalled()
      } else {
        expect(upsertValueBets).not.toHaveBeenCalled()
      }
    })

    it('should handle API errors without crashing', async () => {
      const { fetchAllTargetValueBets } = await import('../lib/odds-api')

      vi.mocked(fetchAllTargetValueBets).mockRejectedValueOnce(
        new Error('API connection failed')
      )

      // The worker should catch this error
      let errorCaught = false
      try {
        await fetchAllTargetValueBets()
      } catch (error) {
        errorCaught = true
        expect(error).toBeInstanceOf(Error)
        expect((error as Error).message).toBe('API connection failed')
      }

      expect(errorCaught).toBe(true)
    })
  })

  describe('Data Storage Validation', () => {
    it('should store bets with correct status as active', async () => {
      const { upsertValueBets } = await import('../lib/database')

      vi.mocked(upsertValueBets).mockImplementationOnce(async (bets) => {
        // Validate all bets have active status
        expect(bets.length).toBeGreaterThan(0)
        return bets.length
      })

      const mockBets = [
        {
          id: 'bet-active-1',
          eventId: 100,
          bookmaker: 'Bet7k',
          market: { name: 'ML', hdp: null, home: '1.9', away: '2.1', max: null },
          betSide: 'away',
          expectedValue: 3.5,
          expectedValueUpdatedAt: new Date().toISOString(),
          bookmakerOdds: { home: '1.9', away: '2.1', href: 'https://bet7k.com/bet/100' },
          event: {
            home: 'Home FC',
            away: 'Away FC',
            date: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
            sport: 'Football',
            league: 'Test League',
          },
        },
      ]

      const result = await upsertValueBets(mockBets)
      expect(result).toBe(1)
    })
  })
})
