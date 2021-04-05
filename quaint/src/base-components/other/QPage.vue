<template>
  <div class="q-page">
    <div class="q-page-content">
      <span
        @click="prev"
        :class="{ disabled: currentPage === 1 }"
        class="click iconfont icon-left"
      ></span>
      <span
        :class="{
          active: item === currentPage,
          click: !isNaN(item)
        }"
        v-for="(item, index) in pages"
        @click="onChange(item)"
        >{{ item }}</span
      >
      <span
        @click="next"
        :class="{ disabled: currentPage === pageCount }"
        class="click iconfont icon-right"
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QPage',
  props: {
    pageSize: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 100
    },
    currentPage: {
      type: Number,
      default: 4
    }
  },
  computed: {
    pages() {
      let pages = [
        1,
        this.currentPage - 1,
        this.currentPage,
        this.currentPage + 1,
        this.pageCount
      ]
      pages = [...new Set(pages)].filter(
        item => item >= 1 && item <= this.pageCount
      )
      for (let i = 0; i < pages.length; i++) {
        if (pages[i] + 1 < pages[i + 1]) {
          pages.splice(i + 1, 0, '...')
          i++
        }
      }
      return pages
    },
    pageCount() {
      return Math.ceil(this.total / this.pageSize)
    }
  },
  methods: {
    onChange(v) {
      if (!isNaN(v)) {
        this.$emit('update:currentPage', v)
        this.$emit('change', v)
      }
    },
    next() {
      if (this.currentPage < this.pageCount) {
        this.onChange(this.currentPage + 1)
      }
    },
    prev() {
      if (this.currentPage > 1) {
        this.onChange(this.currentPage - 1)
      }
    }
  }
}
</script>

<style scoped>
.q-page-content {
  display: inline-flex;
  border-radius: 3px;
  overflow: hidden;
}

.q-page-content span {
  display: flex;
  width: 40px;
  height: 40px;
  border-top: 1px solid var(--divider);
  border-bottom: 1px solid var(--divider);
  align-items: center;
  justify-content: center;
}

.q-page-content span:first-child {
  border-radius: 3px 0 0 3px;
  border-left: 1px solid var(--divider);
}

.q-page-content span:last-child {
  border-radius: 0 3px 3px 0;
  border-right: 1px solid var(--divider);
}

.q-page-content .click:hover {
  background-color: var(--background);
}

.q-page-content .click.active {
  color: #fff;
  margin: -1px 0;
  border-color: var(--color);
  background-color: var(--color);
}

.q-page-content .click.disabled {
  color: var(--disabled);
  background-color: var(--background);
  cursor: no-drop;
}
</style>
