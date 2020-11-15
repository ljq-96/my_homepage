<template>
  <div>
    <head-vue>
      <typing class="words" :text="title" slot="center"></typing>
    </head-vue>
    <div class="layout">
      <div class="blog-catalog side" :class="{ close: !isBlogCatalog }">
        <div class="sticky" :style="{ top: $store.state.isPageDown ? '0' : '50px' }">
          <div class="side-title">目录</div>
          <div class="blog-catalog-btn iconfont" @click="isBlogCatalog = !isBlogCatalog">&#xe7ec;</div>
          <catalog :current="title"></catalog>
        </div>
      </div>
      <div ref="article" class="article">
        <div class="article-title">
          <div class="suptitle">
            <h1>{{ title }}</h1>
            <router-link :to="{ path: '/edit', query: { title: title } }">
              <span class="iconfont">&#xe792;</span>
            </router-link>
          </div>
          <div class="subtitle">
            <span>{{ $dateFormatter(time, '-', 3) }}</span>
            <router-link v-for="(item, index) in tags" :to="{ path: '/blog', query: { tag: item } }" :key="index">
              <span>#{{ item }}</span>
            </router-link>
          </div>
        </div>
        <div class="article-content" v-html="content"></div>
      </div>
      <div class="side">
        <calendar></calendar>
        <article-catalog
          class="article-catalog sticky"
          :catalog="articleCatalog"
          :style="{ top: $store.state.isPageDown ? '0' : '50px' }"
        ></article-catalog>
      </div>
    </div>
  </div>
</template>

<script>
import HeadVue from '@/components/header/HeadVue.vue'
import Typing from '@/components/header/Typing'
import Calendar from '@/components/Calendar'
import ArticleCatalog from '@/views/article/ArticleCatalog'
import Catalog from '@/views/management/BlogCatalog/Catalog'
import markdown from '@/common/markdown'

export default {
  components: {
    HeadVue,
    Calendar,
    Catalog,
    ArticleCatalog,
    Typing
  },
  data() {
    return {
      content: '',
      tags: [],
      time: '',
      articleCatalog: {},
      isBlogCatalog: true
    }
  },
  computed: {
    title() {
      return this.$route.query.title
    }
  },
  methods: {
    setCatalog() {
      const root = { children: [] }
      const titleArr = this.content.match(/<h.>(.*?)<\/h.>/g)
      let current = root
      titleArr.forEach(item => {
        const level = item[2]
        const id = Math.random()
          .toString()
          .replace('.', '')
        const name = item.match(/>(.*?)</)[1]
        this.content = this.content.replace(item, `<h${level} data-id="${id}">${name}</h${level}>`)
        const obj = {
          name: name,
          id: id,
          level: level,
          children: [],
          parent: null,
          isInView: false
        }
        while (current !== root && current.level - obj.level !== -1) {
          current = current.parent
        }
        obj.parent = current
        obj.parent.children.push(obj)
        current = obj
      })
      console.log(root)
      this.articleCatalog = root.children
      this.$nextTick(this.onScroll)
    },
    onScroll() {
      const height = window.innerHeight
      const els = Array.from(document.querySelectorAll('[data-id]'))
      window.onscroll = e => {
        t(
          this.articleCatalog,
          els.reduce((a, b) => (Math.abs(a.offsetTop - pageYOffset) < Math.abs(b.offsetTop - pageYOffset) ? a : b))
            .getAttribute('data-id')
        )
        let time
        clearTimeout(time)
        time = setTimeout(() => {
          this.$nextTick(function() {
            const el = document.querySelector('.inview')
            if (el) {
              const elParent = el.offsetParent
              const height = elParent.clientHeight / 2
              const elScroll = elParent.children[1]
              if (el.offsetTop - elScroll.scrollTop !== height) {
                elScroll.scrollTo(0, el.offsetTop - height)
              }
            }
          })
        }, 500)
      }
      const t = (arr, id) => {
        arr.forEach(item => {
          if (item.id === id) {
            item.isInView = true
          } else {
            item.isInView = false
          }
          if (item.children.length) {
            t(item.children, id)
          }
        })
      }
    }
  },
  watch: {
    title() {
      this.$request({
        url: '/article/' + this.title
      }).then(res => {
        if (res.code === 200) {
          this.content = markdown.render(res.article.content)
          this.tags = res.article.tags
          this.time = res.article.time
          this.setCatalog()
        }
      })
    }
  },
  created() {
    this.$request({
      url: '/article/' + this.title
    }).then(res => {
      if (res.code === 200) {
        this.content = markdown.render(res.article.content)
        this.tags = res.article.tags
        this.time = res.article.time
        this.setCatalog()
      }
    })
  }
}
</script>

<style scoped>
@import '../../assets/css/code.css';
@import '../../assets/css/blog.css';
.article {
  flex-grow: 1;
  margin: 0 8px;
  user-select: text;
}

.blog-catalog {
  position: relative;
  /* transition: 0.4s; */
}

.blog-catalog-btn {
  display: none;
  position: absolute;
  right: -20px;
  top: 20px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  text-align: center;
  line-height: 30px;
  background-color: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  z-index: 10;
}

.blog-catalog-btn:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.blog-catalog.close {
  width: 0;
}

.blog-catalog.close .catalog,
.blog-catalog.close .side-title {
  display: none;
}

.blog-catalog.close .blog-catalog-btn {
  display: block;
  transform: rotate(180deg);
}

.blog-catalog:hover .blog-catalog-btn {
  display: block;
}

.article .side-title {
  font-size: 16px;
  margin-bottom: 5px;
}

.article-title {
  padding: 20px 16px;
  margin-bottom: 4px;
  background-color: #fff;
  border-top: 3px solid var(--color);
}

.article-title .suptitle {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  height: 40px;
}

.article-title .suptitle h1 {
  color: var(--color);
}

.article-title .suptitle .iconfont {
  font-size: 24px;
  color: var(--color);
}

.article-title .subtitle span,
.article-title .subtitle a {
  font-size: 12px;
  color: #bdbdbd;
  margin-right: 6px;
}

.article-content {
  background-color: #fff;
  padding: 10px 20px;
}

.article-catalog {
  padding: 10px 12px;
  /* line-height: 26px; */
  font-family: Firacode;
}
</style>
