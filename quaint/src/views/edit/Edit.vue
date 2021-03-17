<template>
  <div class="markdown-edit">
    <div class="markdown-edit-head">
      <q-button-group>
        <q-button @click="cancelConfirm" plain>离开</q-button>
        <q-button @click="saveConfirm('保存并离开吗?')" plain>保存</q-button>
      </q-button-group>
      <q-form
        class="edit-form"
        :model="articleInfo"
        :rules="articleRules"
        labelWidth="30px"
        ref="form"
      >
        <q-form-item class="edit-form-item" label="title" prop="title">
          <q-input v-model="articleInfo.title"></q-input>
        </q-form-item>
        <q-form-item class="edit-form-item" label="tags" prop="tags">
          <q-input v-model="articleInfo.tags"></q-input>
        </q-form-item>
      </q-form>
    </div>

    <markdown-editor
      ref="markdownEditor"
      v-model="markdown"
      @downloadMD="downloadMD"
      @downloadHTML="downloadHTML"
      @readFile="readFile"
    ></markdown-editor>
  </div>
</template>

<script>
import QForm from '@/components/form/QForm'
import QFormItem from '@/components/form/QFormItem'
import QInput from '@/components/form/QInput'
import QButton from '../../components/button/QButton'
import QButtonGroup from '../../components/button/QButtonGroup'
import MarkdownEditor from '@/components/MarkdownEditor'
import {
  getBlogList,
  readBlog,
  testBlog,
  blogStyle,
  createBlog,
  updateBlog
} from '../../network/blog'
export default {
  components: {
    MarkdownEditor,
    QForm,
    QFormItem,
    QInput,
    QButton,
    QButtonGroup
  },
  data() {
    var tagsReg = (rule, value, callback) => {
      if (/，/.test(value)) {
        callback(new Error())
      } else {
        callback()
      }
    }
    var testTitle = (rule, value, callback) => {
      if (!this.id) {
        testBlog({
          title: value
        }).then(res => {
          if (res.ok) {
            callback()
          } else {
            callback(new Error())
          }
        })
      } else {
        callback()
      }
    }
    return {
      markdown: '',
      id: '',
      articleInfo: {
        tags: '',
        title: ''
      },
      articleRules: {
        title: [
          { required: true, message: '标题不能为空' },
          { validator: testTitle, message: '标题重复请更换一个' }
        ],
        tags: [
          { required: true, message: '标签不能为空' },
          { validator: tagsReg, message: '标签使用英文逗号分隔' }
        ]
      }
    }
  },
  methods: {
    cancelConfirm() {
      this.$confirm({
        message: '您还没有保存，确定要离开吗?'
      }).then(this.cancel)
    },
    saveConfirm() {
      this.$confirm({
        message: '确定要保存吗?'
      }).then(this.save)
    },
    save() {
      this.$refs.form.validate(flag => {
        if (flag) {
          if (this.id) {
            updateBlog({
              _id: this.id,
              info: {
                content: this.markdown,
                tags: this.articleInfo.tags.split(','),
                title: this.articleInfo.title
              }
            }).then(res => {
              if (res.ok) {
                this.$notice({
                  type: 'success',
                  title: 'Success',
                  message: `文章 “${this.articleInfo.title}” 保存成功`
                })
                this.$router.go(-1)
              }
            })
          } else {
            createBlog({
              content: this.markdown,
              tags: this.articleInfo.tags.split(','),
              title: this.articleInfo.title
            }).then(res => {
              if (res.ok) {
                this.$notice({
                  type: 'success',
                  title: 'Success',
                  message: `文章 “${this.articleInfo.title}” 保存成功`
                })
                this.$router.go(-1)
              }
            })
          }
        } else {
          this.$notice({
            type: 'warning',
            title: '保存失败',
            message: '标题或标签不符合规范'
          })
        }
      })
    },
    cancel() {
      this.$router.go(-1)
    },
    downloadMD() {
      const a = document.createElement('a')
      const blob = new Blob([this.markdown])
      a.download = this.articleInfo.title + '.md'
      a.href = URL.createObjectURL(blob)
      a.click()
      URL.revokeObjectURL(blob)
    },
    downloadHTML() {
      const contentHtml = this.$refs.markdownEditor.html
      blogStyle().then(res => {
        if (res.ok) {
          const a = document.createElement('a')
          const blob = new Blob([
            `<!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="UTF-8">
                <title>${this.articleInfo.title}</title>
                <style>${res.data}</style>
              </head>
              <body>
                <div class="article-content">${contentHtml}</div>
              </body>
              </html>`
          ])
          a.download = this.articleInfo.title + '.html'
          a.href = URL.createObjectURL(blob)
          a.click()
          URL.revokeObjectURL(blob)
        }
      })
    },
    readFile(data) {
      readBlog(data).then(res => {
        if (res.ok) {
          this.articleInfo.title = data.name
          this.markdown = res.data
        }
      })
    }
  },
  created() {
    this.articleInfo.title = this.$route.query.title
    if (this.articleInfo.title) {
      getBlogList({
        title: this.$route.query.title
      }).then(res => {
        console.log(res)
        if (res.ok) {
          this.markdown = res.data[0].content
          this.id = res.data[0]._id
          this.articleInfo.tags = res.data[0].tags.join(',')
        }
      })
    } else {
      this.articleInfo.title = '未命名'
    }
  }
}
</script>

<style>
.markdown-edit {
  padding: 20px;
}
.markdown-edit-head {
  display: flex;
  height: 30px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.markdown-edit .edit-form-item {
  margin-left: 50px;
}

.markdown-edit input[type='text'] {
  height: 30px;
  padding: 0 10px;
  border: 1px solid #eee;
  color: #7a7a7a;
  outline: none;
  font-family: FiraCode;
  border-radius: 0;
  background-color: #fff;
}

.markdown-edit input[type='text']:focus {
  color: #4a4a4a;
}

.edit-form {
  display: flex;
}
</style>
