/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // <- Très important
    "./public/index.html"           // <- si tu utilises des classes dans index.html
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
