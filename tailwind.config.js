import flowbite from "flowbite/plugin";
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    fontFamily: {
      // 'sans': ['ui-sans-serif', 'system-ui', ...],
      // 'serif': ['ui-serif', 'Georgia', ...],
      // 'mono': ['ui-monospace', 'SFMono-Regular', ...],

      mainFontFamily: ["Robot"],
    },
    extend: {
      colors: {
        primary: "rgb(41,94,78,100%)",
        secondary: "rgb(234,245,248,100%)",
        greenMain: "rgb(52,168,83,100%)",
        green_light: "rgb(201,252,203,100%)",
        darkMain: "rgb(25,25,25,100%)",
        dark_light: "rgb(51,51,51,100%)",
        lightMain: "#F2F2F2",
        gray_light: "#999999",
        yallow_light: "FFCB14",
        white: "#ffffff",
      },
      fontSize: {
        12: "0.75rem",
        16: "1rem",
        18: "1.125rem",
        20: "1.25rem",
        26: "1.6rem",
        32: "2rem",
        44: "2.75rem",
      },
    },
  },
  plugins: [flowbite],
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
