<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  created() {
    const color = window.localStorage.getItem('color') || 'tomato'
    this.$store.commit('setColor', color)
  }
}
</script>

<style>
@import './assets/css/base.css';
@import './assets/css/logofont.css';
@import './assets/css/iconfont.css';
@import './assets/css/weatherfont.css';
@import './assets/css/code.css';
@import './assets/css/blog.css';
</style>
