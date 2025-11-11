const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ["./src/**/*.{astro,js,jsx,md,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: "#444444",
        bg: "#fbfbfb"
      },
      // Add this section for the fonts
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        serif: ['Lora', ...defaultTheme.fontFamily.serif],
      },
    }
  },
  plugins: []
};