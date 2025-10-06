/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // Get files, unless tailwind won't work
    "./public/index.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
