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
      :title.sync="articleInfo.title"
      height="calc(100vh - 225px)"
      v-model="markdown"
    ></markdown-editor>
  </div>
</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor'
import {
  getBlogOne,
  testBlog,
  createBlog,
  updateBlog
} from '../../network/blog'
export default {
  components: {
    MarkdownEditor
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
          const truncate = this.markdown.match(
            /([\s\S]*?)[\r,\n,\r\n]---[\r,\n,\r\n]/
          )
          if (this.id) {
            updateBlog({
              _id: this.id,
              info: {
                truncate: truncate ? truncate[0] : '',
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
              truncate: truncate ? truncate[0] : '',
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
    }
  },
  created() {
    const { id } = this.$route.params
    if (id) {
      this.id = id
      getBlogOne(id).then(res => {
        console.log(res)
        if (res.ok) {
          this.markdown = res.data.blog.content
          this.articleInfo.tags = res.data.blog.tags.join(',')
          this.articleInfo.title = res.data.blog.title
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
  color: var(--disabled);
  outline: none;
  font-family: FiraCode;
  background-color: #fff;
}

.markdown-edit input[type='text']:focus {
  color: var(--content);
}

.edit-form {
  display: flex;
}
</style>
