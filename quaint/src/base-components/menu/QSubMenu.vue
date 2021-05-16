<template>
  <div class="q-sub-menu">
    <div @click="open = !open" class="q-sub-menu-title">
      <div>
        <slot name="title"></slot>
      </div>
      <q-icon
        class="more"
        :style="{ transform: `rotate(${open ? '180deg' : '0deg'})` }"
        icon="down"
      ></q-icon>
    </div>
    <div
      :style="{ height: open ? childrenLen * 50 + 'px' : '0px' }"
      class="q-sub-menu-content"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QSubMenu',
  props: {
    defaultOpen: {
      type: Boolean
    }
  },
  data() {
    return {
      open: this.defaultOpen || false,
      childrenLen: 0
    }
  },
  mounted() {
    this.childrenLen = this.$slots.default.length
  }
}
</script>

<style scoped>
.q-sub-menu-title {
  display: flex;
  justify-content: space-between;
  width: 160px;
  height: 50px;
  line-height: 50px;
  padding: 0 20px;
  color: rgba(255, 255, 255, 0.6);
}

.q-sub-menu-content {
  overflow: hidden;
  width: 160px;
  transition: 0.4s;
}

.q-sub-menu-content > .q-menu-item {
  padding-left: 40px;
}

.q-sub-menu-title .q-icon.more {
  transition: 0.4s;
  color: rgba(255, 255, 255, 0.4);
}
</style>
