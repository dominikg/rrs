/* eslint-disable global-require */
const defaultTheme = require('tailwindcss/defaultTheme');
const { isProduction } = require('./build-constants');

const colorVariables = ['primary', 'secondary', 'regular'];

function produceColorVariables(prefix) {
  return colorVariables.reduce((map, name) => {
    map[name] = `var(--${prefix ? `${prefix}-` : ''}color-${name}${prefix ? `,var(--color-${name})` : ''})`;
    const onName = `on-${name}`;
    map[onName] = `var(--${prefix ? `${prefix}-` : ''}color-${onName}${prefix ? `,var(--color-${onName})` : ''})`;
    return map;
  }, {});
}

const colors = produceColorVariables();
const backgroundColor = produceColorVariables('background');
const borderColor = produceColorVariables('border');
const textColor = produceColorVariables('text');
module.exports = {
  purge: isProduction && ['./src/**/*.svelte', './src/**/*.html', './src/**/*.ejs', './src/**/*.css'],
  theme: {
    colors: colors,
    backgroundColor,
    borderColor,
    textColor,
    extend: {
      fontFamily: {
        sans: ["'Cooper Hewitt'", ...defaultTheme.fontFamily.sans],
        mono: ["'Fira Code'", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {},
  plugins: [],
};
