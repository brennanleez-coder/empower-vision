import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#405D72',   // #405D72
        secondary: '#758694', // #758694
        accent: '#F7E7DC',    // #F7E7DC
        light: '#FFF8F3'      // #FFF8F3
      }
    }
  },
  plugins: [],
};

export default config;
