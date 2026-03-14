/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        night: '#050505',
        carbon: '#0f1012',
        steel: '#15171b',
        haze: '#a7a9ac',
        gold: '#f5c400',
        amber: '#ffdb4d',
      },
      fontFamily: {
        display: ['"Syncopate"', 'sans-serif'],
        body: ['"Barlow"', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(245,196,0,0.18), 0 18px 60px rgba(245,196,0,0.15)',
        panel: '0 18px 60px rgba(0, 0, 0, 0.4)',
      },
      backgroundImage: {
        'grid-fade':
          'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}
