/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'phone': '480px',  // Define custom screen size for phones
        'tablet': '640px', // Existing tablet size
        'laptop': '1024px', // Existing laptop size
        'desktop': '1280px', // Existing desktop size
      },
      gridAutoRows: {
        '2fr': 'minmax(0, 2fr)',
      },
      zIndex: {
        '100': '100',
      }
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#0fae84",
          "text": "#34495E",
          "accent": "#f3f4f6",
          "bg": "#f5f5f4",
          "base": "#f3f4f6",
          "info": "#0000ff",
          "success": "#00ff00",
          "warning": "#fcd34d",
          "error": "#e11d48",
        },
      },
    ],
  },
  plugins: [require('daisyui')],
};
