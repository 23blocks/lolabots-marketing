/**
 * Cross-domain navigation to factory.lolabots.com (F-002).
 *
 * Every outbound link from lolabots.com that takes the user into factory
 * goes through this helper so:
 *   1. They land on /browse (action), not factory's home (another landing).
 *      The double-landing pattern is friction and bad for conversion.
 *   2. The URL carries UTM params identifying the originating CTA surface.
 *      Combined with the shared GTM container's `site` dimension, this gives
 *      a clean GA4 funnel: lolabots pageview → click (surface) → factory
 *      session with utm_campaign=<surface> → build_initiated.
 *
 * Pass `path` to override the destination (e.g. `how-it-works` for learn-
 * intent links). Defaults to `browse` for CTAs.
 */
export type FactoryCtaSurface =
  | 'header'
  | 'mobile-menu'
  | 'hero'
  | 'bottom-cta'
  | 'products-page'
  | 'products-tile'
  | 'footer'
  | 'not-found'

const FACTORY_ORIGIN = 'https://factory.lolabots.com'

export function factoryUrl(
  surface: FactoryCtaSurface,
  path: string = '/browse',
): string {
  const params = new URLSearchParams({
    utm_source: 'lolabots.com',
    utm_medium: 'cta',
    utm_campaign: surface,
  })
  return `${FACTORY_ORIGIN}${path}?${params.toString()}`
}
