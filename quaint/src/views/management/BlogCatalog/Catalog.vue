<template>
  <div ref="catalog" class="catalog">
    <div v-if="isEdit" class="btn-group">
      <button @click="openInput">{{ isShowNewGroup ? '关闭' : '新建分组' }}</button>
      <button @click="remake">重制 <span class="iconfont icon-upload"></span></button>
      <div v-if="isShowNewGroup">
        <input type="text" v-model="newGroup" />
        <button @click="addGroup">确定</button>
      </div>
    </div>
    <catalog-item :isEdit="isEdit" :catalog="catalogTree" :current="current"></catalog-item>
  </div>
</template>

<script>
import CatalogItem from '@/views/management/BlogCatalog/CatalogItem'
export default {
  components: {
    CatalogItem
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    current: String
  },
  data() {
    return {
      catalogTree: [],
      saveOpen: [],
      newGroup: '新分组',
      isShowNewGroup: false
    }
  },
  methods: {
    openInput() {
      this.isShowNewGroup = !this.isShowNewGroup
    },
    addGroup() {
      this.$request({
        url: '/blog/catalog/addgroup',
        method: 'post',
        data: {
          title: this.newGroup
        }
      }).then(res => {
        if (res.code === 200) {
          this.isShowNewGroup = false
          this.updateData()
        }
      })
    },
    remake() {
      this.$request({
        url: '/blog/catalog/remake'
      }).then(res => {
        if (res.code === 200) {
          this.handleData(res.articles)
          this.$emit('remove')
        }
      })
    },
    updateData() {
      this.$request({
        url: '/blog/catalog/inside'
      }).then(res => {
        if (res.code === 200) {
          this.handleData(res.articles)
        }
      })
    },
    handleData(data) {
      const _saveOpen = this.saveOpen
      recursionTree(data)
      this.catalogTree = data
      function recursionTree(arr) {
        arr.forEach(item => {
          const obj = _saveOpen.find(j => j.name === item.title)
          if (obj) item.isOpen = obj.isOpen
          if (item.children.length) recursionTree(item.children)
        })
      }
    }
  },
  created() {
    this.updateData()
    this.$bus.$on('catalogUpdate', data => {
      this.$request({
        url: '/blog/catalog/update',
        method: 'post',
        data: data
      }).then(res => {
        if (res.code === 200) {
          this.handleData(res.articles)
          if (data.action === 'remove') {
            this.$emit('remove')
          }
        }
      })
    })
    this.$bus.$on('saveOpen', data => {
      const obj = this.saveOpen.find(item => item.name === data.name)
      if (obj) {
        obj.isOpen = data.isOpen
      } else {
        this.saveOpen.push(data)
      }
    })
  },
  updated() {
    let current = document.querySelector('.catalog .current')
    while (current !== this.$refs.catalog && current !== null) {
      if (current.tagName === 'LI') {
        current.classList.add('openCatalog')
      }
      current = current.parentNode
    }
  }
}
</script>

<style scoped>
.catalog .btn-group {
  margin-bottom: 10px;
}

.catalog .btn-group button {
  width: 80px;
  height: 26px;
  margin-right: 10px;
  color: #4a4a4a;
  background-color: #f5f5f5;
  border: 1px solid #eee;
  outline: none;
  border-radius: 0;
}

.catalog .btn-group button:hover {
  background-color: #eee;
  border: 1px solid #bbb;
}

.catalog .btn-group div {
  display: flex;
  margin: 10px 0;
}

.catalog .btn-group input {
  height: 26px;
  padding: 0 10px;
  border: 1px solid #eee;
  border-radius: 0;
  outline: none;
}
</style>
