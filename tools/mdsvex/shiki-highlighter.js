import {getHighlighter} from 'shiki';
import {getTheme} from 'shiki-themes';

const escapeChars = {
  '<': '&lt;',
  '>': '&gt;',
  '{': '&#123;',
  '}': '&#125;',
};

const escapeRE = new RegExp(`[${Object.keys(escapeChars).join('')}]`,'g');

function escape(str) {
  if(str && str.length !== 0) {
    return str.replace(escapeRE, c => (escapeChars[c]));
  }
  return str;
}

function render(lines, options = {}) {
  const bg = options.bg || '#222222'
  const fg = options.fg || '#EEDDEE'
  const lang = options.lang ? `<span class="code-language">${options.lang}</span>` : ''
  return `<pre class="code-highlight" style="color: ${fg}; background-color: ${bg}">${lang}<code>${lines.map(renderLine(options)).join('\n')}\n</code></pre>`;
}

const renderLine = options => (line) => {
  return line.map(renderToken(options)).join('');
}

const renderToken = options => (token) => {
  if(token.color === options.fg) {
    return token.content;
  }
  const {leadingWS,content,trailingWS} = splitLeadingAndTrailingWS(token.content);
  if(!content) {
    return leadingWS;
  }
  return `${leadingWS}<span style="color: ${token.color}">${escape(content)}</span>${trailingWS}`
}

function splitLeadingAndTrailingWS(content) {
  const len = content.length;
  let start = 0;
  let end = len;

  while(start < end && isWS(content.charAt(start))) {
    start++;
  }

  if(start === end) {
    return {
      leadingWS: content
    }
  }

  while (end > start && isWS(content.charAt(end-1))) {
    end--;
  }

  return {
    leadingWS: content.slice(0,start),
    content: content.slice(start,end),
    trailingWS: end < content.length ? content.slice(end) : ''
  }
}

function isWS(char) {
  return char === ' ' || char === '\t'
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
  const fg = options.theme.colors.foreground.toUpperCase();
  const bg = options.theme.bg.toUpperCase();

  return getHighlighter(options).then(
    highlighter => (code,lang) =>
         render(isPlaintext(lang) ? [[{content: code}]] : highlighter.codeToThemedTokens(code,lang),{fg,bg,lang})
  )
}

