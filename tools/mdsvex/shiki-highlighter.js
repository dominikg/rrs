const shiki = require('shiki');

const defaultOpts = {
  theme: 'nord'
};
export default async function createHighlighter(opts) {
  const options = {...defaultOpts,...opts};

  return shiki.getHighlighter(options).then( highlighter => {

    return (code,lang) => {

    const result = highlighter.codeToHtml(code,lang);
    return result;
  }
  })
}