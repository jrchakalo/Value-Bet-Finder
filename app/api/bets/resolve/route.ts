import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { resolveBet } from '@/lib/database'
import { z } from 'zod'

const resolveSchema = z.object({
  betId: z.string().min(1),
  result: z.enum(['won', 'lost', 'void']),
  stakeAmount: z.number().positive(),
})

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const parsed = resolveSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request body', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const { betId, result, stakeAmount } = parsed.data
    await resolveBet(betId, result, stakeAmount)

    return NextResponse.json({ success: true, message: `Bet marked as ${result}` })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message, success: false }, { status: 500 })
  }
}
