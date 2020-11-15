<template>
  <div class="article-catalog">
    <div class="un-catalog scroll-bar">
      <div v-for="item in unCatalog" :key="item.uuid">
        <span>{{ item.title }}</span>
        <span @click="addCatalog(item._id)">添加</span>
      </div>
    </div>
    <div class="in-catalog scroll-bar">
      <catalog ref="catalog" :isEdit="true" @remove="updateData"></catalog>
    </div>
  </div>
</template>

<script>
import Catalog from '@/views/management/BlogCatalog/Catalog'
export default {
  components: {
    Catalog
  },
  data() {
    return {
      unCatalog: []
    }
  },
  methods: {
    addCatalog(_id) {
      this.$request({
        url: '/blog/catalog/update',
        method: 'post',
        data: {
          action: 'insert',
          _id: _id,
          targetUuid: null
        }
      }).then(res => {
        if (res.code === 200) {
          this.updateData()
          this.$refs.catalog.updateData()
        }
      })
    },
    updateData() {
      this.$request({
        url: '/blog/catalog/outside'
      }).then(res => {
        if (res.code === 200) {
          this.unCatalog = res.articles
        }
      })
    }
  },
  created() {
    this.updateData()
  }
}
</script>

<style scoped>
.article-catalog {
  display: flex;
  justify-content: space-between;
}

.un-catalog,
.in-catalog {
  height: 100%;
  padding: 10px;
  /* border: 1px solid var(--_backColor); */
  /* box-shadow: 0 0 5px var(--backColor); */
  background-color: #fff;
  overflow: auto;
}

.in-catalog {
  width: calc(70% - 5px);
}

.un-catalog {
  width: calc(30% - 5px);
}

.un-catalog > div {
  display: flex;
  justify-content: space-between;
  padding: 4px 10px;
}
</style>
