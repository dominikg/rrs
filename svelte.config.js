const { postcss } = require('svelte-preprocess');
const { asyncMdsvex } = require('./tools/mdsvex/async-mdsvex');
const { isDevelopment } = require('./build-constants');

module.exports = {
  dev: isDevelopment,
  hydratable: false,
  css: true, // TODO extract css
  extensions: ['.svelte', '.svx'],
  preprocess: [postcss(), asyncMdsvex()],
};
