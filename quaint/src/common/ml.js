import hljs from 'highlight.js'

export default function(md) {
  const codeReg = /^\`{3}(.*?)[\r,\n,\r\n]([\w\W]*?)[\r,\n,\r\n]\`{3}$/
  const temp = codeReg.exec(md)
  if (!temp) {
    return markdownHighlight(md)
  } else {
    return md.replace(temp[2], hljs.highlightAuto(temp[2]).value)
    // return md
  }
}


function markdownHighlight(md) {
  return (
    md
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      // 任务列表
      .replace(/^-{1}\s\[[xX\s]]\s/gm, words => {
        return `<span class="hlmd-key">${words}</span>`
      })
      .replace(/\{.+(\}\s*?)$/gm, words => {
        return `<span class="hlmd-key">${words}</span>`
      })
      // 标题
      .replace(/^#{1,6}\s(.+)/gm, words => `<span class="hlmd-headline">${words}</span>`)
      // 有/无序列表
      .replace(/^-{1}\s|^\d\.\s/gm, words => `<span class="hlmd-key">${words}</span>`)
      // 引用
      .replace(/^(&gt;)+\s.+/gm, words => {
        const content = words.match(/&gt;+\s(.+)/)[1]
        return words
          .replace(/&gt;/g, `<span class="hlmd-key">&gt;</span>`)
          .replace(content, `<span class="hlmd-quote">${content}</span>`)
      })
      // 下标
      .replace(/[^~]~([^~]+)~[^~]/g, words => {
        return words.replace(/\~/g, `<span class="hlmd-key">~</span>`)
      })
      // 下划线
      .replace(/\+{2}(.+)\+{2}/g, words => {
        return words.replace(/[^\+]/g, w => `<u>${w}</u>`).replace(/\+{2}/g, `<span class="hlmd-key">++</span>`)
      })
      // 行内代码
      .replace(/`([^\n`]+)`/g, words => {
        const content = words.match(/`(.+)`/)[1]
        return `<span class="hlmd-code">${words.replace(/`/g, `<span class="hlmd-key">\`</span>`)}</span>`
      })
      // 上标
      .replace(/\^(.+)\^/g, words => {
        return words.replace(/\^/g, `<span class="hlmd-key">^</span>`)
      })
      // 倾斜
      .replace(/[^\*]\*([^\*\s]+)\*[^\*]/g, words => {
        const content = words.match(/\*(.*?)\*/)[1]
        return words.replace(/\*/g, `<span class="hlmd-key">*</span>`).replace(content, `<em>${content}</em>`)
      })
      // 加粗
      .replace(/[^\*]\*\*([^\*\s]+)\*\*[^\*]/g, words => {
        const content = words.match(/\*\*(.*?)\*\*/)[1]
        return words.replace(/\*/g, `<span class="hlmd-key">*</span>`).replace(content, `<strong>${content}</strong>`)
      })
      // 加粗倾斜
      .replace(/\*\*\*([^\*\s]+)\*\*\*/g, words => {
        const content = words.match(/\*\*\*(.*?)\*\*\*/)[1]
        return words
          .replace(/\*/g, `<span class="hlmd-key">*</span>`)
          .replace(content, `<strong><em>${content}</em></strong>`)
      })
      // 删除线
      .replace(/~~(.+)~~/g, words => {
        const content = words.match(/~~(.*?)~~/)[1]
        return words.replace(/~~/g, `<span class="hlmd-key">~~</span>`).replace(content, `<del>${content}</del>`)
      })
      // 下划线
      .replace(/={2}(.+)={2}/g, words => {
        return words
          .replace(/[^==]/g, w => `<span class="hlmd-mark">${w}</span>`)
          .replace(/==/g, `<span class="hlmd-key">==</span>`)
      })
      // 图片/url
      .replace(/!?\[(.*?)\]\((.*?)\)/g, words => {
        return words
          .replace(/\[.+\]/, w => `<span class="hlmd-alt">${w}</span>`)
          .replace(/\(.+\)/, w => `<span class="hlmd-href">${w}</span>`)
          .replace(/\[|\]|\(|\)|\!/g, w => `<span class="hlmd-key">${w}</span>`)
      })
      // 表格
      .replace(/^\|([\w\W]+)\|\s?(-+)+([\w\W]+)\|$/gm, words => {
        return words.replace(/\||-{3}/g, w => `<span class="hlmd-key">${w}</span>`)
      })
      .replace(/^```(.+)|^```|^-{3,}/gm, w => `<span class="hlmd-key">${w}</span>`)
  )
}
