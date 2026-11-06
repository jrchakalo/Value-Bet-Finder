import { Suspense } from 'react'
import RadarContent from '@/components/RadarContent'
import LoadingSpinner from '@/components/LoadingSpinner'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = {
  title: 'Radar | Value Bet Finder',
  description: 'Radar de value bets ativas com sugestão de stake por Kelly',
}

export default function RadarPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center py-20">
          <LoadingSpinner />
        </div>
      }
    >
      <RadarContent />
    </Suspense>
  )
}
