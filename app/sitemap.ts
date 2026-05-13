import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'

export const dynamic = 'force-static'

const BASE = 'https://lolabots.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const staticUrls: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/products`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/for-agents`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ]

  const posts = getAllPosts()
  const postUrls: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.date + 'T00:00:00Z'),
    changeFrequency: 'yearly',
    priority: 0.6,
  }))

  // F-007: also surface the .md mirrors so crawlers have a second discovery
  // path independent of the per-page rel=alternate links. Lower priority since
  // they're alternate representations of existing content.
  const mdUrls: MetadataRoute.Sitemap = [
    { url: `${BASE}/index.md`, lastModified: now, changeFrequency: 'weekly', priority: 0.5 },
    { url: `${BASE}/products.md`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/about.md`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE}/blog.md`, lastModified: now, changeFrequency: 'weekly', priority: 0.4 },
    { url: `${BASE}/for-agents.md`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/llms.txt`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ]
  const postMdUrls: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE}/blog/${p.slug}.md`,
    lastModified: new Date(p.date + 'T00:00:00Z'),
    changeFrequency: 'yearly',
    priority: 0.4,
  }))

  return [...staticUrls, ...postUrls, ...mdUrls, ...postMdUrls]
}
