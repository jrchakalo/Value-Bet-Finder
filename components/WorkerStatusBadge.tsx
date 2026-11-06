'use client'

import { useCallback, useEffect, useState } from 'react'
import { WorkerStatus } from '@/lib/types'

interface WorkerStatusBadgeProps {
  readOnly?: boolean
}

export default function WorkerStatusBadge({ readOnly = false }: WorkerStatusBadgeProps) {
  const [status, setStatus] = useState<WorkerStatus | null>(null)

  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch('/api/worker-status')
      const json = await res.json()
      if (json.success) setStatus(json.data)
    } catch {
      // silencioso
    }
  }, [])

  useEffect(() => {
    fetchStatus()
  }, [fetchStatus])

  useEffect(() => {
    if (readOnly) return
    const interval = setInterval(fetchStatus, 30_000)
    return () => clearInterval(interval)
  }, [readOnly, fetchStatus])

  if (!status) return null

  const lastFetch = status.last_fetch ? new Date(status.last_fetch) : null
  const minutesAgo =
    lastFetch != null
      ? Math.floor((Date.now() - lastFetch.getTime()) / 60_000)
      : null

  const isStale = minutesAgo !== null && minutesAgo > 10
  const hasError = !!status.last_error

  const dotColor = hasError
    ? 'bg-red-500'
    : isStale
    ? 'bg-yellow-500'
    : 'bg-emerald-500'

  const label =
    hasError
      ? 'Erro'
      : minutesAgo === null
      ? 'Sem dados'
      : minutesAgo === 0
      ? 'Agora mesmo'
      : `${minutesAgo}min atrás`

  const tooltip = hasError
    ? `Erro: ${status.last_error}`
    : `Última busca: ${lastFetch?.toLocaleTimeString('pt-BR') ?? 'nunca'} · ${status.total_fetches} buscas · ${status.bets_stored} apostas salvas`

  return (
    <div
      className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-800/80 border border-gray-700/50 rounded-full text-xs text-gray-400 cursor-default"
      title={tooltip}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${dotColor} ${
          !hasError && !isStale ? 'animate-pulse' : ''
        }`}
      />
      <span>Worker · {label}</span>
    </div>
  )
}
