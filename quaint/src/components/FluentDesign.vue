<template>
  <div class="fd" @mousemove="mousemove" @mouseleave="mouseleave" @mouseenter="mouseenter">
    <slot
      :borderColor="borderColor"
      :backColor="backColor"
      :width="width"
      :borderSize="borderSize"
      :backSize="backSize"
      :mouseX="x"
      :mouseY="y"
      :state="state"
      :blur="blur"
    ></slot>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: 2
    },
    borderSize: {
      type: Number,
      default: 100
    },
    backSize: {
      type: Number,
      default: 0
    },
    borderColor: {
      type: String,
      default: 'rgba(0, 0, 0, 0.6)'
    },
    backColor: {
      type: String,
      default: 'rgba(0, 0, 0, 0.1)'
    },
    blur: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      x: 0,
      y: 0,
      target: null,
      state: 0
    }
  },
  methods: {
    mouseenter() {
      this.state = 1
    },
    mousemove(e) {
      this.x = e.clientX
      this.y = e.clientY
    },
    mouseleave() {
      this.state = 0
    }
  }
}
</script>

<style>
</style>
