const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        darknavy: '#05081D',
        green: '#41F7B5',
        blue: '#323A76',
        yellow: '#FFCA40',
        lilac: '#8D3DF2',       
      },
    },
  },
  plugins: [require('daisyui')],
};
