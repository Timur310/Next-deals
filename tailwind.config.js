module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'myone': '#4a4e69',
        'myonelight': '#9a8c98',
        'myonelighter': '#c9ada7',
        'myonelight2': '#f2e9e4',
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
