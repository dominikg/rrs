const svite = require('svite');
module.exports = {
  plugins: [svite()],
  optimizeDeps: {
    include: ['@sveltech/routify/runtime', '@sveltech/routify/runtime/plugins/tree', '@sveltech/routify/runtime/plugins/assignAPI'],
  },
};
