import type { Metadata } from 'next'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Lolabots is built by 23blocks. The thesis: AI agents should work for everyone, not just engineering teams.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <header className="mb-12">
        <h1 className="font-display text-4xl font-800 uppercase tracking-tight text-ink sm:text-5xl">
          Made for the rest of us
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-light">
          Lolabots is the brand for a family of practical AI tools. Built by{' '}
          <a
            href="https://23blocks.com"
            className="font-semibold text-ink underline decoration-ink/20 underline-offset-2 hover:text-tangerine"
            target="_blank"
            rel="noopener noreferrer"
          >
            23blocks
          </a>
          .
        </p>
      </header>

      <div className="prose prose-ink max-w-none">
        <h2 className="font-display uppercase tracking-tight">The thesis</h2>
        <p>
          AI agents are the most important tool of the decade. They&rsquo;re also currently
          the most engineer-only tool of the decade. To use them well today, you need to
          know what an MCP server is, how to install a CLI, what an API key looks like,
          and how to debug a config file. That&rsquo;s a tax most people can&rsquo;t pay.
        </p>
        <p>
          We don&rsquo;t think that&rsquo;s how it should work. The people who would benefit
          most from a tireless assistant — the small business owner, the solo creator, the
          friend or family member running a household, the operator who manages five
          different inboxes — aren&rsquo;t engineers. They shouldn&rsquo;t have to become
          one to get an AI that just works.
        </p>

        <h2 className="font-display uppercase tracking-tight">What we believe</h2>
        <ul>
          <li>
            <strong>Install must be one paste.</strong> If a tool requires a second
            command, a manual config edit, or an explanation paragraph, we did it wrong.
          </li>
          <li>
            <strong>The agent should handle its own homework.</strong> If an agent needs a
            CLI to do its job, the agent installs the CLI when it&rsquo;s asked to do the
            job. We don&rsquo;t leave that to the operator.
          </li>
          <li>
            <strong>Open beats proprietary.</strong> Every skill we ship is source-visible
            and forked transparently into{' '}
            <a
              href="https://github.com/23blocks-OS"
              target="_blank"
              rel="noopener noreferrer"
            >
              23blocks-OS
            </a>
            . You can see what your agent will do before you install it.
          </li>
          <li>
            <strong>Useful beats clever.</strong> No demos that don&rsquo;t survive
            contact with reality. No agents that hallucinate confidence. Tools you can
            actually trust with your day.
          </li>
        </ul>

        <h2 className="font-display uppercase tracking-tight">What we ship</h2>
        <p>
          Today: <a href="https://factory.lolabots.com">Lolabot Factory</a> — pick a
          personality, equip it with skills, install in 60 seconds. 314 specialists across
          18 divisions, skills from Anthropic, Vercel, Google, Cloudflare, gstack, and
          more. Works in Claude Code, Cursor, ChatGPT, Custom GPTs, OpenAI Assistants, or
          any tool that takes a system prompt.
        </p>
        <p>
          Tomorrow: more lolabots. Different problems, same thesis. We&rsquo;ll announce
          them when they&rsquo;re ready.
        </p>

        <h2 className="font-display uppercase tracking-tight">Talk to us</h2>
        <p>
          Lolabots is built by <a href="https://23blocks.com">23blocks</a>. For partnerships
          or press, email{' '}
          <a href="mailto:hello@23blocks.com">hello@23blocks.com</a>.
        </p>
      </div>
    </div>
  )
}
