/* eslint-disable global-require */
const defaultTheme = require('tailwindcss/defaultTheme');
const {isProduction} = require('./build-constants');

const colorVariables = ['primary','secondary','regular'];
produceColorVariables = function(prefix) {
  return colorVariables.reduce((map, name) => {
    map[name]=`var(--${prefix ? `${prefix}-`:''}color-${name}${prefix ?`,var(--color-${name})` :''})`;
    return map;
  },{});
}
const colors = produceColorVariables();
const backgroundColor = produceColorVariables('background');
const borderColor = produceColorVariables('border');
const textColor= produceColorVariables('text');
module.exports = {
  purge: isProduction && ['./src/**/*.svelte','./src/**/*.html','./src/**/*.ejs'],
  theme: {
    colors: colors,
    backgroundColor,
    borderColor,
    textColor,
    extend: {
      fontFamily: {
        sans: [
          "'Cooper Hewitt'",
          ...defaultTheme.fontFamily.sans,
        ]
      }
    },
  },
  variants: {},
  plugins: [],
}
