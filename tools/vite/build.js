const { build } = require('vite');

const path = require('path');
const svelteConfig = require(path.join(process.cwd(), 'svelte.config.js'));
(async () => {
  // All options are optional.
  // check out `src/node/build.ts` for full options interface.
  await build({
    rollupInputOptions: {
      plugins: [require('rollup-plugin-svelte')(await svelteConfig())],
    },
    rollupDedupe: ['svelte', 'svelte/internal'],
  });
})();
