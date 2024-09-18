/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#50BA6F"
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

