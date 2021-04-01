<template>
  <div class="chart">
    <tag-chart
      class="chart-item"
      :list="tags"
      @addFilters="addFilters"
    ></tag-chart>
    <div class="chart-group">
      <words-chart
        class="chart-item chart-words"
        :list="words"
        @addFilters="addFilters"
      ></words-chart>
      <div class="chart-item chart-filters">
        <div class="chart-title">Filters</div>
        <div class="chart-filters-container scroll-bar">
          <q-tag
            closable
            @close="removeFilter(index)"
            v-for="(item, index) in articleFilters"
            :key="index"
          >
            {{ item.label }}: {{ item.name }}
          </q-tag>
          <q-tag v-show="articleFilters.length === 0">
            filter: None
          </q-tag>
        </div>
        <span>{{ articlesDisplay.length }}</span>
      </div>
    </div>
    <time-chart
      class="chart-item"
      :list="time"
      @addFilters="addFilters"
    ></time-chart>
    <div class="chart-item chart-article-list">
      <q-table
        height="calc(50vh - 80px)"
        :dataSource="articlesDisplay"
        :columns="columns"
      >
        <template #action="{row}">
          <q-button-group>
            <q-button
              plain
              @click="
                $router.push({
                  path: '/quaint/article/' + row._id
                })
              "
            >
              <i class="iconfont icon-eye"></i>
            </q-button>
            <q-button plain @click="delArticle(row)">
              <i class="iconfont icon-delete"></i>
            </q-button>
          </q-button-group>
        </template>
      </q-table>
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
          name: '0~2',
          value: 0
        },
        {
          name: '2~4',
          value: 0
        },
        {
          name: '4~6',
          value: 0
        },
        {
          name: '6~8',
          value: 0
        },
        {
          name: '8~10',
          value: 0
        },
        {
          name: '10~12',
          value: 0
        },
        {
          name: '12+',
          value: 0
        }
      ]
      this.articles.forEach(item => {
        const i = Math.floor(item.content.length / 2000)
        arr[i > 6 ? 6 : i].value++
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
    }
  },
  methods: {
    addFilters(data) {
      console.log(data)
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

<style>
.chart,
.chart-group {
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  justify-content: space-between;
}

.chart-item {
  padding: 10px;
  /* border: 1px solid var(--colorOpc2); */
  background-color: #fff;
}

.chart > div {
  width: calc(50% - 5px);
  height: calc(50% - 5px);
}

.chart-group .chart-count {
  position: relative;
  width: calc(40% - 5px);
  height: calc(70% - 5px);
}

.chart-group .chart-count p {
  margin-top: 20px;
}

.chart-group .chart-count p span {
  font-size: 24px;
  color: var(--color);
  margin: 0 4px;
}

.chart-group .chart-words {
  width: 100%;
  height: calc(100% - 85px);
}

.chart-group .chart-filters {
  position: relative;
  width: 100%;
  height: calc(75px);
}

.chart-filters-container {
  margin-top: 8px;
  width: 100%;
  height: calc(100% - 20px);
  white-space: nowrap;
  overflow: auto;
}

.chart-group .chart-filters > span {
  position: absolute;
  right: 10px;
  bottom: 16px;
  color: var(--color);
  font-size: 24px;
  height: 24px;
  padding: 0 6px;
  line-height: 24px;
  background-color: #fff;
}

.chart-title {
  font-size: 18px;
}

.chart .echarts {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.chart-article-list {
  padding: 0;
}
</style>
