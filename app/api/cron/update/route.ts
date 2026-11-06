import { NextRequest, NextResponse } from 'next/server'
import { fetchAllTargetValueBets } from '@/lib/odds-api'
import { upsertValueBets, markStaleActiveBets } from '@/lib/database'
import { supabaseAdmin } from '@/lib/supabase'

const RATE_LIMIT_SECONDS = 90

/**
 * Reads the last successful fetch timestamp from worker_status.
 * Returns null if no record exists yet.
 */
async function getLastSuccessfulFetch(): Promise<Date | null> {
  const { data, error } = await supabaseAdmin
    .from('worker_status')
    .select('last_fetch')
    .order('id', { ascending: true })
    .limit(1)
    .single()

  if (error || !data || !data.last_fetch) return null
  return new Date(data.last_fetch)
}

/**
 * Updates the worker_status row after a cycle completes.
 */
async function updateWorkerStatus(
  lastError: string | null,
  newBetsCount: number
): Promise<void> {
  const now = new Date().toISOString()

  const { data: existing } = await supabaseAdmin
    .from('worker_status')
    .select('id')
    .limit(1)
    .single()

  const payload = {
    last_fetch: lastError ? undefined : now, // only update last_fetch on success
    last_error: lastError,
    bets_stored: newBetsCount,
    updated_at: now,
  }

  if (existing?.id) {
    await supabaseAdmin
      .from('worker_status')
      .update(payload)
      .eq('id', existing.id)
  } else {
    await supabaseAdmin.from('worker_status').insert({
      ...payload,
      last_fetch: lastError ? null : now,
      total_fetches: 1,
      next_fetch: null,
    })
  }

  // Increment total_fetches separately to avoid overwriting it.
  // A failure here must not turn a successful fetch cycle into a 500.
  if (existing?.id && !lastError) {
    const { error: rpcError } = await supabaseAdmin.rpc('increment_total_fetches')
    if (rpcError) {
      console.error('[Cron] Failed to increment total_fetches:', rpcError.message)
    }
  }
}

export async function GET(req: NextRequest) {
  // ── 1. Authorization ──────────────────────────────────────────────────────
  const cronSecret = process.env.CRON_SECRET
  if (!cronSecret) {
    console.error('[Cron] CRON_SECRET environment variable is not set')
    return NextResponse.json(
      { error: 'Server misconfiguration: CRON_SECRET not set' },
      { status: 500 }
    )
  }

  const authHeader = req.headers.get('authorization')
  const expectedHeader = `Bearer ${cronSecret}`

  if (!authHeader || authHeader !== expectedHeader) {
    console.warn('[Cron] Unauthorized request — invalid or missing Authorization header')
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // ── 2. Rate Limit (90-second guard) ───────────────────────────────────────
  const lastFetch = await getLastSuccessfulFetch()
  if (lastFetch) {
    const secondsSinceLast = (Date.now() - lastFetch.getTime()) / 1000
    if (secondsSinceLast < RATE_LIMIT_SECONDS) {
      const waitSeconds = Math.ceil(RATE_LIMIT_SECONDS - secondsSinceLast)
      console.log(
        `[Cron] Rate limit active — last fetch was ${Math.floor(secondsSinceLast)}s ago. ` +
        `Must wait ${waitSeconds}s more.`
      )
      return NextResponse.json(
        {
          success: false,
          skipped: true,
          reason: `Rate limited: last successful fetch was ${Math.floor(secondsSinceLast)}s ago. Minimum interval is ${RATE_LIMIT_SECONDS}s.`,
          wait_seconds: waitSeconds,
        },
        { status: 429 }
      )
    }
  }

  // ── 3. Main fetch + upsert cycle ──────────────────────────────────────────
  console.log('[Cron] ✅ Auth OK — starting fetch cycle')
  const startTime = Date.now()

  try {
    // 3a. Mark stale active bets as pending_result
    const staleCount = await markStaleActiveBets()
    if (staleCount > 0) {
      console.log(`[Cron] Marked ${staleCount} stale bets as pending_result`)
    }

    // 3b. Fetch value bets from Odds-API (Superbet + Bet7k)
    console.log('[Cron] Fetching value bets from Odds-API...')
    const bets = await fetchAllTargetValueBets()
    console.log(`[Cron] Fetched ${bets.length} value bets total`)

    // 3c. Upsert into Supabase
    const upsertedCount = await upsertValueBets(bets)
    console.log(`[Cron] Upserted ${upsertedCount} bets into database`)

    // 3d. Update worker status (success)
    await updateWorkerStatus(null, upsertedCount)

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2)
    console.log(`[Cron] ✅ Cycle complete in ${elapsed}s`)

    return NextResponse.json({
      success: true,
      fetched: bets.length,
      upserted: upsertedCount,
      stale_marked: staleCount,
      elapsed_seconds: parseFloat(elapsed),
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error('[Cron] ❌ Fetch cycle failed:', message)

    // Update worker status (failure) — does NOT update last_fetch so rate limit
    // won't block the next legitimate retry
    await updateWorkerStatus(message, 0)

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    )
  }
}
