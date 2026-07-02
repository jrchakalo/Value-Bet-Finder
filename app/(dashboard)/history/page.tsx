import { Suspense } from 'react'
import HistoryContent from '@/components/HistoryContent'
import LoadingSpinner from '@/components/LoadingSpinner'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = {
  title: 'History | Supp',
  description: 'Bet history and analytics',
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
