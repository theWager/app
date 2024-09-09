const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app,sections,util}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        darknavy: '#05081D',
        wagerGreen: '#41F7B5',
        wagerBlue: '#323A76',
        wagerYellow: '#FFCA40',
        wagerLilac: '#8D3DF2',       
      },
    },
  },
  plugins: [require('daisyui')],
};
