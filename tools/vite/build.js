const { build } = require('vite');

const path = require('path');
const svelteConfig = require(path.join(process.cwd(), 'svelte.config.js'));
(async () => {
  // All options are optional.
  // check out `src/node/build.ts` for full options interface.
  const svelteOptions = await svelteConfig();
  svelteOptions.css = false;
  svelteOptions.emitCss = true;
  await build({
    rollupInputOptions: {
      plugins: [require('rollup-plugin-svelte')(svelteOptions)],
    },
    rollupDedupe: ['svelte', 'svelte/internal'],
  });
})();
