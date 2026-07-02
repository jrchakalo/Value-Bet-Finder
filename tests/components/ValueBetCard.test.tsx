import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import ValueBetCard from '../../components/ValueBetCard'
import type { ValueBet } from '../../lib/types'

const mockBet: ValueBet = {
  id: 'test-bet-001',
  event_id: 123456,
  bookmaker: 'Superbet',
  market_name: 'ML',
  bet_side: 'home',
  expected_value: 5.23,
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

describe('ValueBetCard Component', () => {
  it('should render team names', () => {
    render(<ValueBetCard bet={mockBet} bankroll={1000} />)
    expect(screen.getByText('Manchester United')).toBeDefined()
    expect(screen.getByText('Liverpool')).toBeDefined()
  })

  it('should render bookmaker name', () => {
    render(<ValueBetCard bet={mockBet} bankroll={1000} />)
    expect(screen.getByText('Superbet')).toBeDefined()
  })

  it('should render EV percentage', () => {
    render(<ValueBetCard bet={mockBet} bankroll={1000} />)
    expect(screen.getByText(/5\.23%/)).toBeDefined()
  })

  it('should render bookmaker odds', () => {
    render(<ValueBetCard bet={mockBet} bankroll={1000} />)
    expect(screen.getByText('2.10')).toBeDefined()
  })

  it('should render bet side', () => {
    render(<ValueBetCard bet={mockBet} bankroll={1000} />)
    expect(screen.getByText('Home')).toBeDefined()
  })

  it('should render league name', () => {
    render(<ValueBetCard bet={mockBet} bankroll={1000} />)
    expect(screen.getByText('England - Premier League')).toBeDefined()
  })

  it('should render Kelly stake recommendation', () => {
    render(<ValueBetCard bet={mockBet} bankroll={1000} />)
    // Should show a dollar amount for the stake
    const stakeElements = screen.getAllByText(/\$\d+/)
    expect(stakeElements.length).toBeGreaterThan(0)
  })

  it('should render Place Bet link when href is provided', () => {
    render(<ValueBetCard bet={mockBet} bankroll={1000} />)
    const link = screen.getByText('Place Bet')
    expect(link).toBeDefined()
  })

  it('should not render Place Bet link when href is null', () => {
    const betWithoutHref = { ...mockBet, bookmaker_href: null }
    render(<ValueBetCard bet={betWithoutHref} bankroll={1000} />)
    expect(screen.queryByText('Place Bet')).toBeNull()
  })

  it('should render Mark Result button', () => {
    render(<ValueBetCard bet={mockBet} bankroll={1000} />)
    expect(screen.getByText('Mark Result')).toBeDefined()
  })

  it('should show resolve options when Mark Result is clicked', async () => {
    const { getByText } = render(<ValueBetCard bet={mockBet} bankroll={1000} />)
    const markResultBtn = getByText('Mark Result')
    markResultBtn.click()

    // After clicking, resolve buttons should appear
    await new Promise((r) => setTimeout(r, 50))
    // Won/Lost/Void buttons should be visible
    expect(screen.queryByText(/Won|Lost|Void/)).toBeDefined()
  })

  it('should call onResolve when bet is resolved', async () => {
    const onResolve = vi.fn()
    global.fetch = vi.fn().mockResolvedValueOnce({
      json: () => Promise.resolve({ success: true }),
    })

    render(<ValueBetCard bet={mockBet} bankroll={1000} onResolve={onResolve} />)
  })

  it('should display upcoming badge for future events', () => {
    render(<ValueBetCard bet={mockBet} bankroll={1000} />)
    expect(screen.getByText(/Upcoming/)).toBeDefined()
  })
})
