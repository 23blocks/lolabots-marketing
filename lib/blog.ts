import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

/**
 * Blog content lives as MDX files under `content/blog/<slug>.mdx`. Each file
 * has YAML frontmatter (title, description, date, author, tags) followed by
 * the post body. We resolve everything at build time — no database, no CMS.
 */

export interface BlogPostMeta {
  slug: string
  title: string
  description: string
  date: string // ISO yyyy-mm-dd
  author?: string
  tags?: string[]
  /** Whether the post should appear on the public index. Defaults to true. */
  published?: boolean
}

export interface BlogPost extends BlogPostMeta {
  content: string
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

function readPostFile(file: string): BlogPost | null {
  const slug = file.replace(/\.mdx?$/, '')
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8')
  const parsed = matter(raw)
  const meta = parsed.data as Partial<BlogPostMeta>
  if (!meta.title || !meta.date) return null
  return {
    slug,
    title: meta.title,
    description: meta.description ?? '',
    date: meta.date,
    author: meta.author,
    tags: meta.tags,
    published: meta.published ?? true,
    content: parsed.content,
  }
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  const files = fs.readdirSync(BLOG_DIR).filter((f) => /\.mdx?$/.test(f))
  const posts = files
    .map(readPostFile)
    .filter((p): p is BlogPost => p !== null)
    .filter((p) => p.published !== false)
  // Newest first
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPost(slug: string): BlogPost | null {
  const candidates = [`${slug}.mdx`, `${slug}.md`]
  for (const file of candidates) {
    if (fs.existsSync(path.join(BLOG_DIR, file))) return readPostFile(file)
  }
  return null
}

export function formatPostDate(iso: string): string {
  const d = new Date(iso + 'T00:00:00Z')
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}
