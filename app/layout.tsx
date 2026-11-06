import type { Metadata } from 'next'
import './globals.css'
import { SessionProvider } from './providers'

export const metadata: Metadata = {
  title: 'Value Bet Finder | Radar de Value Bets',
  description:
    'Plataforma para estudo de value bets, gestão de banca e análise de desempenho com o critério de Kelly.',
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
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-gray-950 text-gray-100 antialiased">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}
