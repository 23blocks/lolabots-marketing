import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

/**
 * Lolabots brand palette.
 *
 * Extends factory's cream/ink/tangerine system (factory.lolabots.com is the
 * reference). Adds:
 *   - `iris`     — secondary accent for umbrella-brand surfaces (manifesto,
 *                  product callouts) so lolabots.com doesn't look like a
 *                  factory page wearing a different hat.
 *   - `surface`  — light/dark neutral pair for hero gradients and section
 *                  alternation without leaving the cream family.
 */
const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      colors: {
        cream: {
          DEFAULT: 'oklch(0.97 0.008 85)',
          dark: 'oklch(0.95 0.006 85)',
          darker: 'oklch(0.92 0.008 85)',
        },
        ink: {
          DEFAULT: 'oklch(0.18 0.01 85)',
          light: 'oklch(0.35 0.008 85)',
        },
        muted: 'oklch(0.55 0.008 85)',
        tangerine: {
          DEFAULT: 'oklch(0.68 0.20 50)',
          light: 'oklch(0.93 0.04 50)',
          dark: 'oklch(0.58 0.20 50)',
        },
        iris: {
          DEFAULT: 'oklch(0.55 0.18 290)',
          light: 'oklch(0.93 0.04 290)',
          dark: 'oklch(0.45 0.18 290)',
        },
        surface: {
          warm: 'oklch(0.985 0.006 75)',
          cool: 'oklch(0.965 0.012 240)',
        },
      },
      keyframes: {
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        reveal: 'reveal 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'reveal-1': 'reveal 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.06s forwards',
        'reveal-2': 'reveal 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.12s forwards',
        'reveal-3': 'reveal 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.18s forwards',
        'fade-in': 'fade-in 0.4s ease-out forwards',
      },
    },
  },
  plugins: [typography],
}

export default config
