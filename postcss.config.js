const { isProduction } = require('./build-constants');

module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss')('./tailwind.config.js'),
    require('postcss-preset-env')({ stage: 1 }),
    isProduction && require('postcss-csso')({ comments: false }),
  ],
};
