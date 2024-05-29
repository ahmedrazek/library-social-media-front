/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors:{
      primary:"rgb(33,75,62,100%)",
      secondary:"rgb(234,245,248,100%)",
      green:"rgb(52,168,83,100%)",
      green_light:"rgb(201,252,203,100%)",
      dark:"rgb(25,25,25,100%)",
      dark_light:"rgb(51,51,51,100%)",
      light:"#F2F2F2",
      gray_light:"#999999",
      white:"#ffffff"
    }
  },
  plugins: [],
};
// Hex
//       primary:"295E4E",
//       secondary:"EAF5F8",
//       green:"34A853",
//       green_light:"C9FCCB",
//       dark:"191919",
//       dark_light:"333333",
//       light:"F2F2F2",
//       gray_light:"999999",
//       white:"ffffff"