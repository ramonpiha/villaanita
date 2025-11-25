const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{astro,js,jsx,ts,tsx,md,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: "#444444",
        bg: "#fbfbfb",
      },
      // Add this section for the fonts
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        serif: ["Lora", ...defaultTheme.fontFamily.serif],
        'map-dark': 'rgb(27, 36, 48)', // The dark blue background
        'map-gold': '#e6ae48',         // The gold button/title color
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
