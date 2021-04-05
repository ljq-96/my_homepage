<template>
  <div :class="{ full: isFullScreen }" class="md-editor card">
    <div class="md-editor-head">
      <div class="md-editor-head-group">
        <q-tip placement="bottom" tip="加粗">
          <q-icon icon="bold" @click="bold"></q-icon>
        </q-tip>
        <q-tip placement="bottom" tip="倾斜">
          <q-icon icon="italic" @click="italic"></q-icon>
        </q-tip>
        <q-tip placement="bottom" tip="下划线">
          <q-icon icon="underline" @click="underLine"></q-icon>
        </q-tip>
        <q-tip placement="bottom" tip="删除线">
          <q-icon icon="strikethrough" @click="lineThrough"></q-icon>
        </q-tip>
        <q-tip placement="bottom" theme="light" trigger="click">
          <q-tip placement="bottom" tip="背景色">
            <q-icon icon="bg-colors"></q-icon>
          </q-tip>
          <div slot="tip">
            <div
              :style="[{ background: item.value[0] }, { color: item.value[1] }]"
              @click="blockColor(item.name)"
              v-for="(item, index) in color"
              :key="index"
              class="dropdown-item"
            >
              {{ item.name }}
            </div>
          </div>
        </q-tip>
        <q-tip placement="bottom" tip="上角标">
          <q-icon icon="shangbiao" @click="sup"></q-icon>
        </q-tip>
        <q-tip placement="bottom" tip="下角标">
          <q-icon icon="xiabiao" @click="sub"></q-icon>
        </q-tip>
        <div class="line"></div>
        <q-tip placement="bottom" theme="light" trigger="click">
          <q-tip placement="bottom" tip="标题">
            <q-icon icon="number"></q-icon>
          </q-tip>
          <div slot="tip">
            <div class="dropdown-item" @click="headLine1">一级标题</div>
            <div class="dropdown-item" @click="headLine2">二级标题</div>
            <div class="dropdown-item" @click="headLine3">三级标题</div>
            <div class="dropdown-item" @click="headLine4">四级标题</div>
            <div class="dropdown-item" @click="headLine5">五级标题</div>
            <div class="dropdown-item" @click="headLine6">六级标题</div>
          </div>
        </q-tip>
        <q-tip placement="bottom" tip="无序列表">
          <q-icon icon="unorderedlist" @click="unorderList"></q-icon>
        </q-tip>
        <q-tip placement="bottom" tip="有序列表">
          <q-icon icon="orderedlist" @click="orderList"></q-icon>
        </q-tip>
        <q-tip placement="bottom" tip="代办列表(完成)">
          <q-icon icon="check-square" @click="taskTrue"></q-icon>
        </q-tip>
        <q-tip placement="bottom" tip="代办列表(未完成)">
          <q-icon icon="border" @click="taskFalse"></q-icon>
        </q-tip>
        <div class="line"></div>
        <q-tip placement="bottom" tip="高亮">
          <q-icon icon="formatpainter" @click="highlight"></q-icon>
        </q-tip>
        <q-tip placement="bottom" theme="light" trigger="click">
          <q-tip placement="bottom" tip="代码块">
            <q-icon icon="code"></q-icon>
          </q-tip>
          <div slot="tip">
            <div class="dropdown-item" @click="inlineCode">行内代码</div>
            <div class="dropdown-item" @click="blockCode">代码块</div>
          </div>
        </q-tip>
        <q-tip placement="bottom" tip="引用">
          <q-icon icon="yinyong" @click="quote"></q-icon>
        </q-tip>
        <q-tip placement="bottom" theme="light" trigger="click">
          <q-tip placement="bottom" tip="表格">
            <q-icon icon="table"></q-icon>
          </q-tip>
          <div slot="tip">
            <div class="table-row" v-for="i of 10" :key="i">
              <div v-for="j of 6" :key="j">
                <div
                  class="table-column"
                  :class="{
                    tableInner: i <= newTable[0] && j <= newTable[1]
                  }"
                  @mouseover="tableMouseover(i, j)"
                  @click="setTable"
                ></div>
              </div>
            </div>
            <div class="table-size">{{ tableSize }}</div>
          </div>
        </q-tip>
        <q-tip placement="bottom" tip="链接">
          <q-icon icon="link" @click="link"></q-icon>
        </q-tip>
        <q-tip placement="bottom" tip="图片">
          <q-icon icon="image" @click="img"></q-icon>
        </q-tip>
        <q-tip placement="bottom" tip="分割线">
          <q-icon icon="line" @click="hr"></q-icon>
        </q-tip>
      </div>
      <div class="md-editor-head-group">
        <q-tip placement="bottom" class="file" tip="选择文件(markdown)">
          <div class="iconfont">
            <q-icon icon="file-markdown"></q-icon>
            <input @change="selectFile" type="file" accept=".md" />
          </div>
        </q-tip>
        <q-tip placement="bottom" theme="light" trigger="click">
          <q-tip placement="bottom" tip="下载">
            <q-icon icon="download"></q-icon>
          </q-tip>
          <div slot="tip">
            <div class="dropdown-item" @click="downloadHTML">html</div>
            <div class="dropdown-item" @click="downloadMD">markdown</div>
          </div>
        </q-tip>
        <q-tip placement="bottom" :tip="isFullScreen ? '取消全屏' : '全屏'">
          <q-icon
            :icon="isFullScreen ? 'fullscreen-exit' : 'fullscreen'"
            @click="isFullScreen = !isFullScreen"
          ></q-icon>
        </q-tip>
        <q-tip placement="bottom" :tip="isPreview ? '取消预览' : '预览'">
          <q-icon
            :class="{ active: isPreview }"
            icon="layout"
            @click="isPreview = !isPreview"
          ></q-icon>
        </q-tip>
      </div>
    </div>
    <div class="md-editor-body">
      <div class="md-editor-md-wrap">
        <textarea
          ref="textarea"
          class="md-editor-md"
          :value="value"
          @scroll="scroll"
          @input="onInput(vm, $event)"
          spellcheck="false"
          placeholder="第一个分割线前面的会被预览..."
          autofocus
        ></textarea>
      </div>
      <div
        ref="html"
        v-show="isPreview"
        class="md-editor-html article-content"
        v-html="html"
      ></div>
    </div>
  </div>
</template>

<script>
import { debounce } from '@/common/utils'
import { blogStyle } from '../network/blog'
import markdown from '@/common/markdown'
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isPreview: true,
      isCatalog: false,
      isFullScreen: false,
      color: [
        {
          name: 'green',
          value: ['#f6ffee', '#52c41a']
        },
        {
          name: 'blue',
          value: ['#e6f7ff', '#178fff']
        },
        {
          name: 'yellow',
          value: ['#fffbe7', '#fbad15']
        },
        {
          name: 'red',
          value: ['#fff2f1', '#fd4e4f']
        }
      ],
      newTable: [0, 0],
      vm: this
    }
  },
  computed: {
    tableSize() {
      return this.newTable[0] + '×' + this.newTable[1]
    },
    groupSum() {
      return function(group) {
        if (group.length) {
          return group.reduce((a, b) => a + b)
        } else {
          return ''
        }
      }
    },
    html() {
      return markdown.render(this.value)
    }
  },
  methods: {
    onInput: debounce((vm, e) => {
      vm.$emit('input', e.target.value)
    }, 1000),
    scroll(e) {
      const textarea = this.$refs.textarea
      const html = this.$refs.html
      html.scrollTop =
        (textarea.scrollTop * html.scrollHeight) / textarea.scrollHeight
    },
    insert(fn, pos) {
      const textarea = this.$refs.textarea
      const startPos = textarea.selectionStart
      const endPos = textarea.selectionEnd
      const text = this.value.substring(startPos, endPos)
      if (startPos === undefined || endPos === undefined) return
      const result =
        this.value.substring(0, startPos) +
        fn(text) +
        this.value.substring(endPos)
      this.$emit('input', result)
      setTimeout(() => {
        textarea.select()
        if (startPos === endPos) {
          textarea.selectionStart = startPos + pos[0]
          textarea.selectionEnd = startPos + pos[0] + pos[1]
        } else {
          textarea.selectionStart = endPos + pos[0] + pos[2]
          textarea.selectionEnd = endPos + pos[0] + pos[2]
        }
      })
    },
    downloadMD() {
      const a = document.createElement('a')
      const blob = new Blob([this.markdown])
      a.download = this.title + '.md'
      a.href = URL.createObjectURL(blob)
      a.click()
      URL.revokeObjectURL(blob)
    },
    downloadHTML() {
      blogStyle().then(res => {
        if (res.ok) {
          const a = document.createElement('a')
          const blob = new Blob([
            `<!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="UTF-8">
                <title>${this.title}</title>
                <style>${res.data}</style>
              </head>
              <body>
                <div class="article-content">${this.html}</div>
              </body>
              </html>`
          ])
          a.download = this.title + '.html'
          a.href = URL.createObjectURL(blob)
          a.click()
          URL.revokeObjectURL(blob)
        }
      })
    },
    selectFile(e) {
      const file = e.target.files[0]
      if (file === null) return
      const reader = new FileReader()
      reader.readAsArrayBuffer(file)
      reader.addEventListener('loadend', e => {
        console.log(file)
        const unit8Arr = new Uint8Array(e.currentTarget.result)
        const encodedString = String.fromCharCode.apply(null, unit8Arr)
        const decodedString = decodeURIComponent(escape(encodedString)) //没有这一步中文会乱码
        this.$emit('input', decodedString)
      })
    },
    tableMouseover(i, j) {
      this.newTable = [i, j]
    },
    setTable() {
      let res = '\n'
      for (let i = 0; i <= this.newTable[1]; i++) {
        res += '|'
      }
      res += '\n'
      for (let i = 0; i < this.newTable[1]; i++) {
        res += '|---'
      }
      res += '|\n'
      for (let i = 0; i < this.newTable[0] - 1; i++) {
        for (let j = 0; j <= this.newTable[1]; j++) {
          res += '|'
        }
        res += '\n'
      }
      this.insert(text => res, [2, 0, 0])
    },
    bold() {
      this.insert(text => `**${text ? text : '加粗'}**`, [2, 2, 2])
    },
    italic() {
      this.insert(text => `*${text ? text : '倾斜'}*`, [1, 2, 1])
    },
    highlight() {
      this.insert(text => `==${text ? text : '高亮'}==`, [2, 2, 2])
    },
    underLine() {
      this.insert(text => `++${text ? text : '下划线'}++`, [2, 3, 2])
    },
    lineThrough() {
      this.insert(text => `~~${text ? text : '删除线'}~~`, [2, 3, 2])
    },
    blockColor(color) {
      this.insert(
        text => `\n<div class="${color}">\n${text ? text : 'color'}\n</div>\n`,
        [16 + color.length, 5, 0]
      )
    },
    quote() {
      this.insert(text => `\n> ${text ? text : '引用'}\n`, [3, 2, 0])
    },
    unorderList() {
      this.insert(text => `\n- ${text ? text : '无序列表'}\n`, [3, 4, 0])
    },
    taskTrue() {
      this.insert(text => `\n- [x] ${text ? text : '任务'}\n`, [7, 2, 0])
    },
    taskFalse() {
      this.insert(text => `\n- [ ] ${text ? text : '任务'}\n`, [7, 2, 0])
    },
    orderList() {
      this.insert(text => `\n1. ${text ? text : '有序列表'}\n`, [4, 4, 0])
    },
    inlineCode() {
      this.insert(text => `\`${text ? text : '代码'}\``, [1, 2, 1])
    },
    blockCode() {
      this.insert(
        text =>
          `\n\`\`\`javascript\n${text ? text : '"hello world"'}\n\`\`\`\n`,
        [15, 13, 5]
      )
    },
    table() {
      this.insert(text => `\n|${text ? text : ''}||\n|---|---|\n|||\n`, [
        2,
        0,
        1
      ])
    },
    link() {
      this.insert(text => `\n[${text ? text : '链接'}]()\n`, [2, 2, 2])
    },
    img() {
      this.insert(text => `\n![${text ? text : '图片'}]()\n`, [3, 2, 2])
    },
    hr() {
      this.insert(text => `\n---\n\n`, [6, 0, 0])
    },
    sup() {
      this.insert(text => `^${text ? text : 2}^`, [1, 1, 1])
    },
    sub() {
      this.insert(text => `~${text ? text : 2}~`, [1, 1, 1])
    },
    headLine1() {
      this.insert(text => `\n# ${text ? text : '一级标题'}\n`, [3, 4, 0])
    },
    headLine2() {
      this.insert(text => `\n## ${text ? text : '二级标题'}\n`, [4, 4, 0])
    },
    headLine3() {
      this.insert(text => `\n### ${text ? text : '三级标题'}\n`, [5, 4, 0])
    },
    headLine4() {
      this.insert(text => `\n#### ${text ? text : '四级标题'}\n`, [6, 4, 0])
    },
    headLine5() {
      this.insert(text => `\n##### ${text ? text : '五级标题'}\n`, [7, 4, 0])
    },
    headLine6() {
      this.insert(text => `\n###### ${text ? text : '六级标题'}\n`, [8, 4, 0])
    }
  }
}
</script>

<style scoped>
@import '../assets/css/markdown.css';
.md-editor {
  width: 100%;
  padding: 10px;
  background-color: #fff;
}

.md-editor.full {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
}

.md-editor.full .md-editor-md,
.md-editor.full .md-editor-html {
  height: calc(100vh - 74px);
}

.md-editor-head {
  display: flex;
  justify-content: space-between;
  padding-bottom: 8px;
  margin-bottom: 8px;
  border-bottom: 1px solid var(--divider);
}

.md-editor-head .line {
  width: 1px;
  height: 34px;
  background-color: var(--divider);
}

.md-editor-head-group {
  display: flex;
}

.md-editor-head-group:nth-child(1) > div {
  margin-right: 4px;
}

.md-editor-head-group:nth-child(2) > div {
  margin-left: 4px;
}

.md-editor-head .q-icon {
  width: 34px;
  height: 34px;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  font-size: 16px;
}

.md-editor-head .q-icon:hover,
.md-editor-head .q-icon.active {
  background-color: var(--background);
}

.md-editor .submenu {
  position: relative;
  z-index: 99;
}

.md-editor .table-row {
  display: flex;
  height: 16px !important;
  padding: 0 8px;
  margin: 2px 0;
}

.md-editor .table-row > div {
  margin: 0 1px;
}

.md-editor .table-column {
  width: 16px;
  height: 16px;
  background-color: var(--divider);
  transition: 0.2s;
}

.md-editor .table-column.tableInner {
  background-color: var(--disabled);
}

.md-editor .table-size {
  text-align: center;
  margin-top: 8px;
  font-family: 'FiraCode';
}

.md-editor .file input {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  width: 34px;
  height: 34px;
}

.md-editor-body {
  display: flex;
}

.md-editor-body .md-editor-md-wrap {
  position: relative;
  height: calc(100vh - 225px);
  flex-grow: 1;
}

.md-editor-body .md-editor-md,
.md-editor-body .md-editor-html {
  height: calc(100vh - 225px);
  padding: 20px 20px 150px;
  overflow-y: scroll;
}

.md-editor-body .md-editor-html {
  width: 50%;
}

.md-editor-body .md-editor-md {
  position: absolute;
  width: 100%;
  height: 100%;
  line-height: normal;
  word-break: break-all;
  white-space: pre-wrap;
  font-size: 14px;
  font-family: 'FiraCode';
  outline: none;
  border: none;
}

textarea.md-editor-md {
  background-color: transparent;
  caret-color: #455a64;
  resize: none;
}

.md-editor-md.md-highlight {
  color: #455a64;
  padding-bottom: 170px;
  /* background-color: #fafafa; */
}

.md-editor-body .md-editor-md::-webkit-scrollbar,
.md-editor-body .md-editor-html::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

.md-editor-body .md-editor-md::-webkit-scrollbar {
  background-color: var(--background);
}

.md-editor-body .md-editor-md::-webkit-scrollbar-thumb,
.md-editor-body .md-editor-html::-webkit-scrollbar-thumb {
  background-color: var(--disabled);
  border-radius: 4px;
  cursor: default;
}

.md-editor-body .md-editor-md::-webkit-scrollbar-thumb:hover,
.md-editor-body .md-editor-html::-webkit-scrollbar-thumb:hover {
  background-color: var(--content);
}

.dropdown-item {
  padding: 2px 20px;
  text-align: center;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: var(--background);
}
</style>
