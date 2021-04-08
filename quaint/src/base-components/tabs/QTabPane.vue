<template>
  <div v-show="label === $parent.activeLabel" class="q-tab-pane">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'QTabPane',
  props: {
    label: {
      type: String,
      default: 'label'
    }
  }
}
</script>

<style scoped>
.q-tab-pane {
  padding: 15px;
}
</style>
