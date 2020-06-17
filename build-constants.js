const buildMode = process.env.NODE_ENV || 'development';
const isProduction = buildMode === 'production';
const isDevelopment = !isProduction;
const isDebug = !!process.env.DEBUG;

module.exports = {
  buildMode,
  isProduction,
  isDevelopment,
  isDebug,
};
