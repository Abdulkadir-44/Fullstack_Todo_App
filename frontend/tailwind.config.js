/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      backgroundImage : {
        'custom-image' : "url('/images/bg.png')"
      },
      fontFamily  : {
        'sans' : ['Poppins','sans-serif']
      },
      boxShadow : { 
        'custom-dark': '14px 16px 20px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}