module.exports = {
  scripts: {
    'mount:public': 'mount public --to /',
    'mount:static': 'mount static --to /',
    'mount:src': 'mount src --to /_dist_',
    'mount:routify': 'mount .routify',
    'run:routify': 'routify run --routify-dir .routify -D -b',
    'run:routify::watch': '$1 -b false',
    'build:css': 'postcss',
  },
  plugins: ['@snowpack/plugin-dotenv', './tools/snowpack-plugins/snowpack-plugin-svelte'],
  installOptions: {
    rollup: {
      plugins: [require('rollup-plugin-svelte')(require('./svelte.config').rollup)],
      treeshake: true,
      dedupe: ['svelte', 'svelte/internal'],
    },
  },
};
