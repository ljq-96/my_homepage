<template>
  <div>
    <div class="card bookmark-list">
      <q-table
        :dataSource="bookmark"
        :columns="columns"
        height="calc(100vh - 155px)"
      >
        <template #size="{row, index}">
          <q-tip :placement="'right'">
            <q-button plain>{{ sizeMap[row.size] }}</q-button>
            <template #tip>
              <div @click="changeSize('small', row, index)" class="size-item">
                小
              </div>
              <div @click="changeSize('middle', row, index)" class="size-item">
                中
              </div>
              <div @click="changeSize('wide', row, index)" class="size-item">
                宽
              </div>
              <div @click="changeSize('large', row, index)" class="size-item">
                大
              </div>
            </template>
          </q-tip>
        </template>
        <template #icon="{row}">
          <q-button plain>
            <i class="logofont" :class="row.icon"></i>
          </q-button>
        </template>
        <template #action="{row, index}">
          <q-button @click="edit(row, index)" class="button-edit" type="warning"
            >编辑</q-button
          >
          <q-button @click="delBookmark(row, index)" type="danger"
            >删除</q-button
          >
        </template>
      </q-table>
    </div>

    <modal
      @confirm="save"
      @cancel="onEdit = {}"
      :title="onEdit.title"
      v-model="isEdit"
    >
      <q-form>
        <q-form-item label="标题">
          <q-input v-model="onEdit.title"></q-input>
        </q-form-item>
        <q-form-item label="地址">
          <q-input v-model="onEdit.url"></q-input>
        </q-form-item>
      </q-form>
    </modal>
  </div>
</template>

<script>
import Modal from '../../components/Modal'
import {
  getBookmark,
  updateBookmark,
  deleteBookmark
} from '../../network/bookmark'
export default {
  components: {
    Modal
  },
  data() {
    return {
      bookmark: [],
      isEdit: false,
      onEdit: {},
      sizeMap: {
        small: '小',
        middle: '中',
        wide: '宽',
        large: '大'
      },
      columns: [
        {
          title: '标题',
          key: 'title'
        },
        {
          title: '大小',
          key: 'size'
        },
        {
          title: '图标',
          key: 'icon'
        },
        {
          title: '地址',
          key: 'url'
        },
        {
          title: '操作',
          key: 'action'
        }
      ]
    }
  },
  methods: {
    delBookmark(row, index) {
      this.$confirm({
        title: '警告',
        message: '您确定删除' + row.title + '吗?'
      }).then(() => {
        deleteBookmark({
          id: row._id
        }).then(res => {
          if (res.ok) {
            this.bookmark.splice(index, 1)
            this.$notice({ title: '删除成功' })
          }
        })
      })
    },
    changeSize(size, row, index) {
      updateBookmark({
        id: row._id,
        info: { size }
      }).then(res => {
        if (res.ok) {
          this.bookmark.splice(index, 1, res.data)
          this.$notice({ title: '修改成功' })
        }
      })
    },
    edit(row) {
      this.isEdit = true
      this.onEdit = JSON.parse(JSON.stringify(row))
    },
    save() {
      console.log(111)
      updateBookmark({
        id: this.onEdit._id,
        info: {
          title: this.onEdit.title,
          url: this.onEdit.url
        }
      }).then(res => {
        if (res.ok) {
          const idx = this.bookmark.findIndex(
            item => item._id === this.onEdit._id
          )
          this.bookmark.splice(idx, 1, res.data)
          this.$notice({ title: '修改成功' })
          this.onEdit = {}
        }
      })
    }
  },
  created() {
    getBookmark().then(res => {
      if (res.ok) {
        this.bookmark = res.data
      }
    })
  }
}
</script>

<style scoped>
.bookmark-list {
  padding: 15px;
}

.q-table .button-edit {
  margin-right: 10px;
}

.size-item {
  padding: 4px 20px;
}

.size-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.q-form-item {
  margin-bottom: 15px;
}
</style>
