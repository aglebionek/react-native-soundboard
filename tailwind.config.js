/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './app/*.{js,jsx,tx,tsx}', './components/**/*.{js,jsx,tx,tsx}'],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        
      }
    },
  },
  plugins: [],
}