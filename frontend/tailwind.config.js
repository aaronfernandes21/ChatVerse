import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config}*/
export default {
  content: [
    './index.html',            // if you have a root index.html
    './src/**/*.{js,jsx,ts,tsx}', // all your React components and JS files
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
};
