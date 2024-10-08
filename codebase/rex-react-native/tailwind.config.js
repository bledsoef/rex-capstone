/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        rex: "#50BA6F",
        primarydark: "#121212",
        primarywhite: "#ffffff",
        secondarydark: "#1f1f1f",
        secondarywhite: "#F6F6F6"
      },
      fontFamily: {
      jthin: ["JosefinSansThin", "sans-serif"],
      jlight: ["JosefinSansLight", "sans-serif"],
      jregular: ["JosefinSansRegular", "sans-serif"],
      jsemibold: ["JosefinSansSemibold", "sans-serif"],
      jbold: ["JosefinSansBold", "sans-serif"],
    },},
  },
  plugins: [],
}

