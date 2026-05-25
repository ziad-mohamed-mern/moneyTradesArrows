/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#f4f7f5',
          100: '#e5ede8',
          200: '#cbd9cf',
          300: '#a3b9a8',
          400: '#6d9179',
          500: '#43674d',
          600: '#385640',
          700: '#2e4635',
          800: '#25372b',
          900: '#1d2c22',
          950: '#121a16',
        },
        gold: {
          50:  '#faf8ef',
          100: '#f5f0d9',
          200: '#ebe3b3',
          300: '#e6d170',
          400: '#d4bc4a',
          500: '#b8a032',
          600: '#9a8530',
        },
        navy: {
          700: '#1e3a5f',
          800: '#152a47',
          900: '#0f1f35',
        },
      },
      fontFamily: {
        sans:    ['Cairo', 'Inter', 'system-ui', 'sans-serif'],
        serif:   ['Playfair Display', 'Georgia', 'serif'],
        arabic:  ['Cairo', 'sans-serif'],
        latin:   ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'glow-green': '0 0 24px rgba(67, 103, 77, 0.35)',
        'glow-gold':  '0 0 24px rgba(230, 209, 112, 0.35)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
}
