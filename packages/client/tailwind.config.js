export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3C82F6',
        secondary: '#26B170',
        'primary-dark': '#E53265',
        'secondary-dark': '#28ACF6'
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        wiggle: 'wiggle 1s linear infinite',
        'pop-in': 'pop-in .25s ease forwards',
        'pop-out': 'pop-out .25s ease forwards',
        'fade-in': 'fade-in .25s ease forwards',
        'fade-out': 'fade-out .25s ease forwards',
        show: 'show ease .25s forwards',
        hide: 'hide ease .25s forwards'
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-.75deg)' },
          '50%': { transform: 'rotate(.75deg)' }
        },
        'pop-in': {
          from: { transform: 'scale(0)' },
          to: { transform: 'scale(1)' }
        },
        'pop-out': {
          from: { transform: 'scale(1)' },
          to: { transform: 'scale(0)' }
        },
        'fade-in': {
          from: { opacity: 0 },
          to: { opacity: 0.75 }
        },
        'fade-out': {
          from: { opacity: 0.75 },
          to: { opacity: 0 }
        },
        show: {
          from: { display: 'none' },
          to: { display: 'block' }
        },
        hide: {
          from: { display: 'block' },
          to: { display: 'none' }
        }
      }
    }
  },
  plugins: []
};
