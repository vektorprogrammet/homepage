/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // or false or 'media'
  theme: {
    screens: {
      'sm': '640px',
      'md': '860px',
      'lg': '1024px',
      'xl': '1280px',
    },
    extend: {
      colors: {
        'vektor-blue': '#6fceee',
        'vektor-blue-hover': '#46b6dd',
        'vektor-darblue': '#023874',
        'vektor-darkfooter': '#022346',
        'vektor-bg': '#fafdff',
        'table-grey': '#EFEFEF',
      },
    },
  },
  variants: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        'vektor': {
          'primary': '#6fceee',
          'primary-focus': '#46b6dd',
          'primary-content': '#ffffff',
          'secondary': '#023874',
          'secondary-focus': '#001854',
          'secondary-content': '#ffffff',
          'accent': '#37cdbe',
          'accent-focus': '#2aa79b',
          'accent-content': '#ffffff',
          'neutral': '#3d4451',
          'neutral-focus': '#2a2e37',
          'neutral-content': '#ffffff',
          'base-100': '#fafdff',
          'base-200': '#f9fafb',
          'base-300': '#d1d5db',
          'base-content': '#1f2937',
          'info': '#2094f3',
          'success': '#009485',
          'warning': '#ff9900',
          'error': '#ff5724',
        },
      },
    ],
  },
  plugins: [require("postcss-import"), require("daisyui")],
}
