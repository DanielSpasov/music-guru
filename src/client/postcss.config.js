const tailwindcssNested = require('tailwindcss/nesting');
const postcssNested = require('postcss-nested');

module.exports = {
  plugins: [
    require('postcss-import'),
    tailwindcssNested(postcssNested),
    require('tailwindcss'),
    require('autoprefixer')
  ]
};
