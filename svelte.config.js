const { mdsvex } = require('mdsvex');
const { postcss } = require('svelte-preprocess');
// const { createHighlighter } = require('./tools/mdsvex/shiki-highlighter');
const { isDevelopment } = require('./build-constants');

module.exports = {
  dev: isDevelopment,
  hydratable: false,
  css: true, // TODO extract css
  extensions: ['.svelte', '.svx'],
  preprocess: [
    postcss(),
    mdsvex({
      extension: '.svx',
      //highlight: {
      //  highlighter: await createHighlighter({ showLineNumbers: (numberOfLines) => numberOfLines > 3 }),
      //},
    }),
  ],
};
