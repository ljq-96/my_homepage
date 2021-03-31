import hljs from 'highlight.js'
import md from 'markdown-it'

export default md({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code data-code=${lang}>${
          hljs.highlight(str, { language: lang, ignoreIllegals: true }).value
        }</code></pre>`
      } catch (__) {}
    }

    return '<pre class="hljs"><code>' + str + '</code></pre>'
  }
})
  .use(require('markdown-it-mark'))
  .use(require('markdown-it-ins'))
  .use(require('markdown-it-sup'))
  .use(require('markdown-it-sub'))
  .use(require('markdown-it-task-lists'), { enabled: true, label: true })
