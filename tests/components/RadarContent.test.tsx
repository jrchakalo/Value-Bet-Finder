import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { useSession } from 'next-auth/react'
import RadarContent from '../../components/RadarContent'

afterEach(() => {
  vi.restoreAllMocks()
})

describe('RadarContent demo mode', () => {
  it('should not expose manual refresh actions or start polling', async () => {
    vi.mocked(useSession).mockReturnValue({
      data: { user: { name: 'demo', role: 'demo' } },
      status: 'authenticated',
      update: vi.fn(),
    } as never)

    global.fetch = vi.fn().mockImplementation((input: RequestInfo | URL) => {
      const url = String(input)

      if (url === '/api/bankroll') {
        return Promise.resolve({
          json: () =>
            Promise.resolve({
              success: true,
              data: { id: '1', amount: 1000, updated_at: new Date().toISOString() },
            }),
        })
      }

      if (url === '/api/worker-status') {
        return Promise.resolve({
          json: () => Promise.resolve({ success: true, data: null }),
        })
      }

      return Promise.resolve({
        json: () => Promise.resolve({ success: true, data: [] }),
      })
    })

    const intervalSpy = vi.spyOn(globalThis, 'setInterval')

    render(<RadarContent />)

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/bets', { cache: 'no-store' })
    })

    expect(screen.queryByText('↻ Atualizar')).toBeNull()
    expect(screen.queryByText('⚡ Forçar Busca de Value Bets')).toBeNull()
    expect(screen.getByText('Modo demo · somente leitura')).toBeDefined()

    const pollingCalls = intervalSpy.mock.calls.filter(
      ([, delay]) => delay === 60_000 || delay === 30_000
    )
    expect(pollingCalls).toHaveLength(0)
  })
})
