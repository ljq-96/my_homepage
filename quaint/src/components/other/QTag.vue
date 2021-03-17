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
  border: 1px solid #e8eaec;
  border-radius: 2px;
  background: #f7f7f7;
  font-size: 12px;
  vertical-align: middle;
  font-family: 'Fira Code';
}

.q-tag-close {
  margin-left: 5px;
  color: #aaa;
  cursor: pointer;
}
</style>
