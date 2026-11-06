import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'

const mocks = vi.hoisted(() => ({
  auth: vi.fn(),
  getActiveValueBets: vi.fn(),
  upsertValueBets: vi.fn(),
  resolveBet: vi.fn(),
  getBankroll: vi.fn(),
  updateBankroll: vi.fn(),
  fetchAllTargetValueBets: vi.fn(),
}))

vi.mock('@/auth', () => ({ auth: mocks.auth }))
vi.mock('@/lib/database', () => ({
  getActiveValueBets: mocks.getActiveValueBets,
  upsertValueBets: mocks.upsertValueBets,
  resolveBet: mocks.resolveBet,
  getBankroll: mocks.getBankroll,
  updateBankroll: mocks.updateBankroll,
}))
vi.mock('@/lib/odds-api', () => ({
  fetchAllTargetValueBets: mocks.fetchAllTargetValueBets,
}))

import { POST as triggerFetch } from '../app/api/bets/route'
import { POST as resolveBet } from '../app/api/bets/resolve/route'
import { PUT as updateBankroll } from '../app/api/bankroll/route'

function jsonRequest(url: string, method: string, body: unknown): NextRequest {
  return new NextRequest(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

describe('Write routes authorization', () => {
  describe('demo role (read-only)', () => {
    beforeEach(() => {
      vi.clearAllMocks()
      mocks.auth.mockResolvedValue({ user: { name: 'demo', role: 'demo' } })
    })

    it('should block manual fetch with 403', async () => {
      const res = await triggerFetch()
      expect(res.status).toBe(403)
      expect(mocks.fetchAllTargetValueBets).not.toHaveBeenCalled()
    })

    it('should block bet resolution with 403', async () => {
      const res = await resolveBet(
        jsonRequest('http://localhost/api/bets/resolve', 'POST', {
          betId: 'bet-1',
          result: 'won',
          stakeAmount: 10,
        })
      )
      expect(res.status).toBe(403)
      expect(mocks.resolveBet).not.toHaveBeenCalled()
    })

    it('should block bankroll updates with 403', async () => {
      const res = await updateBankroll(
        jsonRequest('http://localhost/api/bankroll', 'PUT', { amount: 500 })
      )
      expect(res.status).toBe(403)
      expect(mocks.updateBankroll).not.toHaveBeenCalled()
    })
  })

  describe('admin role', () => {
    beforeEach(() => {
      vi.clearAllMocks()
      mocks.auth.mockResolvedValue({ user: { name: 'admin', role: 'admin' } })
      mocks.getActiveValueBets.mockResolvedValue([])
      mocks.fetchAllTargetValueBets.mockResolvedValue([])
      mocks.upsertValueBets.mockResolvedValue(0)
      mocks.resolveBet.mockResolvedValue(undefined)
      mocks.updateBankroll.mockResolvedValue({
        id: '1',
        amount: 500,
        updated_at: new Date().toISOString(),
      })
    })

    it('should allow manual fetch', async () => {
      const res = await triggerFetch()
      expect(res.status).toBe(200)
      expect(mocks.fetchAllTargetValueBets).toHaveBeenCalledTimes(1)
    })

    it('should allow bet resolution', async () => {
      const res = await resolveBet(
        jsonRequest('http://localhost/api/bets/resolve', 'POST', {
          betId: 'bet-1',
          result: 'won',
          stakeAmount: 10,
        })
      )
      expect(res.status).toBe(200)
      expect(mocks.resolveBet).toHaveBeenCalledWith('bet-1', 'won', 10)
    })

    it('should allow bankroll updates', async () => {
      const res = await updateBankroll(
        jsonRequest('http://localhost/api/bankroll', 'PUT', { amount: 500 })
      )
      expect(res.status).toBe(200)
      expect(mocks.updateBankroll).toHaveBeenCalledWith(500)
    })
  })

  it('should return 401 without a session', async () => {
    vi.clearAllMocks()
    mocks.auth.mockResolvedValue(null)

    const res = await triggerFetch()
    expect(res.status).toBe(401)
    expect(mocks.fetchAllTargetValueBets).not.toHaveBeenCalled()
  })
})
