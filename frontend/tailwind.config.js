/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "--myGreen": "#1ac073",
        "--myYellow": "#F3BA00",
        "--myWhite":"#f2f2f2",
        "--myRed":"rgb(236, 70, 70)",
        "--hoverYellow":"#ffc400",
        "--hoverRed":"rgb(231, 67, 67)",
      },
      screens: {
        'sm': {'max': '480px'},
        'md': {'min': '481px', 'max': '900px'},
        'lg': {'min': '900px'},
      },
    },
  },
  plugins: [],
}