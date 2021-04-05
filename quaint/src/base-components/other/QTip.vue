<template>
  <div
    class="q-tip"
    @click="click"
    @mouseenter="mouseenter"
    @mouseleave="mouseleave"
  >
    <slot></slot>
    <div
      ref="tip"
      :style="style"
      :class="[
        'q-tip-' + placement,
        'q-tip-' + theme,
        active ? 'q-tip-active' : ''
      ]"
      class="q-tip-content"
    >
      <slot name="tip">
        <div class="q-tip-str">
          {{ tip }}
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QTip',
  props: {
    tip: {
      type: String,
      default: 'tip'
    },
    placement: {
      type: String,
      default: 'top'
    },
    theme: {
      type: String,
      default: 'dark'
    },
    trigger: {
      type: String,
      default: 'hover'
    }
  },
  data() {
    return {
      style: '',
      active: false
    }
  },
  methods: {
    mouseenter() {
      if (this.trigger === 'hover') {
        this.active = true
      }
    },
    mouseleave() {
      if (this.trigger === 'hover') {
        this.active = false
      }
    },
    click() {
      if (this.trigger === 'click') {
        this.active = !this.active
      }
    }
  },
  mounted() {
    const { offsetWidth, offsetHeight } = this.$refs.tip

    if (this.placement === 'top') {
      this.style = { display: 'none', marginTop: -offsetHeight - 8 + 'px' }
    } else if (this.placement === 'bottom') {
      this.style = { display: 'none', marginBottom: -offsetHeight - 8 + 'px' }
    } else if (this.placement === 'right') {
      this.style = { display: 'none', marginRight: -offsetWidth - 8 + 'px' }
    } else if (this.placement === 'left') {
      this.style = { display: 'none', marginLeft: -offsetWidth - 8 + 'px' }
    }
  }
}
</script>

<style scoped>
.q-tip {
  position: relative;
  display: inline-block;
}

.q-tip-content {
  position: absolute;
  padding: 6px 0;
  max-width: 200px;
  text-align: center;
  word-break: keep-all;
  color: #fff;
  backdrop-filter: blur(5px);
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 4px;
  z-index: 999;
  font-size: 12px;
}

.q-tip-str {
  padding: 0 12px;
}

.q-tip-content::before {
  position: absolute;
  content: '';
  width: 0;
  height: 0;
  border: 6px solid transparent;
}

.q-tip .q-tip-content.q-tip-active {
  display: block !important;
}

.q-tip-content.q-tip-top {
  left: 50%;
  transform: translateX(-50%);
  top: 0;
}

.q-tip-content.q-tip-top::before {
  left: 50%;
  transform: translateX(-50%);
  bottom: -12px;
  border-top-color: rgba(0, 0, 0, 0.6);
}

.q-tip-content.q-tip-bottom {
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
}

.q-tip-content.q-tip-bottom::before {
  left: 50%;
  transform: translateX(-50%);
  top: -12px;
  border-bottom-color: rgba(0, 0, 0, 0.6);
}

.q-tip-content.q-tip-right {
  top: 50%;
  transform: translateY(-50%);
  right: 0;
}

.q-tip-content.q-tip-right::before {
  top: 50%;
  transform: translateY(-50%);
  left: -12px;
  border-right-color: rgba(0, 0, 0, 0.6);
}

.q-tip-content.q-tip-left {
  top: 50%;
  transform: translateY(-50%);
  left: 0;
}

.q-tip-content.q-tip-left::before {
  top: 50%;
  transform: translateY(-50%);
  right: -12px;
  border-left-color: rgba(0, 0, 0, 0.6);
}

.q-tip-content.q-tip-light {
  color: var(--content);
  background-color: rgba(255, 255, 255);
  filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.4));
}

.q-tip-content.q-tip-light.q-tip-top::before {
  border-top-color: rgba(255, 255, 255);
}

.q-tip-content.q-tip-light.q-tip-bottom::before {
  border-bottom-color: rgba(255, 255, 255);
}

.q-tip-content.q-tip-light.q-tip-right::before {
  border-right-color: rgba(255, 255, 255);
}

.q-tip-content.q-tip-light.q-tip-left::before {
  border-left-color: rgba(255, 255, 255);
}
</style>
