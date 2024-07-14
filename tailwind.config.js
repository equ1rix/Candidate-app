/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        oswald: ['Rubik', 'sans-serif']
      },
      colors: {
        text: {
          title: '#000000'
        },
        bg: {
          main: '#DDEBFC',
          button: '#68AAF2',
          modalButton: '#c2dcfb',
          modalSecondButton: '#f0f6fe',
          isDisable: '#D3D3D3'
        }
      }
    }
  },
  plugins: []
};
