/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        xs: "12px",
        sm: "14px",
        md: "16px",
        lg: "20px",
        xl: "24px",
        "2xl": "1.75rem",
        "3xl": "2rem",
        "4xl": "2.375rem",
        "5xl": "3rem",
        "6xl": "3.375rem",
        "7xl": "64px",
      },
      colors: {
        "JHC-Primary": "#3497F9",
        "JHC/Darkest": "#242222",
        "JHC/Light": "#EBF5FF",
        "JHC/Dark": "#595959",
        "JHC/Medium": "#8787A8",
        "OBS-Darkest": "#142633",
        "OBS-Green": "#47C96B",
        "JHC-Red": "#FF6558",
      },
    },
  },
  plugins: [],
};
