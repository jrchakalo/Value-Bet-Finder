import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { getBankroll, updateBankroll } from '@/lib/database'
import { z } from 'zod'

export async function GET() {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const bankroll = await getBankroll()
    return NextResponse.json({ data: bankroll, success: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message, success: false }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const schema = z.object({ amount: z.number().positive() })

  try {
    const body = await req.json()
    const parsed = schema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })
    }

    const bankroll = await updateBankroll(parsed.data.amount)
    return NextResponse.json({ data: bankroll, success: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message, success: false }, { status: 500 })
  }
}
