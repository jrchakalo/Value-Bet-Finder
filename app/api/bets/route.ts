import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { getActiveValueBets, upsertValueBets } from '@/lib/database'
import { fetchAllTargetValueBets } from '@/lib/odds-api'
import { canWrite } from '@/lib/permissions'

export async function GET() {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const bets = await getActiveValueBets()
    return NextResponse.json({ data: bets, success: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message, success: false }, { status: 500 })
  }
}

/**
 * POST /api/bets
 * Manually triggers a full fetch cycle: fetches value bets from the Odds-API,
 * upserts them into Supabase, then returns the updated active bets list.
 */
export async function POST() {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  if (!canWrite(session.user.role)) {
    return NextResponse.json(
      { error: 'Demo account is read-only' },
      { status: 403 }
    )
  }

  try {
    console.log('[API] Manual fetch triggered')

    // 1. Fetch from Odds-API
    const rawBets = await fetchAllTargetValueBets()
    console.log(`[API] Fetched ${rawBets.length} raw bets from Odds-API`)

    // 2. Upsert into Supabase
    const stored = await upsertValueBets(rawBets)
    console.log(`[API] Upserted ${stored} bets into Supabase`)

    // 3. Return the fresh active bets list
    const activeBets = await getActiveValueBets()

    return NextResponse.json({
      data: activeBets,
      fetched: rawBets.length,
      stored,
      success: true,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('[API] Manual fetch failed:', message)
    return NextResponse.json({ error: message, success: false }, { status: 500 })
  }
}
