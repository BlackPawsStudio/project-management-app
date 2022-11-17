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
        section: '#E2E4F2'
      }
    }
  },
  plugins: []
};
