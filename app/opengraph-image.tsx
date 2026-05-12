import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'
export const alt = 'Lolabots — Practical AI agents you actually use'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: '#F5F0EA',
          display: 'flex',
          flexDirection: 'column',
          padding: 80,
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              background: '#1A1814',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 22,
              fontWeight: 900,
              color: '#F5F0EA',
            }}
          >
            LB
          </div>
          <span
            style={{
              fontSize: 28,
              fontWeight: 800,
              letterSpacing: -0.5,
              color: '#1A1814',
              textTransform: 'uppercase',
            }}
          >
            Lolabots
          </span>
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 96,
              fontWeight: 900,
              lineHeight: 1.05,
              color: '#1A1814',
              letterSpacing: -2,
              textTransform: 'uppercase',
              maxWidth: 980,
            }}
          >
            AI agents you{' '}
            <span style={{ color: '#E07830', marginLeft: 24 }}>actually use.</span>
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 20,
              fontSize: 26,
              color: '#1A1814',
              opacity: 0.65,
              maxWidth: 900,
            }}
          >
            Pick a specialist · paste one command · your agent goes to work
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 36,
              fontSize: 18,
              color: '#E07830',
              textTransform: 'uppercase',
              letterSpacing: 2,
              fontWeight: 700,
            }}
          >
            lolabots.com
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
