/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'farm-green': '#38761d',
        'farm-brown': '#8B4513',
      },
      scale: {
        '102': '1.02',
      },
      backgroundImage: {
        'gradient-main': 'linear-gradient(120deg, #b0b0b0 70%, #232526 100%)',
        'gradient-header': 'linear-gradient(120deg, #232526 40%, #3a3a3a 60%, #6e6e6e 100%)',
      },
      transitionDuration: {
        '250': '250ms',
      },
      outlineWidth: {
        '10': '10px',
      },
    },
  },
  plugins: [],
}
