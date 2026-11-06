import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ValueBetCard from '../../components/ValueBetCard'
import type { ValueBet } from '../../lib/types'

// The API stores EV on a 100-base scale (100 = fair price, 105.23 = +5.23% EV).
// The card normalizes it for display, so the fixture mirrors production data.
const mockBet: ValueBet = {
  id: 'test-bet-001',
  event_id: 123456,
  bookmaker: 'Superbet',
  market_name: 'ML',
  bet_side: 'home',
  expected_value: 105.23,
  bookmaker_odds: 2.10,
  bookmaker_href: 'https://superbet.com/bet/123',
  home_team: 'Manchester United',
  away_team: 'Liverpool',
  event_date: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
  sport: 'Football',
  league: 'England - Premier League',
  hdp: null,
  max_stake: 150,
  status: 'active',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  resolved_at: null,
  result: null,
  stake_amount: null,
  profit_loss: null,
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe('ValueBetCard Component', () => {
  it('should render team names', () => {
    render(<ValueBetCard bet={mockBet} bankroll={1000} />)
    expect(screen.getByText(/Manchester United/)).toBeDefined()
    expect(screen.getByText(/Liverpool/)).toBeDefined()
  })

  it('should render bookmaker name', () => {
    render(<ValueBetCard bet={mockBet} bankroll={1000} />)
    expect(screen.getByText('Superbet')).toBeDefined()
  })

  it('should render EV percentage normalized from the 100-base value', () => {
    render(<ValueBetCard bet={mockBet} bankroll={1000} />)
    expect(screen.getByText(/5\.23%/)).toBeDefined()
  })

  it('should render bookmaker odds', () => {
    render(<ValueBetCard bet={mockBet} bankroll={1000} />)
    expect(screen.getByText('2.10')).toBeDefined()
  })

  it('should render bet side', () => {
    render(<ValueBetCard bet={mockBet} bankroll={1000} />)
    expect(screen.getByText('Casa')).toBeDefined()
  })

  it('should render league name', () => {
    render(<ValueBetCard bet={mockBet} bankroll={1000} />)
    expect(screen.getByText(/England - Premier League/)).toBeDefined()
  })

  it('should render Kelly stake recommendation', () => {
    render(<ValueBetCard bet={mockBet} bankroll={1000} />)
    // Positive EV must produce a non-zero stake in BRL
    const stakeElements = screen.getAllByText(/R\$\s?[\d.]+,\d{2}/)
    expect(stakeElements.length).toBeGreaterThan(0)
    expect(screen.queryByText(/R\$\s?0,00/)).toBeNull()
  })

  it('should render the bookmaker link when href is provided', () => {
    render(<ValueBetCard bet={mockBet} bankroll={1000} />)
    const link = screen.getByTitle('Abrir na casa de apostas')
    expect(link).toBeDefined()
    expect(link.getAttribute('href')).toBe('https://superbet.com/bet/123')
  })

  it('should not render the bookmaker link when href is null', () => {
    const betWithoutHref = { ...mockBet, bookmaker_href: null }
    render(<ValueBetCard bet={betWithoutHref} bankroll={1000} />)
    expect(screen.queryByTitle('Abrir na casa de apostas')).toBeNull()
  })

  it('should render Resolver Aposta button', () => {
    render(<ValueBetCard bet={mockBet} bankroll={1000} />)
    expect(screen.getByText('Resolver Aposta')).toBeDefined()
  })

  it('should show resolve options when Resolver Aposta is clicked', async () => {
    render(<ValueBetCard bet={mockBet} bankroll={1000} />)
    fireEvent.click(screen.getByText('Resolver Aposta'))

    await waitFor(() => {
      expect(screen.getByText('✓ Ganhou')).toBeDefined()
      expect(screen.getByText('✗ Perdeu')).toBeDefined()
      expect(screen.getByText('— Void')).toBeDefined()
    })
  })

  it('should call onResolve when bet is resolved', async () => {
    const onResolve = vi.fn()
    global.fetch = vi.fn().mockResolvedValueOnce({
      json: () => Promise.resolve({ success: true }),
    })

    render(<ValueBetCard bet={mockBet} bankroll={1000} onResolve={onResolve} />)

    fireEvent.click(screen.getByText('Resolver Aposta'))
    fireEvent.click(await screen.findByText('✓ Ganhou'))

    await waitFor(() => {
      expect(onResolve).toHaveBeenCalledWith(mockBet.id, 'won', expect.any(Number))
    })
    expect(onResolve.mock.calls[0][2]).toBeGreaterThan(0)
  })

  it('should display tomorrow label for a future event', () => {
    render(<ValueBetCard bet={mockBet} bankroll={1000} />)
    expect(screen.getByText(/Amanhã/)).toBeDefined()
  })
})
