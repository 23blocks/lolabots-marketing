import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { getAllPosts, getPost, formatPostDate } from '@/lib/blog'
import BlogPostViewTracker from '@/components/BlogPostViewTracker'

export const dynamic = 'force-static'

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
      types: { 'text/markdown': `/blog/${post.slug}.md` },
    },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      url: `https://lolabots.com/blog/${post.slug}`,
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <BlogPostViewTracker postSlug={post.slug} postTitle={post.title} />
      <Link
        href="/blog"
        className="group inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted hover:text-ink"
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
        All posts
      </Link>

      <header className="mt-6 mb-10">
        <h1 className="font-display text-4xl font-800 uppercase tracking-tight text-ink sm:text-5xl">
          {post.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs uppercase tracking-wider text-muted">
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          {post.author && (
            <>
              <span aria-hidden>·</span>
              <span>{post.author}</span>
            </>
          )}
          {post.tags && post.tags.length > 0 && (
            <>
              <span aria-hidden>·</span>
              <span>{post.tags.join(' · ')}</span>
            </>
          )}
        </div>
        {post.description && (
          <p className="mt-4 text-lg leading-relaxed text-ink-light">{post.description}</p>
        )}
      </header>

      <div className="prose prose-ink max-w-none">
        <MDXRemote
          source={post.content}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>
    </article>
  )
}
