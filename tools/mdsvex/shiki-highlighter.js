import {getHighlighter} from 'shiki';
import {getTheme} from 'shiki-themes';

const replaceChars = {
  '<': '&lt;',
  '>': '&gt;',
  '{': '&#123;',
  '}': '&#125;',
};

const replaceRegex = new RegExp(`[${Object.keys(replaceChars).join('')}]`,'g');

const containsNonWhitespace = /\S/;

function escape(str) {
  if(str && str.length !== 0) {
    return containsNonWhitespace.test(str) ? str.replace(replaceRegex, c => (replaceChars[c])) : `&nbsp;${str.substr(1)}`
  }
  return str;
}
export function render(lines, options = {}) {
  const bg = options.bg || '#222'
  const fg = options.fg || '#ede'
  let html = ''

  html += `<pre class="code-highlight" style="color: ${fg}; background-color: ${bg}">`
  if (options.lang) {
    html += `<div class="lang">${options.lang}</div>`
  }
  html += `<code>`
  html+= lines.map(renderLine).join('\n');
  html += `</code></pre>`

  return html
}

function renderLine(line) {
  return line.map(token => `<span style="color: ${token.color}">${escape(token.content)}</span>`).join('')
}

function isPlaintext(lang) {
  return !lang || ['plaintext', 'txt', 'text'].indexOf(lang) !== -1
}

const defaultOpts = {
  theme: 'nord'
};

export default async function createHighlighter(opts) {
  const options = {...defaultOpts,...opts};
  if(!options.theme.name) {
    options.theme = getTheme(options.theme)
  }
  const fg = options.theme.colors.foreground;
  const bg = options.theme.bg;

  return getHighlighter(options).then(
    highlighter => (code,lang) =>
         render(isPlaintext(lang) ? [[{content: code}]] : highlighter.codeToThemedTokens(code,lang),{fg,bg,lang})
  )
}

