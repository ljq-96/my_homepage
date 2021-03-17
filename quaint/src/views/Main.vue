<template>
  <div @contextmenu.prevent id="app">
    <head-vue @click.native="$refs.search.closeSearch()">
      <search ref="search" slot="center"></search>
    </head-vue>
    <router-view></router-view>
    <footer-vue></footer-vue>
  </div>
</template>

<script>
import FooterVue from '@/components/Footer'
import HeadVue from '@/components/header/HeadVue.vue'
import Search from '@/components/header/Search.vue'
export default {
  components: {
    FooterVue,
    HeadVue,
    Search
  }
}
</script>
