/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // GSAP Demo Hub–inspired dark UI (semantic tokens)
        'bg-primary': '#0a0a0a',
        'surface': '#141414',
        'surface-elevated': '#1a1a1a',
        'primary': '#0ae448',
        'accent': '#4ade80',
        'text-primary': '#f4f4f5',
        'text-muted': '#a1a1aa',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Rubik Mono One"', 'ui-monospace', 'sans-serif'],
      },
      boxShadow: {
        'hub': '0 0 0 1px rgba(255,255,255,0.06), 0 24px 80px -12px rgba(0,0,0,0.7)',
        'hub-glow': '0 0 60px -12px rgba(10, 228, 72, 0.35)',
      },
      backgroundImage: {
        'hub-grid': `
          linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
        `,
      },
      backgroundSize: {
        'hub': '72px 72px',
      },
    },
  },
  plugins: [],
}
