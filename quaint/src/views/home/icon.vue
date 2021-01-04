<template>
  <a
    class="item"
    @contextmenu.prevent="openMenu"
    :href="icon.url"
    target="_blank"
  >
    <div class="logofont" :class="icon.icon"></div>
    <div class="title">{{ icon.title }}</div>
  </a>
</template>

<script>
export default {
  props: {
    icon: Object
  },
  data() {
    return {
      isDrag: false,
      isOver: false
    }
  },
  methods: {
    openMenu(e) {
      this.$emit('openMenu', e)
    }
  }
}
</script>

<style scoped>
.item {
  display: block;
  width: 100%;
  height: 100%;
  color: #fff;
  background: var(--color);
  cursor: default;
  position: relative;
  transition: 0.4s;
  overflow: hidden;
}

.item .logofont {
  font-size: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  /* color: #4a4a4a; */
  transform: translate(-50%, -50%);
  transition: 0.4s;
}

.item:hover .logofont {
  transform: translate(-50%, -50%) scale(1.1);
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.4);
}

.item .title {
  position: absolute;
  left: 5px;
  bottom: 2px;
  transition: 0.5s;
  pointer-events: none;
}
</style>
