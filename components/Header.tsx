import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b border-cream-darker bg-cream/80 backdrop-blur sticky top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-ink">
            <span className="font-display text-xs font-800 text-cream">LB</span>
          </div>
          <span className="font-display text-base font-800 uppercase tracking-wide text-ink">
            Lolabots
          </span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/products"
            className="inline-flex min-h-[40px] items-center rounded-md px-3 text-sm font-medium text-ink-light transition-colors hover:bg-cream-dark hover:text-ink"
          >
            Products
          </Link>
          <Link
            href="/blog"
            className="inline-flex min-h-[40px] items-center rounded-md px-3 text-sm font-medium text-ink-light transition-colors hover:bg-cream-dark hover:text-ink"
          >
            Blog
          </Link>
          <Link
            href="/about"
            className="inline-flex min-h-[40px] items-center rounded-md px-3 text-sm font-medium text-ink-light transition-colors hover:bg-cream-dark hover:text-ink"
          >
            About
          </Link>
          <a
            href="https://factory.lolabots.com"
            className="ml-2 inline-flex min-h-[40px] items-center rounded-md bg-ink px-4 text-sm font-semibold text-cream transition-colors hover:bg-ink-light"
          >
            Open Factory
          </a>
        </nav>
      </div>
    </header>
  )
}
