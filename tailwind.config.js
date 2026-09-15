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
        cyber: {
          bg: '#050508',
          card: 'rgba(12, 14, 25, 0.75)',
          'card-hover': 'rgba(18, 22, 40, 0.85)',
          border: 'rgba(0, 242, 254, 0.15)',
          'border-bright': 'rgba(0, 242, 254, 0.45)',
          cyan: '#00f2fe',
          blue: '#4facfe',
          purple: '#b95ce6',
          pink: '#ff007f',
          green: '#00ff88',
          yellow: '#ffca28',
          text: '#e2e8f0',
          muted: '#8892b0',
          dim: '#4a5568',
        }
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'sans-serif'],
        heading: ['"Syne"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0, 242, 254, 0.35)',
        'glow-green': '0 0 20px rgba(0, 255, 136, 0.35)',
        'glow-purple': '0 0 20px rgba(185, 92, 230, 0.35)',
        'glow-pink': '0 0 20px rgba(255, 0, 127, 0.35)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        scanner: {
          '0%': { top: '0%' },
          '100%': { top: '100%' },
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        scanner: 'scanner 3s linear infinite',
      }
    },
  },
  plugins: [],
}
