<template>
  <div @contextmenu.prevent id="app">
    <router-view></router-view>
    <footer-vue></footer-vue>
  </div>
</template>

<script>
import FooterVue from '@/components/Footer'
export default {
  components: {
    FooterVue
  }
}
</script>
