/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing:{
        120:'40.45rem'
        
      },
      borderRadius:{
        sm:'0.25rem'
      }
    },
  },
  plugins: [],
}

