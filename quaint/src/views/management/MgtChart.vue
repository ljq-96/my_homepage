<template>
  <div class="chart">
    <tag-chart class="chart-item" :list="tags" @addFilters="addFilters"></tag-chart>
    <div class="chart-group">
      <div class="chart-item chart-filters">
        <div class="chart-title">Filters</div>
        <div class="chart-filters-container scroll-bar">
          <div class="chart-filters-item" v-for="(item, index) in articleFilters" :key="index">
            <span>{{ item.key }}: {{ item.name }}</span>
            <span class="iconfont" @click="removeFilter(index)">&#xe7ff;</span>
          </div>
          <div v-show="articleFilters.length === 0" class="chart-filters-item">
            <span>filter: None</span>
            <span class="iconfont">&#xe7fd;</span>
          </div>
        </div>
        <span>{{ articlesDisplay.length }}</span>
      </div>
      <words-chart class="chart-item chart-words" :list="articles" @addFilters="addFilters"></words-chart>
    </div>
    <time-chart class="chart-item" :list="articles" @addFilters="addFilters"></time-chart>
    <div class="chart-item chart-article-list scroll-bar">
      <mgt-list
        :list="articlesDisplay"
        :increase="0"
        :isTime="false"
        :isSticky="false"
        :isTag="false"
        @sort="sort"
        @del="del"
      ></mgt-list>
    </div>
  </div>
</template>

<script>
import request from '@/network/request.js'
import TagChart from '@/views/management/charts/TagChart'
import TimeChart from '@/views/management/charts/TimeChart'
import WordsChart from '@/views/management/charts/WordsChart'
import MgtList from '@/views/management/MgtList'
export default {
  components: {
    TagChart,
    TimeChart,
    WordsChart,
    MgtList
  },
  data() {
    return {
      tags: [],
      articles: [],
      articlesDisplay: [],
      articleFilters: []
    }
  },
  computed: {
    words() {
      let n = 0
      this.articles.forEach(item => (n += item.words))
      return Math.ceil(n / 10000)
    }
  },
  methods: {
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
    }
  },
  created() {
    request({
      url: '/tag'
    }).then(res => {
      if (res.code === 200) {
        this.tags = res.tags
      }
    })
    request({
      url: '/blog/management'
    }).then(res => {
      if (res.code === 200) {
        this.articles = res.articles
        this.articlesDisplay = this.articles.slice(0)
      }
    })
  },
  watch: {
    articleFilters() {
      let i = this.articleFilters.length - 1
      this.articlesDisplay = this.articles
      while (i >= 0) {
        const filterObj = this.articleFilters[i]
        if (filterObj.key !== 'words') {
          this.articlesDisplay = this.articlesDisplay.filter(item => item[filterObj.key].indexOf(filterObj.name) !== -1)
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
  /* border: 1px solid var(--_backColor); */
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
  /* width: calc(60% - 5px); */
  width: 100%;
  height: calc(70% - 5px);
}

.chart-group .chart-filters {
  position: relative;
  width: 100%;
  height: calc(30% - 5px);
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

.chart-filters-item {
  display: inline-block;
  height: 24px;
  line-height: 24px;
  padding-left: 12px;
  margin-right: 10px;
  font-size: 12px;
  color: #fff;
  border-radius: 13px;
  background-color: var(--color);
}

.chart-filters-item:hover {
  filter: brightness(130%);
}

.chart-filters-item span:last-child {
  display: inline-block;
  height: 26px;
  width: 30px;
  text-align: center;
  cursor: pointer;
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
  overflow: auto;
  padding: 0;
}
</style>
