<template>
  <fluent-design
    v-slot="param"
    :borderSize="160"
    :backSize="200"
    :backColor="'rgba(255, 255, 255, 0.2)'"
    :borderColor="'rgba(255, 255, 255, 0.6)'"
    :width="4"
  >
    <div class="caption">Tools</div>
    <div class="bookmarks">
      <fluent-design-item class="large" :param="param">
        <to-do></to-do>
      </fluent-design-item>
      <fluent-design-item class="wide" :param="param">
        <weather></weather>
      </fluent-design-item>
      <fluent-design-item class="large" :param="param">
        <reg-exp></reg-exp>
      </fluent-design-item>
      <fluent-design-item class="wide" :param="param">
        <translate></translate>
      </fluent-design-item>
    </div>
    <div class="caption" v-if="$store.state.token">
      Bookmarks <span class="iconfont"></span>
    </div>
    <draggable
      v-model="bookMarks"
      animation="400"
      :filter="'.add'"
      class="bookmarks"
      :class="{ drag: isDrag }"
      @start="onStart"
      @end="onEnd"
      v-if="$store.state.token"
    >
      <fluent-design-item
        class="icon-item"
        :class="item.size"
        :param="param"
        v-for="(item, index) in bookMarks"
        :key="item._id"
      >
        <icon :icon="item" @openMenu="openMenu(index, $event)"></icon>
      </fluent-design-item>
      <fluent-design-item class="middle add" :param="param">
        <add-btn @dragstart.stop @addBookMark="addBookMark"></add-btn>
      </fluent-design-item>
    </draggable>
    <icon-menu
      v-show="menuDisplay"
      v-model="currentIcon"
      :style="menuStyle"
      @delItem="delItem"
      @closeMenu="closeMenu"
    ></icon-menu>
  </fluent-design>
</template>

<script>
import Icon from './icon'
import AddBtn from './tools/AddBtn'
import FluentDesign from '../../components/FluentDesign'
import FluentDesignItem from '../../components/FluentDesignItem'
import IconMenu from './IconMenu'
import ToDo from './tools/ToDo'
import Weather from './tools/Weather'
import Translate from './tools/Translate'
import RegExp from '@/views/home/tools/RegExp'
import draggable from 'vuedraggable'
import {
  sortBookmark,
  getBookmark,
  updateBookmark,
  deleteBookmark
} from '../../network/bookmark'
export default {
  components: {
    Icon,
    ToDo,
    Weather,
    Translate,
    RegExp,
    AddBtn,
    IconMenu,
    FluentDesign,
    FluentDesignItem,
    draggable
  },
  data() {
    return {
      bookMarks: [],
      currentIndex: -1,
      currentIcon: {},
      menuStyle: {
        left: 0,
        top: 0
      },
      isDrag: false,
      menuDisplay: false
    }
  },
  methods: {
    // 打开菜单
    openMenu(idx, e) {
      this.menuDisplay = true
      this.menuStyle = {
        left: e.pageX + 1 + 'px',
        top: e.pageY + 1 + 'px'
      }
      this.currentIndex = idx
      this.currentIcon = this.bookMarks[idx]
    },
    closeMenu() {
      this.menuDisplay = false
      if (this.currentIndex !== -1) {
        const { _id, size, url, title, icon } = this.currentIcon
        updateBookmark({
          id: _id,
          info: { size, url, title, icon }
        }).then(res => {
          if (res.ok === 1) {
            this.$set(this.bookMarks, this.currentIndex, res.data)
            this.$notice({
              type: 'success',
              title: ` 图标 “${title}” 修改成功`,
              message: `
                标题：${title}<br/>
                图标：<i class="logofont ${icon}"></i><br/>
                尺寸：${size}<br/>
                地址：${url}
              `
            })
            this.currentIndex = -1
          }
        })
      }
    },
    // 添加书签
    addBookMark() {
      updateBookmark({
        info: {
          title: '右击修改此书签',
          icon: '',
          url: '',
          size: 'middle'
        }
      }).then(res => {
        if (res.ok === 1) {
          this.bookMarks.push(res.data)
          this.$notice({
            type: 'success',
            title: 'Success',
            message: '添加成功'
          })
        }
      })
    },
    // 删除书签
    delItem() {
      deleteBookmark({ id: this.currentIcon._id }).then(res => {
        if (res.ok === 1) {
          this.bookMarks.splice(this.currentIndex, 1)
          this.currentIndex = -1
          this.currentIcon = {}
          this.closeMenu()
          this.$notice({
            type: 'success',
            title: 'Success',
            message: '删除成功'
          })
        }
      })
    },
    onStart() {
      this.isDrag = true
    },
    onEnd(data) {
      this.isDrag = false
      const { oldIndex, newIndex } = data
      const bookmarks = this.bookMarks.map(item => item._id)
      sortBookmark({ bookmarks }).then(res => {
        if (res.ok === 1) {
          this.$notice({
            type: 'success',
            title: 'Success',
            message: res.message
          })
        }
      })
    }
  },
  created() {
    getBookmark().then(res => {
      if (res.ok === 1) {
        this.bookMarks = res.data
      }
    })
  }
}
</script>

<style>
.caption {
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  color: #7a7a7a;
}

.bookmarks {
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fill, 62px);
  grid-auto-rows: 62px;
  grid-gap: 4px;
  justify-content: center;
  place-items: stretch;
  grid-auto-flow: row dense;
  color: #fff;
  margin-bottom: 10px;
  transition-duration: 0.4s;
}

.bookmarks .icon-item {
  transition: padding 0.4s;
}

.bookmarks.drag .icon-item {
  padding: 4px;
}

.bookmarks.drag > :not(.sortable-ghost) {
  opacity: 0.6;
}

.bookmarks .small .title {
  display: none;
}

.bookmarks .small {
  grid-column: span 1;
  grid-row: span 1;
}

.bookmarks .small .logofont {
  font-size: 30px;
}

.bookmarks .middle {
  grid-column: span 2;
  grid-row: span 2;
}

.bookmarks .wide {
  grid-column: span 4;
  grid-row: span 2;
}

.bookmarks .large {
  grid-column: span 4;
  grid-row: span 4;
}

.bookmarks .large .logofont {
  font-size: 80px;
}
</style>
