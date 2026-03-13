/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
       fontFamily: {
        sans: ['Work Sans', 'sans-serif'],
        serif: ['Noto Serif', 'serif'],
      },
    },
  },
  plugins: [],
}