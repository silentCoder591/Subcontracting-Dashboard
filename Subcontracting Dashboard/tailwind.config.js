/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // SAP FIORI Primary Colors
        'fiori': {
          primary: '#0070f3',
          'primary-hover': '#0057d2',
          'primary-light': '#e6f0ff',
          secondary: '#f5f6f7',
          'secondary-hover': '#e8eaed',
        },
        // SAP FIORI Semantic Colors
        'fiori-success': '#107c10',
        'fiori-warning': '#d69e00',
        'fiori-error': '#d13438',
        'fiori-info': '#0070f3',
        // Legacy SAP Colors (keeping for backward compatibility)
        'sap-blue': '#0070f3',
        'sap-green': '#107c10',
        'sap-orange': '#d69e00',
        'sap-red': '#d13438',
      },
      fontFamily: {
        'sans': ['Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
      },
      boxShadow: {
        'fiori': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'fiori-hover': '0 4px 16px rgba(0, 0, 0, 0.12)',
      },
      borderRadius: {
        'fiori': '0.5rem',
      },
    },
  },
  plugins: [],
} 