const path = require('path');
const rootDir = path.resolve(__dirname);
const buildDir = path.resolve(rootDir, 'build');
const assetRoots = ['static', 'node_modules'];
const assetExtensions = ['png', 'jpg', 'jpeg', 'gif', 'ico', 'svg', 'woff2'];
const buildMode = process.env.NODE_ENV || 'development';
const isProduction = buildMode === 'production';
const isDevelopment = !isProduction;
const isWatch = !!process.env.ROLLUP_WATCH;
const isDebug = !!process.env.DEBUG;

module.exports = {
  buildMode,
  rootDir,
  buildDir,
  assetRoots,
  assetExtensions,
  isProduction,
  isDevelopment,
  isWatch,
  isDebug,
};
