<template>
  <div class="mgt">
    <fluent-design
      class="mgt-side-bar"
      v-slot="param"
      :borderColor="'rgba(255,255,255,0.6)'"
      :borderSize="70"
      :width="1"
      :backColor="'rgba(255,255,255,0.1)'"
      :backSize="200"
    >
      <div>
        <fluent-design-item :param="param">
          <router-link class="mgt-side-item" to="/home">
            <span><span class="iconfont icon-home"></span> Home</span><span class="iconfont icon-rollback"></span>
          </router-link>
        </fluent-design-item>
        <fluent-design-item :param="param">
          <router-link class="mgt-side-item" to="/blog">
            <span><span class="iconfont icon-book1"></span> Blog</span><span class="iconfont icon-rollback"></span>
          </router-link>
        </fluent-design-item>
        <div class="line-w"></div>
        <fluent-design-item :param="param">
          <router-link class="mgt-side-item" to="/management/user">
            <span><span class="iconfont icon-user"></span> 用户信息</span>
          </router-link>
        </fluent-design-item>
        <fluent-design-item :param="param">
          <router-link class="mgt-side-item" to="/management/chart">
            <span><span class="iconfont icon-linechart"></span> 数据分析</span>
          </router-link>
        </fluent-design-item>
        <fluent-design-item :param="param">
          <router-link class="mgt-side-item" to="/management/articles">
            <span><span class="iconfont icon-control"></span> 文章汇总</span>
          </router-link>
        </fluent-design-item>
        <fluent-design-item :param="param">
          <router-link class="mgt-side-item" to="/management/catalog">
            <span><span class="iconfont icon-detail"></span> 编排目录</span>
          </router-link>
        </fluent-design-item>
        <fluent-design-item :param="param">
          <router-link class="mgt-side-item" to="/management/write">
            <span><span class="iconfont icon-edit-square"></span> 新增文章</span>
          </router-link>
        </fluent-design-item>
      </div>
      <div>
        <fluent-design-item :param="param">
          <div class="mgt-side-item" @click="logout">
            <span><span class="iconfont icon-logout"></span> 退出登录</span>
          </div>
        </fluent-design-item>
      </div>
    </fluent-design>
    <transition :name="switchName" :duration="500">
      <router-view class="mgt-content"></router-view>
    </transition>
  </div>
</template>

<script>
import FluentDesign from '@/components/FluentDesign'
import FluentDesignItem from '@/components/FluentDesignItem'

export default {
  components: {
    FluentDesign,
    FluentDesignItem
  },
  data() {
    return {
      switchName: ''
    }
  },
  methods: {
    logout() {
      this.$store.commit('setToken', '')
      this.$router.push({ path: '/login' })
      this.$notice({
        type: 'success',
        title: '退出登录成功',
        message: '期待下次相见'
      })
    }
  },
  watch: {
    $route(to, from) {
      if (to.meta.idx > from.meta.idx) {
        this.switchName = 'route-top'
      } else {
        this.switchName = 'route-bottom'
      }
    }
  }
}
</script>

<style>
.mgt {
  position: relative;
  /* display: flex; */
  height: 100vh;
  overflow: hidden;
}

.mgt .line-w {
  height: 2px;
  margin: 15px 20px;
  background-color: rgba(255, 255, 255, 0.1);
}

.mgt-side-bar {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 200px;
  padding: 15px 0;
  background-color: var(--color);
}

.mgt-side-item {
  position: relative;
  display: flex;
  justify-content: space-between;
  height: 50px;
  padding: 0 20px;
  line-height: 50px;
  color: #fff;
}

.mgt-side-item::after {
  position: absolute;
  content: '';
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 0;
  border-radius: 2px;
  background-color: #fff;
  transition: 0.4s;
}

.mgt-side-bar .mgt-side-item.router-link-active {
  background-color: rgba(255, 255, 255, 0.1);
}

.mgt-side-bar .mgt-side-item.router-link-active::after {
  height: 18px;
}

.mgt-side-bar .mgt-side-item.router-link-active:hover::after {
  height: 28px;
}

.mgt-content {
  position: absolute;
  right: 0;
  top: 0;
  height: 100vh;
  width: calc(100% - 200px);
  padding: 10px;
  overflow: hidden;
}

.mgt [class*='route'] {
  transition: 0.5s;
}

/* 向上 */
.route-top-enter {
  transform: translateY(100vh);
  opacity: 0;
}

.route-top-enter-to {
  transform: translateY(0);
  opacity: 1;
}

.route-top-leave {
  transform: translateY(0);
  opacity: 1;
}

.route-top-leave-to {
  transform: translateY(-50vh);
  opacity: 0;
}

/* 向下 */
.route-bottom-enter {
  transform: translateY(-100vh);
  opacity: 0;
}

.route-bottom-enter-to {
  transform: translateY(0);
  opacity: 1;
}

.route-bottom-leave {
  transform: translateY(0);
  opacity: 1;
}

.route-bottom-leave-to {
  transform: translateY(50vh);
  opacity: 0;
}
</style>
