/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#EEE9DA',
        'surface': '#BDCDD6',
        'primary': '#6096B4',
        'accent': '#93BFCF',
        'text-primary': '#2C3E50',
        'text-muted': '#6096B4',
      },
      fontFamily: {
        sans: ['Ledger', 'serif'],
        display: ['"Rubik Mono One"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


