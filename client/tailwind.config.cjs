/** @type {import('tailwindcss').Config} */
const daisyui = require('daisyui/src/theming/themes')

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      primary: '#C16240',
      secondary: '#536E83',
      body: '#F7ECE7',
      card: '#EFD8D0',
      danger: '#EC534B',
      success: '#07B682',
      white: '#fff',
      default: '#374957',
      border: '#A4B7C6',
      orange: '#F1A025',
      warning: '#F9F4D5',
    },
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          ...daisyui['[data-theme=light]'],
          primary: '#C16240',
          secondary: '#536E83',
          success: '#07B682',
          warning: '#F9F4D5',
        },
      },
    ],
  },
}
