import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { getAllValueBets } from '@/lib/database'

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const bets = await getAllValueBets(500)
    return NextResponse.json({ data: bets, success: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message, success: false }, { status: 500 })
  }
}
