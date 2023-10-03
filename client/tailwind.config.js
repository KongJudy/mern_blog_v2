/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      colors: {
        'light-rose': '#fbf3f3',
        'med-rose': '#efc9c9',
        rose: '#f0bebe',
        primary: '#463c3c'
      },
      dropShadow: {
        sm: '0 2px 2px rgba(0, 0, 0, 0.317)',
        md: '0 3px 3px rgba(0, 0, 0, 0.651)',
        lg: '0 6px 6px rgba(0, 0, 0, 0.651)'
      },
      fontFamily: {
        inter: 'Inter',
        serif: 'serif'
      }
    },
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px'
    }
  },
  plugins: []
};
