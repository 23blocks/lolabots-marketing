# Backlog

Index of features and work items for the lolabots.com marketing site. **This file is an index, not a spec** — full detail lives in `docs/features/<slug>.md`. To add a feature, copy `docs/features/_TEMPLATE.md` and add a row to the appropriate status table below.

Numbering is independent of the [factory backlog](https://github.com/23blocks/lolabot-factory/blob/main/BACKLOG.md); this repo starts at F-001.

## Categories

Every backlog row is labelled with a category so the work scope reads at a glance — especially when an item is "marketing site" vs "shared infrastructure" vs "factory-side adjacent":

| Category | What it covers |
|---|---|
| `marketing`    | The marketing site itself — UI, pages, content, blog, design, SEO |
| `analytics`    | GTM container, GA4 property, dataLayer events, custom dimensions (shared with factory) |
| `factory`      | Anything that touches factory.lolabots.com from this site (deep-links, UTM tagging, cross-domain UX) |
| `ops`          | Deploy pipelines, secrets, infrastructure, repo hygiene |
| `brand`        | Cross-product brand stuff — logos, messaging, parent-brand affordances |

Status definitions:
- **Now** — actively being worked on
- **Next** — committed for the next cycle
- **Later** — known and prioritized but not scheduled
- **Backlog** — captured, not yet prioritized
- **Done** — shipped

---

## Now

_(empty)_

## Next

| ID    | Category   | Feature                                  | One-liner                                                                                                | Doc |
|-------|------------|------------------------------------------|----------------------------------------------------------------------------------------------------------|-----|
| F-003 | analytics  | GTM page_view tag carries `site` dim     | Configure the GA4 page_view tag in the shared GTM container so page_views also slice by `site` (not just custom events) | [docs/features/gtm-pageview-site-dimension.md](docs/features/gtm-pageview-site-dimension.md) |
| F-004 | analytics  | GA4 — register custom dimensions         | Register `site`, `device`, `surface`, `utm_campaign` (+ a couple others) as GA4 custom dimensions so reports can group by them | [docs/features/ga4-register-custom-dimensions.md](docs/features/ga4-register-custom-dimensions.md) |
| F-005 | ops        | GitHub Actions deploy — add CF secrets   | Add `CF_API_TOKEN` and `CF_ACCOUNT_ID` to the lolabots-marketing repo secrets so `deploy.yml` takes over from wrangler-direct deploys | [docs/features/github-cf-secrets.md](docs/features/github-cf-secrets.md) |

## Later

_(empty)_

## Backlog

_(empty)_

## Done

| ID    | Category | Feature                                  | One-liner                                                                                                  | Shipped     | Doc / PRs |
|-------|----------|------------------------------------------|------------------------------------------------------------------------------------------------------------|-------------|-----------|
| F-001 | analytics | Analytics — GTM + GA4                   | GTM container shared with factory, `lib/gtm.ts` helper, `nav_clicked` + `factory_cta_clicked` + `blog_post_viewed` events with `site:'marketing'` + device/viewport auto-attached | 2026-05-12  | [doc](docs/features/analytics-gtm-ga4.md) · PRs [#1](https://github.com/23blocks/lolabots-marketing/pull/1) → [#2](https://github.com/23blocks/lolabots-marketing/pull/2) → [#3](https://github.com/23blocks/lolabots-marketing/pull/3) |
| F-002 | factory   | Deep-link CTAs to factory /browse + UTM | All factory CTAs go to `/browse?utm_source=lolabots.com&utm_medium=cta&utm_campaign=<surface>`. 8 surfaces tagged (header, mobile-menu, hero, bottom-cta, products-tile, products-page, footer, not-found). Closes the double-landing friction. | 2026-05-12  | PRs [#4](https://github.com/23blocks/lolabots-marketing/pull/4) → [#5](https://github.com/23blocks/lolabots-marketing/pull/5) → [#6](https://github.com/23blocks/lolabots-marketing/pull/6) |
