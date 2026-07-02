# Supp — Value Bet Intelligence Platform

A private, single-user sports betting value bet discovery and tracking platform.

## Tech Stack

- **Frontend:** Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** Supabase (PostgreSQL)
- **Background Worker:** Node.js + node-cron (standalone process)
- **Auth:** NextAuth.js v5 (credentials)
- **Testing:** Vitest + Testing Library

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env with your actual values
```

Required variables:
- `NEXT_PUBLIC_SUPABASE_URL` — Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY` — Supabase service role key (for backend)
- `ODDS_API_KEY` — Your Odds-API.io API key
- `NEXTAUTH_SECRET` — Random secret (`openssl rand -base64 32`)
- `NEXTAUTH_URL` — Your app URL (e.g., `http://localhost:3000`)
- `ADMIN_USERNAME` — Login username
- `ADMIN_PASSWORD` — Login password

### 3. Set Up Database

Run the schema in your Supabase SQL Editor:

```bash
# Copy contents of scripts/schema.sql and run in Supabase dashboard
```

Or try the automated migration:

```bash
npm run db:migrate
```

### 4. Run Tests

```bash
npm test
```

### 5. Start Development

Run both the Next.js app and the background worker:

```bash
npm run dev:all
```

Or separately:

```bash
# Terminal 1: Next.js app
npm run dev

# Terminal 2: Background worker
npm run worker
```

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Browser                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────┐  │
│  │  /login  │  │  /radar  │  │    /history      │  │
│  └──────────┘  └──────────┘  └──────────────────┘  │
└─────────────────────┬───────────────────────────────┘
                      │ HTTP
┌─────────────────────▼───────────────────────────────┐
│              Next.js API Routes                     │
│  /api/bets  /api/bankroll  /api/analytics           │
└─────────────────────┬───────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────┐
│                  Supabase DB                        │
│  value_bets | bankroll | bankroll_transactions      │
└─────────────────────▲───────────────────────────────┘
                      │ Upsert every 40s
┌─────────────────────┴───────────────────────────────┐
│              Background Worker                      │
│  node-cron → Odds-API /v3/value-bets               │
│  Bookmakers: Superbet, Bet7k | Sport: football     │
│  Rate: ~90 req/hour (under 100/hr free tier)       │
└─────────────────────────────────────────────────────┘
```

## Rate Limit Strategy

- Worker fetches every **40 seconds** = 90 requests/hour per bookmaker
- Free tier limit: 100 requests/hour
- Sequential fetching (not parallel) keeps each bookmaker under limit
- Frontend reads **only from database** — zero direct API calls

## Kelly Criterion

Fractional Kelly (25%) is used for stake sizing:

```
f* = (b×p - q) / b
stake = bankroll × f* × 0.25

Where:
  b = bookmaker_odds - 1
  p = (EV + 1) / bookmaker_odds  (true win probability)
  q = 1 - p
```

## Pages

- **`/login`** — Authentication gate
- **`/radar`** — Active value bets with Kelly stakes
- **`/history`** — Daily analytics and performance tracking
