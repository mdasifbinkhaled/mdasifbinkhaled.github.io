'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/shared/lib/utils'

export function Navbar({ onMobileMenuOpen }: { onMobileMenuOpen?: () => void }) {
  const path = normalize(usePathname() ?? '/')
  const items = [
    { label: 'Home', href: '/' },
    { label: 'About Me', href: '/about/' },
    { label: 'Experience', href: '/experience/' },
    { label: 'Research', href: '/research/' },
    { label: 'Publications', href: '/publications/' },
    { label: 'Teaching', href: '/teaching/' },
    { label: 'Service & Awards', href: '/service-awards/' },
    { label: 'Contact', href: '/contact/' }
  ]

  return (
    <div className="flex items-center gap-2 w-full">
      <button className="lg:hidden px-2 py-1 rounded border" onClick={onMobileMenuOpen} aria-label="Open navigation menu">Menu</button>
      <nav className="hidden lg:flex items-center gap-1">
        {items.map(it => {
          const active = isActive(path, it.href)
          return (
            <Link
              key={it.href}
              href={it.href}
              aria-current={active ? 'page' : undefined}
              className={cn('px-3 py-2 rounded-lg transition-colors',
                active ? 'text-primary font-semibold bg-accent/30' : 'text-foreground/90 hover:text-foreground')}
            >
              {it.label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

const normalize = (p: string) => (p.endsWith('/') && p !== '/' ? p.slice(0, -1) : p)
const isActive = (path: string, href: string) => {
  const a = normalize(path); const b = normalize(href)
  return b === '/' ? a === '/' : a.startsWith(b)
}
