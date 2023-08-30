/** @type {import('next').NextConfig} */
// tailwind.config.js
const { nextui } = require("@nextui-org/react");
module.exports = {
  content: [
    // ...
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
  publicRuntimeConfig: {
    SERVER: process.env.NEXT_PUBLIC_SERVER_NAME,
  },
};
