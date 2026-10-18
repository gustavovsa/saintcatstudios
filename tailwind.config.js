/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#080808',
          900: '#0e0e0e',
          800: '#151515',
          700: '#1e1e1e',
          600: '#272727',
          500: '#333333',
        },
        gold: {
          DEFAULT: '#F2BE42',
          light: '#F9D97A',
          dark: '#C49A1A',
        },
        ice: {
          DEFAULT: '#A2C4E0',
          light: '#C8DDED',
          dark: '#5A8FB8',
        },
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { opacity: '0.12' },
          '50%': { opacity: '0.28' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
