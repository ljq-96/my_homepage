<template>
  <draggable
    class="in-catalog"
    tag="ul"
    animation="200"
    group="catalog"
    :list="list"
    :disabled="disabled"
    @change="change"
  >
    <li
      class="in-catalog-item"
      v-for="(item, index) in list"
      :key="item.blog._id"
    >
      <p class="in-catalog-item-title">
        <i
          v-show="item.children.length"
          @click="changeOpen(index)"
          :class="{ isOpen: item.isOpen }"
          class="iconfont icon-zhengsanjiao"
        ></i>
        <i v-show="!item.children.length" class="iconfont icon-dian"></i>
        <router-link
          v-if="disabled && item.blog.type === 'DOC'"
          :to="{ path: '/quaint/article', query: { title: item.blog.title } }"
          >{{ item.blog.title }}</router-link
        >
        <span v-else>{{ item.blog.title }}</span>
      </p>
      <catalog-item
        @change="change"
        :class="{ isOpen: item.isOpen }"
        :list.sync="item.children"
        :disabled="disabled"
      />
    </li>
  </draggable>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: 'CatalogItem',
  components: {
    draggable
  },
  props: {
    list: {
      required: false,
      type: Array,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    current: String
  },
  methods: {
    changeOpen(index) {
      const temp = JSON.parse(JSON.stringify(this.list))
      temp[index].isOpen = !this.list[index].isOpen
      this.$emit('update:list', temp)
    },
    change() {
      this.$emit('change')
    }
  }
}
</script>

<style scoped>
.in-catalog {
  list-style: none;
}

.in-catalog .in-catalog {
  padding-left: 20px;
  overflow: hidden;
  max-height: 0;
  transition-duration: 0.4s;
  transition-timing-function: ease-in-out;
}

.in-catalog .in-catalog.isOpen {
  max-height: 400px;
}

.in-catalog-item-title {
  display: flex;
  padding: 4px 0;
  border-radius: 4px;
}

.in-catalog-item-title:hover {
  background-color: var(--colorOpc1);
} 

.in-catalog a:hover {
  color: var(--color);
  text-decoration: underline;
}

.in-catalog-item-title i {
  margin-right: 4px;
  cursor: pointer;
  transition: 0.4s;
}

.in-catalog-item-title i.isOpen {
  transform: rotate(90deg);
}
</style>
