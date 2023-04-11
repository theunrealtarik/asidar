const withMaterialTailwind = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMaterialTailwind({
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/**/*.html"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 4s linear infinite",
      },
    },
  },
  plugins: [],
});
