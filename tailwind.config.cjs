module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        terracotta: "#b0472a",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        header: ["Space Grotesk", "Inter", "sans-serif"],
        serif: ["Merriweather", "serif"],
        mono: ["ui-monospace", "SFMono-Regular", "monospace"],
      },
    },
  },
  plugins: [],
};
