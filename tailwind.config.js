/* eslint-disable prettier/prettier */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
theme: {
    extend: {
      colors: {
        primary: "#FF4DD2",
        secondary: "#FFD166",
        background: "#0B0C10",
        neonPink: "#ff4df0",
        neonCyan: "#00fff0",
        neonYellow: "#f5d300",
        darkCard: "#1c1029",
        darkBg1: "#2e003e",
        darkBg2: "#000b52",
        darkBg3: "#002f4b",
      },
         shadow: {
        neon: "0 0 10px #00fff0, 0 0 20px #00fff0, 0 0 40px #00fff0",
      },
      fontFamily: {
       retro: ['"Press Start 2P"', "cursive"],
      },
    },
  },
  plugins: [],
}