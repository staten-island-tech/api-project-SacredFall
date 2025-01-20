/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        suranna: ["Suranna", "serif"],
        biryani: ["Biryani", "sans-serif"],
        comorantinfant: ["Cormorant Infant", "serif"],
      },
    },
  },
  plugins: [],
};
