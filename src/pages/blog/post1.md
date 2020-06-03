---
author: Dominik G
title: Welcome to the blog
published: 2020-06-27
---

# {title}

Hi, you are reading a post created with mdsvex, featuring a custom highlighter using shiki and some css for beautiful code rendering

## How to install

```js
import createHighlighter from './tools/mdsvex/shiki-highlighter';
mdsvex({
  extension: '.md',
  highlight: {
    highlighter: await createHighlighter({ showLineNumbers: (numberOfLines, lang) => numberOfLines > 3 || ['css', 'perl'].includes(lang) }),
  },
});
```

## Features

### line numbering and wrapping

Check out the following code block and see if you can spot what's going on.
Resize your browser to give it a test

```js
const str = `i'm short`;
const str2 = 'me too';
const str3 = "i'm" + 'just' + `${here()}` + ((to) => show.off({ some: 'syntax', to })(str));
const lorem =
  'Consectetur eum unde fugit autem delectus aut ipsum. Error numquam ducimus impedit ut Consectetur eum unde fugit autem delectus aut ipsum. Error numquam ducimus impedit ut';
function loremFn() {
  return 'Consectetur eum unde fugit autem delectus aut ipsum. Error numquam ducimus impedit ut Consectetur eum unde fugit autem delectus aut ipsum. Error numquam ducimus impedit ut';
}
```

You can disable line numbering if you want or use conditions based on code language and number of lines

this simple shell script has one line and won't get numbered

```shell script
npm run dev
```

## and now for something more interesting

The code that makes it work.

```js
import { getHighlighter } from 'shiki';
import { getTheme, loadTheme } from 'shiki-themes';

const escapeChars = {
  '<': '&lt;',
  '>': '&gt;',
  '{': '&#123;',
  '}': '&#125;',
};

const escapeRE = new RegExp(`[${Object.keys(escapeChars).join('')}]`, 'g');

function escape(str) {
  if (str && str.length !== 0) {
    return str.replace(escapeRE, (c) => escapeChars[c]);
  }
  return str;
}

function render(lines, options = {}) {
  const { fg, bg } = options;
  const lineNumbers = options.showLineNumbers(lines.length, options.lang);
  const lang = options.lang ? `<span class="code-language">${options.lang}</span>` : '';
  return `<pre class="code-highlight" style="color: ${fg}; background-color: ${bg}">${lang}<code class="${
    lineNumbers ? 'numbered' : 'simple'
  }">${lines.map(lineRenderer(options)).join('\n')}\n</code></pre>`;
}

const lineRenderer = (options) => (line) => {
  const output = line.map(tokenRenderer(options)).join('');
  const { leadingWS, content, trailingWS } = splitLeadingAndTrailingWS(output);
  return `${leadingWS || ''}<span class="line-of-code">${content || ''}</span>${trailingWS || ''}`;
};

const tokenRenderer = (options) => (token) => {
  if (!token.color || token.color.toUpperCase() === options.fg) {
    return escape(token.content);
  }
  const { leadingWS, content, trailingWS } = splitLeadingAndTrailingWS(token.content);
  if (!content) {
    return leadingWS;
  }

  return `${leadingWS}<span style="color: ${token.color}">${escape(content)}</span>${trailingWS}`;
};

function splitLeadingAndTrailingWS(content) {
  const len = content.length;
  let start = 0;
  let end = len;

  while (start < end && isWS(content.charAt(start))) {
    start++;
  }

  if (start === end) {
    return {
      leadingWS: content || '',
    };
  }

  while (end > start && isWS(content.charAt(end - 1))) {
    end--;
  }

  return {
    leadingWS: content.slice(0, start),
    content: content.slice(start, end),
    trailingWS: end < content.length ? content.slice(end) : '',
  };
}

function isWS(char) {
  return char === ' ' || char === '\t';
}

function isPlaintext(lang) {
  return !lang || ['plaintext', 'txt', 'text'].indexOf(lang) !== -1;
}

const defaultOpts = {
  theme: 'nord',
  fg: undefined,
  bg: undefined,
  showLineNumbers: (numberOfLines, lang) => numberOfLines > 5,
};

export default async function createHighlighter(opts) {
  const options = { ...defaultOpts, ...opts };

  if (options.theme.endsWith('.json')) {
    options.theme = loadTheme(options.theme);
  } else {
    options.theme = getTheme(options.theme);
  }
  const baseSettings = ((options.theme['tokenColors'] || []).find((x) => !x.scope) || { settings: {} }).settings;
  const colors = options.theme.colors || {};
  const getThemeColor = (name) => baseSettings[name] || colors[`editor.${name}`] || colors[name];
  const fg = (options.fg || getThemeColor('foreground') || '#eeeeee').toUpperCase();
  const bg = (options.bg || getThemeColor('background') || '#222222').toUpperCase();
  return getHighlighter(options).then((highlighter) => (code, lang) =>
    render(isPlaintext(lang) ? [[{ content: code }]] : highlighter.codeToThemedTokens(code, lang), { ...options, fg, bg, lang }),
  );
}
```

### This is how it is rendered in the browser

```html
<pre class="code-highlight" style="color: rgb(216, 222, 233); background-color: rgb(46, 52, 64);">
  <span class="code-language">js</span>
  <code class="numbered">
    <span class="line-of-code">
      <span style="color: rgb(129, 161, 193);">import</span> <span style="color: rgb(143, 188, 187);">createHighlighter</span> <span style="color: rgb(129, 161, 193);">from</span>  <span style="color: rgb(236, 239, 244);">"</span><span style="color: rgb(163, 190, 140);">./tools/mdsvex/shiki-highlighter</span><span style="color: rgb(236, 239, 244);">"</span><span style="color: rgb(129, 161, 193);">;</span>
    </span>
    <span class="line-of-code">
      <span style="color: rgb(136, 192, 208);">mdsvex</span>(<span style="color: rgb(236, 239, 244);">{</span></span>
    <span class="line-of-code">
      <span style="color: rgb(136, 192, 208);">extension</span><span style="color: rgb(236, 239, 244);">:</span><span style="color: rgb(236, 239, 244);">'</span><span style="color: rgb(163, 190, 140);">.md</span><span style="color: rgb(236, 239, 244);">'</span><span style="color: rgb(236, 239, 244);">,</span></span>
    <span class="line-of-code">
      <span style="color: rgb(136, 192, 208);">highlight</span><span style="color: rgb(236, 239, 244);">:</span> <span style="color: rgb(236, 239, 244);">{</span><span style="color: rgb(136, 192, 208);">highlighter</span><span style="color: rgb(236, 239, 244);">:</span>  <span style="color: rgb(129, 161, 193);">await</span> <span style="color: rgb(136, 192, 208);">createHighlighter</span>(<span style="color: rgb(236, 239, 244);">{</span><span style="color: rgb(136, 192, 208);">showLineNumbers</span><span style="color: rgb(236, 239, 244);">:</span> <span style="color: rgb(236, 239, 244);">(</span><span style="color: rgb(216, 222, 233);">numberOfLines</span><span style="color: rgb(236, 239, 244);">,</span><span style="color: rgb(216, 222, 233);">lang</span><span style="color: rgb(236, 239, 244);">)</span><span style="color: rgb(129, 161, 193);">=&gt;</span> <span style="color: rgb(216, 222, 233);">numberOfLines</span> <span style="color: rgb(129, 161, 193);">&gt;</span> <span style="color: rgb(180, 142, 173);">3</span> <span style="color: rgb(129, 161, 193);">||</span> [<span style="color: rgb(236, 239, 244);">'</span><span style="color: rgb(163, 190, 140);">css</span><span style="color: rgb(236, 239, 244);">'</span><span style="color: rgb(236, 239, 244);">,</span><span style="color: rgb(236, 239, 244);">'</span><span style="color: rgb(163, 190, 140);">perl</span><span style="color: rgb(236, 239, 244);">'</span>]<span style="color: rgb(236, 239, 244);">.</span><span style="color: rgb(136, 192, 208);">includes</span>(<span style="color: rgb(216, 222, 233);">lang</span>)<span style="color: rgb(236, 239, 244);">}</span>)<span style="color: rgb(236, 239, 244);">}</span></span>
    <span class="line-of-code">
      <span style="color: rgb(236, 239, 244);">}</span>)<span style="color: rgb(129, 161, 193);">;</span>
    </span>
  </code>
</pre>
```

### the css to make it look nice

- wrapping thanks to `white-space: pre-wrap;`
- consistent indentation and numbering thanks to wrapping each line in a `<span class="line-of-code"></span>`, css counters and `display: inline-block`
- numbers are positioned absolutely on the left edge and do not affect copy/paste

```css
.code-highlight {
  position: relative;
  @apply font-mono text-sm shadow-md rounded;
  overflow: auto;
  max-height: 80vh;
  margin: 1rem;
}
.code-highlight > .code-language {
  position: absolute;
  top: 0;
  right: 0;
  @apply bg-primary text-on-primary px-2;
  border-top-right-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
}
.code-highlight > code {
  display: inline-block;
  padding: 1rem;
}

.code-highlight > code.numbered {
  margin-left: 2rem;
  padding-left: 0.5rem;
  border-left: 1px solid rgba(127, 127, 127, 0.5);
  counter-reset: line;
}

.code-highlight > code > .line-of-code {
  white-space: pre-wrap;
  display: inline-block;
  min-height: 1em;
}

.code-highlight > code.numbered > .line-of-code:before {
  counter-increment: line;
  content: counter(line);
  position: absolute;
  left: 0;
  opacity: 0.5;
  text-align: right;
  padding-right: 0.25rem;
  width: 2rem;
  pointer-events: none;
  user-select: none;
}
```
