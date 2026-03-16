// Animated shimmer placeholder for remote images.
// Uses an SVG linearGradient sweep — more polished than a static flat color.
const svg = `<svg width="16" height="10" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%"   stop-color="#e2e8f0"/>
      <stop offset="50%"  stop-color="#cbd5e1"/>
      <stop offset="100%" stop-color="#e2e8f0"/>
    </linearGradient>
  </defs>
  <rect width="16" height="10" fill="url(#g)"/>
</svg>`
export const blurDataURL = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
