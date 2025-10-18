/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          purple: '#8B5CF6',
          blue: '#3B82F6',
          pink: '#EC4899',
          cyan: '#06B6D4',
        },
        dark: {
          bg: '#0F172A',
          card: '#1E293B',
          hover: '#334155',
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
