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
        statuses: {
          new: '#786240',
          inProgress: '#ff9914',
          rejected: '#f21b3f',
          hired: '#29bf12'
        },
        bg: {
          main: '#eff2ef',
          button: '#a682ff',
          modalButton: '#a682ff',
          modalSecondButton: '#dbccef',
          isDisable: '#D3D3D3'
        }
      }
    }
  },
  plugins: []
};
