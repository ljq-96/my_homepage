<template>
  <div class="blog-container layout">
    <div class="side left">
      <q-card class="sticky">
        <template #title>
          <p class="tag-title">Sticky</p>
        </template>
        <template #content>
          <div
            @click="toSticky(item.name)"
            class="tag-item"
            v-for="(item, index) in sticky"
            :key="index"
          >
            <span>{{ item.title }}</span>
          </div>
        </template>
      </q-card>
    </div>
    <div class="articles">
      <q-card headLine="var(--color)" class="catalog-container">
        <template #title>
          <p class="catalog-title">文章汇总</p>
        </template>
        <template #content>
          <catalog-item
            @click="catalogClick"
            :disabled="true"
            :list.sync="inCatalog"
          ></catalog-item>
          <catalog-image
            class="catalog-image"
            :color="$store.state.color.css()"
          ></catalog-image>
        </template>
      </q-card>
      <q-card
        v-for="item in articles"
        :key="item._id"
        class="article-item article-content"
      >
        <template #title>
          <div class="aiticle-item-head">
            <span>{{ item.create_time | formatDate('YYYY-MM-DD hh:mm:ss') }}</span>
          </div>
          <router-link
            class="aiticle-item-title"
            :to="'/quaint/article/' + item._id"
            >{{ item.title }}</router-link
          >
        </template>
        <template #content>
          <div class="desc" v-html="item.truncate"></div>
          <div class="aiticle-item-head">
            <q-tag
              v-for="j in item.tags"
              :key="j"
              @click.native="
                $router.push({ path: '/quaint/blog', query: { tag: j } })
              "
              >#{{ j }}</q-tag
            >
          </div>
        </template>
      </q-card>
      <fluent-design v-slot="param" :backSize="100" class="load-more-container">
        <fluent-design-item class="load-more" :param="param">
          <div @click="loadMore">加载更多</div>
        </fluent-design-item>
      </fluent-design>
    </div>
    <div class="side right">
      <calendar></calendar>
      <q-card class="sticky">
        <template #title>
          <p class="tag-title">Tags</p>
        </template>
        <template #content>
          <div
            @click="toTag(item.name)"
            class="tag-item"
            v-for="(item, index) in tags"
            :key="index"
          >
            <span>{{ item.name }}</span>
            <span class="tag-item-count">{{ item.value }}</span>
          </div>
        </template>
      </q-card>
    </div>
  </div>
</template>

<script>
import List from '@/components/List'
import Calendar from '@/components/Calendar'
import FluentDesign from '@/components/FluentDesign'
import FluentDesignItem from '@/components/FluentDesignItem'
import markdown from '@/common/markdown'
import CatalogImage from '@/components/svgimage/1'
import CatalogItem from '../management/BlogCatalog/CatalogItem'
import { getCatalogIn } from '../../network/catalog'
import { getBlogList, getBlogTags } from '../../network/blog'
import { tree } from '../../common/utils'
export default {
  components: {
    Calendar,
    List,
    FluentDesign,
    FluentDesignItem,
    CatalogImage,
    CatalogItem
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      tag: this.$route.query.tag,
      articles: [],
      sticky: [],
      tags: [],
      inCatalog: []
    }
  },
  methods: {
    loadMore() {
      this.currentPage++
      this.getArticles()
    },
    toTag(tag) {
      this.$router.push({ path: '/quaint/blog', query: { tag: tag } })
    },
    getArticles() {
      getBlogList({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        tag: this.tag
      }).then(res => {
        if (res.ok) {
          const blogs = res.data.map(item => {
            item.truncate = markdown.render(item.truncate)
            return item
          })
          this.articles.push(...blogs)
        }
      })
    },
    toSticky(title) {
      this.$router.push({ path: '/quaint/article/', query: { title: title } })
    },
    catalogClick(item) {
      const { type, id } = item
      if (type === 'DOC') {
        this.$router.push({
          path: '/quaint/article/' + id
        })
      } else {
        item.isOpen && tree(item => (item.isOpen = false), item.children)
        this.$set(item, 'isOpen', !item.isOpen)
      }
    }
  },
  created() {
    this.getArticles()
    getBlogList({ sticky: true }).then(res => {
      if (res.ok) {
        this.sticky = res.data
      }
    })
    getBlogTags().then(res => {
      if (res.ok) {
        this.tags = res.data
      }
    })
    getCatalogIn().then(res => {
      if (res.ok) {
        this.inCatalog = res.data
      }
    })
  },
  watch: {
    $route() {
      this.tag = this.$route.query.tag
      this.articles.length = 0
      this.getArticles()
    }
  }
}
</script>

<style scoped>
.articles {
  flex-grow: 1;
  flex-shrink: 1;
  width: 100%;
  margin: 0 15px;
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

.article-item {
  margin: 15px 0;
}

.aiticle-item-head {
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  color: var(--disabled);
}

.aiticle-item-title {
  display: block;
  position: relative;
  height: 40px;
  line-height: 40px;
  font-size: 24px;
  color: var(--title);
}

.aiticle-item-title:hover {
  color: var(--color);
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

.tag-title,
.catalog-title {
  font-size: 16px;
}

.tag-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 8px;
  margin: 2px 0;
  border-radius: 4px;
}

.tag-item:hover {
  background-color: var(--colorOpc1);
}

.tag-item-count {
  padding: 2px 6px;
  color: var(--sub);
  font-size: 12px;
  border-radius: 4px;
  background-color: var(--background);
}
</style>
