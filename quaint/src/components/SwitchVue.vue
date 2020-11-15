<template>
  <div class="switch" :class="{ on: status }"></div>
</template>

<script>
export default {
  props: {
    status: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.switch {
  position: relative;
  width: 40px;
  height: 20px;
  border-radius: 10px;
  border: 2px solid #4a4a4a;
  transition: 0.4s;
  cursor: pointer;
}

.switch::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 3px;
  transform: translateY(-50%);
  width: 10px;
  height: 10px;
  background-color: #4a4a4a;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  transition: 0.4s;
}

.switch.on {
  border: none;
  background-color: var(--color);
}

.switch.on::after {
  width: 12px;
  height: 12px;
  transform: translate(21px, -50%);
  background-color: #fff;
}
</style>
