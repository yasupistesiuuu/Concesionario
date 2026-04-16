export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      animation: {
        'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'cosmic-spin': 'cosmic-spin 3s linear infinite',
        'cosmic-spin-slow': 'cosmic-spin-slow 5s linear infinite',
      },
      keyframes: {
        'cosmic-spin': {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        },
        'cosmic-spin-slow': {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(-360deg)' },
        },
      },
    },
  },
  plugins: [],
}
