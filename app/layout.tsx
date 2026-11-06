import type { Metadata } from 'next'
import './globals.css'
import { SessionProvider } from './providers'

export const metadata: Metadata = {
  title: 'Value Bet Finder | Radar de Value Bets',
  description:
    'Projeto educacional de radar de value bets, gestão de banca e análise de desempenho. Apostas de quota fixa estão proibidas no Brasil (MP 1.394/2026).',
  applicationName: 'Value Bet Finder',
  authors: [{ name: 'Júnior Silva', url: 'https://github.com/jrchakalo' }],
  keywords: [
    'value bets',
    'expected value',
    'critério de Kelly',
    'gestão de banca',
    'Next.js',
    'Supabase',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="min-h-screen bg-gray-950 text-gray-100 antialiased">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}
