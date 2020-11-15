<template>
  <div class="q-form">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    model: {
      type: Object
    },
    rules: {
      type: Object
    },
    labelWidth: {
      type: String
    }
  },
  provide() {
    return {
      form: this
    }
  },
  methods: {
    validate(callback) {
      const tasks = this.$children.filter(item => item.prop).map(item => item.validate())

      Promise.all(tasks)
        .then(() => {
          callback(true)
        })
        .catch(() => {
          callback(false)
        })
    }
  }
}
</script>

<style>

</style>
