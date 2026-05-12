import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-start px-6 py-24 sm:py-32">
      <p className="font-display text-sm font-800 uppercase tracking-wider text-tangerine">
        404
      </p>
      <h1 className="mt-2 font-display text-4xl font-800 uppercase tracking-tight text-ink sm:text-5xl">
        That page wandered off.
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-ink-light">
        We can&rsquo;t find what you&rsquo;re looking for. Try the homepage, or jump
        straight to the factory.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/"
          className="inline-flex items-center rounded-md bg-ink px-5 py-3 text-sm font-semibold text-cream hover:bg-ink-light"
        >
          Back to home
        </Link>
        <a
          href="https://factory.lolabots.com"
          className="inline-flex items-center rounded-md border border-cream-darker px-5 py-3 text-sm font-semibold text-ink hover:border-ink"
        >
          Open Lolabot Factory
        </a>
      </div>
    </div>
  )
}
