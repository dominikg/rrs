//const path = require('path');
const { createNodeMiddleware } = require('@sveltech/routify/lib/utils/middleware');

function rewriteImportPaths(middlewares) {
  const name = 'rootRelativeImports';
  const index = middlewares.findIndex((mw) => mw.name === 'generateFileTree');
  const middleware = createNodeMiddleware((nodePayload) => {
    const { file } = nodePayload;
    if (file.importPath) {
      // TODO disabled temporarily to see if webpack works better with relative path
      // file.importPath = path.relative(path.resolve(process.cwd()), file.absolutePath);
    }
  });

  middlewares.splice(index + 1, 0, { name, middleware });
}

function fixBuildRoutesImport(middlewares) {
  const name = 'buildRoutesImport';
  const index = middlewares.findIndex((mw) => mw.name === 'template');
  const middleware = (payload) => {
    payload.template = payload.template.replace('@sveltech/routify/runtime/buildRoutes', '@sveltech/routify/runtime');
  };

  middlewares.splice(index + 1, 0, { name, middleware });
}

module.exports = function (middlewares) {
  rewriteImportPaths(middlewares);
  fixBuildRoutesImport(middlewares);
  return middlewares;
};
