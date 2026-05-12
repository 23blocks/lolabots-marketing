# Lolabots — Marketing site (lolabots.com)

The umbrella-brand site for Lolabots. Sibling to [lolabot-factory](https://github.com/23blocks/lolabot-factory) (factory.lolabots.com is the product; this is the brand).

## Stack
- Next.js 16 (App Router, static export)
- React 19 + Tailwind 3
- MDX-based blog (no CMS — files in `content/blog/*.mdx`)
- Cloudflare Pages

## Commands
```bash
npm install
npm run dev            # localhost:3001 (factory dev runs on 3000)
npm run build:static   # static export → out/
npm run lint
```

## Layout
```
app/
  layout.tsx            # Root layout + Header + Footer
  page.tsx              # Landing
  products/page.tsx     # Product line (factory + stealth slot)
  about/page.tsx        # Who we are, what we believe
  blog/page.tsx         # Blog index
  blog/[slug]/page.tsx  # Post renderer (MDX via next-mdx-remote)
  sitemap.ts robots.ts opengraph-image.tsx icon.tsx not-found.tsx
components/
  Header.tsx Footer.tsx
content/
  blog/<slug>.mdx       # Posts. Frontmatter: title, description, date, author, tags
lib/
  blog.ts               # MDX loader, sorting, formatPostDate
public/
  _headers              # Cloudflare security headers (prod source of truth)
  _redirects            # Cloudflare 301s
```

## Writing a blog post
1. Drop a new file at `content/blog/<slug>.mdx`
2. Frontmatter is required:
   ```yaml
   ---
   title: 'Your title'
   description: 'One-line description for cards + meta.'
   date: '2026-05-12'
   author: 'Your name'
   tags: ['announcement']
   ---
   ```
3. Body is MDX. Standard markdown + JSX components.

That's it. `npm run build:static` picks it up automatically.

## Brand notes
Extends factory's palette (`cream`, `ink`, `tangerine`) with `iris` as the umbrella-brand accent and `surface.warm/cool` for section alternation. Factory remains the single source of truth for the core palette — if those colors change, sync this `tailwind.config.ts` too.
