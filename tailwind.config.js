/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'sand': {
          50: '#FDFCFB',
          100: '#FAF8F5',
          200: '#F5F1EB',
          300: '#EBE4D9',
          400: '#DDD2C1',
          500: '#C9B9A3',
          600: '#A89479',
          700: '#8A7862',
          800: '#6B5E4F',
          900: '#4A4139',
        },
        'sage': {
          50: '#F7F9F7',
          100: '#EEF3EE',
          200: '#DCE7DC',
          300: '#BDD4BD',
          400: '#9BC19B',
          500: '#7AAA7A',
          600: '#5D8B5D',
          700: '#476F47',
          800: '#345434',
          900: '#243A24',
        },
        'stone': '#E8E3DC',
        'pearl': '#FEFDFB',
        'charcoal': '#2D2D2A',
        'clay': '#D4C4B0',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
