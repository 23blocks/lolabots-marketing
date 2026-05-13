#!/usr/bin/env node
/**
 * Post-build step for F-006 agent-readiness.
 *
 * After `next build` writes the static site to `out/`, this script:
 *   1. Copies every `content/agent-pages/<slug>.md` to `out/<slug>.md`
 *   2. Walks `content/blog/<slug>.mdx` and writes `out/blog/<slug>.md`
 *      with the frontmatter rendered as a small header block at the top
 *      of the body.
 *
 * The MIME type for `.md` is handled by `public/_headers` so Cloudflare
 * Pages serves them as `text/markdown; charset=utf-8` instead of plain
 * text.
 *
 * Pure Node, no deps. Runs after `next build` in `build:static`.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const root = path.resolve(__dirname, '..')

const OUT_DIR = path.join(root, 'out')
const AGENT_PAGES_DIR = path.join(root, 'content', 'agent-pages')
const BLOG_DIR = path.join(root, 'content', 'blog')

if (!fs.existsSync(OUT_DIR)) {
  console.error(
    `[build-agent-md] out/ not found at ${OUT_DIR}. Did \`next build\` run first?`
  )
  process.exit(1)
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true })
}

/**
 * Lightweight YAML frontmatter parser. We only support the subset blog
 * posts actually use: scalar strings, simple arrays like `['a', 'b']`,
 * and dates. Good enough to avoid taking on gray-matter as a runtime dep
 * for this script (it's a devDep elsewhere but keeping this script pure
 * Node simplifies the build).
 */
function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { data: {}, content: raw }

  const head = match[1]
  const body = match[2]
  const data = {}

  for (const line of head.split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/)
    if (!m) continue
    const key = m[1]
    let value = m[2].trim()

    // Inline array: ['x', 'y'] or ["x", "y"]
    if (value.startsWith('[') && value.endsWith(']')) {
      const inner = value.slice(1, -1).trim()
      data[key] = inner
        ? inner
            .split(',')
            .map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
            .filter(Boolean)
        : []
      continue
    }

    // Quoted scalar
    if (
      (value.startsWith("'") && value.endsWith("'")) ||
      (value.startsWith('"') && value.endsWith('"'))
    ) {
      value = value.slice(1, -1)
    }

    data[key] = value
  }

  return { data, content: body }
}

function copyAgentPages() {
  if (!fs.existsSync(AGENT_PAGES_DIR)) {
    console.warn(`[build-agent-md] No agent-pages dir at ${AGENT_PAGES_DIR}, skipping.`)
    return []
  }
  const written = []
  for (const file of fs.readdirSync(AGENT_PAGES_DIR)) {
    if (!file.endsWith('.md')) continue
    const src = path.join(AGENT_PAGES_DIR, file)
    const dest = path.join(OUT_DIR, file)
    fs.copyFileSync(src, dest)
    written.push(dest)
  }
  return written
}

function renderHeader(slug, data) {
  const lines = []
  lines.push(`# ${data.title ?? slug}`)
  lines.push('')
  const meta = []
  if (data.date) meta.push(`Date: ${data.date}`)
  if (data.author) meta.push(`Author: ${data.author}`)
  if (Array.isArray(data.tags) && data.tags.length)
    meta.push(`Tags: ${data.tags.join(', ')}`)
  meta.push(`Source: https://lolabots.com/blog/${slug}`)
  for (const line of meta) lines.push(`> ${line}`)
  if (data.description) {
    lines.push('>')
    lines.push(`> ${data.description}`)
  }
  lines.push('')
  return lines.join('\n')
}

function convertBlogPosts() {
  if (!fs.existsSync(BLOG_DIR)) {
    console.warn(`[build-agent-md] No blog dir at ${BLOG_DIR}, skipping.`)
    return []
  }
  const outBlogDir = path.join(OUT_DIR, 'blog')
  ensureDir(outBlogDir)

  const written = []
  for (const file of fs.readdirSync(BLOG_DIR)) {
    if (!file.endsWith('.mdx') && !file.endsWith('.md')) continue
    const slug = file.replace(/\.mdx?$/, '')
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8')
    const { data, content } = parseFrontmatter(raw)

    const header = renderHeader(slug, data)
    // The blog MDX body sometimes starts with its own `#`-prefixed heading,
    // but our welcome post uses `##` for sections, so prepending an `<H1>`
    // is safe and gives the file proper top-of-document context.
    const out = `${header}\n${content.trim()}\n`

    const dest = path.join(outBlogDir, `${slug}.md`)
    fs.writeFileSync(dest, out)
    written.push(dest)
  }
  return written
}

const agentPages = copyAgentPages()
const blogPosts = convertBlogPosts()

console.log(
  `[build-agent-md] Wrote ${agentPages.length} agent page(s) and ${blogPosts.length} blog post(s).`
)
for (const file of [...agentPages, ...blogPosts]) {
  console.log(`  ${path.relative(root, file)}`)
}
