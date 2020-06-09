module.exports = {
  routifyDir: '.routify',
  dynamicImports: true,
  extensions: ['svelte', 'svx', 'md'],
  plugins: {
    './tools/routify-plugins/root-relative-imports': {},
    './tools/routify-plugins/blog-meta': {},
  },
};
