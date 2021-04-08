<template>
  <div class="article-catalog">
    <q-card height="calc(100vh - 145px)">
      <template #title>
        <span>未在目录中</span>
      </template>
      <template #extra>
        <q-tip placement="bottom">
          <q-icon icon="more"></q-icon>
          <template #tip>
            <div @click="showNewGroup = true" class="catalog-options-item">
              新增分组
            </div>
            <div class="catalog-options-item">重制</div>
          </template>
        </q-tip>
      </template>
      <template #content>
        <div class="catalog-content">
          <draggable
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
                <i
                  @click="deleteGroup(item, index)"
                  class="iconfont icon-delete"
                ></i>
              </div>
            </div>
          </draggable>
        </div>
      </template>
    </q-card>

    <q-card height="calc(100vh - 145px)">
      <template #title>
        <span>目录</span>
      </template>
      <template #extra>
        <!-- <div class="new-group-btn">
          <q-button-group>
            <q-button
              plain
              @click="isShowNewGroup = false"
              v-if="isShowNewGroup"
              >取消新增</q-button
            >
            <q-button plain @click="isShowNewGroup = true" v-else
              >新增分组</q-button
            >
            <q-button plain>重制</q-button>
          </q-button-group>
        </div>

        <div class="new-group-input" v-if="isShowNewGroup">
          <q-input v-model.trim="newGroup">
            <q-button @click="addGroup" slot="right">确定</q-button>
          </q-input>
        </div> -->
      </template>

      <template #content>
        <div class="catalog-content">
          <catalog-item
            @change="saveCatalog(vm)"
            :list.sync="inCatalog"
          ></catalog-item>
        </div>
      </template>
    </q-card>

    <!-- 添加分组弹出框 -->
    <modal v-model="showNewGroup" title="添加分组">
      <q-input v-model="newGroup" class="new-group-input"></q-input>
      <template #footer>
        <div class="new-group-footer">
          <q-button @click="showNewGroup = false" plain>取消</q-button>
          <q-button @click="addGroup">确定</q-button>
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
import { debounce } from '../../../common/utils'
import draggable from 'vuedraggable'
import CatalogItem from './CatalogItem'
import Modal from '../../../components/Modal'
import { createBlog, deleteBlog } from '../../../network/blog'
import {
  getCatalogOut,
  getCatalogIn,
  sortCatalog,
  changeCatalogStatus
} from '../../../network/catalog'
export default {
  components: {
    CatalogItem,
    draggable,
    Modal
  },
  data() {
    return {
      unCatalog: [],
      inCatalog: [],
      vm: this,
      newGroup: '',
      showNewGroup: false
    }
  },
  methods: {
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
              id: res.data._id,
              title: res.data.title,
              children: [],
              isOpen: true
            })
            this.saveCatalog(this)
            this.newGroup = ''
            this.showNewGroup = false
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

.article-catalog > div:nth-child(1) {
  flex: 1;
}

.article-catalog > div:nth-child(2) {
  flex: 2;
  margin-left: 15px;
}

.new-group-btn {
  display: flex;
}

.new-group-btn .q-button-group {
  margin-right: 10px;
}

.catalog-options-item {
  padding: 4px 20px;
}

.catalog-options-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.new-group-input {
  width: 100%;
}

.new-group-footer {
  text-align: right;
}

.new-group-footer .q-button {
  margin-left: 10px;
}
</style>
