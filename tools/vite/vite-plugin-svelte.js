const { compile, preprocess } = require('svelte/compiler');

let { Readable } = require('stream');

const path = require('path');
const svelteConfig = require(path.join(process.cwd(), 'svelte.config.js'));

function readBody(stream) {
  if (stream instanceof Readable) {
    return new Promise((resolve, reject) => {
      let res = '';

      stream
        .on('data', (chunk) => (res += chunk))
        .on('error', reject)
        .on('end', () => resolve(res));
    });
  } else {
    return !stream || typeof stream === 'string' ? stream : stream.toString();
  }
}

async function buildSvelteConfig(pluginOptions) {
  let compilerOptions;
  let preprocessors;

  const { preprocess, ..._svelteOptions } = await svelteConfig();
  preprocessors = preprocess;
  compilerOptions = _svelteOptions;

  compilerOptions = {
    ...compilerOptions,
    ...pluginOptions,
  };

  return {
    compilerOptions,
    preprocessors,
  };
}

module.exports = function sveltePlugin(opts = {}) {
  const buildConfigPromise = buildSvelteConfig(opts);
  return {
    configureServer: [
      async ({ app }) => {
        app.use(async (ctx, next) => {
          await next();
          const { preprocessors, compilerOptions } = await buildConfigPromise;
          const filePath = ctx.path;
          const { extensions, ...compileOptions } = compilerOptions;
          if (ctx.body && extensions.find((ext) => filePath.endsWith(ext))) {
            let codeToCompile = await readBody(ctx.body);

            if (preprocessors) {
              try {
                codeToCompile = (
                  await preprocess(codeToCompile, preprocessors, {
                    filename: filePath,
                  })
                ).code;
              } catch (e) {
                console.error(`failed to preprocess ${filePath}`, e);
                throw e;
              }
            }
            // COMPILE
            let result;
            try {
              const { js, css } = compile(codeToCompile, {
                ...compileOptions,
                filename: filePath,
              });
              result = { result: js && js.code };
              if (!compilerOptions.css) {
                result.resources = { css: css && css.code };
              }
            } catch (e) {
              console.error(`failed to compile ${filePath}`, e);
              throw e;
            }

            ctx.type = 'js';
            ctx.body = result.result;
          }
        });
      },
    ],
  };
};
