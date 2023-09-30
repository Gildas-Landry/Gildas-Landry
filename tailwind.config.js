/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    screens:{'phone':'250px','tablet':'589px','laptop':'700px','desktop':'1020px'},
    extend: {},
  },
  plugins: [require('@shrutibalasa/tailwind-grid-auto-fit')],
}

