import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { factoryUrl } from '@/lib/factory'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Products',
  description:
    'The Lolabots product line. Factory is product one — practical AI agents you actually use. More products in stealth.',
  alternates: { canonical: '/products' },
}

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
      <header className="mb-12">
        <h1 className="font-display text-4xl font-800 uppercase tracking-tight text-ink sm:text-5xl">
          The Lolabots Product Line
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-light">
          One thesis, multiple products: AI tools that work for people who don&rsquo;t want
          to become engineers. Factory is the first. Others are coming.
        </p>
      </header>

      {/* Factory */}
      <section className="mb-8 rounded-2xl border border-cream-darker bg-cream-dark p-8 sm:p-10">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-tangerine-light px-3 py-1 text-xs font-semibold uppercase tracking-wider text-tangerine-dark">
          Available now
        </div>
        <h2 className="mb-2 font-display text-3xl font-800 uppercase tracking-tight text-ink">
          Lolabot Factory
        </h2>
        <p className="mb-6 text-base leading-relaxed text-ink-light">
          Pick from 314 pre-configured AI specialists across 18 divisions. Equip them with
          skills from Anthropic, Vercel, Google, Cloudflare, gstack, and more. Get a
          one-liner install command that drops your agent into Claude Code, Cursor,
          ChatGPT, Claude Projects, Custom GPTs, OpenAI Assistants, or any tool that takes
          a system prompt.
        </p>
        <ul className="mb-8 grid gap-2 sm:grid-cols-2">
          <Feature label="60-second install" />
          <Feature label="No API keys, no Docker" />
          <Feature label="Works in 7+ AI tools" />
          <Feature label="Mix and match skills" />
          <Feature label="Bring your own skill (Git URL)" />
          <Feature label="Build whole agent orgs" />
        </ul>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={factoryUrl('products-page')}
            className="group inline-flex items-center gap-2 rounded-md bg-tangerine px-5 py-3 text-sm font-semibold text-cream transition-colors hover:bg-tangerine-dark"
          >
            Open Factory
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href={factoryUrl('products-page', '/how-it-works')}
            className="inline-flex items-center rounded-md border border-cream-darker px-4 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink"
          >
            How it works
          </a>
        </div>
      </section>

      {/* Stealth */}
      <section className="rounded-2xl border border-dashed border-cream-darker bg-cream/40 p-8 sm:p-10">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-iris/30 bg-iris-light px-3 py-1 text-xs font-semibold uppercase tracking-wider text-iris-dark">
          In stealth
        </div>
        <h2 className="mb-2 font-display text-3xl font-800 uppercase tracking-tight text-ink/60">
          Coming soon
        </h2>
        <p className="mb-6 max-w-2xl text-base leading-relaxed text-ink-light">
          We&rsquo;re building more lolabots. Each one tackles a different problem from the
          same angle: useful AI that doesn&rsquo;t require engineering skills to operate.
          We&rsquo;ll announce them on{' '}
          <Link href="/blog" className="font-semibold text-tangerine hover:text-tangerine-dark">
            the blog
          </Link>{' '}
          when they&rsquo;re ready.
        </p>
      </section>
    </div>
  )
}

function Feature({ label }: { label: string }) {
  return (
    <li className="flex items-center gap-2 text-sm text-ink-light">
      <Check className="h-4 w-4 shrink-0 text-tangerine" />
      <span>{label}</span>
    </li>
  )
}
