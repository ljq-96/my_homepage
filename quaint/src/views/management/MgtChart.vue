<template>
  <div class="chart">
    <div class="chart-wrap">
      <q-card align="center">
        <template #title>
          <q-icon class="card-icon" icon="tags"></q-icon>
          <span>标签</span>
        </template>
        <template #extra>
          <span>{{ tags.length }}个</span>
        </template>
        <template #content>
          <tag-chart
            class="chart-item"
            :list="tags"
            @addFilters="addFilters"
          ></tag-chart>
        </template>
      </q-card>
      <q-card>
        <template #title>
          <q-icon class="card-icon" icon="number"></q-icon>
          <span>字数</span>
        </template>
        <template #content>
          <words-chart
            class="chart-item chart-words"
            :list="words"
            @addFilters="addFilters"
          ></words-chart>
        </template>
      </q-card>
      <q-card>
        <template #title>
          <q-icon class="card-icon" icon="time-circle"></q-icon>
          <span>创建时间</span>
        </template>
        <template #content>
          <time-chart
            class="chart-item"
            :list="time"
            @addFilters="addFilters"
          ></time-chart>
        </template>
      </q-card>
    </div>
    <div class="article-wrap">
      <q-card align="center">
        <template #title>
          <q-icon class="card-icon" icon="table"></q-icon>
          <span>汇总</span>
        </template>
        <template #extra>
          <span>{{ articlesDisplay.length }}篇</span>
        </template>
        <template #content>
          <q-table
            :height="tableHeight + 'px'"
            :dataSource="articlesDisplay"
            :columns="columns"
          >
            <template #tags="{row, index}">
              <q-tag v-for="item in row.tags" :key="item">
                {{ item }}
              </q-tag>
            </template>
            <template #action="{row}">
              <q-button-group>
                <q-button
                  plain
                  @click="
                    $router.push({
                      path: '/edit/' + row._id
                    })
                  "
                >
                  <q-icon icon="edit"></q-icon>
                </q-button>

                <q-button plain @click="delArticle(row)">
                  <q-icon icon="delete"></q-icon>
                </q-button>
              </q-button-group>
            </template>
          </q-table>
        </template>
      </q-card>
      <div ref="height">
        <q-card align="center" class="article-filter">
          <template #title>
            <q-icon class="card-icon" icon="filter"></q-icon>
            <span>过滤器</span>
          </template>
          <template #extra>
            <q-button
              v-show="articleFilters.length"
              @click="articleFilters = []"
              plain
              >清空</q-button
            >
          </template>
          <template #content>
            <div>
              <q-tag
                closable
                @close="removeFilter(index)"
                v-for="(item, index) in articleFilters"
                :key="index"
              >
                {{ item.label }}: {{ item.name }}
              </q-tag>
              <q-tag v-show="articleFilters.length === 0">
                none
              </q-tag>
            </div>
          </template>
        </q-card>
        <q-card class="article-last-update">
          <template #title>
            <q-icon class="card-icon" icon="linechart"></q-icon>
            <span>最近更新</span>
          </template>
          <template #content>
            <div
              class="article-last-update-item"
              v-for="item in articlesLastUpdate"
            >
              <span>{{ item.title }}</span>
              <span>{{ item.update_time | formatDate('YYYY-MM-DD') }}</span>
            </div>
          </template>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import TagChart from '@/views/management/charts/TagChart'
import TimeChart from '@/views/management/charts/TimeChart'
import WordsChart from '@/views/management/charts/WordsChart'
import { getBlogTags, getBlogList, deleteBlog } from '../../network/blog'
export default {
  components: {
    TagChart,
    TimeChart,
    WordsChart
  },
  data() {
    return {
      tags: [],
      articles: [],
      articlesDisplay: [],
      articleFilters: [],
      tableHeight: '',
      columns: [
        {
          title: '#',
          filter: ({ index }) => {
            return index + 1
          }
        },
        {
          title: '标题',
          key: 'title'
        },
        {
          title: '标签',
          key: 'tags'
        },
        {
          title: '操作',
          key: 'action'
        }
      ]
    }
  },
  computed: {
    words() {
      const arr = [
        {
          name: '0~3',
          value: 0
        },
        {
          name: '3~6',
          value: 0
        },
        {
          name: '6~9',
          value: 0
        },
        {
          name: '9-12',
          value: 0
        },
        {
          name: '12+',
          value: 0
        }
      ]
      this.articles.forEach(item => {
        const i = Math.floor(item.content.length / 3000)
        arr[i > 4 ? 4 : i].value++
      })
      return arr
    },
    time() {
      const arr = []
      if (this.articles.length) {
        const first = new Date(this.articles[0].create_time)
        const last = new Date(
          this.articles[this.articles.length - 1].create_time
        )
        let year = last.getFullYear()
        let month = last.getMonth() + 1
        const m =
          (first.getFullYear() - last.getFullYear()) * 12 +
          (first.getMonth() - last.getMonth())

        for (let i = 0; i <= m; i++) {
          const name = [year, month].join('-')
          arr.push({
            name: name,
            value: 0
          })
          if (month === 12) {
            year++
            month = 1
          } else {
            month++
          }
        }
        this.articles.forEach(item => {
          const time = new Date(item.create_time)
          const month = [time.getFullYear(), time.getMonth() + 1].join('-')
          const current = arr.find(i => i.name === month)
          current.value++
        })
      }
      return arr
    },
    articlesLastUpdate() {
      const temp = this.articles.slice(0)
      this.$nextTick(() => {
        this.setTableHeight()
      })
      return temp
        .sort((a, b) => new Date(b.update_time) - new Date(a.update_time))
        .slice(0, 10)
    }
  },
  methods: {
    setTableHeight() {
      const height = this.$refs.height.offsetHeight
      this.tableHeight = height - 145
    },
    addFilters(data) {
      if (data.key !== 'tags') {
        const i = this.articleFilters.findIndex(item => item.key === data.key)
        if (i !== -1) {
          this.$set(this.articleFilters, i, data)
        } else {
          this.articleFilters.push(data)
        }
      } else {
        this.articleFilters.push(data)
      }
      this.setTableHeight()
    },
    removeFilter(index) {
      this.articleFilters.splice(index, 1)
    },
    sort(prop) {
      this.articlesDisplay.sort((a, b) => {
        if (prop[1]) {
          return b[prop[0]].toString().localeCompare(a[prop[0]].toString())
        } else {
          return a[prop[0]].toString().localeCompare(b[prop[0]].toString())
        }
      })
    },
    del(index) {
      this.$request({
        url: '/blog/del',
        method: 'post',
        data: {
          _id: this.articlesDisplay[index]._id
        }
      }).then(res => {
        if (res.code === 200) {
          this.$notice({
            type: 'success',
            title: 'Success',
            message: `文章 “${this.articlesDisplay[index].title}” 删除成功`
          })
          this.articlesDisplay.splice(index, 1)
        }
      })
    },
    getData() {
      getBlogList({ type: 'DOC' }).then(res => {
        if (res.ok) {
          this.articles = res.data.map(item => {
            return {
              ...item,
              words: item.content.length
            }
          })
          this.articlesDisplay = this.articles.slice(0)
        }
      })
      getBlogTags().then(res => {
        if (res.ok) {
          this.tags = res.data
        }
      })
    },
    delArticle(row) {
      this.$confirm({
        message: `确定删除${row.title}吗?`
      })
        .then(() => {
          deleteBlog({
            _id: row._id
          }).then(res => {
            this.getData()
            this.$notice({
              type: 'success',
              title: '删除成功'
            })
          })
        })
        .catch(() => {
          this.$notice({
            type: 'info',
            title: '取消删除'
          })
        })
    }
  },
  created() {
    this.getData()
  },
  watch: {
    articleFilters() {
      let i = this.articleFilters.length - 1
      this.articlesDisplay = this.articles
      while (i >= 0) {
        const filterObj = this.articleFilters[i]
        if (filterObj.key !== 'words') {
          this.articlesDisplay = this.articlesDisplay.filter(
            item => item[filterObj.key].indexOf(filterObj.name) !== -1
          )
        } else {
          const arr = filterObj.name.replace(/\+?千字/, '').split('~')
          const min = arr[0]
          const max = arr[1] ? arr[1] : Number.MAX_SAFE_INTEGER
          this.articlesDisplay = this.articlesDisplay.filter(item => {
            const j = item.words / 1000
            return j >= min && j <= max
          })
        }
        i--
      }
    }
  }
}
</script>

<style scoped>
.chart-wrap,
.article-wrap {
  display: flex;
  margin-bottom: 15px;
}

.chart-wrap > div {
  flex: 1;
}

.chart-wrap > div:nth-child(2) {
  margin: 0 15px;
}

.chart-wrap .chart-item {
  height: 180px;
}

.card-icon {
  width: 30px;
  height: 30px;
  border: 1px solid var(--colorLum1);
  justify-content: center;
  align-items: center;
  margin-right: 6px;
  border-radius: 50%;
  color: var(--color);
  background-color: var(--colorLum1);
}

.card-icon:hover {
  border-color: var(--color);
}

.article-wrap > div:nth-child(2) {
  width: calc((100% - 33px) / 3);
  flex-shrink: 0;
  margin-left: 15px;
  flex-shrink: 0;
}

.article-wrap > div:nth-child(1) {
  flex-grow: 1;
}

.article-filter {
  margin-bottom: 15px;
}

.article-filter .q-tag {
  margin: 4px;
}

.article-last-update-item {
  display: flex;
  justify-content: space-between;
  padding: 4px 8px;
  margin: 2px 0;
  border-radius: 4px;
}

.article-last-update-item span:last-child {
  color: var(--border);
}

.article-last-update-item:hover {
  background-color: var(--background);
}
</style>
