/**
 * Translates bet market names and sides from English API values to Portuguese.
 * Always returns a fallback to the original value if no translation is found.
 */

const marketTranslations: Record<string, string> = {
  // 1X2 / Match Winner
  'h2h': 'Resultado Final',
  'match_winner': 'Resultado Final',
  '1x2': 'Resultado Final',
  'ml': 'Resultado Final',

  // Totals / Over-Under
  'totals': 'Total de Gols',
  'over_under': 'Total de Gols',
  'total': 'Total de Gols',
  'team total home': 'Total de Gols (Casa)',
  'team total away': 'Total de Gols (Visitante)',
  'totals ht': 'Total de Gols no 1º Tempo',

  // Asian Handicap
  'asian_handicap': 'Handicap Asiático',
  'handicap': 'Handicap',
  'asian handicap': 'Handicap Asiático',
  'spread': 'Handicap Asiático',
  'spread ht': 'Handicap Asiático no 1º Tempo',

  // Both Teams to Score
  'btts': 'Ambas Marcam',
  'both_teams_to_score': 'Ambas Marcam',
  'both teams to score': 'Ambas Marcam',

  // Draw No Bet
  'draw_no_bet': 'Empate Anula',
  'draw no bet': 'Empate Anula',

  // Double Chance
  'double_chance': 'Dupla Hipótese',
  'double chance': 'Dupla Hipótese',

  // Corners
  'corners': 'Escanteios',
  'total_corners': 'Total de Escanteios',
  'corners totals': 'Total de Escanteios',
  'corners totals ht': 'Total de Escanteios no 1º Tempo',
  'corners spread ht': 'Handicap de Escanteios no 1º Tempo',
  'corners spread': 'Handicap de Escanteios',

  // Cards
  'cards': 'Cartões',
  'total_cards': 'Total de Cartões',
  'bookings totals': 'Total de Cartões',

  // Half time
  'h1_winner': 'Resultado 1º Tempo',
  'first_half_winner': 'Resultado 1º Tempo',
  'h1_totals': 'Total de Gols 1º Tempo',
  'first_half_totals': 'Total de Gols 1º Tempo',
  'h1_asian_handicap': 'Handicap Asiático 1º Tempo',
}

const sideTranslations: Record<string, string> = {
  // Generic outcomes
  'home': 'Casa',
  'away': 'Visitante',
  'draw': 'Empate',

  // Over / Under
  'over': 'Acima',
  'under': 'Abaixo',

  // Yes / No
  'yes': 'Sim',
  'no': 'Não',

  // Double chance combos
  'home/draw': 'Casa/Empate',
  'home/away': 'Casa/Visitante',
  'draw/away': 'Empate/Visitante',

  // Numeric sides (passed through as-is)
}

/**
 * Translates a market name and bet side to Portuguese.
 * Falls back to the original string if no translation is found.
 */
export function translateBet(
  marketName: string,
  betSide: string
): { market: string; side: string } {
  // Guard against undefined/null inputs
  const safeMarket = (marketName ?? '').trim()
  const safeSide = (betSide ?? '').trim()

  const normalizedMarket = safeMarket.toLowerCase()
  const normalizedSide = safeSide.toLowerCase()

  let translatedMarket =
    marketTranslations[normalizedMarket] ?? safeMarket

  let translatedSide =
    sideTranslations[normalizedSide] ?? safeSide

  const isTotalMarket = normalizedMarket.includes('total') || normalizedMarket.includes('over');
  
  if (isTotalMarket) {
    if (normalizedSide === 'home') translatedSide = 'Mais'
    if (normalizedSide === 'away') translatedSide = 'Menos'
  }

  return {
    market: translatedMarket || safeMarket,
    side: translatedSide || safeSide,
  }
}
