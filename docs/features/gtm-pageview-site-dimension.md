# F-003: GTM page_view tag carries `site` dimension

| | |
|---|---|
| ID       | F-003 |
| Status   | Next |
| Priority | Low |
| Category | analytics |
| Owner    | TBD |
| Created  | 2026-05-12 |
| Updated  | 2026-05-12 |

## Problem
F-001 (lolabots) and F-029 (factory) auto-attach `site` to every event pushed through our `trackEvent()` helper. But GA4 page_view events are fired by the GTM container itself (not by our helper) when the GTM tag for GA4 picks up the page-load — those don't carry the `site` field today. Reports that group page_views by `site` (e.g. "marketing pageviews vs factory pageviews") will be empty until this is fixed.

Custom events are unaffected — they already carry `site`.

## Goal
Every GA4 page_view event in the shared property carries the originating `site` (`marketing` or `factory`) so all reports can slice by site without exceptions.

## Scope
**In:**
- Configure the GA4 page_view tag in container `GTM-PPHG42MP` to set `site` as a tag-level event parameter
- Use a hostname-based GTM variable: if `Page Hostname` matches `factory.lolabots.com` → `factory`, else → `marketing`
- Publish a new container version

**Out:**
- Touching any other tags / triggers (this is purely the page_view tag)

## Approach
1. `gcloud auth login --scopes=https://www.googleapis.com/auth/tagmanager.edit.containers` (one-time auth for whoever runs this)
2. Use `gtm-cli` or the GTM REST API:
   - Create a new variable "Site Dimension" of type Custom JavaScript that returns `factory` or `marketing` based on `location.hostname`
   - Edit the GA4 page_view tag to add an event parameter `site = {{Site Dimension}}`
   - Publish the workspace
3. Verify in GTM Preview mode that page_view events on both hostnames carry the new param.

## Dependencies / risks
- Container is shared with factory; the variable change is global. Verify no other tag depends on a same-named variable.
- GTM `tagmanager.edit.containers` scope needed (not present in default gcloud auth).

## Links
- Pairs with: F-001 (this repo), F-029 (factory)
- GTM container: `GTM-PPHG42MP`
- GA4 property: `G-6D6WLM3YCG`
