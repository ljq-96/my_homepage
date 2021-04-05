<template>
  <div
    @click="change"
    class="switch"
    :class="{ on: value, focus: focus }"
  ></div>
</template>

<script>
export default {
  name: 'QSwitch',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      focus: false,
      timer: null
    }
  },
  methods: {
    change() {
      clearTimeout(this.timer)
      this.focus = true
      this.timer = setTimeout(() => {
        this.focus = false
      }, 600)
      this.$emit('input', !this.value)
    }
  },
  watch: {
    value(newVal) {
      this.$emit('change', newVal)
    }
  }
}
</script>

<style scoped>
.switch {
  display: inline-block;
  position: relative;
  width: 40px;
  height: 20px;
  border-radius: 10px;
  background-color: var(--border);
  transition: 0.6s;
  cursor: pointer;
  box-shadow: 0 0 0 0 var(--border);
}

.switch::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 5px;
  transform: translateY(-50%);
  width: 12px;
  height: 12px;
  background-color: #fff;
  width: 10px;
  height: 10px;
  border-radius: 6px;
  transition: 0.6s;
}

.switch.on {
  border: none;
  background-color: var(--color);
  box-shadow: 0 0 0 0 var(--colorLum4);
}

.switch.on::after {
  transform: translate(21px, -50%);
}

.switch.focus::after {
  width: 16px;
}

.switch.on.focus::after {
  left: -1px;
}

.switch.focus {
  animation: switch-focus 0.6s;
}

@keyframes switch-focus {
  to {
    box-shadow: 0 0 0 6px transparent;
  }
}
</style>
