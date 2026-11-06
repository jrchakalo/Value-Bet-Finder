'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import ValueBetCard from './ValueBetCard'
import BankrollWidget from './BankrollWidget'
import WorkerStatusBadge from './WorkerStatusBadge'
import LoadingSpinner from './LoadingSpinner'
import { ValueBet } from '@/lib/types'

export default function RadarContent() {
  const { data: session } = useSession()
  const isDemo = session?.user?.role === 'demo'
  const [bets, setBets] = useState<ValueBet[]>([])
  const [bankroll, setBankroll] = useState<number>(1000)
  const [kellyFraction, setKellyFraction] = useState<number>(0.25)
  const [loading, setLoading] = useState(true)
  const [forceFetching, setForceFetching] = useState(false)
  const [forceFetchResult, setForceFetchResult] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [sortBy, setSortBy] = useState<'ev' | 'date' | 'odds'>('date')
  const [filterBookmaker, setFilterBookmaker] = useState<string>('all')

  const getDisplayEv = (bet: ValueBet) => bet.expected_value - 100
  const formatEv = (value: number) => `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`

  const fetchBets = useCallback(async () => {
    try {
      const res = await fetch('/api/bets', { cache: 'no-store' })
      const json = await res.json()
      if (json.success) {
        setBets(json.data)
        setLastUpdated(new Date())
        setError('')
      } else {
        setError(json.error || 'Falha ao carregar apostas')
      }
    } catch {
      setError('Erro de rede — não foi possível buscar apostas')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchBets()
    const interval = setInterval(fetchBets, 60_000)
    return () => clearInterval(interval)
  }, [fetchBets])

  async function handleForceFetch() {
    setForceFetching(true)
    setForceFetchResult(null)
    setError('')
    try {
      const res = await fetch('/api/bets', { method: 'POST', cache: 'no-store' })
      const json = await res.json()
      if (json.success) {
        setBets(json.data)
        setLastUpdated(new Date())
        setForceFetchResult(
          `✅ Busca concluída: ${json.fetched} apostas encontradas, ${json.stored} salvas.`
        )
      } else {
        setError(json.error || 'Falha na busca forçada')
        setForceFetchResult(`❌ Erro: ${json.error}`)
      }
    } catch {
      const msg = 'Erro de rede — não foi possível forçar a busca'
      setError(msg)
      setForceFetchResult(`❌ ${msg}`)
    } finally {
      setForceFetching(false)
    }
  }

  function handleBetResolved(betId: string) {
    setBets((prev) => prev.filter((b) => b.id !== betId))
  }

  const bookmakers = ['all', ...Array.from(new Set(bets.map((b) => b.bookmaker)))]

  const filtered = bets.filter(
    (b) => filterBookmaker === 'all' || b.bookmaker === filterBookmaker
  )
  const filteredEvValues = filtered.map((bet) => bet.expected_value)
  const averageFilteredEv =
    filteredEvValues.reduce((sum, value) => sum + value, 0) / (filteredEvValues.length || 1)
  const bestFilteredEv = filteredEvValues.length ? Math.max(...filteredEvValues) : null

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'ev') return getDisplayEv(b) - getDisplayEv(a)
    if (sortBy === 'odds') return b.bookmaker_odds - a.bookmaker_odds
    if (sortBy === 'date') {
      const dateDiff = new Date(a.event_date).getTime() - new Date(b.event_date).getTime()
      if (dateDiff !== 0) return dateDiff

      const eventNameDiff = a.home_team.localeCompare(b.home_team, 'pt-BR', {
        sensitivity: 'base',
      })
      if (eventNameDiff !== 0) return eventNameDiff

      return a.away_team.localeCompare(b.away_team, 'pt-BR', {
        sensitivity: 'base',
      })
    }
    return 0
  })

  const kellyOptions: { label: string; value: number }[] = [
    { label: 'Kelly Cheio', value: 1 },
    { label: '1/2 Kelly', value: 0.5 },
    { label: '1/4 Kelly', value: 0.25 },
    { label: '1/8 Kelly', value: 0.125 },
  ]

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Cabeçalho da página */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-white">
              <span className="text-emerald-400">⚡</span> Radar
            </h1>
            <WorkerStatusBadge />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {isDemo && (
              <span className="px-2 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-medium">
                Modo demo · somente leitura
              </span>
            )}
            {lastUpdated && (
              <span className="text-xs text-gray-500">
                Atualizado às {lastUpdated.toLocaleTimeString('pt-BR')}
              </span>
            )}
            <button
              onClick={fetchBets}
              className="px-2 py-1 rounded bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs transition-colors"
            >
              ↻ Atualizar
            </button>
            {!isDemo && (
              <button
                onClick={handleForceFetch}
                disabled={forceFetching}
                className="px-3 py-1 rounded bg-emerald-700/30 hover:bg-emerald-700/50 border border-emerald-600/40 text-emerald-400 text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
              >
                {forceFetching ? (
                  <>
                    <span className="inline-block w-3 h-3 border-2 border-emerald-400/40 border-t-emerald-400 rounded-full animate-spin" />
                    Carregando...
                  </>
                ) : (
                  '⚡ Forçar Busca de Value Bets'
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Resultado da busca forçada */}
        {forceFetchResult && (
          <div
            className={`flex items-center justify-between gap-2 p-3 rounded-xl border text-sm ${
              forceFetchResult.startsWith('✅')
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                : 'bg-red-500/10 border-red-500/20 text-red-400'
            }`}
          >
            <span>{forceFetchResult}</span>
            <button
              onClick={() => setForceFetchResult(null)}
              className="text-gray-500 hover:text-gray-300 text-xs"
            >
              ✕
            </button>
          </div>
        )}

        {/* Linha de controles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Banca */}
          <div className="md:col-span-1">
            <BankrollWidget onBankrollChange={setBankroll} readOnly={isDemo} />
          </div>

          {/* Fração Kelly */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wider">
              Fração Kelly
            </p>
            <div className="grid grid-cols-2 gap-2">
              {kellyOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setKellyFraction(opt.value)}
                  className={`py-1.5 px-2 rounded-lg text-sm font-medium transition-colors border ${
                    kellyFraction === opt.value
                      ? 'bg-emerald-600/20 border-emerald-600/50 text-emerald-400'
                      : 'bg-gray-800 border-gray-700 text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Ordenar e filtrar */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 space-y-3">
            <div>
              <p className="text-xs text-gray-500 mb-1.5 font-medium uppercase tracking-wider">
                Ordenar Por
              </p>
              <div className="flex gap-2">
                {(['ev', 'odds', 'date'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSortBy(s)}
                    className={`flex-1 py-1 rounded text-xs font-medium transition-colors border ${
                      sortBy === s
                        ? 'bg-blue-600/20 border-blue-600/50 text-blue-400'
                        : 'bg-gray-800 border-gray-700 text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    {s === 'ev' ? 'EV%' : s === 'odds' ? 'Odds' : 'Data'}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1.5 font-medium uppercase tracking-wider">
                Casa de Apostas
              </p>
              <select
                value={filterBookmaker}
                onChange={(e) => setFilterBookmaker(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded px-2 py-1 text-sm text-gray-200 focus:outline-none focus:border-gray-500"
              >
                {bookmakers.map((bm) => (
                  <option key={bm} value={bm}>
                    {bm === 'all' ? 'Todas as Casas' : bm}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Barra de estatísticas */}
        {!loading && bets.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatPill label="Exibindo" value={String(sorted.length)} color="text-white" />
            <StatPill
              label="EV Médio"
              value={formatEv(averageFilteredEv - 100)}
              color="text-emerald-400"
            />
            <StatPill
              label="Melhor EV"
              value={bestFilteredEv != null ? formatEv(bestFilteredEv - 100) : '—'}
              color="text-emerald-300"
            />
            <StatPill
              label="Odds Médias"
              value={
                sorted.length
                  ? (
                      sorted.reduce((s, b) => s + b.bookmaker_odds, 0) / sorted.length
                    ).toFixed(2)
                  : '—'
              }
              color="text-blue-400"
            />
          </div>
        )}

        {/* Erro */}
        {error && (
          <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
            <span className="text-red-400 text-sm">⚠ {error}</span>
            <button
              onClick={fetchBets}
              className="ml-auto text-xs text-gray-400 hover:text-gray-200 underline"
            >
              Tentar novamente
            </button>
          </div>
        )}

        {/* Conteúdo */}
        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner />
          </div>
        ) : sorted.length === 0 && !error ? (
          <div className="text-center py-20 text-gray-600">
            <p className="text-4xl mb-3">📡</p>
            <p className="text-lg font-medium text-gray-500">Nenhuma value bet encontrada</p>
            <p className="text-sm mt-1">
              {filterBookmaker !== 'all'
                ? 'Tente mudar o filtro de casa de apostas'
                : 'O worker buscará novas apostas em breve'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {sorted.map((bet) => (
              <ValueBetCard
                key={bet.id}
                bet={bet}
                bankroll={bankroll}
                kellyFraction={kellyFraction}
                onResolve={handleBetResolved}
                readOnly={isDemo}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function StatPill({
  label,
  value,
  color,
}: {
  label: string
  value: string
  color: string
}) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-3">
      <p className="text-xs text-gray-500 mb-0.5">{label}</p>
      <p className={`text-lg font-bold ${color}`}>{value}</p>
    </div>
  )
}
