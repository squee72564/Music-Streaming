/** @type {import('tailwindcss').Config} */
module.exports = {
  content:
  [
    './src/**/*.{html,js,jsx}',
    '../backend/templates/**/*.html',
    '../backend/home/templates/home/*.html'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

