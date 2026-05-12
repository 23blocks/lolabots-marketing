# F-001: Analytics — GTM + GA4

| | |
|---|---|
| ID       | F-001 |
| Status   | Now |
| Priority | High |
| Owner    | TBD |
| Created  | 2026-05-12 |
| Updated  | 2026-05-12 |

## Problem
lolabots.com ships with zero analytics. We can't measure:
- Are people landing on the home page from search, social, or referrals?
- Is the **Open Factory** CTA actually getting clicked? At what rate per visit?
- Does anyone read the blog, or are posts decoration?
- What % of marketing-site sessions convert to a factory build?

Factory (F-017d) emits a rich event stream into GTM container `GTM-PPHG42MP` with auto-attached `device`/`viewport_width`. lolabots.com needs the same plumbing so the umbrella brand has unified visibility.

## Goal
Within 24h of merge:
1. Pageviews flowing from lolabots.com into GA4
2. Three high-value events firing reliably: `nav_clicked`, `factory_cta_clicked`, `blog_post_viewed`
3. Every event auto-carries `site: 'marketing'` (and the same `device`/`viewport_width` dimensions factory uses) — so any GA4 report can split factory vs marketing or merge them
4. Zero impact on Lighthouse perf (GTM loaded lazily via `next/script` with `afterInteractive`)

## Scope

**In:**
- Reuse factory's GTM container `GTM-PPHG42MP` and GA4 property `G-6D6WLM3YCG` — single source of truth across the brand
- Mirror factory's `lib/gtm.ts` pattern: `GTM_ID` constant + `trackEvent(event, data?)` helper with auto-attached `device` + `viewport_width` + new `site` dimension
- Inject the GTM script into `app/layout.tsx` via `next/script` (factory pattern), plus the `<noscript>` iframe fallback
- Fire `nav_clicked` from Header (parent-brand link, in-app nav, mobile menu items, factory CTA)
- Fire `factory_cta_clicked` from the Header CTA, hero CTA, and final CTA section on the landing page (with `surface` to distinguish)
- Fire `blog_post_viewed` from `app/blog/[slug]/page.tsx` (client-side track on mount, since the page itself is server-rendered)
- Document the events table in this repo's README + CLAUDE.md (if added later)
- Update factory's `lib/gtm.ts` to also auto-attach `site: 'factory'` so reports can slice cleanly between the two sites

**Out (explicitly):**
- GA4 dashboard / report creation — that's a console task tracked separately (the factory F-017e equivalent)
- Custom-dimension registration in GA4 admin (also console work; `site` needs to be registered there before reports can group by it)
- Cross-domain user identity stitching between `lolabots.com` and `factory.lolabots.com` (factory PRs `_ga` cookie handles user-level joining via GA4 automatically; explicit cross-domain linker config is a future polish)
- Cookie-consent banner — not required in our current markets, deferred until needed

## Approach

### Why one GTM container, not two?
Two GTM containers would mean:
- Two sets of tags to manage when an event changes
- Two GA4 properties (or one with manual data-source tagging)
- Harder cross-product funnel reports

One container with a `site` dimension keeps ops simple and unlocks "marketing → factory" funnels in a single GA4 explore. We can always split later if domain isolation becomes a hard requirement.

### Files

```
lolabots-marketing/
  lib/gtm.ts             ← new. Mirror factory's lib/gtm.ts with site:'marketing' baked into trackEvent
  app/layout.tsx         ← add next/script GTM injection + noscript iframe
  components/Header.tsx  ← wire nav_clicked + factory_cta_clicked on Open Factory button
  app/page.tsx           ← wire factory_cta_clicked on hero + bottom CTAs with surface label
  app/blog/[slug]/page.tsx ← wire blog_post_viewed (needs a small client component or useEffect)
  README.md              ← add Analytics section mirroring factory's CLAUDE.md
```

Factory side, in a separate slice (or bundled with this PR depending on size):

```
lolabot-factory/
  lib/gtm.ts             ← add site:'factory' to the auto-attached context
```

### Events vocabulary (lolabots-marketing)

| Event | Where fires | Data |
|---|---|---|
| `nav_clicked`            | Header (desktop + mobile menu items) | `link_label`, `link_href`, `surface` (`header-desktop` \| `mobile-menu`) |
| `factory_cta_clicked`    | All "Open Factory" / "Build your first agent" buttons | `surface` (`header` \| `hero` \| `bottom-cta` \| `mobile-menu`), `link_label` |
| `blog_post_viewed`       | Blog post detail page mount | `post_slug`, `post_title` |

Auto-attached on every event:
- `site: 'marketing'`
- `device: 'mobile' \| 'desktop'`
- `viewport_width: <px>`

### Sequencing
1. Land the GTM injection + `lib/gtm.ts` first (no events firing — just the container loaded). Verify the page still hits 200 and GTM container loads.
2. Wire the first event (`factory_cta_clicked` from header). Verify in GTM Tag Assistant.
3. Wire remaining events.
4. Push a small follow-up PR to factory adding `site: 'factory'` so reports stay clean.

## Dependencies / risks
- **Risk: GTM script regresses perf.** Mitigated by `next/script` strategy `afterInteractive` (same as factory).
- **Risk: events fire twice in dev** because of React strict mode. Same risk on factory; not seen in practice with `next/script`. Will verify locally before deploy.
- **Risk: `site` dimension not yet registered in GA4 admin**, so the first day of reports will show it under "events" but not as a slicer. That registration is the F-002 console task.

## Open questions
- Should we also fire a `blog_index_viewed` event for the blog list page? (Probably yes, low cost. Add to scope if cheap.)
- Do we want `outbound_link_clicked` for footer-to-23blocks etc.? Probably no — too noisy for v1.

## Links
- Factory analytics pattern: see [lolabot-factory CLAUDE.md `## Analytics (GTM + GA4)`](https://github.com/23blocks/lolabot-factory/blob/main/CLAUDE.md#analytics-gtm--ga4)
- Factory `lib/gtm.ts`: implementation reference
- Factory F-017d PRs: [#89](https://github.com/23blocks/lolabot-factory/pull/89) → [#90](https://github.com/23blocks/lolabot-factory/pull/90) → [#91](https://github.com/23blocks/lolabot-factory/pull/91)
