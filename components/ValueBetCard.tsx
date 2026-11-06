'use client'

import { useState } from 'react'
import { ValueBet } from '@/lib/types'
import { calculateKelly, formatStake } from '@/lib/kelly'
import { translateBet } from '@/lib/translations'

interface ValueBetCardProps {
  bet: ValueBet
  bankroll: number
  kellyFraction?: number
  onResolve?: (betId: string, result: 'won' | 'lost' | 'void', stake: number) => void
  readOnly?: boolean
}

export default function ValueBetCard({
  bet,
  bankroll,
  kellyFraction = 0.25,
  onResolve,
  readOnly = false,
}: ValueBetCardProps) {
  const [showResolve, setShowResolve] = useState(false)
  const [resolving, setResolving] = useState(false)
  const [useCustomStake, setUseCustomStake] = useState(false)
  const [customStake, setCustomStake] = useState('')

  const normalizedMarket = (bet.market_name ?? '').toLowerCase()
  const normalizedSide = (bet.bet_side ?? '').toLowerCase()
  const isSpreadMarket =
    normalizedMarket.includes('handicap') ||
    normalizedMarket.includes('spread') ||
    normalizedMarket.includes('asian handicap')

  const formatHandicap = (value: number | null | undefined) => {
    if (value == null || Number.isNaN(value)) return '—'
    return `${value > 0 ? '+' : ''}${value}`
  }

  const homeHandicap = isSpreadMarket
    ? normalizedSide === 'away'
      ? bet.hdp != null
        ? bet.hdp * -1
        : null
      : bet.hdp ?? null
    : null

  const awayHandicap = isSpreadMarket
    ? normalizedSide === 'away'
      ? bet.hdp ?? null
      : bet.hdp != null
      ? bet.hdp * -1
      : null
    : null

  const displayEv = bet.expected_value - 100
  const formatEv = (value: number) => `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`
  const kelly = calculateKelly(
    bet.bookmaker_odds,
    displayEv,
    bankroll,
    bet.bookmaker,
    kellyFraction
  )
  const recommendedStake = kelly.recommended_stake
  const finalStake = useCustomStake
    ? parseFloat(customStake) || recommendedStake
    : recommendedStake

  // Translated market name and bet side — with safe fallbacks
  const rawMarket = bet.market_name ?? ''
  const rawSide = bet.bet_side ?? ''

  let translatedMarket = rawMarket
  let translatedSide = rawSide

  try {
    const translation = translateBet(rawMarket, rawSide)
    translatedMarket = translation?.market || rawMarket
    translatedSide = translation?.side || rawSide
  } catch {
    // fallback to raw values if translation throws
  }

  // Formatação de data
  const eventDate = new Date(bet.event_date)
  const now = new Date()
  const isToday = eventDate.toDateString() === now.toDateString()
  const isTomorrow =
    eventDate.toDateString() === new Date(now.getTime() + 86_400_000).toDateString()
  const timeStr = eventDate.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  })
  const dateLabel = isToday
    ? `Hoje ${timeStr}`
    : isTomorrow
    ? `Amanhã ${timeStr}`
    : eventDate.toLocaleDateString('pt-BR', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })

  // Cores por nível de EV
  const evColor =
    displayEv >= 10
      ? 'text-emerald-300'
      : displayEv >= 5
      ? 'text-emerald-400'
      : 'text-emerald-500'

  const evBg =
    displayEv >= 10
      ? 'bg-emerald-500/20 border-emerald-500/40'
      : displayEv >= 5
      ? 'bg-emerald-600/15 border-emerald-600/30'
      : 'bg-emerald-700/10 border-emerald-700/20'

  const accentBar =
    displayEv >= 10
      ? 'bg-emerald-400'
      : displayEv >= 5
      ? 'bg-emerald-600'
      : 'bg-emerald-800'

  const potentialProfit = (bet.bookmaker_odds - 1) * finalStake

  async function handleResolve(result: 'won' | 'lost' | 'void') {
    if (finalStake <= 0) return
    setResolving(true)
    try {
      const res = await fetch('/api/bets/resolve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ betId: bet.id, result, stakeAmount: finalStake }),
      })
      const json = await res.json()
      if (json.success) {
        onResolve?.(bet.id, result, finalStake)
      }
    } catch {
      // silencioso
    } finally {
      setResolving(false)
      setShowResolve(false)
    }
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-colors">
      {/* Barra de acento EV */}
      <div className={`h-0.5 w-full ${accentBar}`} />

      <div className="p-4 space-y-3">
        {/* Cabeçalho */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-100 leading-tight">
              {bet.home_team}
              {isSpreadMarket ? ` [${formatHandicap(homeHandicap)}]` : ''} vs {bet.away_team}
              {isSpreadMarket ? ` [${formatHandicap(awayHandicap)}]` : ''}
            </p>
            <p className="text-xs text-gray-500 mt-0.5 whitespace-normal break-words">
              {bet.league} · {dateLabel}
            </p>
          </div>
          <div
            className={`shrink-0 px-2.5 py-1 rounded-lg border text-sm font-bold ${evColor} ${evBg}`}
          >
            {formatEv(displayEv)}
          </div>
        </div>

        {/* Chips de mercado / lado / casa */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Translated market name, with handicap if present */}
          <span className="px-2 py-0.5 bg-gray-800 rounded text-xs text-gray-300 font-medium">
            {translatedMarket || rawMarket}
            {!isSpreadMarket && bet.hdp != null ? ` (${bet.hdp > 0 ? '+' : ''}${bet.hdp})` : ''}
          </span>
          {/* Translated bet side */}
          <span className="px-2 py-0.5 bg-blue-900/30 border border-blue-800/40 rounded text-xs text-blue-300 font-medium">
            {translatedSide || rawSide}
          </span>
          <span className="px-2 py-0.5 bg-gray-800/50 rounded text-xs text-gray-500">
            {bet.bookmaker}
          </span>
        </div>

        {/* Grid: Odds / Kelly% / Stake */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-gray-800/50 rounded-lg p-2 text-center">
            <p className="text-xs text-gray-500 mb-0.5">Odds</p>
            <p className="text-base font-bold text-white">
              {bet.bookmaker_odds.toFixed(2)}
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-2 text-center">
            <p className="text-xs text-gray-500 mb-0.5">Kelly %</p>
            <p className="text-base font-bold text-yellow-400">
              {kelly.kelly_percentage.toFixed(1)}%
            </p>
          </div>
          <div className="bg-emerald-900/20 border border-emerald-800/30 rounded-lg p-2 text-center">
            <p className="text-xs text-gray-500 mb-0.5">Aposta</p>
            <p className="text-base font-bold text-emerald-400">
              {formatStake(recommendedStake)}
            </p>
          </div>
        </div>

        {/* Lucro potencial + aposta máxima */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>
            Lucro se ganhar:{' '}
            <span className="text-emerald-400 font-medium">
              {formatStake(potentialProfit)}
            </span>
          </span>
          {bet.max_stake != null && (
            <span>
              Máx: <span className="text-gray-400">{formatStake(bet.max_stake)}</span>
            </span>
          )}
        </div>

        {/* Seção de resolução */}
        {readOnly ? (
          <div className="flex gap-2 pt-1">
            <span className="flex-1 py-2 text-center bg-amber-500/5 border border-amber-500/20 text-amber-400/80 text-xs font-medium rounded-lg">
              Modo demonstração · somente leitura
            </span>
            {bet.bookmaker_href && (
              <a
                href={bet.bookmaker_href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-600/40 text-blue-400 text-sm rounded-lg transition-colors"
                title="Abrir na casa de apostas"
              >
                ↗
              </a>
            )}
          </div>
        ) : !showResolve ? (
          <div className="flex gap-2 pt-1">
            <button
              onClick={() => setShowResolve(true)}
              className="flex-1 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-600 text-gray-300 text-sm font-medium rounded-lg transition-colors"
            >
              Resolver Aposta
            </button>
            {bet.bookmaker_href && (
              <a
                href={bet.bookmaker_href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-600/40 text-blue-400 text-sm rounded-lg transition-colors"
                title="Abrir na casa de apostas"
              >
                ↗
              </a>
            )}
          </div>
        ) : (
          <div className="space-y-2 pt-1 border-t border-gray-800">
            {/* Toggle de aposta personalizada */}
            <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={useCustomStake}
                onChange={(e) => {
                  setUseCustomStake(e.target.checked)
                  if (!e.target.checked) setCustomStake('')
                }}
                className="rounded border-gray-600 bg-gray-800 text-emerald-500 focus:ring-0 focus:ring-offset-0"
              />
              Usar aposta personalizada
              {useCustomStake && (
                <input
                  type="number"
                  value={customStake}
                  onChange={(e) => setCustomStake(e.target.value)}
                  placeholder={recommendedStake.toFixed(2)}
                  className="ml-1 w-24 bg-gray-800 border border-gray-700 rounded px-2 py-0.5 text-xs text-gray-200 focus:outline-none focus:border-gray-500"
                  min="0"
                  step="0.01"
                />
              )}
            </label>

            {/* Preview da aposta */}
            <p className="text-xs text-gray-600">
              Apostando{' '}
              <span className="text-gray-300 font-medium">{formatStake(finalStake)}</span>
              {' · '}lucro potencial{' '}
              <span className="text-emerald-400 font-medium">
                {formatStake((bet.bookmaker_odds - 1) * finalStake)}
              </span>
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => handleResolve('won')}
                disabled={resolving || finalStake <= 0}
                className="flex-1 py-2 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-600/40 text-emerald-400 text-sm font-medium rounded-lg transition-colors disabled:opacity-40"
              >
                ✓ Ganhou
              </button>
              <button
                onClick={() => handleResolve('lost')}
                disabled={resolving || finalStake <= 0}
                className="flex-1 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-600/40 text-red-400 text-sm font-medium rounded-lg transition-colors disabled:opacity-40"
              >
                ✗ Perdeu
              </button>
              <button
                onClick={() => handleResolve('void')}
                disabled={resolving}
                className="flex-1 py-2 bg-gray-700/50 hover:bg-gray-700 border border-gray-700 text-gray-400 text-sm font-medium rounded-lg transition-colors disabled:opacity-40"
              >
                — Void
              </button>
            </div>
            <button
              onClick={() => {
                setShowResolve(false)
                setUseCustomStake(false)
                setCustomStake('')
              }}
              className="w-full text-xs text-gray-600 hover:text-gray-400 transition-colors py-1"
            >
              Cancelar
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
