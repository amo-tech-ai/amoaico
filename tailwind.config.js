/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./index.html",
    "./*.tsx", // Scans root-level TSX files like App.tsx and index.tsx
    "./{assets,components,data,features,hooks,pages,services,types}/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sunai-cream': '#FFF9F5',
        'sunai-slate': '#0F172A',
        'sunai-orange': '#F97316',
        'sunai-blue': '#00334F',
        'whatsapp-green': '#25D366',
      },
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
        poppins: ['Poppins', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
}