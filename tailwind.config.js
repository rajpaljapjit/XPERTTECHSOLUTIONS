/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        space: { 950: '#050816', 900: '#080d1f', 800: '#0d1330', 700: '#131a3d' },
        purple: { 700: '#6d28d9', 600: '#7c3aed', 500: '#8b5cf6', 400: '#a78bfa', 300: '#c4b5fd' },
        electric: { 700: '#1d4ed8', 600: '#2563eb', 500: '#3b82f6', 400: '#60a5fa', 300: '#93c5fd' },
        gold: { 600: '#d97706', 500: '#f59e0b', 400: '#fbbf24', 300: '#fcd34d' },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-space)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
