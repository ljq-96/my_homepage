<template>
  <div>
    <div class="card article-list">
      <q-table :dataSource="list" :columns="columns">
        <template #action="{row, index}">
          <q-button
            type="success"
            @click="
              $router.push({
                path: '/quaint/article/' + row._id
              })
            "
            >查看</q-button
          >
          <q-button
            type="warning"
            @click="
              $router.push({
                path: '/edit/' + row._id
              })
            "
            >编辑</q-button
          >
          <q-button @click="delArticle(row, index)" type="danger"
            >删除</q-button
          >
        </template>
        <template #sticky="{row, index}">
          <q-tip placement="top" :tip="row.sticky ? '已置顶' : '未置顶'">
            <q-switch
              @change="changeSticky($event, row)"
              v-model="row.sticky"
            ></q-switch>
          </q-tip>
        </template>
        <template #tags="{row, index}">
          <q-tag v-for="item in row.tags" :key="item">
            {{ item }}
          </q-tag>
        </template>
      </q-table>

      <q-page
        :pageSize="pageSize"
        :currentPage.sync="currentPage"
        :total="total"
      ></q-page>
    </div>
  </div>
</template>

<script>
import day from 'dayjs'
import FluentDesign from '@/components/FluentDesign'
import FluentDesignItem from '@/components/FluentDesignItem'
import { deleteBlog, getBlogList, updateBlog } from '../../network/blog'
export default {
  components: {
    FluentDesign,
    FluentDesignItem
  },
  data() {
    return {
      list: [],
      size: 13,
      pageSize: 8,
      currentPage: 1,
      total: 0,
      columns: [
        {
          title: '#',
          filter: ({ index }) => {
            return (this.currentPage - 1) * this.pageSize + index + 1
          }
        },
        {
          title: '标题',
          key: 'title'
        },
        {
          title: '创建时间',
          key: 'create_time',
          filter: ({ value }) => {
            return day(value).format('YYYY-MM-DD')
          }
        },
        {
          title: '字数',
          key: 'content',
          filter: ({ value }) => {
            return (value.length / 1000).toFixed(1) + 'k'
          }
        },
        {
          title: '置顶',
          key: 'sticky'
        },
        {
          title: '标签',
          key: 'tags'
        },
        {
          title: '操作',
          key: 'action'
        }
      ]
    }
  },
  methods: {
    changeSticky(bol, row) {
      updateBlog({
        _id: row._id,
        info: {
          sticky: bol
        }
      }).then(res => {
        if (res.ok) {
          this.$notice({
            type: 'success',
            title: `“${row.title}” ${bol ? '置顶' : '取消置顶'}`
          })
        }
      })
    },
    delArticle(row, index) {
      this.$confirm({
        message: `确定删除${row.title}吗?`
      })
        .then(() => {
          deleteBlog({
            _id: row._id
          }).then(res => {
            this.getData()
            this.$notice({
              type: 'success',
              title: '删除成功'
            })
          })
        })
        .catch(() => {
          this.$notice({
            type: 'info',
            title: '取消删除'
          })
        })
    },
    getData() {
      getBlogList({
        pageSize: this.pageSize,
        currentPage: this.currentPage
      }).then(res => {
        if (res.ok) {
          this.list = res.data
          this.total = res.total
        }
      })
    }
  },
  watch: {
    currentPage: {
      handler() {
        this.getData()
      },
      immediate: true
    }
  }
}
</script>

<style scoped>
.article-list {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  background-color: #fff;
}

.q-button {
  margin: 0 5px;
}

.q-page {
  margin: 10px;
}
</style>
