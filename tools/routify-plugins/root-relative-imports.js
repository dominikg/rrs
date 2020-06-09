const path = require('path');
const { createNodeMiddleware } = require('@sveltech/routify/lib/utils/middleware');

module.exports = function (middlewares) {
  const name = 'rootRelativeImports';
  const index = middlewares.findIndex((mw) => mw.name === 'generateFileTree');
  const middleware = createNodeMiddleware((nodePayload) => {
    const { file } = nodePayload;
    if (file.importPath) {
      file.importPath = path.relative(path.resolve(process.cwd()), file.absolutePath);
    }
  });

  middlewares.splice(index + 1, 0, { name, middleware });

  return middlewares;
};
