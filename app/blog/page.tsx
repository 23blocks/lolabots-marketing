import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getAllPosts, formatPostDate } from '@/lib/blog'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Notes from the Lolabots team: product launches, why we build the way we build, and what we&rsquo;re learning about practical AI.',
  alternates: { canonical: '/blog' },
}

export default function BlogIndexPage() {
  const posts = getAllPosts()

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
      <header className="mb-12">
        <h1 className="font-display text-4xl font-800 uppercase tracking-tight text-ink sm:text-5xl">
          The Lolabots Blog
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-light">
          Product news, design notes, and the occasional rant about why AI tooling
          shouldn&rsquo;t require an engineering degree.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-ink-light">No posts yet. Check back soon.</p>
      ) : (
        <ul className="divide-y divide-cream-darker border-y border-cream-darker">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-2 py-6 transition-colors hover:bg-cream-dark sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <div className="flex-1">
                  <h2 className="font-display text-xl font-800 uppercase tracking-tight text-ink transition-colors group-hover:text-tangerine sm:text-2xl">
                    {post.title}
                  </h2>
                  {post.description && (
                    <p className="mt-1 text-sm leading-relaxed text-ink-light">
                      {post.description}
                    </p>
                  )}
                </div>
                <div className="flex shrink-0 items-center gap-3 text-xs uppercase tracking-wider text-muted">
                  <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
