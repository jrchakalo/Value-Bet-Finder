'use client'

import { useEffect, useState } from 'react'
import LoadingSpinner from './LoadingSpinner'
import { DailyAnalytics, ValueBet } from '@/lib/types'

// ---------------------------------------------------------------------------
// Sub-componentes
// ---------------------------------------------------------------------------

interface StatCardProps {
  label: string
  value: string
  sub?: string
  color?: string
}

function StatCard({ label, value, sub, color = 'text-gray-100' }: StatCardProps) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{label}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
      {sub && <p className="text-xs text-gray-500 mt-1">{sub}</p>}
    </div>
  )
}

function ProfitBar({ value, max }: { value: number; max: number }) {
  const pct = max === 0 ? 0 : Math.min(Math.abs(value) / Math.abs(max), 1) * 100
  return (
    <div className="w-full bg-gray-800 rounded-full h-1 mt-1">
      <div
        className={`h-1 rounded-full transition-all ${value >= 0 ? 'bg-emerald-500' : 'bg-red-500'}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    active: 'bg-blue-600/20 text-blue-400 border-blue-600/30',
    won: 'bg-emerald-600/20 text-emerald-400 border-emerald-600/30',
    lost: 'bg-red-600/20 text-red-400 border-red-600/30',
    void: 'bg-gray-600/20 text-gray-400 border-gray-600/30',
    pending_result: 'bg-yellow-600/20 text-yellow-400 border-yellow-600/30',
  }
  const labels: Record<string, string> = {
    active: 'Ativa',
    won: 'Ganhou',
    lost: 'Perdeu',
    void: 'Void',
    pending_result: 'Pendente',
  }
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium border ${
        styles[status] ?? styles['active']
      }`}
    >
      {labels[status] ?? status}
    </span>
  )
}

function CumulativePLChart({ analytics }: { analytics: DailyAnalytics[] }) {
  const sorted = [...analytics].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )

  let cumulative = 0
  const points = sorted.map((d) => {
    cumulative += d.actual_profit_loss
    return { date: d.date, value: cumulative }
  })

  if (points.length === 0) return null

  const min = Math.min(...points.map((p) => p.value), 0)
  const max = Math.max(...points.map((p) => p.value), 0.01)
  const range = max - min || 1
  const H = 160
  const pad = 10

  const toY = (v: number) => H - pad - ((v - min) / range) * (H - pad * 2)
  const toX = (i: number) =>
    points.length === 1 ? 50 : (i / (points.length - 1)) * 100

  const pathD = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${toX(i)} ${toY(p.value)}`)
    .join(' ')

  const areaD =
    pathD +
    ` L ${toX(points.length - 1)} ${H - pad} L ${toX(0)} ${H - pad} Z`

  const zeroY = toY(0)
  const finalValue = points[points.length - 1].value
  const positive = finalValue >= 0

  return (
    <div>
      <div style={{ height: H }}>
        <svg
          viewBox={`0 0 100 ${H}`}
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <line
            x1="0"
            y1={zeroY}
            x2="100"
            y2={zeroY}
            stroke="#374151"
            strokeWidth="0.5"
            strokeDasharray="2,2"
          />
          <path
            d={areaD}
            fill={positive ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)'}
          />
          <path
            d={pathD}
            fill="none"
            stroke={positive ? '#10b981' : '#ef4444'}
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
          <circle
            cx={toX(points.length - 1)}
            cy={toY(finalValue)}
            r="2"
            fill={positive ? '#10b981' : '#ef4444'}
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
      <div className="flex justify-between text-xs text-gray-600 mt-1">
        <span>
          {new Date(sorted[0].date).toLocaleDateString('pt-BR', {
            month: 'short',
            day: 'numeric',
          })}
        </span>
        <span className={`font-semibold ${positive ? 'text-emerald-400' : 'text-red-400'}`}>
          {positive ? '+' : ''}R${finalValue.toFixed(2)} acumulado
        </span>
        <span>
          {new Date(sorted[sorted.length - 1].date).toLocaleDateString('pt-BR', {
            month: 'short',
            day: 'numeric',
          })}
        </span>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Tipos
// ---------------------------------------------------------------------------

type Tab = 'overview' | 'daily' | 'bets'
type BetFilter = 'all' | 'won' | 'lost' | 'void' | 'pending_result'

const betFilterOptions: { key: BetFilter; label: string }[] = [
  { key: 'all', label: 'Todas' },
  { key: 'won', label: 'Ganhou' },
  { key: 'lost', label: 'Perdeu' },
  { key: 'void', label: 'Void' },
  { key: 'pending_result', label: 'Pendente' },
]

const betFilterStyles: Record<BetFilter, string> = {
  all: 'bg-blue-600/20 border-blue-600/50 text-blue-400',
  won: 'bg-emerald-600/20 border-emerald-600/50 text-emerald-400',
  lost: 'bg-red-600/20 border-red-600/50 text-red-400',
  void: 'bg-gray-600/20 border-gray-600/50 text-gray-400',
  pending_result: 'bg-yellow-600/20 border-yellow-600/50 text-yellow-400',
}

// ---------------------------------------------------------------------------
// Componente principal
// ---------------------------------------------------------------------------

export default function HistoryContent() {
  const [analytics, setAnalytics] = useState<DailyAnalytics[]>([])
  const [allBets, setAllBets] = useState<ValueBet[]>([])
  const [loading, setLoading] = useState(true)
  const [betsLoading, setBetsLoading] = useState(false)
  const [error, setError] = useState('')
  const [tab, setTab] = useState<Tab>('overview')
  const [betFilter, setBetFilter] = useState<BetFilter>('all')

  // Busca analytics ao montar
  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const res = await fetch('/api/analytics')
        const json = await res.json()
        if (json.success) {
          setAnalytics(json.data)
        } else {
          setError(json.error || 'Falha ao carregar analytics')
        }
      } catch {
        setError('Erro de rede — não foi possível buscar analytics')
      } finally {
        setLoading(false)
      }
    }
    fetchAnalytics()
  }, [])

  // Busca todas as apostas apenas quando a aba "bets" é aberta pela primeira vez
  useEffect(() => {
    if (tab !== 'bets' || allBets.length > 0) return
    setBetsLoading(true)
    fetch('/api/bets/history')
      .then((r) => r.json())
      .then((json) => {
        if (json.success) setAllBets(json.data)
      })
      .catch(() => {})
      .finally(() => setBetsLoading(false))
  }, [tab, allBets.length])

  // ---------------------------------------------------------------------------
  // Totais derivados
  // ---------------------------------------------------------------------------
  const totals = analytics.reduce(
    (acc, d) => ({
      bets: acc.bets + d.total_bets,
      won: acc.won + d.won_bets,
      lost: acc.lost + d.lost_bets,
      profit: acc.profit + d.actual_profit_loss,
      staked: acc.staked + d.total_staked,
      ev: acc.ev + d.total_ev_generated,
    }),
    { bets: 0, won: 0, lost: 0, profit: 0, staked: 0, ev: 0 }
  )

  const hitRate = totals.bets > 0 ? (totals.won / totals.bets) * 100 : 0
  const roi = totals.staked > 0 ? (totals.profit / totals.staked) * 100 : 0

  const maxAbsProfit = Math.max(
    ...analytics.map((d) => Math.abs(d.actual_profit_loss)),
    1
  )

  const filteredBets =
    betFilter === 'all' ? allBets : allBets.filter((b) => b.status === betFilter)

  const tabs: { key: Tab; label: string }[] = [
    { key: 'overview', label: '📊 Visão Geral' },
    { key: 'daily', label: '📅 Diário' },
    { key: 'bets', label: '🎯 Todas as Apostas' },
  ]

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Cabeçalho da página */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <h1 className="text-xl font-bold text-white">
            <span className="text-blue-400">📈</span> Histórico
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-400 text-lg">⚠ {error}</p>
          </div>
        ) : (
          <>
            {/* Navegação por abas */}
            <div className="flex gap-1 border-b border-gray-800">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors border-b-2 -mb-px ${
                    tab === t.key
                      ? 'border-blue-500 text-blue-400 bg-blue-500/5'
                      : 'border-transparent text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* ----------------------------------------------------------------
                Aba: Visão Geral
            ---------------------------------------------------------------- */}
            {tab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  <StatCard label="Total de Apostas" value={String(totals.bets)} color="text-white" />
                  <StatCard label="Ganhou" value={String(totals.won)} color="text-emerald-400" />
                  <StatCard label="Perdeu" value={String(totals.lost)} color="text-red-400" />
                  <StatCard
                    label="Taxa de Acerto"
                    value={`${hitRate.toFixed(1)}%`}
                    color={hitRate >= 50 ? 'text-emerald-400' : 'text-yellow-400'}
                  />
                  <StatCard
                    label="L/P"
                    value={`${totals.profit >= 0 ? '+' : ''}R$${totals.profit.toFixed(2)}`}
                    color={totals.profit >= 0 ? 'text-emerald-400' : 'text-red-400'}
                    sub={`ROI: ${roi >= 0 ? '+' : ''}${roi.toFixed(1)}%`}
                  />
                  <StatCard
                    label="EV Total"
                    value={`+R$${totals.ev.toFixed(2)}`}
                    color="text-blue-400"
                    sub={`Apostado: R$${totals.staked.toFixed(2)}`}
                  />
                </div>

                {analytics.length > 0 ? (
                  <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                    <h2 className="text-sm font-semibold text-gray-300 mb-4">
                      L/P Acumulado
                    </h2>
                    <CumulativePLChart analytics={analytics} />
                  </div>
                ) : (
                  <EmptyState />
                )}
              </div>
            )}

            {/* ----------------------------------------------------------------
                Aba: Diário
            ---------------------------------------------------------------- */}
            {tab === 'daily' && (
              <div>
                {analytics.length === 0 ? (
                  <EmptyState />
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-xs text-gray-500 uppercase tracking-wider border-b border-gray-800">
                          <th className="pb-3 pr-4 font-medium">Data</th>
                          <th className="pb-3 pr-4 text-right font-medium">Apostas</th>
                          <th className="pb-3 pr-4 text-right font-medium">G / P</th>
                          <th className="pb-3 pr-4 text-right font-medium">Acerto</th>
                          <th className="pb-3 pr-4 text-right font-medium">Apostado</th>
                          <th className="pb-3 pr-4 text-right font-medium">L/P</th>
                          <th className="pb-3 text-right font-medium">EV Gerado</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800/50">
                        {analytics.map((day) => {
                          const hitRatePct = day.hit_rate <= 1
                            ? day.hit_rate * 100
                            : day.hit_rate
                          return (
                            <tr
                              key={day.date}
                              className="hover:bg-gray-900/50 transition-colors"
                            >
                              <td className="py-3 pr-4 text-gray-300 font-medium">
                                {new Date(day.date).toLocaleDateString('pt-BR', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                })}
                              </td>
                              <td className="py-3 pr-4 text-right text-gray-300">
                                {day.total_bets}
                              </td>
                              <td className="py-3 pr-4 text-right">
                                <span className="text-emerald-400">{day.won_bets}G</span>
                                <span className="text-gray-600 mx-1">/</span>
                                <span className="text-red-400">{day.lost_bets}P</span>
                              </td>
                              <td className="py-3 pr-4 text-right">
                                <span
                                  className={
                                    hitRatePct >= 50 ? 'text-emerald-400' : 'text-yellow-400'
                                  }
                                >
                                  {hitRatePct.toFixed(1)}%
                                </span>
                              </td>
                              <td className="py-3 pr-4 text-right text-gray-400">
                                R${day.total_staked.toFixed(2)}
                              </td>
                              <td className="py-3 pr-4 text-right">
                                <span
                                  className={
                                    day.actual_profit_loss >= 0
                                      ? 'text-emerald-400'
                                      : 'text-red-400'
                                  }
                                >
                                  {day.actual_profit_loss >= 0 ? '+' : ''}R$
                                  {day.actual_profit_loss.toFixed(2)}
                                </span>
                                <ProfitBar
                                  value={day.actual_profit_loss}
                                  max={maxAbsProfit}
                                />
                              </td>
                              <td className="py-3 text-right text-blue-400">
                                +R${day.total_ev_generated.toFixed(2)}
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* ----------------------------------------------------------------
                Aba: Todas as Apostas
            ---------------------------------------------------------------- */}
            {tab === 'bets' && (
              <div className="space-y-4">
                {/* Filtros */}
                <div className="flex gap-2 flex-wrap">
                  {betFilterOptions.map((f) => (
                    <button
                      key={f.key}
                      onClick={() => setBetFilter(f.key)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors border ${
                        betFilter === f.key
                          ? betFilterStyles[f.key]
                          : 'bg-gray-800 border-gray-700 text-gray-400 hover:text-gray-200'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>

                {betsLoading ? (
                  <div className="flex justify-center py-10">
                    <LoadingSpinner />
                  </div>
                ) : filteredBets.length === 0 ? (
                  <EmptyState message="Nenhuma aposta encontrada" />
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-xs text-gray-500 uppercase tracking-wider border-b border-gray-800">
                          <th className="pb-3 pr-4 font-medium">Evento</th>
                          <th className="pb-3 pr-4 font-medium">Mercado</th>
                          <th className="pb-3 pr-4 font-medium">Casa</th>
                          <th className="pb-3 pr-4 text-right font-medium">Odds</th>
                          <th className="pb-3 pr-4 text-right font-medium">EV</th>
                          <th className="pb-3 pr-4 text-right font-medium">Aposta</th>
                          <th className="pb-3 pr-4 text-right font-medium">L/P</th>
                          <th className="pb-3 text-right font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800/50">
                        {filteredBets.map((bet) => (
                          <tr
                            key={bet.id}
                            className="hover:bg-gray-900/50 transition-colors"
                          >
                            <td className="py-3 pr-4">
                              <p className="text-gray-200 font-medium leading-tight">
                                {bet.home_team} vs {bet.away_team}
                              </p>
                              <p className="text-xs text-gray-500 mt-0.5">
                                {new Date(bet.event_date).toLocaleDateString('pt-BR', {
                                  month: 'short',
                                  day: 'numeric',
                                })}
                                {' · '}
                                {bet.league}
                              </p>
                            </td>
                            <td className="py-3 pr-4 text-xs">
                              <p className="text-gray-400">{bet.market_name}</p>
                              <p className="text-gray-600">{bet.bet_side}</p>
                            </td>
                            <td className="py-3 pr-4 text-xs text-gray-400">
                              {bet.bookmaker}
                            </td>
                            <td className="py-3 pr-4 text-right text-gray-300">
                              {bet.bookmaker_odds.toFixed(2)}
                            </td>
                            <td className="py-3 pr-4 text-right text-emerald-400">
                              {(bet.expected_value - 100) >= 0 ? '+' : ''}
                              {(bet.expected_value - 100).toFixed(2)}%
                            </td>
                            <td className="py-3 pr-4 text-right text-gray-400">
                              {bet.stake_amount != null
                                ? `R$${bet.stake_amount.toFixed(2)}`
                                : '—'}
                            </td>
                            <td className="py-3 pr-4 text-right">
                              {bet.profit_loss != null ? (
                                <span
                                  className={
                                    bet.profit_loss >= 0
                                      ? 'text-emerald-400'
                                      : 'text-red-400'
                                  }
                                >
                                  {bet.profit_loss >= 0 ? '+' : ''}R$
                                  {bet.profit_loss.toFixed(2)}
                                </span>
                              ) : (
                                <span className="text-gray-600">—</span>
                              )}
                            </td>
                            <td className="py-3 text-right">
                              <StatusBadge status={bet.status} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

function EmptyState({ message = 'Nenhuma aposta resolvida ainda' }: { message?: string }) {
  return (
    <div className="text-center py-16">
      <p className="text-4xl mb-3">📭</p>
      <p className="text-lg font-medium text-gray-500">{message}</p>
      <p className="text-sm text-gray-600 mt-1">
        Resolva apostas na página Radar para ver os analytics aqui
      </p>
    </div>
  )
}
