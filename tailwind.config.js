/* eslint-disable global-require */
const {isProduction} = require('./build-constants');
module.exports = {
  purge: isProduction && ['./src/**/*.svelte','./src/**/*.html'],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
}
