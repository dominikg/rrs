# An attempt at building a svelte routify application with vite

## usage

```shell script
npm install #install dependencies
npm start #start dev server
npm run build # build

```

---

## !!! Warning, work in progress !!!

## Goal

All javascript, css and asset outputs should contain a hash in their filename to provide for easy far future caching

# Problems

## index.html

References js and css files, needs favicon and possibly other meta data (title etc)

> ##### Solution
>
> Use an ejs based template and a rollup plugin that fills in information at build time
>
> see `tools/rollup-plugins/create-html.js`

## .svelte `import` in script blocks

imports can reference an asset, eg `import src from 'path/foo.png'`
and we want `src` to be `output/foo~hash.png` in the build output

> ##### Solution
>
> Use rollup-plugin-smart-asset with a 'copy' configuration
>
> see `rollup.config.js`

## .svelte style blocks `url()`

stlye urls can reference an asset, eg `background-image: url('path/foo.png')`
and we want it to be `background-image: url('output/foo~hash.png)` in the build output

> ##### Solution
>
> - Use `emitCss: true` in rollup-plugin-svelte
> - use postcss with rollup-plugin-postcss
> - postcss.config.js uses postcss-smart-asset with a similar configuration as rollup-plugin-smart-asset
>
> see `rollup.config.js` and `postcss.config.js`

## .svelte template

templates can contain attributes which reference an asset, eg `<img src="path/foo.png"/>`
and we want it to be `<img src="output/foo~hash.png"/>` in the build output

> ##### Solution
>
> use a svelte markup preprocessor to process asset urls with postcss-smart-asset.
>
> see `tools/svelte-preprocessors/smart-asset.js`

TODO: this is a proof of concept and only handles src, href and xlink:href for now. more generic, possibly via options

## stable hashes

Assets can be referenced from different sources and are processed by different tools.
But if the same asset is referenced we need all of them to resolve the same

> ##### Solution
>
> - use smart-asset with similar configurations everywhere for resolving/copying
> - rollup-plugin-smart-asset doesn't offer multi option, so use multiple instances with one config each

Importing main.css in main.js produces same hash, eg `main~23ab778.js, main~23ab778.css` that changes when css or js changes

> ##### Solution
>
> use it as input in rollup config. (must come before main.js input in list!)
>
> that way css gets its own 'main.js' output which is actually empty and we ignore it in create-html plugin

## build-time constants required in different files

Due to the complex build, some constants are required in different files

> ##### Solution
>
> add a separate `build-constants.js` file and import where needed

TODO: add rollup plugin to be able to import these constants in js (see proxx consts: )

## keeping it fast

hashing costs time.

> ###### Solution
>
> - only do it in production builds
> - use metrohash128
>   TODO: can rollup be told to use metrohash128 and support `[contenthash]` instead of `[hash]`?

minifying costs time

> ###### Solution
>
> - only do it in production
>   ** only import terser plugin if production
>   ** only use cssnano in production
>   TODO: minify html

## favicon

favicon should be hashed aswell

> ##### Solution
>
> add it as input in rollup config and inject it in create-html

## other todos

- support output formats besides 'es'
- more features for index.ejs
- dev server and livereload
- hmr
- routify
- markdown support (mdsvex or simpler)
- prettier, linter, husky, testing, ci, you name it

## goodies

- Due do emitCss:true and rollup-plugin-postcss, css in svelte can be whatever is handled by your postcss config.
  see `postcss.config.js` and `tailwind.config.js`
- You can also import from node_modules, see usage of @mdi/svg in App.svelte for an example
