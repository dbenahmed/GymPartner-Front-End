/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main': '#20409a',
        'secondary': '#fece00',
        'dark': '#10204d',
        'light': '#6279b8',
        'graycolor': '#e7ecef',
        'whitecolor': '#f9fafb',
      }
    },
  },
  plugins: [],
}

