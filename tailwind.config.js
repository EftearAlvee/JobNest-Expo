/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#40189D',
        secondary: '#6366F1',
        accent: '#818CF8',
        neutral: '#64748B',
        'base-100': '#FFFFFF',
        'base-200': '#F9FAFB',
        'base-300': '#D1D5DB',
        'base-400': '#9CA3AF',
        'base-500': '#6B7280',
        'base-600': '#4B5563',
        'base-700': '#374151',
      
    },
  },
  plugins: [],
}
}