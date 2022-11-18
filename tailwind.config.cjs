/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primaryText: '#323857',
        titleText: '#656565',
        background: '#F2F2F2',
        header: '#B6C9E6',
        headerText: '#2667C9',
        section: '#E2E4F2',
        inputBackground: '#E8EFFA'
      },
      boxShadow: {
        xxl: 'inset 2px 2px 4px #0000003f'
      },
      animation: {
        'pulse-1': 'pulse 2s linear infinite',
        'pulse-2': 'pulse 2s 0.75s linear infinite',
        'pulse-3': 'pulse 2s 1.5s linear infinite',
        'pulse-4': 'pulse 2s 2.25s linear infinite'
      },
      keyframes: {
        pulse: {
          '0%, 100%': {
            transform: 'scale(100%)'
          },
          '25%': {
            transform: 'scale(75%)'
          },
          '50%': {
            transform: 'scale(50%)'
          },
          '75%': {
            transform: 'scale(25%)'
          }
        }
      }
    }
  },
  plugins: []
};
