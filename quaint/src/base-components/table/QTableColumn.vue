<template>
  <div>
    <slot :row="tableData.data[prop]" :prop="prop"></slot>
  </div>
</template>

<script>
export default {
  name: 'QTableColumn',
  inject: ['tableData'],
  props: {
    prop: {
      type: String
    },
    label: {
      type: String
    },
    formatter: {
      type: Function
    }
  },
  created() {}
}
</script>

<style scoped></style>
