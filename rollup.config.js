import svelte from 'rollup-plugin-svelte';
import alias from '@rollup/plugin-alias';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import smartAsset from 'rollup-plugin-smart-asset';
import del from 'rollup-plugin-delete';
import html from './tools/rollup-plugins/create-html';
import serve from './tools/rollup-plugins/serve';
import path from 'path';
import smartAssetPreprocessor from './tools/svelte-preprocessors/smart-asset';
import routify from '@sveltech/routify/plugins/rollup';
import livereload from 'rollup-plugin-livereload';
import {mdsvex} from 'mdsvex';
import createHighlighter from  './tools/mdsvex/shiki-highlighter';

const { buildDir, isProduction,isDevelopment,buildMode, isWatch, isDebug, assetRoots, assetExtensions } = require('./build-constants');

export default (async () => ({

  input:['src/style/main.css','src/main.js','static/favicon.svg'], // required
  plugins: [
    del({targets: [buildDir],verbose: isDebug, runOnce: isWatch}),
    replace({
      'process.env.NODE_ENV': JSON.stringify( buildMode )
    }),
    alias({
      entries:assetRoots.map(root => ({
        find: root,
        replacement:  path.resolve(__dirname,root)
      }))
    }),
    alias({
      entries:[{find: 'src', replacement: path.resolve(__dirname,'src/')}]
    }),
    routify({watchDelay: 0}),
    svelte({

      // enable run-time checks when not in production
      dev: isDevelopment,
      hydratable: false,
      // we'll extract any component CSS out into
      // a separate file — better for performance
      emitCss: true,
      extensions: ['.svelte', '.md'],
      preprocess: [
        mdsvex({
          extension:'.md',
          highlight: {highlighter: await createHighlighter({showLineNumbers: (numberOfLines,lang)=> numberOfLines > 3 || lang==='ts'})}
        }),
        smartAssetPreprocessor({outputDir: buildDir})
      ]

    }),
    ...assetRoots.map(root => smartAsset({
      include: `${root}/**/*.(${assetExtensions.join('|')})`,
      url: 'copy',
      publicPath: isProduction ? '.' : root,
      assetsPath: isProduction ? '.' : root,
      useHash: isProduction,
      keepName: true,
      hashOptions: {
        hash: 'metrohash128',
        encoding: 'base52',
        maxLength: 8
      }
    })),
    postcss({
      extract: true,
      to: `${buildDir}/main.css`,
      sourceMap: !isProduction,
    }),
    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration —
    // consult the documentation for details:
    // https://github.com/rollup/rollup-plugin-commonjs
    resolve({
      browser: true,
      dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/')
    }),
    commonjs(),
    isProduction && (await import('rollup-plugin-terser')).terser(),
    html({templateData: {title: 'hooray'}}),
    isWatch && serve({dir:buildDir}),
    isWatch && livereload()
  ],

  treeshake: !!isProduction,
  preserveEntrySignatures: false,
  output: { // required (can be an array, for multiple outputs)
    // core output options
    dir: `${buildDir}`,

    format: 'es',
    sourcemap: !isProduction || 'hidden',
    entryFileNames: isProduction ? '[name]~[hash].js' : '[name].js',
    chunkFileNames: isProduction ? '[name]~[hash].js' : '[name].js',
    assetFileNames: isProduction ? '[name]~[hash].[ext]' : '[name].[ext]'
  },
}))();