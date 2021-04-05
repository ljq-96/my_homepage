<template>
  <div class="layout">
    <div class="blog-catalog side">
      <q-card class="sticky">
        <template #title>
          <p>文章汇总</p>
        </template>
        <template #content>
          <catalog-item
            @click="catalogClick"
            :disabled="true"
            :list.sync="inCatalog"
          ></catalog-item>
        </template>
        <template #extra>
          <span>展开/关闭</span>
        </template>
      </q-card>
    </div>
    <div class="article">
      <q-card headLine="var(--color)">
        <template #title>
          <div class="article-title">
            <div class="suptitle">
              <h1>{{ article.title }}</h1>
            </div>
            <div class="subtitle">
              <q-tag
                v-for="item in article.tags"
                :key="item"
                @click.native="
                  $router.push({ path: '/quaint/blog', query: { tag: item } })
                "
                >#{{ item }}</q-tag
              >
              <span>{{
                article.create_time | formatDate('YYYY-MM-DD hh:mm:ss')
              }}</span>
            </div>
          </div>
        </template>
        <template #content>
          <div class="article-content" v-html="article.content"></div>
        </template>
        <template #extra>
          <q-tip placement="bottom" tip="编辑">
            <q-button
              @click="$router.push({ path: '/edit/' + article._id })"
              plain
            >
              <i class="iconfont icon-edit"></i>
            </q-button>
          </q-tip>
        </template>
      </q-card>
      <div class="article-bottom">
        <q-card>
          <template #title>
            <span>上一篇</span>
          </template>
          <template #content>
            <router-link
              v-if="prev"
              :to="`/quaint/article/${prev._id}`"
              >{{ prev.title }}</router-link
            >
            <span v-else>没有上一篇了</span>
          </template>
        </q-card>
        <q-card>
          <template #extra>
            <span>下一篇</span>
          </template>
          <template #content>
            <router-link
              v-if="next.title"
              :to="`/quaint/article/${next._id}`"
              >{{ next.title }}</router-link
            >
          </template>
          <span v-if>没有下一篇了</span>
        </q-card>
      </div>
    </div>

    <div class="side">
      <calendar></calendar>
      <q-card class="sticky article-catalog">
        <template #title>
          <p>目录</p>
        </template>
        <template #content>
          <catalog-item
            @click="articleCatalogClick"
            :disabled="true"
            :list.sync="articleCatalog"
            layout="icon"
          ></catalog-item>
        </template>
      </q-card>
    </div>
  </div>
</template>

<script>
import { tree } from '../../common/utils'
import Calendar from '@/components/Calendar'
import CatalogItem from '../management/BlogCatalog/CatalogItem'
import { getCatalogIn } from '../../network/catalog'
import { getBlogOne } from '../../network/blog'
import markdown from '@/common/markdown'
let timer = 0
export default {
  components: {
    Calendar,
    CatalogItem
  },
  data() {
    return {
      article: {},
      next: {},
      prev: {},
      inCatalog: [],
      articleCatalog: [],
      isBlogCatalog: true
    }
  },
  methods: {
    setCatalog() {
      const root = { children: [] }
      const titleArr = this.article.content.match(/<h.>(.*?)<\/h.>/g)
      let current = root
      titleArr.forEach(item => {
        const level = item[2]
        const id = Number(
          Math.random()
            .toString()
            .substr(3, 3) + Date.now()
        ).toString(36)
        const title = item.match(/>(.*?)</)[1]
        this.article.content = this.article.content.replace(
          item,
          `<h${level} data-id="${id}">${title}</h${level}>`
        )
        const obj = {
          title: title,
          id: id,
          level: level,
          children: [],
          parent: null,
          isCurrent: false,
          isOpen: false
        }
        while (current !== root && current.level - obj.level !== -1) {
          current = current.parent
        }
        obj.parent = current
        obj.parent.children.push(obj)
        current = obj
      })
      this.articleCatalog = root.children
      this.$nextTick(() => {
        this.els = Array.from(document.querySelectorAll('[data-id]'))
        this.scrollFn()
        window.addEventListener('scroll', this.scrollFn)
      })
    },
    scrollFn() {
      const id = this.els
        .reduce((a, b) =>
          Math.abs(a.offsetTop - pageYOffset) <
          Math.abs(b.offsetTop - pageYOffset)
            ? a
            : b
        )
        .getAttribute('data-id')
      tree(item => {
        if (item.id === id) {
          item.isCurrent = true
          item.isOpen = true
          let v = item
          while (v) {
            v.isOpen = true
            v = v.parent
          }
        } else {
          item.isCurrent = false
        }
      }, this.articleCatalog)

      this.$nextTick(() => {
        const el = document.querySelector('.article-catalog .isCurrent')
        if (el) {
          const elParent = el.offsetParent
          const height = elParent.clientHeight / 2
          const elScroll = elParent.children[1]
          if (el.offsetTop - elScroll.scrollTop !== height) {
            elScroll.scrollTo(0, el.offsetTop - height)
          }
        }
      })
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
    },
    articleCatalogClick(item) {
      clearTimeout(timer)
      window.removeEventListener('scroll', this.scrollFn)
      document.querySelector(`[data-id="${item.id}"]`).scrollIntoView()
      timer = setTimeout(() => {
        window.addEventListener('scroll', this.scrollFn)
      }, 500)
    }
  },
  watch: {
    $route: {
      handler: function(to, from) {
        getBlogOne(to.params.id).then(res => {
          if (res.ok) {
            const { content, ...info } = res.data.blog
            this.article = {
              ...info,
              content: markdown.render(content)
            }
            this.next = res.data.next
            this.prev = res.data.prev

            this.setCatalog()
            tree(item => {
              if (item.title === to.query.title) {
                this.$set(item, 'isCurrent', true)
              } else {
                this.$set(item, 'isCurrent', false)
              }
            }, this.inCatalog)
          }
        })
      },
      immediate: true
    }
  },
  created() {
    getCatalogIn().then(res => {
      if (res.ok) {
        this.inCatalog = res.data
        tree(item => {
          if (item.title === this.$route.query.title) {
            this.$set(item, 'isCurrent', true)
          } else {
            this.$set(item, 'isCurrent', false)
          }
        }, res.data)
      }
    })
  }
}
</script>

<style scoped>
.article {
  flex-grow: 1;
  margin: 0 15px;
  user-select: text;
}

.blog-catalog {
  position: relative;
}

.blog-catalog.close {
  width: 0;
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

.article-title .subtitle a:hover {
  color: var(--color);
  text-decoration: underline;
}

.article-bottom {
  display: flex;
  margin-top: 15px;
  user-select: none;
}

.article-bottom > div {
  flex: 1;
}

.article-bottom > div:nth-child(1) {
  margin-right: 7.5px;
}

.article-bottom > div:nth-child(2) {
  margin-left: 7.5px;
  text-align: right;
}

.article-bottom span {
  color: var(--disabled);
}

.article-bottom a:hover {
  color: var(--color);
  text-decoration: underline;
}
</style>
