/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        text: {
          title: '#D1E8E2'
        },
        bg: {
          modal: '#748D81',
          main: '#2C3531',
          button: '#465B51',
          singUpButton: '#009999',
          highlightButton: '#1D7373'
        }
      }
    }
  },
  plugins: []
};
