module.exports = {
  darkMode: 'class',
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // fontFamily: {
      //   cool: ["PlusJakartaSans", "sans-serif"],
      // },
      transitionProperty: {
        'max-height': 'max-height',
      },
      colors: {
        custom: {
          dark: '#1c1c1c',
        },
      },
    },
  },
  variants: {
    scrollbar: ['dark', 'rounded'],
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar'),
    require('tailwindcss-radix')(),
    require('@tailwindcss/line-clamp'),
  ],
};
