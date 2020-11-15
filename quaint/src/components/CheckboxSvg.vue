<template>
  <svg
    :style="{ width: size + 'px', height: size + 'px' }"
    :class="{ checked: state === 1, remove: state === 2 }"
    class="checkbox-svg"
    viewBox="0 0 40 40"
  >
    <polyline class="line" points="5,27 5,5 35,5 35,35 5,35 5,27" fill="none" stroke-linecap="round" stroke-width="4" />
    <polyline
      class="line"
      points="5,27 20,35 35,5"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="4"
    />
    <polyline
      class="line"
      points="5,27 5,5 35,35 35,5 5,35"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="4"
    />
  </svg>
</template>

<script>
export default {
  props: {
    state: {
      type: Number,
      default: 0
    },
    size: {
      type: Number,
      default: 14
    }
  }
}
</script>

<style>
.checkbox-svg {
  stroke: #fff;
  pointer-events: none;
}

.checkbox-svg .line:nth-child(1) {
  stroke-dasharray: 120;
  stroke-dashoffset: 0;
  transition-duration: 0.4s;
  transition-delay: 0.4s;
}

.checkbox-svg .line:nth-child(2) {
  stroke-dasharray: 60;
  stroke-dashoffset: 60;
  transition-duration: 0.4s;
  transition-delay: 0s;
}

.checkbox-svg .line:nth-child(3) {
  stroke-dasharray: 148 22 42 30 42;
  stroke-dashoffset: 294;
  transition-duration: 1s;
}

.checkbox-svg.checked .line:nth-child(1),
.checkbox-svg.remove .line:nth-child(1) {
  stroke-dashoffset: 120;
  transition-delay: 0s;
}

.checkbox-svg.checked .line:nth-child(2) {
  stroke: rgba(255, 255, 255, 0.5);
  stroke-dashoffset: 0;
  transition-delay: 0.4s;
}

.checkbox-svg.remove .line:nth-child(2) {
  stroke-dashoffset: 60;
  transition-delay: 0s;
}

.checkbox-svg.remove .line:nth-child(3) {
  stroke-dashoffset: 148;
}
</style>
