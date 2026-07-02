import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { getDailyAnalytics } from '@/lib/database'

export async function GET() {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const analytics = await getDailyAnalytics()
    return NextResponse.json({ data: analytics, success: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message, success: false }, { status: 500 })
  }
}
