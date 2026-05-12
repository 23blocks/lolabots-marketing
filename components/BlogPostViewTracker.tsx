'use client'

import { useEffect } from 'react'
import { trackEvent } from '@/lib/gtm'

interface BlogPostViewTrackerProps {
  postSlug: string
  postTitle: string
}

/**
 * Fires `blog_post_viewed` once per mount (F-001). Static-export pages are
 * server-rendered, so the parent route stays a server component; this tiny
 * client component hooks the dataLayer call on the client.
 */
export default function BlogPostViewTracker({
  postSlug,
  postTitle,
}: BlogPostViewTrackerProps) {
  useEffect(() => {
    trackEvent('blog_post_viewed', {
      post_slug: postSlug,
      post_title: postTitle,
    })
  }, [postSlug, postTitle])

  return null
}
