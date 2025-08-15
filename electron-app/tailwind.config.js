/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Military-grade dark theme
        'military-black': '#0a0a0b',
        'military-dark-900': '#111111',
        'military-dark-800': '#1a1a1b',
        'military-dark-700': '#2a2a2b',
        'military-dark-600': '#3a3a3b',
        'military-dark-500': '#4a4a4b',
        'military-gray-500': '#6b7280',
        'military-gray-400': '#9ca3af',
        'military-gray-300': '#d1d5db',
        
        // Tactical colors
        'tactical-green-500': '#10b981',
        'tactical-green-400': '#34d399',
        'tactical-amber-500': '#f59e0b',
        'tactical-amber-400': '#fbbf24',
        'tactical-red-500': '#ef4444',
        'tactical-red-400': '#f87171',
        'tactical-blue-500': '#3b82f6',
        'tactical-blue-400': '#60a5fa',
        
        // Status indicators
        'status-online': '#10b981',
        'status-warning': '#f59e0b',
        'status-offline': '#ef4444',
        'status-unknown': '#6b7280',
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Consolas', 'Monaco', 'Courier New', 'monospace'],
        'tactical': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      }
    },
  },
  plugins: [],
}
