<template>
  <div class="article-catalog">
    <draggable
      class="un-catalog-wrap scroll-bar"
      :list="unCatalog"
      animation="200"
      group="catalog"
      @change="saveStatus"
    >
      <div v-for="(item, index) in unCatalog" :key="item.id">
        <div>
          <i class="iconfont icon-dian"></i>
          <span>{{ item.title }}</span>
        </div>
        <div v-if="item.type === 'TITLE'">
          <i @click="deleteGroup(item, index)" class="iconfont icon-delete"></i>
        </div>
      </div>
    </draggable>
    <div class="in-catalog-wrap scroll-bar">
      <div class="new-group-wrap">
        <div class="new-group-btn">
          <q-button-group>
            <q-button
              @click="isShowNewGroup = false"
              v-if="isShowNewGroup"
              type="warning"
              >取消新增</q-button
            >
            <q-button @click="isShowNewGroup = true" v-else type="info"
              >新增分组</q-button
            >
            <q-button type="danger">重制</q-button>
          </q-button-group>
        </div>

        <div class="new-group-input" v-if="isShowNewGroup">
          <q-input v-model.trim="newGroup">
            <q-button @click="addGroup" slot="right">确定</q-button>
          </q-input>
        </div>
      </div>
      <catalog-item
        @change="saveCatalog(vm)"
        :list.sync="inCatalog"
      ></catalog-item>
    </div>
  </div>
</template>

<script>
import { debounce } from '../../../common/utils'
import draggable from 'vuedraggable'
import CatalogItem from './CatalogItem'
import QButton from '../../../components/button/QButton'
import QButtonGroup from '../../../components/button/QButtonGroup'
import QInput from '../../../components/form/QInput'
import { createBlog, deleteBlog } from '../../../network/blog'
import {
  getCatalogOut,
  getCatalogIn,
  sortCatalog,
  changeCatalogStatus
} from '../../../network/catalog'
export default {
  components: {
    QButton,
    QButtonGroup,
    CatalogItem,
    draggable,
    QInput
  },
  data() {
    return {
      unCatalog: [],
      inCatalog: [],
      vm: this,
      newGroup: '新分组',
      isShowNewGroup: false
    }
  },
  methods: {
    openInput() {
      this.isShowNewGroup = !this.isShowNewGroup
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
    addGroup() {
      if (this.newGroup) {
        createBlog({
          title: this.newGroup,
          type: 'TITLE',
          in_catalog: true
        }).then(res => {
          if (res.ok) {
            this.inCatalog.unshift({
              blog: {
                _id: res.data._id,
                title: res.data.title
              },
              children: [],
              isOpen: true
            })
            this.saveCatalog(this)
            this.newGroup = ''
          }
        })
      } else {
        this.$notice({
          type: 'error',
          title: '失败',
          message: '分组名不能为空'
        })
      }
    },
    deleteGroup(item, index) {
      deleteBlog({ _id: item.id }).then(res => {
        if (res.ok) {
          this.unCatalog.splice(index, 1)
          this.$notice({
            type: 'success',
            title: `${item.title}删除成功`
          })
        }
      })
    },
    cutTree(arr) {
      return arr.map(item => {
        return {
          blog: item.id,
          children: item.children.length ? this.cutTree(item.children) : []
        }
      })
    },
    saveStatus(e) {
      const action = Object.keys(e)[0]
      const element = e[action].element
      const idArr = [element.id]
      let status
      if (action === 'added') {
        flat(element.children)
        changeCatalogStatus({ ids: idArr, status: false }).then()
        this.saveCatalog(this)
        function flat(arr) {
          arr.forEach(item => {
            idArr.push(item.id)
            if (item.children.length) flat(item.children)
          })
        }
      } else if (action === 'removed') {
        changeCatalogStatus({ ids: idArr, status: true }).then()
        this.saveCatalog(this)
      }
    },
    saveCatalog: debounce(vm => {
      sortCatalog({ catalog: vm.cutTree(vm.inCatalog) }).then(res => {
        if (res.ok) {
          vm.$notice({
            type: 'success',
            title: '排序成功'
          })
        }
      })
    }, 100)
  },
  created() {
    getCatalogOut().then(res => {
      if (res.ok) {
        this.unCatalog = res.data
      }
    })
    getCatalogIn({ open: true }).then(res => {
      if (res.ok) {
        this.inCatalog = res.data
      }
    })
  }
}
</script>

<style scoped>
.article-catalog {
  display: flex;
  justify-content: space-between;
}

.un-catalog-wrap,
.in-catalog-wrap {
  height: 100%;
  padding: 10px;
  background-color: #fff;
  overflow-y: auto;
  overflow-x: hidden;
}

.in-catalog-wrap {
  width: calc(70% - 5px);
}

.un-catalog-wrap {
  width: calc(30% - 5px);
}

.un-catalog-wrap > div {
  display: flex;
  justify-content: space-between;
  padding: 4px 10px;
}

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

.new-group-input,
.new-group-btn {
  margin: 10px 0;
}

.new-group-btn {
  display: flex;
}

.new-group-btn .q-button-group {
  margin-right: 10px;
}
</style>
