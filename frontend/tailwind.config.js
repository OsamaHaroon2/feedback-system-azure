/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          500: "#20b2aa",
          600: "#178f87",
        },
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          600: "#4b5563",
          800: "#1f2937",
          900: "#111827",
        },
      },
    },
  },
  plugins: [],
};
