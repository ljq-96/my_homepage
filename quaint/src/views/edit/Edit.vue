<template>
  <div class="markdown-edit">
    <div class="markdown-edit-head">
      <div class="markdown-btn">
        <button @click="cancelConfirm" style="background: #d84315;">取消</button>
        <button @click="saveConfirm('保存并离开吗?')" style="background: #1565c0;">保存</button>
      </div>
      <q-form class="edit-form" :model="articleInfo" :rules="articleRules" labelWidth="30px" ref="form">
        <q-form-item class="edit-form-item" label="title" prop="title">
          <q-input v-model="articleInfo.title"></q-input>
        </q-form-item>
        <q-form-item class="edit-form-item" label="tags" prop="tags">
          <q-input v-model="articleInfo.tags"></q-input>
        </q-form-item>
      </q-form>
    </div>

    <markdown-editor v-model="markdown" @download="download" @readFile="readFile"></markdown-editor>
  </div>
</template>

<script>
import QForm from '@/components/form/QForm'
import QFormItem from '@/components/form/QFormItem'
import QInput from '@/components/form/QInput'
import MarkdownEditor from '@/components/MarkdownEditor'
import markdown from '@/common/markdown'
import request from '@/network/request'
export default {
  components: {
    MarkdownEditor,
    QForm,
    QFormItem,
    QInput
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
      console.log(this.id)
      if (!this.id) {
        this.$request({
          url: '/blog/test',
          method: 'post',
          data: {
            title: value
          }
        }).then(res => {
          if (res.code === 200 && res.message === '标题重复') {
            callback(new Error())
          } else {
            callback()
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
        tags: [{ validator: tagsReg, message: '标签使用英文逗号分隔' }]
      }
    }
  },
  methods: {
    cancelConfirm() {
      this.$confirm({
        title: '确定要离开吗? 您还没有保存'
      }).$on('confirm', this.cancel)
    },
    saveConfirm() {
      this.$confirm({
        title: '确定要保存吗?'
      }).$on('confirm', this.save)
    },
    save() {
      this.$refs.form.validate(flag => {
        if (flag) {
          this.$request({
            url: '/blog/update',
            method: 'post',
            data: {
              _id: this.id,
              info: {
                content: this.markdown,
                tags: this.articleInfo.tags,
                title: this.articleInfo.title
              }
            }
          }).then(res => {
            if (res.code === 200) {
              this.$notice({
                type: 'success',
                title: 'Success',
                message: `文章 “${this.articleInfo.title}” 保存成功`
              })
              this.$router.go(-1)
            }
          })
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
    download() {
      const a = document.createElement('a')
      const blob = new Blob([this.markdown])
      a.download = this.title + '.md'
      a.href = URL.createObjectURL(blob)
      a.click()
      URL.revokeObjectURL(blob)
    },
    readFile(data) {
      this.$request({
        method: 'post',
        url: '/readfile',
        data: data
      }).then(res => {
        if (res.code === 200) {
          this.articleInfo.title = data.name
          this.markdown = res.article
        }
      })
    }
  },
  created() {
    this.articleInfo.title = this.$route.query.title
    if (this.articleInfo.title) {
      this.$request({
        url: '/article/' + this.articleInfo.title
      }).then(res => {
        if (res.code === 200) {
          this.markdown = res.article.content
          this.id = res.article._id
          this.articleInfo.tags = res.article.tags.join(',')
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

.markdown-edit button {
  width: 50px;
  height: 30px;
  margin-right: 10px;
  color: #fff;
  border: none;
  outline: none;
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

.markdown-edit .markdown-btn button:hover {
  filter: brightness(90%);
}

.markdown-edit .markdown-btn button:active {
  filter: brightness(70%);
}

.edit-form {
  display: flex;
}
</style>
