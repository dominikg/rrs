const { mdsvex } = require('mdsvex');
const { postcss } = require('svelte-preprocess');
const { createHighlighter } = require('./tools/mdsvex/shiki-highlighter');
// import smartAssetPreprocessor from "./tools/svelte-preprocessors/smart-asset";
const { isDevelopment } = require('./build-constants');

const rollup = {
  dev: isDevelopment,
  hydratable: false,
  // we'll extract any component CSS out into
  // a separate file — better for performance
  css: true,
  //extensions: ['.svelte', '.md'],
  preprocess: [postcss()],
};

const snowpack = async function () {
  const mdsvexPreprocessor = mdsvex({
    extension: '.svx',
    highlight: {
      highlighter: await createHighlighter({ showLineNumbers: (numberOfLines, lang) => numberOfLines > 3 || lang === 'ts' }),
    },
  });
  return {
    ...rollup,
    preprocess: rollup.preprocess.concat(mdsvexPreprocessor),
  };
};

module.exports = {
  rollup,
  snowpack,
};
