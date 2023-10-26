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
        primary: {
          DEFAULT: '#3B82F6', // blue-500
          dark: '#2563EB', // blue-600
          light: '#93C5FD', // blue-300
        },
        success: '#94D177',
        warning: {
          DEFAULT: '#EF4444', // red-500
          dark: '#DC2626', // red-600
          light: '#fecaca', // red-200
        },
      },
    },
  },
  plugins: [],
}
