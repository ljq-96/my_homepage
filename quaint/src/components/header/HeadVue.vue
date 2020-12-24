<template>
  <div class="header">
    <nav-vue></nav-vue>
    <canvas-wallpaper ref="canvas"></canvas-wallpaper>
    <slot name="center"></slot>
    <div @click="scrollDown" class="arrow"></div>
    <color-select
      @initCanvas="initCanvas"
      :style="{ right: $store.state.onSetting ? 0 : -500 + 'px' }"
    ></color-select>
  </div>
</template>

<script>
import NavVue from './NavVue'
import CanvasWallpaper from '../CanvasWallpaper'
import ColorSelect from './ColorSelect'
export default {
  components: {
    CanvasWallpaper,
    ColorSelect,
    NavVue
  },
  data() {
    return {
      top: 0
    }
  },
  methods: {
    scroll(event) {
      this.top = window.pageYOffset / 2
    },
    scrollDown() {
      window.scrollTo(0, window.innerHeight)
    },
    initCanvas() {
      this.$refs.canvas.initCanvas()
    }
  },
  created() {
    window.addEventListener('scroll', this.scroll)
  }
}
</script>

<style scoped>
.header {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.arrow {
  position: absolute;
  left: 50%;
  bottom: 40px;
  height: 50px;
  width: 31px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  transform: translate(-50%);
  cursor: pointer;
  transition: 0.4s;
}

.arrow::after {
  content: '';
  display: block;
  width: 4px;
  height: 8px;
  margin: 10px auto;
  border-radius: 2px;
  background-color: rgba(255, 255, 255, 0.6);
  animation: arrow 1.5s ease-in infinite;
}

.arrow:hover {
  border-color: #fff;
  filter: drop-shadow(0 0 2px #fff);
}

@keyframes arrow {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(20px);
  }
}
</style>
