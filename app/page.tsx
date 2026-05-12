import Link from 'next/link'
import { ArrowRight, Sparkles, Zap, Shield, Heart } from 'lucide-react'

export const dynamic = 'force-static'

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="dot-grid relative overflow-hidden border-b border-cream-darker">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cream-darker bg-cream px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-ink-light">
              <Sparkles className="h-3.5 w-3.5 text-tangerine" />
              Practical AI for the rest of us
            </div>
            <h1 className="font-display text-4xl font-800 leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl">
              AI agents you{' '}
              <span className="text-tangerine">actually use.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-light sm:text-xl">
              Lolabots makes AI agents for people who don&rsquo;t care about CLIs, MCPs, or
              configs. Pick a specialist, paste one command, and your agent goes to work
              in the tool you already use.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="https://factory.lolabots.com"
                className="group inline-flex items-center gap-2.5 rounded-md bg-tangerine px-6 py-3.5 font-display text-base font-800 uppercase tracking-wide text-cream transition-colors hover:bg-tangerine-dark sm:px-8 sm:py-4"
              >
                Build your first agent
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <Link
                href="/products"
                className="inline-flex items-center rounded-md border border-cream-darker px-5 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-ink"
              >
                See what we ship
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Manifesto / Why */}
      <section className="border-b border-cream-darker">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-12 max-w-2xl">
            <h2 className="font-display text-3xl font-800 uppercase tracking-tight text-ink sm:text-4xl">
              Built for everyone, not just engineers.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-light">
              The AI agent revolution shouldn&rsquo;t require an engineering team. We build
              tools your aunt could install — and then we make them powerful enough to
              run your business on.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Pillar
              icon={Zap}
              title="One-line install"
              copy="Pick an agent. Paste one command. It works. No Docker, no API keys, no homework."
            />
            <Pillar
              icon={Shield}
              title="Open and honest"
              copy="Every agent and skill we ship is source-visible. Our forks live in 23blocks-OS. Nothing hidden."
            />
            <Pillar
              icon={Heart}
              title="Made for the rest of us"
              copy="Most AI tools are made for the people who built them. We build for the people who use them."
            />
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="border-b border-cream-darker bg-cream-dark">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl font-800 uppercase tracking-tight text-ink sm:text-4xl">
                Products
              </h2>
              <p className="mt-2 text-ink-light">
                Factory is product one of many. More coming.
              </p>
            </div>
            <Link
              href="/products"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-tangerine hover:text-tangerine-dark"
            >
              All products
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {/* Factory — shipped */}
            <a
              href="https://factory.lolabots.com"
              className="group relative overflow-hidden rounded-2xl border border-cream-darker bg-cream p-8 transition-colors hover:border-tangerine/40"
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-tangerine-light px-3 py-1 text-xs font-semibold uppercase tracking-wider text-tangerine-dark">
                Available now
              </div>
              <h3 className="mb-2 font-display text-2xl font-800 uppercase tracking-tight text-ink">
                Lolabot Factory
              </h3>
              <p className="mb-6 text-base leading-relaxed text-ink-light">
                Build your AI employee in 60 seconds. 314 pre-configured specialists across
                18 divisions, equipped with skills from Anthropic, Vercel, Google,
                Cloudflare, gstack and more. Install in Claude Code, Cursor, ChatGPT, or any
                tool that takes a system prompt.
              </p>
              <div className="flex items-center justify-between border-t border-cream-darker pt-4">
                <code className="font-mono text-xs text-ink-light">factory.lolabots.com</code>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-tangerine">
                  Open factory
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </a>

            {/* Stealth slot */}
            <div className="relative overflow-hidden rounded-2xl border border-dashed border-cream-darker bg-cream/40 p-8">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-iris/30 bg-iris-light px-3 py-1 text-xs font-semibold uppercase tracking-wider text-iris-dark">
                In stealth
              </div>
              <h3 className="mb-2 font-display text-2xl font-800 uppercase tracking-tight text-ink/60">
                More to come
              </h3>
              <p className="mb-6 text-base leading-relaxed text-ink-light">
                We&rsquo;re building more lolabots. Different problems, same thesis: AI tools
                that don&rsquo;t demand you become an engineer to use them.
              </p>
              <div className="border-t border-cream-darker pt-4 text-xs text-muted">
                Subscribe to{' '}
                <Link href="/blog" className="font-semibold text-tangerine hover:text-tangerine-dark">
                  the blog
                </Link>{' '}
                to see what&rsquo;s next.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="rounded-2xl border border-ink bg-ink p-10 text-cream sm:p-14">
            <h2 className="font-display text-3xl font-800 uppercase tracking-tight sm:text-4xl">
              Ready to meet your first agent?
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-cream/70">
              Open the factory, pick a personality, equip it with skills, and get a
              one-liner install. 60 seconds, no signup, no credit card.
            </p>
            <a
              href="https://factory.lolabots.com"
              className="group mt-8 inline-flex items-center gap-2.5 rounded-md bg-tangerine px-8 py-4 font-display text-base font-800 uppercase tracking-wide text-cream transition-colors hover:bg-tangerine-dark"
            >
              Open Lolabot Factory
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

interface PillarProps {
  icon: React.ComponentType<{ className?: string }>
  title: string
  copy: string
}

function Pillar({ icon: Icon, title, copy }: PillarProps) {
  return (
    <div className="rounded-xl border border-cream-darker bg-cream p-6">
      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-tangerine-light text-tangerine">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mb-2 font-display text-base font-800 uppercase tracking-wide text-ink">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-ink-light">{copy}</p>
    </div>
  )
}
