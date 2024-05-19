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
          modal: '#116466',
          main: '#2C3531'
        }
      }
    }
  },
  plugins: []
};
