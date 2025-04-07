/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'ios': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
        'inner-ios': 'inset 0 2px 6px -1px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'spin-slow': 'spin 60s linear infinite',
      }
    },
  },
  plugins: [],
} 