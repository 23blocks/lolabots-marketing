/**
 * GTM + dataLayer helper for lolabots.com (F-001).
 *
 * Container is shared with factory.lolabots.com (`GTM-PPHG42MP` → GA4
 * `G-6D6WLM3YCG`) so the brand has one analytics surface. Every event
 * auto-carries a `site` dimension so reports can split or merge factory
 * vs marketing cleanly.
 */
export const GTM_ID = 'GTM-PPHG42MP'

/** Site identifier auto-attached to every event from this codebase. */
const SITE = 'marketing' as const

/**
 * Push a dataLayer event with auto-attached context.
 *
 * Every event automatically carries:
 *   - `site`:           'marketing'
 *   - `device`:         'mobile' | 'desktop' (viewport <768px)
 *   - `viewport_width`: current window.innerWidth in px
 *
 * Caller-supplied `data` overrides these if it sets the same keys.
 */
export function trackEvent(event: string, data?: Record<string, unknown>) {
  if (typeof window === 'undefined' || !window.dataLayer) return
  const ctx = {
    site: SITE,
    device: getDevice(),
    viewport_width: typeof window.innerWidth === 'number' ? window.innerWidth : undefined,
  }
  window.dataLayer.push({ event, ...ctx, ...data })
}

function getDevice(): 'mobile' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop'
  return window.matchMedia('(max-width: 767px)').matches ? 'mobile' : 'desktop'
}

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
  }
}
