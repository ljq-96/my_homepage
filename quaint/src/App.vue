<template>
  <div @contextmenu.prevent id="app">
    <nav-vue v-if="$route.meta.keepAlive"></nav-vue>
    <router-view></router-view>
    <footer-vue v-if="$route.meta.keepAlive"></footer-vue>
  </div>
</template>

<script>
import NavVue from '@/components/header/NavVue'
import FluentDesign from './common/FluentDesign'
import FooterVue from './components/Footer'

export default {
  name: 'App',
  components: {
    NavVue,
    FooterVue
  },
  created() {
    const color = window.localStorage.getItem('color') || 'rgba(185, 64, 71)'
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
