const { mdsvex } = require('mdsvex');
const { postcss } = require('svelte-preprocess');
const { createHighlighter } = require('./tools/mdsvex/shiki-highlighter');
// import smartAssetPreprocessor from "./tools/svelte-preprocessors/smart-asset";

module.exports = async function svelteConfig() {
  return {
    dev: false, // TODO error happens when dev=true, investigate
    hydratable: false,
    // we'll extract any component CSS out into
    // a separate file — better for performance
    css: true,
    //extensions: ['.svelte', '.md'],
    preprocess: [
      mdsvex({
        extension: '.svx',
        highlight: {
          highlighter: await createHighlighter({ showLineNumbers: (numberOfLines, lang) => numberOfLines > 3 || lang === 'ts' }),
        },
      }),
      postcss(),
      // smartAssetPreprocessor({ outputDir: buildDir }),
    ],
  };
};
