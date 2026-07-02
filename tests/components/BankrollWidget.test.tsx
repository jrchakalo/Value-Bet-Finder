import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import BankrollWidget from '../../components/BankrollWidget'

describe('BankrollWidget Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch and display bankroll on mount', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          success: true,
          data: { id: '1', amount: 1500.00, updated_at: new Date().toISOString() },
        }),
    })

    render(<BankrollWidget />)

    await waitFor(() => {
      expect(screen.getByText('$1,500.00')).toBeDefined()
    })
  })

  it('should show edit button', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          success: true,
          data: { id: '1', amount: 1000.00, updated_at: new Date().toISOString() },
        }),
    })

    render(<BankrollWidget />)

    await waitFor(() => {
      expect(screen.getByText('Edit')).toBeDefined()
    })
  })

  it('should show input when edit is clicked', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          success: true,
          data: { id: '1', amount: 1000.00, updated_at: new Date().toISOString() },
        }),
    })

    render(<BankrollWidget />)

    await waitFor(() => {
      const editBtn = screen.getByText('Edit')
      editBtn.click()
    })

    await waitFor(() => {
      expect(screen.getByText('Save')).toBeDefined()
      expect(screen.getByText('Cancel')).toBeDefined()
    })
  })

  it('should call onBankrollChange when bankroll is loaded', async () => {
    const onBankrollChange = vi.fn()
    global.fetch = vi.fn().mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          success: true,
          data: { id: '1', amount: 2000.00, updated_at: new Date().toISOString() },
        }),
    })

    render(<BankrollWidget onBankrollChange={onBankrollChange} />)

    await waitFor(() => {
      expect(onBankrollChange).toHaveBeenCalledWith(2000.00)
    })
  })

  it('should display Current Bankroll label', () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      json: () => Promise.resolve({ success: false }),
    })

    render(<BankrollWidget />)
    expect(screen.getByText('Current Bankroll')).toBeDefined()
  })
})
