/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2C3E50',
        secondary: '#E74C3C',
        accent: '#F39C12',
        surface: '#ECF0F1',
        background: '#FDFBF7',
        success: '#27AE60',
        warning: '#F39C12',
        error: '#E74C3C',
        info: '#3498DB'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        display: ['Playfair Display', 'serif'],
        heading: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      animation: {
        'heart-pulse': 'heartPulse 0.3s ease-out',
        'flutter': 'flutter 0.5s ease-out',
      },
      keyframes: {
        heartPulse: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' }
        },
        flutter: {
          '0%': { transform: 'rotateY(0deg)' },
          '50%': { transform: 'rotateY(180deg)' },
          '100%': { transform: 'rotateY(0deg)' }
        }
      }
    },
  },
  plugins: [],
}