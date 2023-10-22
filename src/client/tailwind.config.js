export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#E53265',
        secondary: '#28ACF6'
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        wiggle: 'wiggle 1s linear infinite'
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-.75deg)' },
          '50%': { transform: 'rotate(.75deg)' }
        }
      }
    }
  },
  plugins: []
};
