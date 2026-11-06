'use client'

import { useEffect, useState } from 'react'
import { Bankroll } from '@/lib/types'
import { formatStake } from '@/lib/kelly'

interface BankrollWidgetProps {
  onBankrollChange?: (amount: number) => void
  readOnly?: boolean
}

export default function BankrollWidget({
  onBankrollChange,
  readOnly = false,
}: BankrollWidgetProps) {
  const [bankroll, setBankroll] = useState<Bankroll | null>(null)
  const [editing, setEditing] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function fetchBankroll() {
    try {
      const res = await fetch('/api/bankroll')
      const json = await res.json()
      if (json.success) {
        setBankroll(json.data)
        onBankrollChange?.(json.data.amount)
      }
    } catch {
      console.error('Falha ao buscar banca')
    }
  }

  useEffect(() => {
    fetchBankroll()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function startEditing() {
    if (readOnly) return
    setInputValue(bankroll?.amount.toFixed(2) ?? '1000.00')
    setEditing(true)
    setError('')
  }

  async function saveBankroll() {
    const amount = parseFloat(inputValue)
    if (isNaN(amount) || amount <= 0) {
      setError('Insira um valor positivo válido')
      return
    }
    setSaving(true)
    try {
      const res = await fetch('/api/bankroll', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      })
      const json = await res.json()
      if (json.success) {
        setBankroll(json.data)
        onBankrollChange?.(json.data.amount)
        setEditing(false)
        setError('')
      } else {
        setError(json.error || 'Falha ao salvar')
      }
    } catch {
      setError('Erro de rede')
    } finally {
      setSaving(false)
    }
  }

  function cancelEditing() {
    setEditing(false)
    setError('')
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') saveBankroll()
    if (e.key === 'Escape') cancelEditing()
  }

  const updatedAt = bankroll?.updated_at
    ? new Date(bankroll.updated_at).toLocaleDateString('pt-BR', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : null

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 h-full">
      <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wider">
        Banca
      </p>

      {!editing ? (
        <div className="flex items-end justify-between">
          <div>
            <p className="text-2xl font-bold text-white">
              {bankroll ? formatStake(bankroll.amount) : '—'}
            </p>
            {updatedAt && (
              <p className="text-xs text-gray-600 mt-1">Atualizado {updatedAt}</p>
            )}
          </div>
          <button
            onClick={startEditing}
            disabled={readOnly}
            className="text-xs text-gray-500 hover:text-gray-300 transition-colors px-2 py-1 rounded hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {readOnly ? 'Somente leitura' : 'Editar'}
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex">
            <span className="flex items-center px-2 text-gray-400 text-sm bg-gray-800 border border-r-0 border-gray-700 rounded-l-lg">
              R$
            </span>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              className="flex-1 bg-gray-800 border border-gray-700 rounded-r-lg px-2 py-1.5 text-sm text-gray-100 focus:outline-none focus:border-gray-500 min-w-0"
              placeholder="1000.00"
              min="0"
              step="0.01"
            />
          </div>
          {error && <p className="text-xs text-red-400">{error}</p>}
          <div className="flex gap-2">
            <button
              onClick={saveBankroll}
              disabled={saving}
              className="flex-1 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-600/40 text-emerald-400 text-xs font-medium rounded-lg transition-colors disabled:opacity-50"
            >
              {saving ? 'Salvando…' : 'Salvar'}
            </button>
            <button
              onClick={cancelEditing}
              className="flex-1 py-1.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-400 text-xs font-medium rounded-lg transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
