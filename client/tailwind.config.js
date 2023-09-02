/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      colors: {
        'light-rose': '#f7e8e8',
        'med-rose': '#edaeae',
        rose: '#e89292',
        primary: '#4e2626'
      },
      dropShadow: {
        sm: '0 2px 2px rgba(0, 0, 0, 0.317)',
        md: '0 3px 3px rgba(0, 0, 0, 0.651)',
        lg: '0 6px 6px rgba(0, 0, 0, 0.651)'
      },
      fontFamily: {
        playfair: 'Playfair Display',
        serif: 'serif'
      }
    },
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1060px'
    }
  },
  plugins: []
};
