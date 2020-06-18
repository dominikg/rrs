const sveltePlugin = require('./tools/vite/vite-plugin-svelte-hot');

module.exports = {
  plugins: [sveltePlugin()],
};
