<template>
  <div>{{ temp }}_</div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: 'Hello World'
    }
  },
  data() {
    return {
      temp: ''
    }
  },
  mounted() {
    let index = 0
    let start = 0
    let delay = 400
    let typing = time => {
      if (time - start > delay) {
        this.temp = this.text.slice(0, ++index)
        delay = 500 - Math.random() * 400
        start = time
      }
      if (index !== this.text.length) window.requestAnimationFrame(typing)
    }
    typing()
  }
}
</script>

<style></style>
