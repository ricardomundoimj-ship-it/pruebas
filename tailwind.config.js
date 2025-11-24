/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#252525',
        'black-dark': '#131313',
        'black-medium': '#4F4F4F',
        'black-light': '#929292',
        'silver-regular': '#EFEFEF',
        'silver-light': '#F5F5F5',
        'blue-regular': '#3658C1',
        'blue-dark': '#28408F',
        'blue-medium': '#E1EBF9',
        'blue-light': '#F1F4FF',
        'green-regular': '#039B59',
        'green-dark': '#077444',
        'green-medium': '#DFF6ED',
        'yellow-regular': '#E1D63D',
        'yellow-medium': '#F5F4DC',
        'orange-regular': '#DC8921',
        'red-regular': '#C62E1F',
        'white': '#FAFAFA',
      },
      fontFamily: {
        'sans': ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

