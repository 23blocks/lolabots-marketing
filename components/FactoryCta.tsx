'use client'

import { ArrowRight } from 'lucide-react'
import { trackEvent } from '@/lib/gtm'

interface FactoryCtaProps {
  /** Where this CTA lives on the page — used for the `surface` analytics dim. */
  surface: 'hero' | 'bottom-cta'
  /** Button label. */
  label: string
  /** Optional className override for the anchor element. */
  className?: string
  /** Whether to render the trailing arrow icon. */
  withArrow?: boolean
}

/**
 * Client-component wrapper for "Open Factory" / "Build your first agent"
 * buttons so we can fire factory_cta_clicked without making the host page
 * a client component (F-001).
 */
export default function FactoryCta({
  surface,
  label,
  className,
  withArrow = true,
}: FactoryCtaProps) {
  return (
    <a
      href="https://factory.lolabots.com"
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
