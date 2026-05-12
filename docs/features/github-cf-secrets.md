# F-005: GitHub Actions deploy — add CF secrets

| | |
|---|---|
| ID       | F-005 |
| Status   | Next |
| Priority | Low |
| Category | ops |
| Owner    | TBD |
| Created  | 2026-05-12 |
| Updated  | 2026-05-12 |

## Problem
`.github/workflows/deploy.yml` is wired to deploy to Cloudflare Pages on push to `production`, but it needs two repo secrets that don't exist yet: `CF_API_TOKEN` and `CF_ACCOUNT_ID`. Today every production deploy goes through `npx wrangler pages deploy` from a local terminal — fine for now, but PR-merged → auto-deploy is the cleaner long-term flow (and it's what factory uses).

## Goal
A push to `production` (or a PR merge into it) triggers the deploy action and lolabots.com publishes without anyone running wrangler.

## Scope

**In:**
- Add two repo secrets to `23blocks/lolabots-marketing`:
  - `CF_API_TOKEN` — Cloudflare API token scoped to `Account.Cloudflare Pages: Edit` (limited to the `lolabots-marketing` project preferably)
  - `CF_ACCOUNT_ID` — the same `fec222508837e3ffb99f11d8491ddc98` factory uses
- Verify by merging a trivial change into `production` and confirming the workflow run goes green

**Out:**
- Branch protection rule changes (already set up in F-029-equivalent)
- Build-pipeline tuning

## Approach
Two options:

**A. Reuse factory's CF API token (fastest)**
- Token was generated when factory was first wired. It's in your password manager / Cloudflare dashboard.
- Paste it once: `gh secret set CF_API_TOKEN -R 23blocks/lolabots-marketing -b "<token>"` and same for `CF_ACCOUNT_ID`.
- Same token serves both Pages projects since it's account-scoped.

**B. Generate a new scoped token (cleaner)**
- <https://dash.cloudflare.com/profile/api-tokens> → Create custom token
- Permissions: `Account.Cloudflare Pages: Edit` (limited to the `lolabots-marketing` project if you want fine-grained)
- Paste with `gh secret set` as above

Either works. (A) is faster if you trust the existing token's scope; (B) is cleaner separation in case factory's needs to rotate independently.

## Dependencies / risks
- I cannot create the API token via my current wrangler OAuth (403 on `/user/tokens`). Token creation is a human-in-the-dashboard step.
- I cannot read the existing secret value back from the factory repo (GitHub blocks reading secret values by design). Has to come from your records.
- Cloudflare API tokens never expire by default — set a rotation reminder if compliance matters.

## Links
- Workflow: `.github/workflows/deploy.yml`
- Factory has the same secrets working: `23blocks/lolabot-factory`
- Today's fallback: `npx wrangler pages deploy out --project-name=lolabots-marketing --branch=production`
