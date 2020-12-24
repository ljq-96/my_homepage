<template>
  <div>
    <head-vue>
      <div
        class="words"
        slot="center"
        style="letter-spacing: 1.8em; font-family: Trivia;"
      >
        QUAINT
      </div>
    </head-vue>
    <div class="layout">
      <div class="side">
        <list
          class="sticky"
          :style="{ top: $store.state.isPageDown ? '0' : '50px' }"
          :click="true"
          @send="toSticky"
          :title="'Sticky'"
          :data="sticky"
        ></list>
      </div>
      <div class="articles">
        <div class="catalog-container">
          <p>Catalog</p>
          <catalog></catalog>
          <catalog-image
            class="catalog-image"
            :color="$store.state.color.c1"
          ></catalog-image>
        </div>
        <article-item
          v-for="item in articles"
          :key="item._id"
          :tags="item.tags"
          :title="item.title"
          :time="item.time"
          :truncate="item.truncate"
          @send="setTag"
        ></article-item>
        <fluent-design
          v-slot="param"
          :backSize="100"
          class="load-more-container"
        >
          <fluent-design-item class="load-more" :param="param">
            <div @click="loadMore">加载更多</div>
          </fluent-design-item>
        </fluent-design>
      </div>
      <div class="side">
        <calendar></calendar>
        <list
          class="sticky"
          :title="'Tags'"
          :click="true"
          @send="setTag"
          :data="tags"
          :style="{ top: $store.state.isPageDown ? '0' : '50px' }"
        ></list>
      </div>
    </div>
  </div>
</template>

<script>
import HeadVue from '@/components/header/HeadVue.vue'
import ArticleItem from './ArticleItem'
import List from '@/components/List'
import Calendar from '@/components/Calendar'
import FluentDesign from '@/components/FluentDesign'
import FluentDesignItem from '@/components/FluentDesignItem'
import markdown from '@/common/markdown'
import Catalog from '@/views/management/BlogCatalog/Catalog'
import CatalogImage from '@/components/svgimage/1'
export default {
  components: {
    HeadVue,
    ArticleItem,
    Calendar,
    List,
    FluentDesign,
    FluentDesignItem,
    Catalog,
    CatalogImage
  },
  data() {
    return {
      page: 1,
      tag: '',
      articles: [],
      sticky: [],
      tags: []
    }
  },
  methods: {
    loadMore() {
      this.page++
      this.getArticles()
    },
    setTag(tag) {
      this.$router.push({ path: '/quaint/blog', query: { tag: tag } })
      this.tag = this.$route.query.tag
      this.articles.length = 0
      this.getArticles()
      window.scrollTo(0, window.innerHeight)
    },
    getArticles() {
      this.$request({
        url: '/articles',
        params: {
          page: this.page,
          tag: this.tag
        }
      }).then(res => {
        if (res.code === 200) {
          res.articles.forEach(item => {
            const { _id, tags, title, time } = item
            const truncate = markdown.render(item.truncate)
            this.articles.push({ _id, tags, title, time, truncate })
          })
        }
      })
    },
    toSticky(title) {
      this.$router.push({ path: '/quaint/article', query: { title: title } })
    }
  },
  created() {
    this.tag = this.$route.query.tag
    this.getArticles()
    this.$request({
      url: '/sticky'
    }).then(res => {
      if (res.code === 200) {
        this.sticky = res.articles
      }
    })
    this.$request({
      url: '/tag'
    }).then(res => {
      if (res.code === 200) {
        this.tags = res.tags
      }
    })
  }
}
</script>

<style>
.articles {
  flex-grow: 1;
  flex-shrink: 1;
  width: 100%;
  margin: 0 4px;
}

.text {
  width: 200px;
  height: 200px;
  margin: 10px;
  background: rgba(0, 0, 0, 0.1);
  line-height: 50px;
  text-align: center;
}

.catalog-container {
  position: relative;
  margin-bottom: 4px;
  padding: 20px;
  border-top: 3px solid var(--color);
  background-color: #fff;
  overflow: hidden;
}

.catalog-container .catalog-image {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 220px;
  height: 220px;
  transform: rotateY(180deg);
}

.catalog-container > p {
  margin-bottom: 5px;
  font-size: 16px;
}

.load-more-container {
  padding: 20px 0;
}

.load-more {
  width: 120px;
  height: 40px;
  margin: 0 auto;
  text-align: center;
  line-height: 40px;
}
</style>
