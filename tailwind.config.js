/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        indigo_dye: "#134074",
        prussian_blue: "#13315C",
        oxford_blue: "#0B2545",
        pewter_blue: "#8DA9C4",
        mint_cream: "#EEF4ED",
        lavender_grey: "#C9CAD9",
        timberwolf: "#DDD1C7",
        drums: "#D60128",
        vocals: "#8C1D62",
        guitar: "#1E829B",
        bass: "#FF6F15",
        keys: "#FF9F44",
        drums_dark: "#9A031E",
        vocals_dark: "#5F0F40",
        bass_dark: "#E36414",
        guitar_dark: "#0F4C5C",
        keys_dark: "#FB8B24",
      },
    },
  },
  plugins: [],
};
