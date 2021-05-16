<template>
  <div class="card q-tab">
    <div class="q-tab-nav-wrap">
      <div
        v-for="item in labels"
        :key="item"
        @click="activeLabel = item"
        :class="{ active: activeLabel === item }"
        class="q-tab-nav-item"
      >
        {{ item }}
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'QTab',
  data() {
    return {
      labels: [],
      activeLabel: ''
    }
  },
  mounted() {
    this.labels = this.$children.map(item => item.label)
    this.activeLabel = this.$children[0].label
  }
}
</script>

<style scoped>
.q-tab {
  padding: 0 15px;
}

.q-tab-nav-wrap {
  display: flex;
  height: 36px;
  border-bottom: 1px solid var(--divider);
}

.q-tab-nav-item {
  height: 36px;
  line-height: 36px;
  padding: 0 20px;
  cursor: pointer;
}

.q-tab-nav-item.active {
  
  border-bottom: 2px solid var(--color);
}
</style>
