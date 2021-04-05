<template>
  <i
    @click="click"
    class="iconfont q-icon"
    :class="'icon-' + icon"
    :style="{ color: color }"
  ></i>
</template>

<script>
export default {
  props: {
    icon: {
      type: String
    },
    color: {
      type: String
    }
  },
  methods: {
    click(e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style scoped>
.q-icon {
  display: inline-flex;
}
</style>
