<template>
  <div :class="{ full: isFullScreen }" class="md-editor">
    <fluent-design
      class="md-editor-head"
      v-slot="param"
      :borderSize="50"
      :width="1.5"
      :borderColor="'#666'"
    >
      <div class="md-editor-head-group">
        <fluent-design-item :param="param">
          <div class="iconfont" @click="bold">&#xe7f7;</div>
        </fluent-design-item>
        <fluent-design-item :param="param">
          <div class="iconfont" @click="italic">&#xe7fb;</div>
        </fluent-design-item>
        <fluent-design-item :param="param">
          <div class="iconfont" @click="underLine">&#xe7fa;</div>
        </fluent-design-item>
        <fluent-design-item :param="param">
          <div class="iconfont" @click="lineThrough">&#xe7f9;</div>
        </fluent-design-item>
        <fluent-design-item
          :param="param"
          :isRotate="false"
          class="iconfont submenu"
        >
          &#xe802;
          <fluent-design
            class="submenu-wrap blur"
            v-slot="paramt"
            :borderSize="50"
            :width="1"
          >
            <fluent-design-item
              v-for="(item, index) in color"
              :key="index"
              :param="paramt"
            >
              <div
                :style="[
                  { background: item.value[0] },
                  { color: item.value[1] }
                ]"
                @click="blockColor(item.name)"
              >
                {{ item.name }}
              </div>
            </fluent-design-item>
          </fluent-design>
        </fluent-design-item>
        <fluent-design-item :param="param">
          <div class="iconfont" @click="sup">&#xe73c;</div>
        </fluent-design-item>
        <fluent-design-item :param="param">
          <div class="iconfont" @click="sub">&#xe73b;</div>
        </fluent-design-item>
        <div class="line"></div>
        <fluent-design-item
          :param="param"
          :isRotate="false"
          class="iconfont submenu"
        >
          &#xe7f8;
          <fluent-design
            class="submenu-wrap blur"
            v-slot="paramt"
            :borderSize="50"
            :width="1"
          >
            <fluent-design-item :param="paramt">
              <div @click="headLine1">一级标题</div>
            </fluent-design-item>
            <fluent-design-item :param="paramt">
              <div @click="headLine2">二级标题</div>
            </fluent-design-item>
            <fluent-design-item :param="paramt">
              <div @click="headLine3">三级标题</div>
            </fluent-design-item>
            <fluent-design-item :param="paramt">
              <div @click="headLine4">四级标题</div>
            </fluent-design-item>
            <fluent-design-item :param="paramt">
              <div @click="headLine5">五级标题</div>
            </fluent-design-item>
            <fluent-design-item :param="paramt">
              <div @click="headLine6">六级标题</div>
            </fluent-design-item>
          </fluent-design>
        </fluent-design-item>
        <fluent-design-item :param="param">
          <div class="iconfont" @click="unorderList">&#xe7f4;</div>
        </fluent-design-item>
        <fluent-design-item :param="param">
          <div class="iconfont" @click="orderList">&#xe7f5;</div>
        </fluent-design-item>
        <fluent-design-item :param="param">
          <div class="iconfont" @click="taskFalse">&#xe7aa;</div>
        </fluent-design-item>
        <fluent-design-item :param="param">
          <div class="iconfont" @click="taskTrue">&#xe7a8;</div>
        </fluent-design-item>
        <div class="line"></div>
        <fluent-design-item :param="param">
          <div class="iconfont" @click="highlight">&#xe7e3;</div>
        </fluent-design-item>
        <fluent-design-item
          :param="param"
          :isRotate="false"
          class="iconfont submenu"
        >
          &#xe7fc;
          <fluent-design
            class="submenu-wrap blur"
            v-slot="paramt"
            :borderSize="50"
            :width="1"
          >
            <fluent-design-item :param="paramt">
              <div @click="inlineCode">行内代码</div>
            </fluent-design-item>
            <fluent-design-item :param="paramt">
              <div @click="blockCode">代码块</div>
            </fluent-design-item>
          </fluent-design>
        </fluent-design-item>
        <fluent-design-item :param="param">
          <div class="iconfont" @click="quote">&#xe71a;</div>
        </fluent-design-item>
        <fluent-design-item class="submenu" :param="param" :isRotate="false">
          <div class="iconfont" @click="table">
            &#xe7df;
            <div class="submenu-wrap blur" @mouseleave="newTable = [0, 0]">
              <div class="table-row" v-for="i of 10" :key="i">
                <fluent-design-item :param="param" v-for="j of 6" :key="j"
                  ><div
                    class="table-column"
                    :class="{
                      tableInner: i <= newTable[0] && j <= newTable[1]
                    }"
                    @mouseover="tableMouseover(i, j)"
                    @click.stop="setTable"
                  ></div
                ></fluent-design-item>
              </div>
              <div class="table-size">{{ tableSize }}</div>
            </div>
          </div>
        </fluent-design-item>
        <fluent-design-item :param="param">
          <div class="iconfont" @click="link">&#xe7e2;</div>
        </fluent-design-item>
        <fluent-design-item :param="param">
          <div class="iconfont" @click="img">&#xe7de;</div>
        </fluent-design-item>
        <fluent-design-item :param="param">
          <div class="iconfont" @click="hr">&#xe800;</div>
        </fluent-design-item>
      </div>
      <div class="md-editor-head-group">
        <fluent-design-item :isRotate="false" class="file" :param="param">
          <div class="iconfont">
            &#xe637;<input @change="selectFile" type="file" accept=".md" />
          </div>
        </fluent-design-item>
        <fluent-design-item
          class="iconfont submenu"
          :isRotate="false"
          :param="param"
        >
          &#xe7f1;
          <fluent-design
            class="submenu-wrap blur"
            v-slot="paramt"
            :borderSize="50"
            :width="1"
          >
            <fluent-design-item :param="paramt">
              <div @click="downloadHTML">html</div>
            </fluent-design-item>
            <fluent-design-item :param="paramt">
              <div @click="downloadMD">markdown</div>
            </fluent-design-item>
          </fluent-design>
        </fluent-design-item>
        <fluent-design-item :param="param">
          <div
            class="iconfont"
            @click="isFullScreen = !isFullScreen"
            v-html="isFullScreen ? '&#xe7f0;' : '&#xe7ef;'"
          ></div>
        </fluent-design-item>
        <fluent-design-item :param="param">
          <div
            class="iconfont"
            :style="{ background: isPreview ? '#eee' : '' }"
            @click="isPreview = !isPreview"
          >
            &#xe796;
          </div>
        </fluent-design-item>
      </div>
    </fluent-design>
    <div class="md-editor-body">
      <div class="md-editor-md-wrap">
        <textarea
          ref="textarea"
          class="md-editor-md"
          :value="value"
          @scroll="scroll"
          @input="onInput(vm, $event)"
          spellcheck="false"
          placeholder="请输入..."
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
import FluentDesign from '@/components/FluentDesign'
import FluentDesignItem from '@/components/FluentDesignItem'
export default {
  components: {
    FluentDesign,
    FluentDesignItem
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
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

<style>
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
  width: 100%;
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
  border-bottom: 1px solid #eee;
}

.md-editor-head .line {
  width: 1px;
  height: 34px;
  background-color: #eee;
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

.md-editor-head .iconfont {
  width: 34px;
  height: 34px;
  border-radius: 4px;
  text-align: center;
  line-height: 34px;
  font-size: 16px;
}

.md-editor-head .iconfont:hover {
  background-color: #eee;
}

.md-editor .submenu {
  position: relative;
  z-index: 99;
}

.md-editor .submenu-wrap {
  display: none;
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 0;
  font-size: 14px;
  color: #4a4a4a;
  background-color: rgba(255, 255, 255, 0.8);
  filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.2));
  border-radius: 4px;
  z-index: 99;
}

.md-editor .submenu-wrap::after {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-bottom: 10px solid rgba(255, 255, 255, 0.8);
  left: 50%;
  top: -20px;
  transform: translateX(-50%);
}

.md-editor .submenu-wrap > .fd-item {
  width: 90px;
  height: 30px;
  line-height: 30px;
}

.md-editor .submenu-wrap > .fd-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.md-editor .submenu:hover .submenu-wrap {
  display: block;
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
  background-color: rgba(0, 0, 0, 0.1);
  transition: 0.2s;
}

.md-editor .table-column.tableInner {
  background-color: rgba(0, 0, 0, 0.3);
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
  height: calc(100vh - 164px);
  flex-grow: 1;
}

.md-editor-body .md-editor-md,
.md-editor-body .md-editor-html {
  height: calc(100vh - 164px);
  padding: 20px 20px 150px;
  overflow: auto;
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
  /* border: 1px solid #eee; */
  border: none;
  border-radius: 4px;
}

textarea.md-editor-md {
  /* color: transparent; */
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
  background-color: #eee;
}

.md-editor-body .md-editor-md::-webkit-scrollbar-thumb,
.md-editor-body .md-editor-html::-webkit-scrollbar-thumb {
  background-color: #b0bec5;
  border-radius: 4px;
  cursor: default;
}

.md-editor-body .md-editor-md::-webkit-scrollbar-thumb:hover,
.md-editor-body .md-editor-html::-webkit-scrollbar-thumb:hover {
  background-color: #455a64;
}
</style>
