<template>
  <div @click.stop="closeMenu">
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
import Calendar from '@/components/Calendar'
import List from '@/components/List'
import BookMarks from './BookMarks'
import { getWeibo } from '../../network/other'

export default {
  components: {
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
    getWeibo().then(res => {
      if (res.ok) {
        this.weiboHot = res.data
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
