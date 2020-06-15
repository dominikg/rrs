const sveltePlugin = require('./tools/vite/vite-plugin-svelte');

module.exports = {
  alias: {
    svelte: 'svelte/internal',
  },
  plugins: [sveltePlugin()],
  rollupDedupe: ['svelte', 'svelte/internal'],
};
