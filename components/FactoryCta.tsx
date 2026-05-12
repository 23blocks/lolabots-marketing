'use client'

import { ArrowRight } from 'lucide-react'
import { trackEvent } from '@/lib/gtm'
import { factoryUrl, type FactoryCtaSurface } from '@/lib/factory'

interface FactoryCtaProps {
  /** Where this CTA lives on the page — used for both the analytics
   *  `surface` dimension AND the UTM campaign on the destination URL. */
  surface: FactoryCtaSurface
  /** Button label. */
  label: string
  /** Optional className override for the anchor element. */
  className?: string
  /** Whether to render the trailing arrow icon. */
  withArrow?: boolean
}

/**
 * Client wrapper for "Open Factory" / "Build your first agent" buttons.
 * Drops the user into /browse (action) rather than factory's homepage
 * (another landing), and stamps the URL with UTM params identifying the
 * CTA surface so GA4 attribution is clean (F-002).
 */
export default function FactoryCta({
  surface,
  label,
  className,
  withArrow = true,
}: FactoryCtaProps) {
  return (
    <a
      href={factoryUrl(surface)}
      onClick={() =>
        trackEvent('factory_cta_clicked', {
          surface,
          link_label: label,
        })
      }
      className={className}
    >
      {label}
      {withArrow && (
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      )}
    </a>
  )
}
