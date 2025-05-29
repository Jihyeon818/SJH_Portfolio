/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        paytone: ['"Paytone One"', 'sans-serif'],
      },
      keyframes: {
        'slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'slide-down': 'slide-down 0.8s ease-out forwards',
        'slide-up': 'slide-up 0.8s ease-out forwards',
      },
      extend: {
        keyframes: {
          'zoom-in': {
            '0%': { transform: 'scale(0.95)', opacity: '0' },
            '100%': { transform: 'scale(1)', opacity: '1' },
          },
        },
        animation: {
          'zoom-in': 'zoom-in 0.3s ease-out forwards',
        },
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    function ({ addUtilities }) {
      addUtilities({
        '.hide-scrollbar': {
          'scrollbar-width': 'none', /* Firefox */
          '-ms-overflow-style': 'none', /* IE 10+ */
        },
        '.hide-scrollbar::-webkit-scrollbar': {
          display: 'none', /* Chrome/Safari/Webkit */
        },
      });
    },
  ],
}
