const { mdsvex } = require('mdsvex');
const { createHighlighter } = require(__dirname + '/shiki-highlighter');
async function createMdsvex() {
  return mdsvex({
    extension: '.svx',
    highlight: {
      highlighter: await createHighlighter({ showLineNumbers: (numberOfLines) => numberOfLines > 3 }),
    },
  });
}

function asyncMdsvex() {
  const mdsvexPromise = createMdsvex();
  return {
    markup: async (input) => {
      return await (await mdsvexPromise).markup(input);
    },
  };
}

module.exports = {
  asyncMdsvex,
};
