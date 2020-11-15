<template>
  <div @click.stop="closeMenu">
    <head-vue>
      <search ref="search" slot="center"></search>
    </head-vue>
    <div class="layout">
      <book-marks ref="bookmark"></book-marks>
      <div class="side">
        <calendar></calendar>
        <list
          class="sticky"
          :title="'微博热搜'"
          :data="weiboHot"
          :gap="2"
          :style="{ top: $store.state.isPageDown ? '0' : '50px' }"
        ></list>
      </div>
    </div>
  </div>
</template>

<script>
import HeadVue from '@/components/header/HeadVue.vue'
import Search from '@/components/header/Search.vue'
import Calendar from '@/components/Calendar'
import List from '@/components/List'
import BookMarks from './BookMarks'

export default {
  components: {
    HeadVue,
    Search,
    Calendar,
    List,
    BookMarks
  },
  data() {
    return {
      menuDisplay: false,
      weiboHot: []
    }
  },
  methods: {
    // 关闭菜单
    closeMenu() {
      this.$refs.search.closeSearch()
      this.$refs.bookmark.closeMenu()
    }
  },
  created() {
    this.$request({
      url: '/news/weibo'
    }).then(res => {
      if (res.code === 200) {
        this.weiboHot = res.weibohot
      }
    })
  }
}
</script>

<style>
.layout > .fd {
  flex-grow: 1;
}
</style>
