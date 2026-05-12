import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-24 border-t border-cream-darker bg-cream-dark">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-3 flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-ink">
              <span className="font-display text-[10px] font-800 text-cream">LB</span>
            </div>
            <span className="font-display text-sm font-800 uppercase tracking-wide text-ink">
              Lolabots
            </span>
          </div>
          <p className="text-sm leading-relaxed text-ink-light">
            Practical AI agents you actually use. Built by{' '}
            <a
              href="https://23blocks.com"
              className="font-medium text-ink underline decoration-ink/20 underline-offset-2 hover:text-tangerine"
            >
              23blocks
            </a>
            .
          </p>
        </div>

        <div>
          <h3 className="mb-3 font-display text-xs font-800 uppercase tracking-wider text-muted">
            Products
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="https://factory.lolabots.com"
                className="text-ink-light transition-colors hover:text-ink"
              >
                Lolabot Factory
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-display text-xs font-800 uppercase tracking-wider text-muted">
            Lolabots
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/products" className="text-ink-light transition-colors hover:text-ink">
                Products
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-ink-light transition-colors hover:text-ink">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-ink-light transition-colors hover:text-ink">
                About
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-display text-xs font-800 uppercase tracking-wider text-muted">
            Open Source
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="https://github.com/23blocks-OS"
                className="text-ink-light transition-colors hover:text-ink"
                target="_blank"
                rel="noopener noreferrer"
              >
                23blocks-OS on GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream-darker">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-xs text-muted">
          <span>© {year} Lolabots. All rights reserved.</span>
          <span>Made for the rest of us.</span>
        </div>
      </div>
    </footer>
  )
}
