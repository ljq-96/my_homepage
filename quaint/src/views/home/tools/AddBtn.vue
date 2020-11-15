<template>
  <div @click="addItem" class=" item">
    <div class="iconfont icon-jia"></div>
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