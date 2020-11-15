<template>
  <div
    :class="{ blur: param.blur }"
    @mousedown="mousedown"
    @mouseup="mouseup"
    @mouseleave="mouseleave"
    ref="shade"
    class="fd-item"
  >
    <div :style="{ transform: clickStyle }">
      <slot></slot>
      <div :style="setBackground()" class="shade"></div>
      <div :style="mousedownBackground" class="shade"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    param: Object,
    isRotate: {
      type: Boolean,
      default: true
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      state: 0,
      clickStyle: '',
      mousedownSize: 0,
      mousedownBackground: {
        backSize: 0,
        opacity: 0
      }
    }
  },
  watch: {
    param() {
      if (!this.isDisabled) {
        let el = this.$refs.shade
        let left = el.getBoundingClientRect().left
        let top = el.getBoundingClientRect().top
        let width = el.offsetWidth
        let height = el.offsetHeight
        let centerX = left + width / 2
        let centerY = top + height / 2
        let dist = Math.sqrt((this.param.mouseX - centerX) ** 2 + (this.param.mouseY - centerY) ** 2)
        this.rotateY = (20 * (this.param.mouseX - centerX)) / width
        this.rotateX = (-20 * (this.param.mouseY - centerY)) / height
        if (dist < this.param.borderSize + width) {
          this.x = this.param.mouseX - left
          this.y = this.param.mouseY - top
          if (this.x >= 0 && this.x <= width && this.y >= 0 && this.y <= height) {
            this.state = 2
          } else {
            this.state = 1
          }
        } else {
          this.state = 0
        }
      } else {
        this.state = 0
      }
    }
  },
  methods: {
    setBackground() {
      if (this.param.state) {
        if (this.state === 0) {
          return {
            border: `${this.param.width}px solid transparent`
          }
        } else if (this.state === 1) {
          return {
            border: `${this.param.width}px solid transparent`,
            borderImage: `radial-gradient(circle ${this.param.borderSize}px at ${this.x}px ${this.y}px, ${this.param.borderColor}, transparent) ${this.param.width}`
          }
        } else if (this.state === 2) {
          return {
            border: `${this.param.width}px solid transparent`,
            borderImage: `radial-gradient(circle ${this.param.borderSize}px at ${this.x}px ${this.y}px, ${this.param.borderColor}, transparent) ${this.param.width}`,
            backgroundImage: `radial-gradient(circle ${this.param.backSize}px at ${this.x}px ${this.y}px, ${this.param.backColor}, transparent)`
          }
        }
      }
    },
    mousedown() {
      if (this.isRotate) {
        this.clickStyle = `scale(0.95) rotateX(${this.rotateX}deg) rotateY(${this.rotateY}deg)`
      }
      this.mousedownSize = 0
      clearInterval(this.fn)
      this.$set(this.mousedownBackground, 'opacity', 1)
      this.fn = setInterval(() => this.mousedownLight(), 50)
    },
    mouseup() {
      if (this.isRotate) {
        this.clickStyle = 'scale(1) rotateX(0) rotateY(0)'
      }
      clearInterval(this.fn)
      this.fn = setInterval(() => this.mousedownLight(), 10)
    },
    mouseleave() {
      if (this.isRotate) {
        this.clickStyle = 'scale(1) rotateX(0) rotateY(0)'
      }
      this.$set(this.mousedownBackground, 'opacity', 0)
    },
    mousedownLight() {
      if (this.mousedownSize < this.param.backSize * 1.5) {
        this.mousedownSize += 5
        this.$set(
          this.mousedownBackground,
          'backgroundImage',
          `radial-gradient(circle ${this.mousedownSize}px at ${this.x}px ${this.y}px, ${this.param.backColor}, transparent)`
        )
      } else {
        this.$set(this.mousedownBackground, 'opacity', 0)
        clearInterval(this.fn)
      }
    }
  }
}
</script>

<style scoped>
.fd-item {
  position: relative;
  perspective: 500px;
}

.fd-item > div {
  height: 100%;
  transition: 0.6s cubic-bezier(0.18, 0.89, 0.32, 1.28);
}

.shade {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-repeat: no-repeat !important;
  background-origin: border-box !important;
  pointer-events: none;
  transition-duration: 0.2s;
  transition-property: opacity;
}
</style>
