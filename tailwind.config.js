module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        bottomToTop: {
          '0%, 100%' :{transform:'translateY(-50%)', transform:'translateX(-50%)'},
        }
      },
      animation: {
        bottomToTop:'bottomToTop 1s ease-in-out both'
      }
    },
    fontFamily: {
      'poppins' : ['Poppins']
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
