<template>
  <table>
    <tr class="mgt-item">
      <td class="mgt-item-index logofont logo-quaint"></td>
      <td class="can-click mgt-item-title" @click="sort('title')">标题<span class="iconfont">&#xe661;</span></td>
      <td v-if="isTag" class="mgt-item-tags">标签</td>
      <td v-if="isTime" class="can-click" @click="sort('time')">发布日期<span class="iconfont">&#xe661;</span></td>
      <td v-if="isSticky" class="can-click mgt-item-switch" @click="sort('sticky')">
        置顶<span class="iconfont">&#xe661;</span>
      </td>
      <td>操作</td>
    </tr>
    <tr :class="{ onedit: delIndex === index }" v-for="(item, index) in list" :key="item._id" class="mgt-item">
      <td class="mgt-item-index">
        <router-link :to="{ path: '/quaint/article', query: { title: item.title } }">
          {{ increase + index + 1 }}
        </router-link>
      </td>
      <td class="mgt-item-title">
        <p>{{ item.title }}</p>
      </td>
      <td v-if="isTag" class="mgt-item-tags">
        <p>{{ item.tags }}</p>
      </td>
      <td v-if="isTime" class="mgt-item-time">{{ item.time | formatDate('YYYY-MM-DD') }}</td>
      <td
        v-if="isSticky"
        @click="toggleSticky({ index: increase + index, info: { sticky: !item.sticky } })"
        class="mgt-item-switch"
      >
        <switch-vue :status="item.sticky"></switch-vue>
      </td>
      <td class="mgt-item-handle">
        <router-link :to="{ path: '/edit', query: { title: item.title } }" class="iconfont" title="编辑">
          &#xe7e1;
        </router-link>
        <span @click="delClick(index)" title="删除" class="iconfont">&#xe7c3;</span>
      </td>
    </tr>
  </table>
</template>

<script>
import request from '../../network/request'
import SwitchVue from '../../components/SwitchVue'
export default {
  components: {
    SwitchVue
  },
  props: {
    list: Array,
    increase: Number,
    isSticky: {
      type: Boolean,
      default: true
    },
    isTag: {
      type: Boolean,
      default: true
    },
    isTime: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isSort: false,
      isShow: false,
      delIndex: -1
    }
  },
  methods: {
    sort(key) {
      this.$emit('sort', [key, this.isSort])
      this.isSort = !this.isSort
    },
    toggleSticky(data) {
      this.$emit('update', data)
    },
    delClick(index) {
      this.delIndex = index
      this.$confirm({
        title: `您确定要删除${this.list[index].title}吗?`
      })
        .$on('confirm', this.yes)
        .$on('cancel', this.no)
    },
    yes() {
      this.$emit('del', this.delIndex + this.increase)
      this.no()
    },
    no() {
      this.isShow = false
      this.delIndex = -1
    }
  }
}
</script>

<style>
.mgt table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
}

.mgt tr {
  height: 36px;
  border: 1px solid var(--backColor);
  background-color: #fff;
  transition-duration: 0.4s;
  transition-property: padding;
}

.mgt tr:hover {
  background-color: var(--backColor);
}

.mgt tr:first-child {
  height: 40px;
  color: #7a7a7a;
  font-weight: bold;
}

.mgt tr.onedit {
  transform: scale(1);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
}

.mgt tr.onedit td {
  padding-top: 14px;
  padding-bottom: 14px;
}

.mgt td {
  padding: 0 6px;
  transition: 0.4s;
}

.mgt .can-click:hover {
  background-color: var(--backColor);
  cursor: pointer;
}

.mgt .can-click .iconfont {
  font-size: 12px;
}

.mgt table span {
  display: inline-block;
  padding: 0 10px;
}

.mgt-item-handle .iconfont,
.mgt-item-index .iconfont {
  font-size: 18px;
}

.mgt-item-handle .iconfont:hover {
  color: var(--color);
}

.mgt-item-index {
  width: 50px;
  text-align: center;
  border-right: 1px solid var(--backColor);
}

.mgt-item-index a {
  display: block;
  color: #7a7a7a;
  /* font-family: FiraCode iconfont; */
}

.mgt .mgt-item-title {
  padding-left: 16px;
}

.mgt-item-handle,
.mgt-item-switch {
  width: 100px;
}
</style>
