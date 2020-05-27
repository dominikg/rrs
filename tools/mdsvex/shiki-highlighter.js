const shiki = require('shiki');

const defaultOpts = {
  theme: 'nord'
};

export default async function createHighlighter(opts) {
  const options = {...defaultOpts,...opts};

  return shiki.getHighlighter(options).then( highlighter => {

    return (code,lang) => {

    let result = highlighter.codeToHtml(code,lang);

    // replace curlies so downstream svelte compiler doesn't get upset
    result = result.replace(/[{}]/g, c => ({ '{': '&#123;', '}': '&#125;' }[c]));

    // replace first whitepsace in a whitespace only span with &nbsp; to avoid whitespace not being inserted in output
    // TODO investigate why whitespace is removed(not added) downstream. possible hint: (&#32; instead of &nbsp; does not work!)
    result = result.replace(/(\<span[^\>]*\>)\s(\s)*(\<\/span\>)/g,'$1&nbsp;$2$3');
    return result;
  }
  })
}