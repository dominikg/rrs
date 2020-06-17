module.exports = {
  routifyDir: '.routify',
  dynamicImports: true,
  extensions: ['svelte', 'svx'],
  plugins: {
    './tools/routify-plugins/blog-meta': {},
  },
};
