<template>
  <div>
    <mgt-list
      @sort="sort"
      @update="update"
      @del="del"
      :list="listDisplay"
      :increase="(currentPage - 1) * size"
    ></mgt-list>
    <fluent-design class="page" v-slot="param" :borderSize="50">
      <fluent-design-item :isDisabled="currentPage === 1" :param="param">
        <button
          class="iconfont"
          @click="prev"
          :class="{ disabled: currentPage === 1 }"
        >
          &#xe7ec;
        </button>
      </fluent-design-item>
      <fluent-design-item :param="param" v-for="item in pageArr" :key="item">
        <div
          class="page-item"
          @click="currentPage = item"
          :class="{ pagecurrent: item === currentPage }"
        >
          {{ item }}
        </div>
      </fluent-design-item>
      <fluent-design-item :isDisabled="currentPage === page" :param="param">
        <button
          class="iconfont"
          @click="next"
          :class="{ disabled: currentPage === page }"
        >
          &#xe7eb;
        </button>
      </fluent-design-item>
    </fluent-design>
  </div>
</template>

<script>
import FluentDesign from '@/components/FluentDesign'
import FluentDesignItem from '@/components/FluentDesignItem'
import MgtList from './MgtList'
import { deleteBlog } from '../../network/blog'
export default {
  components: {
    MgtList,
    FluentDesign,
    FluentDesignItem
  },
  data() {
    return {
      list: [],
      size: 13,
      page: 0,
      currentPage: 1
    }
  },
  computed: {
    listDisplay() {
      return this.list.slice(
        this.size * (this.currentPage - 1),
        this.size * this.currentPage
      )
    },
    pageArr() {
      return Array.from(
        new Set([
          1,
          this.page,
          this.currentPage - 1,
          this.currentPage,
          this.currentPage + 1
        ])
      )
        .filter(item => item > 0 && item <= this.page)
        .sort((a, b) => a - b)
    }
  },
  methods: {
    sort(prop) {
      this.list.sort((a, b) => {
        if (prop[1]) {
          return b[prop[0]].toString().localeCompare(a[prop[0]].toString())
        } else {
          return a[prop[0]].toString().localeCompare(b[prop[0]].toString())
        }
      })
    },
    update(data) {
      const { index, info } = data
      this.$request({
        url: '/blog/update',
        method: 'post',
        data: {
          _id: this.list[index]._id,
          info: info
        }
      }).then(res => {
        if (res.code === 200) {
          Object.assign(this.list[index], info)
          this.$notice({
            type: 'success',
            title: 'Success',
            message: `“${this.list[index].title}” ${
              info.sticky ? '置顶' : '取消置顶'
            }`
          })
        }
      })
    },
    del(index) {
      // this.$request({
      //   url: '/blog/del',
      //   method: 'post',
      //   data: {
      //     _id: this.list[index]._id
      //   }
      // }).then(res => {
      //   if (res.code === 200) {
      //     this.$notice({
      //       type: 'success',
      //       title: 'Success',
      //       message: `文章 “${this.list[index].title}” 删除成功`
      //     })
      //     this.list.splice(index, 1)
      //   }
      // })
      deleteBlog({ id: this.list[index]._id }).then(res => {
        console.log(res)
      })
    },
    prev() {
      if (this.currentPage !== 1) {
        this.currentPage--
      }
    },
    next() {
      if (this.currentPage !== this.page) {
        this.currentPage++
      }
    }
  },
  created() {
    this.$request({
      url: '/blog/management'
    }).then(res => {
      if (res.code === 200) {
        this.list = res.articles
        this.page = Math.ceil(res.length / this.size)
      }
    })
  }
}
</script>

<style>
.page {
  position: absolute;
  left: 20px;
  bottom: 20px;
  display: flex;
}

.page > div {
  margin-right: 10px;
}

.page button {
  width: 40px;
  height: 40px;
  color: #4a4a4a;
  border: none;
  outline: none;
  background-color: transparent;
}

.page button.disabled {
  color: #aaa;
  cursor: not-allowed;
}

.page .page-item {
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
}

.page div.pagecurrent {
  background-color: var(--colorOpc1);
}
</style>
