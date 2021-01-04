<template>
  <div class="q-button-group">
    <slot></slot>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.q-button-group {
  display: flex;
}

.q-button-group > .q-button {
  position: relative;
  z-index: 2;
}

.q-button-group > .q-button:focus {
  z-index: 1;
}

.q-button-group > .q-button:first-child {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right-color: rgba(255, 255, 255, 0.4);
}

.q-button-group > .q-button:last-child {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left-color: rgba(255, 255, 255, 0.4);
}

.q-button-group > .q-button:not(:first-child):not(:last-child) {
  border-radius: 0;
  border-right-color: rgba(255, 255, 255, 0.4);
  border-left-color: rgba(255, 255, 255, 0.4);
}
</style>
