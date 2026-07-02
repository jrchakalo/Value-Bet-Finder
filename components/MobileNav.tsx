'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/radar', icon: '⚡', label: 'Radar' },
  { href: '/history', icon: '📈', label: 'History' },
]

export default function MobileNav() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 md:hidden bg-gray-900 border-t border-gray-800 flex">
      {navItems.map((item) => {
        const active = pathname === item.href || pathname.startsWith(item.href + '/')
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs transition-colors ${
              active ? 'text-white' : 'text-gray-500 hover:text-gray-200'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </Link>
        )
      })}
    </div>
  )
}
