/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#f59e42',
        accent: '#10b981',
        background: '#f8fafc',
        dark: '#1e293b',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
