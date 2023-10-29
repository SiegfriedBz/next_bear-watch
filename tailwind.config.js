/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'cfg-white': '#f5f5f4', // stone-100
        'cfg-black': '#0f172a', // slate-900
        primary: {
          DEFAULT: '#34d399', // emerald-400
          dark: '#10b981', // emerald-500
          light: '#6ee7b7', // emerald-300
        },
        secondary: {
          DEFAULT: '#f59e0b', // amber-500
          light: '#fcd34d', // amber-300
        },
        warning: {
          DEFAULT: '#EF4444', // red-500
          light: '#F87171', // red-400
        },
      },
    },
  },
  plugins: [],
}
