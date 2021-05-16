<template>
  <div class="q-menu">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'QMenu',
  props: {
    defaultActive: {
      type: String
    }
  },
  data() {
    return {
      active: this.defaultActive,
      menuRoot: true
    }
  },
  provide() {
    return {
      rootId: this._uid,
      changeMenu: this.changeMenu
    }
  },
  methods: {
    changeMenu(e) {
      this.active = e
      console.log(e);
      this.$router.push({
        path: e
      })
    }
  }
}
</script>

<style scoped>
.q-menu {
  width: 160px;
  border-right: 1px solid var(--divider);
  background-color: #fff;
  background-color: var(--color);
}
</style>
