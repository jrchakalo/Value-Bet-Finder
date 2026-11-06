import * as dotenv from 'dotenv'
import path from 'path'

// Load .env from project root
dotenv.config({ path: path.resolve(process.cwd(), '.env') })

import cron from 'node-cron'
import { fetchAllTargetValueBets } from '../lib/odds-api'
import { upsertValueBets, markStaleActiveBets } from '../lib/database'
import { supabaseAdmin } from '../lib/supabase'

const FETCH_INTERVAL_SECONDS = 40 // 90 requests/hour max
let totalFetches = 0
let betsStored = 0

async function updateWorkerStatus(
  lastError: string | null = null,
  newBetsCount: number = 0
) {
  const now = new Date()
  const nextFetch = new Date(now.getTime() + FETCH_INTERVAL_SECONDS * 1000)

  betsStored += newBetsCount

  await supabaseAdmin
    .from('worker_status')
    .upsert({
      id: 1,
      last_fetch: now.toISOString(),
      next_fetch: nextFetch.toISOString(),
      total_fetches: totalFetches,
      last_error: lastError,
      bets_stored: betsStored,
      updated_at: now.toISOString(),
    })
    .eq('id', 1)
}

async function runFetchCycle() {
  const startTime = Date.now()
  console.log(`\n[Worker] 🔄 Fetch cycle #${totalFetches + 1} starting at ${new Date().toISOString()}`)

  try {
    // 1. Fetch value bets from Odds-API
    console.log('[Worker] 📡 Fetching from Odds-API...')
    const bets = await fetchAllTargetValueBets()
    console.log(`[Worker] ✅ Fetched ${bets.length} value bets`)

    // 2. Store in database
    if (bets.length > 0) {
      const stored = await upsertValueBets(bets)
      console.log(`[Worker] 💾 Stored/updated ${stored} bets in database`)
      totalFetches++
      await updateWorkerStatus(null, stored)
    } else {
      totalFetches++
      await updateWorkerStatus(null, 0)
      console.log('[Worker] ℹ️  No value bets returned from API')
    }

    // 3. Mark stale bets
    const staleCount = await markStaleActiveBets()
    if (staleCount > 0) {
      console.log(`[Worker] 🕐 Marked ${staleCount} bets as pending_result`)
    }

    const elapsed = Date.now() - startTime
    console.log(`[Worker] ⏱️  Cycle completed in ${elapsed}ms`)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error(`[Worker] ❌ Fetch cycle failed:`, message)
    totalFetches++
    await updateWorkerStatus(message, 0).catch(console.error)
  }
}

async function main() {
  console.log('╔════════════════════════════════════════╗')
  console.log('║   Value Bet Finder - VBF Worker        ║')
  console.log('╚════════════════════════════════════════╝')
  console.log(`[Worker] 🚀 Starting with ${FETCH_INTERVAL_SECONDS}s interval`)
  console.log(`[Worker] 🎯 Targeting bookmakers: Superbet, Bet7k`)
  console.log(`[Worker] ⚽ Sport filter: football`)
  console.log(`[Worker] 📊 Max rate: ~${Math.floor(3600 / FETCH_INTERVAL_SECONDS)} req/hour per bookmaker\n`)

  // Run immediately on startup
  await runFetchCycle()

  // Schedule every 40 seconds
  // node-cron minimum is 1 second with second-level scheduling
  cron.schedule(`*/${FETCH_INTERVAL_SECONDS} * * * * *`, async () => {
    await runFetchCycle()
  })

  console.log(`[Worker] ✅ Cron job scheduled every ${FETCH_INTERVAL_SECONDS} seconds`)
  console.log('[Worker] 🔒 Press Ctrl+C to stop\n')
}

main().catch((error) => {
  console.error('[Worker] Fatal error:', error)
  process.exit(1)
})
