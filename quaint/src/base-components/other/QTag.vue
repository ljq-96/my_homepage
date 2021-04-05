<template>
  <div
    :style="{ background: color, borderColor: color, color: color }"
    class="q-tag"
  >
    <div>
      <slot></slot>
    </div>
    <div @click="close" v-if="closable" class="q-tag-close">X</div>
  </div>
</template>

<script>
export default {
  name: 'QTag',
  props: {
    color: String,
    closable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      this.$emit('close')
    }
  },
}
</script>

<style scoped>
.q-tag {
  display: inline-flex;
  height: 22px;
  line-height: 22px;
  margin-right: 6px;
  padding: 0 8px;
  border: 1px solid var(--divider);
  border-radius: 2px;
  color: var(--content);
  background: var(--background);
  font-size: 12px;
  vertical-align: middle;
  font-family: 'Fira Code';
  user-select: none;
}

.q-tag-close {
  margin-left: 5px;
  color: var(--disabled);
  cursor: pointer;
}
</style>
