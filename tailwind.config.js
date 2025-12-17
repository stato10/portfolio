/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0b0d10',
        'surface': '#11161d',
        'primary': '#00a4d8',
        'accent': '#00e5ff',
        'text-primary': '#f5f5f5',
        'text-muted': '#a3b3c3',
      },
      fontFamily: {
        sans: ['Poppins', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


