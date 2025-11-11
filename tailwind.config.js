/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./index.html",
    "./App.tsx",
    "./index.tsx",
    "./{assets,components,data,features,hooks,pages,services,types}/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sunai-cream': '#FFF9F5',
        'sunai-slate': '#0F172A',
        'sunai-orange': '#F97316',
        'sunai-blue': '#00334F',
      },
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
        poppins: ['Poppins', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
}