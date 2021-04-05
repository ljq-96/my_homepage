<template>
  <div @click="addItem" class=" item">
    <q-icon icon="plus"></q-icon>
  </div>
</template>

<script>
export default {
  methods:{
    addItem() {
      this.$emit('addBookMark')
    }
  }
}
</script>

<style scoped>
.item {
  position: relative;
  height: 100%;
  background-color: var(--color);
}

.iconfont {
  font-size: 55px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: fff;
}
</style>