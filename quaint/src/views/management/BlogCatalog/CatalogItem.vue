<template>
  <draggable
    tag="ul"
    class="in-catalog"
    animation="200"
    group="catalog"
    :list="list"
    :disabled="disabled"
    @change="change"
    :class="{ isOpen: level === 0 }"
  >
    <li class="in-catalog-item" v-for="(item, index) in list" :key="item.id">
      <p :class="{isCurrent: item.isCurrent}" class="in-catalog-item-title">
        <i
          v-if="/icon/.test(layout)"
          @click="changeOpen(index)"
          :class="{
            isOpen: item.isOpen && item.children.length,
            'icon-zhengsanjiao': item.children.length,
            'icon-dian': !item.children.length
          }"
          class="iconfont icon-zhengsanjiao catalog-item-icon"
        ></i>
        <span
          class="catalog-item-icon"
          v-if="/index/.test(layout)"
          @click="changeOpen(index)"
          >{{ index + 1 }}.</span
        >
        <span style="flex-grow: 1" @click="onClick(item)">{{ item.title }}</span>
      </p>
      <catalog-item
        @change="change"
        @click="onClick"
        :class="{ isOpen: item.isOpen }"
        :list.sync="item.children"
        :disabled="disabled"
        :level="level + 1"
        :layout="layout"
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
    current: String,
    level: {
      type: Number,
      default: 0
    },
    layout: {
      type: String,
      default: 'icon'
    }
  },
  methods: {
    changeOpen(index) {
      const temp = this.list

      // 递归关闭所有子级
      temp[index].isOpen && t(temp[index].children)
      // 关闭当前层级
      temp[index].isOpen = !this.list[index].isOpen

      function t(arr) {
        arr.forEach(item => {
          item.isOpen = false
          item.children.length && t(item.children)
        })
      }

      this.$emit('update:list', temp)
    },
    change() {
      this.$emit('change')
    },
    onClick(item) {
      this.$emit('click', item)
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
}

.in-catalog-item-title {
  display: flex;
  height: 0;
  margin: 0;
  line-height: 30px;
  padding: 0 4px;
  overflow: hidden;
  border-radius: 4px;
  transition-duration: 0.4s;
  transition-property: height, margin;
}

.in-catalog.isOpen > .in-catalog-item > .in-catalog-item-title {
  height: 30px;
  margin: 2px 0;
}

.in-catalog-item-title:hover,
.in-catalog-item-title.isCurrent {
  color: var(--color);
  background-color: var(--colorOpc1);
}

.in-catalog a:hover {
  color: var(--color);
  text-decoration: underline;
}

.catalog-item-icon {
  margin-right: 4px;
  cursor: pointer;
  transition-duration: 0.4s;
  transition-property: transform;
}

.in-catalog-item-title i.isOpen {
  transform: rotate(90deg);
}
</style>
