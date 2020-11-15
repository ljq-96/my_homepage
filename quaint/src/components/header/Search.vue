<template>
  <fluent-design
    v-slot="param"
    :width="1"
    :borderSize="40"
    :backSize="250"
    :style="{ height: setHeight }"
    :class="{ onsearch: isOnSearch }"
    class="search"
  >
    <input @click.stop="onSearch" @input="suggestion(vm)" @keyup.enter="toSearch()" v-model="words" type="text" />
    <div class="sug-list">
      <fluent-design-item :param="param" v-for="item in list" :key="item">
        <a :href="`http://www.baidu.com/s?wd=${item}`" target="_blank">{{ item }}</a>
      </fluent-design-item>
    </div>
    <div class="search-placeholder">S E A R C H</div>
  </fluent-design>
</template>

<script>
import { debounce } from '@/common/utils'
import FluentDesign from '../FluentDesign'
import FluentDesignItem from '../FluentDesignItem'
export default {
  components: {
    FluentDesign,
    FluentDesignItem
  },
  data() {
    return {
      isOnSearch: false,
      words: '',
      list: [],
      vm: this
    }
  },
  methods: {
    onSearch() {
      this.isOnSearch = true
    },
    closeSearch() {
      this.words = ''
      this.isOnSearch = false
      this.list.length = 0
    },
    suggestion: debounce(vm => {
      const onScript = document.createElement('script')
      onScript.src = `https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${vm.words}&cb=setSug`
      document.querySelector('body').appendChild(onScript)
    }, 500),
    setSug(list) {
      this.list = list.s.slice(0, 6)
    },
    toSearch() {
      if (/\b(([\w-]+:\/\/?|www[.])[^\s()<>]+(?:[\w\d]+|([^[:punct:]\s]|)))/.test(this.words)) {
        if (/^http/.test(this.words)) {
          return window.open(this.words)
        }
        return window.open('https://' + this.words)
      }
      window.open(`http://www.baidu.com/s?wd=${this.words}`, '_blank')
    }
  },
  created() {
    window.setSug = this.setSug.bind(this)
  },
  computed: {
    setHeight() {
      if (this.isOnSearch) {
        if (this.list.length) {
          return 60 + this.list.length * 30 + 'px'
        }
        return 40 + 'px'
      }
      return 60 + 'px'
    }
  }
}
</script>

<style>
.search {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%);
  width: 500px;
  height: 60px;
  transition: 0.4s;
  overflow: hidden;
}

.search-placeholder {
  position: absolute;
  bottom: 0;
  width: 100%;
  line-height: 60px;
  text-align-last: justify;
  font-size: 50px;
  font-family: Trivia;
  color: #fff;
  transition: 0.4s;
  pointer-events: none;
}

.search input {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 0 15px;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: default;
}

.search.onsearch {
  width: 350px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(5px);
  border-radius: 5px;
}

.search.onsearch .search-placeholder {
  bottom: -60px;
}

.search.onsearch input {
  height: 40px;
  cursor: text;
}

.search .sug-list {
  padding: 10px 0;
}

.search .sug-list a {
  display: block;
  height: 30px;
  line-height: 30px;
  padding: 0 15px;
}

.search.search.onsearch .sug-list {
  margin-top: 40px;
  border-top: 2px solid var(--color);
}
</style>
