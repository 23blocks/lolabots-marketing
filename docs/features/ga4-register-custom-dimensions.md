# F-004: GA4 — register custom dimensions

| | |
|---|---|
| ID       | F-004 |
| Status   | Next |
| Priority | Medium |
| Category | analytics |
| Owner    | TBD |
| Created  | 2026-05-12 |
| Updated  | 2026-05-12 |

## Problem
F-001 / F-002 / F-029 ship a rich vocabulary of event parameters (`site`, `device`, `viewport_width`, `surface`, `link_label`, `post_slug`, `filter_type`, `filter_value`, etc.). GA4 receives them but until each is **registered as a custom dimension** in the property admin, standard reports can't group by them — they're only accessible via Explore reports' event-parameter dimension.

## Goal
Standard GA4 reports (Acquisition, Engagement, Reports → Realtime) can slice by `site`, `device`, `surface`, and key UTM params.

## Scope

**In:** register these as **Event-scoped** custom dimensions on property `G-6D6WLM3YCG`:

| Dimension name | Event parameter | Why |
|---|---|---|
| Site            | `site`            | factory vs marketing |
| Device class    | `device`          | mobile vs desktop |
| CTA surface     | `surface`         | which lolabots/factory surface drove the action |
| Link label      | `link_label`      | exact label for nav/CTA click attribution |
| Post slug       | `post_slug`       | blog post engagement breakdowns |
| Filter type     | `filter_type`     | which filter axis was used on factory |
| Filter value    | `filter_value`    | which specific filter was selected |

UTM params (`utm_source`, `utm_medium`, `utm_campaign`) are auto-collected by GA4 — no manual registration needed.

**Out:**
- User-scoped dimensions (none today)
- Custom metrics (none today)
- GA4 audience setup, conversion goals, dashboards — separate slices

## Approach
1. `gcloud auth login --scopes=https://www.googleapis.com/auth/analytics.edit` (one-time)
2. Use the GA4 Admin API to POST each custom dimension:
   ```
   POST https://analyticsadmin.googleapis.com/v1beta/properties/<prop-id>/customDimensions
   { "parameterName": "site", "displayName": "Site", "scope": "EVENT" }
   ```
3. Wait ~24h for GA4 to start populating data (dimensions are forward-only — historical events won't backfill).
4. Verify a sample event in Realtime → DebugView shows the new dimension name.

## Dependencies / risks
- **Forward-only**: events that fired before registration won't have the dimension populated for queries. Acceptable; we're early.
- **GA4 quota**: max 50 event-scoped custom dimensions per property. We're using 7. Plenty of headroom.

## Links
- Pairs with: F-001, F-002 (this repo), F-017d, F-029 (factory)
- GA4 property: `G-6D6WLM3YCG`
