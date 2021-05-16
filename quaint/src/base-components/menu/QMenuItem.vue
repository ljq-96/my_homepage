<template>
  <div
    @click="menuClick"
    :class="{ active: parent.active === name }"
    class="q-menu-item"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'QMenuItem',
  inject: ['rootId', 'changeMenu'],
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      parent: null
    }
  },
  methods: {
    menuClick() {
      this.changeMenu(this.name)
    }
  },
  created() {
    let parent = this.$parent
    while (parent._uid !== this.rootId) {
      parent = parent.$parent
    }
    this.parent = parent
  }
}
</script>

<style scoped>
.q-menu-item {
  width: 160px;
  height: 50px;
  line-height: 50px;
  padding: 0 20px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.6);
}

.q-menu-item:hover {
  color: #fff;
  /* color: var(--color); */
}

.q-menu-item.active {
  color: #fff;
  /* border-right: 2px solid var(--color); */
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
