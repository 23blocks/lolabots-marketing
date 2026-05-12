'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { trackEvent } from '@/lib/gtm'
import { factoryUrl } from '@/lib/factory'

const NAV_LINKS = [
  { href: '/products', label: 'Products' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
] as const

export default function Header() {
  const [open, setOpen] = useState(false)
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!open) return

    previouslyFocused.current = document.activeElement as HTMLElement | null
    closeBtnRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
      previouslyFocused.current?.focus()
    }
  }, [open])

  return (
    <>
      <nav className="sticky top-0 z-40 border-b border-cream-darker bg-cream/90 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <Link
            href="/"
            className="group flex min-h-[44px] min-w-0 items-center gap-2.5 -ml-2 rounded-md px-2 focus:outline-none focus:ring-2 focus:ring-tangerine"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-ink">
              <span className="font-display text-xs font-800 leading-none text-cream">LB</span>
            </div>
            <span className="truncate font-display text-base font-800 uppercase tracking-wide text-ink sm:text-lg">
              Lolabots
            </span>
          </Link>

          {/* Desktop nav (≥ md) */}
          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() =>
                  trackEvent('nav_clicked', {
                    link_label: link.label,
                    link_href: link.href,
                    surface: 'header-desktop',
                  })
                }
                className="rounded-md px-3 py-2 text-sm font-medium text-ink-light transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={factoryUrl('header')}
              onClick={() =>
                trackEvent('factory_cta_clicked', {
                  surface: 'header',
                  link_label: 'Open Factory',
                })
              }
              className="ml-2 rounded-md bg-ink px-4 py-2 text-sm font-semibold text-cream transition-colors hover:bg-ink-light"
            >
              Open Factory
            </a>
          </div>

          {/* Mobile hamburger (< md). 44px touch target. */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open navigation"
            aria-expanded={open}
            className="-mr-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-ink transition-colors hover:bg-cream-dark focus:outline-none focus:ring-2 focus:ring-tangerine md:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* Mobile overlay menu */}
      {open && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm motion-reduce:backdrop-blur-none"
          />
          <aside className="absolute right-0 top-0 flex h-full w-full max-w-[360px] flex-col border-l border-cream-darker bg-cream shadow-2xl">
            <div className="flex h-16 items-center justify-between border-b border-cream-darker px-4">
              <span className="font-display text-lg font-800 uppercase tracking-tight text-ink">
                Menu
              </span>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close navigation"
                className="-mr-2 flex h-11 w-11 items-center justify-center rounded-md text-muted transition-colors hover:bg-cream-dark hover:text-ink focus:outline-none focus:ring-2 focus:ring-tangerine"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4">
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => {
                        trackEvent('nav_clicked', {
                          link_label: link.label,
                          link_href: link.href,
                          surface: 'mobile-menu',
                        })
                        setOpen(false)
                      }}
                      className="flex min-h-[44px] items-center rounded-md px-3 py-3 text-base font-medium text-ink transition-colors hover:bg-cream-dark"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-cream-darker p-4">
              <a
                href={factoryUrl('mobile-menu')}
                onClick={() => {
                  trackEvent('factory_cta_clicked', {
                    surface: 'mobile-menu',
                    link_label: 'Open Factory',
                  })
                  setOpen(false)
                }}
                className="flex min-h-[48px] w-full items-center justify-center rounded-md bg-ink px-5 py-3 text-base font-semibold text-cream transition-colors hover:bg-ink-light"
              >
                Open Factory
              </a>
            </div>
          </aside>
        </div>
      )}
    </>
  )
}
