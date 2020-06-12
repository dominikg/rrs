module.exports = {
  singleBuild: true,
  routifyDir: '.routify',
  dynamicImports: true,
  extensions: ['svelte', 'svx'],
  plugins: {
    './tools/routify-plugins/root-relative-imports': {},
    './tools/routify-plugins/blog-meta': {},
  },
};
