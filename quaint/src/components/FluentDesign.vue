<template>
  <div class="fd" @mousemove="mousemove(vm, $event)" @mouseleave="mouseleave" @mouseenter="mouseenter">
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
import { throttle } from '@/common/utils'
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
      state: 0,
      vm: this
    }
  },
  methods: {
    mouseenter() {
      this.state = 1
    },
    mousemove: throttle((vm, e) => {
      vm.x = e.clientX
      vm.y = e.clientY
    }, 50),
    mouseleave() {
      this.state = 0
    }
  }
}
</script>

<style></style>
