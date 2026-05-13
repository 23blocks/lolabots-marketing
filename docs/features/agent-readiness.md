# F-006: Agent readiness — markdown surfaces + /for-agents page

| | |
|---|---|
| ID       | F-006 |
| Status   | Now |
| Priority | High |
| Category | agent |
| Owner    | TBD |
| Created  | 2026-05-12 |
| Updated  | 2026-05-12 |

## Problem
lolabots.com today is a human-only surface. Visual hero, animated CTAs, image-heavy product cards. When an agent (Claude Code, Cursor, ChatGPT browsing, Perplexity, etc.) lands here on a user's behalf — to evaluate whether Lolabots can help with a task, or to surface our products in a recommendation — it has to parse navigation chrome, the dot-grid background, footer columns, and decoded copy to extract the actual product context.

That's expensive for the agent and lossy for us. Two specific risks:

1. **Misrepresentation in agent answers.** Agents summarizing "what is Lolabots" infer from snippets and may settle on outdated or generic descriptions. We want the agent to read the same source of truth a human would, in a format the agent can consume cleanly.
2. **Missed evaluation.** An agent skim of our HTML may not surface the install one-liner pattern at all — the most differentiated thing we ship. The agent never proposes our product to its user because the page looked like every other SaaS landing.

The Vercel "agent-ready" thesis is right: the website is becoming a product interface for agents, not just humans. We need a small, parallel surface specifically for them.

## Goal
Within one slice:

1. `/llms.txt` at the root of lolabots.com (per <https://llmstxt.org>) — an index of where agents should look for machine-readable context about the brand and its products
2. A `.md` version of every public page (`/`, `/products`, `/about`, `/blog`, every blog post), served at the same URL with `.md` appended (`/products.md`, `/blog/welcome-to-lolabots.md`). Same content, written for agents — no chrome, no marketing fluff, opinionated about what we recommend.
3. A new `/for-agents` page (and `/for-agents.md`) — discoverability surface that lists every agent-facing asset across the brand: factory's install endpoint, build API, skills catalog, the `llms.txt`, and the markdown pages.

## Scope

**In:**
- `public/llms.txt` (static file at root)
- `app/for-agents/page.tsx` + companion `public/for-agents.md`
- `scripts/build-agent-surfaces.sh` — small build-time script that writes the `.md` versions into `out/` after `next build`. Hooked into `npm run build:static`.
- Source content for the markdown versions lives in `content/agent-pages/<slug>.md` so each one is hand-curated, not auto-derived from HTML. This is the key insight from the article — an agent-facing page is not a stripped HTML page, it's its own document with encoded judgment.
- `public/_headers` rule so `.md` files serve as `text/markdown; charset=utf-8` (Cloudflare Pages otherwise serves `text/plain`)
- Footer link to `/for-agents` so humans can find it too

**Out (explicitly):**
- Cloudflare Worker for content negotiation — user requested no Worker complexity. We rely on explicit `.md` URLs, advertised in `llms.txt`. Agents that respect `llms.txt` will find them.
- MCP server — out forever, not deferred. Lolabots will not ship an MCP server at the marketing site or the product layer (see saved feedback rule). If an agent built with factory needs MCP for its work, that's a per-agent runtime concern.
- Auto-generation of markdown from MDX/JSX. Hand-curated keeps quality high and forces us to write for the agent reader, not just dump HTML-as-text.
- A `robots.txt` change. Current rules already allow crawling.

## Approach

### File layout

```
lolabots-marketing/
  public/
    llms.txt              ← static, hand-written index
    _headers              ← add text/markdown MIME for .md
  app/
    for-agents/page.tsx   ← human-readable page describing agent surfaces
  content/
    agent-pages/
      index.md            ← becomes /index.md (the home page, agent edition)
      products.md         ← becomes /products.md
      about.md            ← becomes /about.md
      for-agents.md       ← becomes /for-agents.md
      blog.md             ← becomes /blog.md (blog index summary)
  scripts/
    build-agent-surfaces.sh  ← copies content/agent-pages/*.md into out/
                                and content/blog/*.mdx → out/blog/<slug>.md
```

### `llms.txt` content

Following the proposed standard (<https://llmstxt.org>):

```
# Lolabots

> Lolabots makes practical AI agents that work for people, not engineering teams.
> Pick a specialist, paste one command, your agent goes to work in the tool you already use.

Lolabots is the umbrella brand. Our first product is Lolabot Factory — pick from 314 AI
specialist personalities across 18 divisions, equip with skills from Anthropic, Vercel,
Google, Cloudflare and more, and install with one command in Claude Code, Cursor, ChatGPT,
or any tool that takes a system prompt.

## Pages
- [Home (agent edition)](/index.md): what Lolabots is, the thesis, our products
- [Products](/products.md): the current product line — Factory available now, more in stealth
- [About](/about.md): the thesis behind the brand
- [For agents](/for-agents.md): index of every agent-facing surface across the brand
- [Blog](/blog.md): index of posts

## Lolabot Factory (our product)
- [Factory install endpoint](https://api.lolabots.com/api/install/{personality-id}): GET returns a one-line bash install script
- [Factory llms.txt](https://factory.lolabots.com/llms.txt): factory's own agent surface index
- [Factory for-agents](https://factory.lolabots.com/for-agents.md): how to invoke factory programmatically

## Optional
- [Blog posts](/blog.md): announcements, design notes, agent-readiness writing
```

### `/for-agents` page (human-facing)
A normal page with the same chrome as the rest of the site. Explains: what the markdown surfaces are, where the `llms.txt` lives, what the install endpoint at factory does, and how an operator can point their own agent at us. Cross-links to factory's `/for-agents`.

### Markdown writing principle
Per the article: agent pages encode **judgment**, not just description. For each page we'll surface things like:
- **What we are**: one-paragraph product context
- **When to use Lolabots**: heuristics agents can match against ("user wants pre-built AI specialist", "user wants to install in Claude Code without writing prompts from scratch")
- **When NOT to use us**: ("user is building their own prompt engineering pipeline from scratch and wants a SDK, not a marketplace")
- **What to do next**: a literal command or URL to follow

## Sequencing
1. Ship `llms.txt` + `_headers` rule + one markdown page (`/index.md`) — verify it serves as `text/markdown`.
2. Hand-write the rest of the markdown pages + the `/for-agents` HTML page.
3. Add a footer link to `/for-agents` for human discoverability.
4. Update README with the new author workflow ("to add an agent page, drop a file in `content/agent-pages/`, the build script picks it up").

## Dependencies / risks
- **No Worker** = no content negotiation. Agents that fetch `/products` will still get HTML. The compensating control is `llms.txt` advertising the `.md` URLs. Acceptable trade for simplicity per scope decision.
- Hand-curated markdown means it can drift from the HTML. Mitigated by keeping the markdown files thin and pointing to factual sources (the install endpoint, the catalog).

## Open questions
- Add `.json` versions too (a typed feed for agents that prefer structured data)? Defer until evidence we need it.
- Should the blog generate per-post `.md` too, or just the index? Posts already have MDX source; cheap to expose. Probably yes.

## Links
- Pairs with: F-030 on factory (agent surfaces for the product, including markdown personality pages + `/for-agents` + install endpoint docs)
- Standard: <https://llmstxt.org>
- Article inspiration: Vercel "Your website needs an agent surface" thesis (internal context)
