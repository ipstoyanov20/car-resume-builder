/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'orange': '#DA4A00',
      },
      fontFamily: {
        opsOne: ['Black Ops One'],
        nabla: ['Nabla'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

