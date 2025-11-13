/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
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
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        poppins: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}