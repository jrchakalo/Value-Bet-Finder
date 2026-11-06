import { Suspense } from 'react'
import HistoryContent from '@/components/HistoryContent'
import LoadingSpinner from '@/components/LoadingSpinner'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = {
  title: 'Histórico | Value Bet Finder',
  description: 'Histórico de apostas resolvidas e analytics de desempenho',
}

export default function HistoryPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center py-20">
          <LoadingSpinner />
        </div>
      }
    >
      <HistoryContent />
    </Suspense>
  )
}
