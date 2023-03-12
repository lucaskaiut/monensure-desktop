/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      colors: {
        ice: '#fcfcfc',
        green: {
          100: '',
          200: '',
          300: '#33cc95',
          400: '',
          500: '#18b84e',
          600: '',
          700: '',
          800: '',
          900: '#118b3a'
        },
        danger: {
          100: '',
          200: '',
          300: '',
          400: '',
          500: '#e52e4d',
          600: '',
          700: '',
          800: '',
          900: '#96031b'
        }
      }
    },
  },
  plugins: [],
}
