module.exports = {
  scripts: {
    'mount:public': 'mount public --to /',
    'mount:static': 'mount static --to /',
    'mount:src': 'mount src --to /_dist_/src',
    'mount:routify': 'mount .routify --to /_dist_/.routify',
    'run:routify': 'routify run',
    'run:routify::watch': '$1 -b false',
    'build:css': 'postcss',
  },
  plugins: ['@snowpack/plugin-dotenv', './tools/snowpack-plugins/snowpack-plugin-svelte', '@snowpack/plugin-webpack'],
  installOptions: {
    rollup: {
      plugins: [require('rollup-plugin-svelte')(require('./svelte.config').rollup)],
      treeshake: true,
      dedupe: ['svelte', 'svelte/internal'],
    },
  },
};
