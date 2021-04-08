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
      <fluent-design-item :param="param">
        <router-link class="mgt-side-item" to="/quaint/home">
          <span><q-icon icon="home"></q-icon> Home</span
          ><q-icon icon="rollback"></q-icon>
        </router-link>
      </fluent-design-item>
      <fluent-design-item :param="param">
        <router-link class="mgt-side-item" to="/quaint/blog">
          <span><q-icon icon="read"></q-icon> Blog</span
          ><q-icon icon="rollback"></q-icon>
        </router-link>
      </fluent-design-item>
      <div class="line-w"></div>
      <fluent-design-item :param="param">
        <router-link class="mgt-side-item" to="/management/user">
          <span><q-icon icon="user"></q-icon> 用户信息</span>
        </router-link>
      </fluent-design-item>
       <fluent-design-item :param="param">
        <router-link class="mgt-side-item" to="/management/bookmark">
          <span><q-icon icon="star"></q-icon> 书签管理</span>
        </router-link>
      </fluent-design-item>
      <fluent-design-item :param="param">
        <router-link class="mgt-side-item" to="/management/chart">
          <span><q-icon icon="linechart"></q-icon> 数据分析</span>
        </router-link>
      </fluent-design-item>
      <fluent-design-item :param="param">
        <router-link class="mgt-side-item" to="/management/articles">
          <span><q-icon icon="control"></q-icon> 文章汇总</span>
        </router-link>
      </fluent-design-item>
      <fluent-design-item :param="param">
        <router-link class="mgt-side-item" to="/management/catalog">
          <span><q-icon icon="detail"></q-icon> 编排目录</span>
        </router-link>
      </fluent-design-item>
      <fluent-design-item :param="param">
        <router-link class="mgt-side-item" to="/management/write">
          <span><q-icon icon="edit-square"></q-icon> 新增文章</span>
        </router-link>
      </fluent-design-item>
    </fluent-design>
    <div class="mgt-content">
      <div class="mgt-content-head">
        <div class="mgt-content-head-item">
          后台管理
        </div>
        <q-tip class="mgt-content-head-item" placement="bottom">
          {{ userInfo.userName }}
          <template #tip>
            <div @click="logout" class="user-options">退出登录</div>
          </template>
        </q-tip>
      </div>
      <!-- <transition :name="switchName" :duration="500"> -->
        <router-view class="mgt-content-body"></router-view>
      <!-- </transition> -->
    </div>
  </div>
</template>

<script>
import { getUserInfo } from '../../network/user'
import FluentDesign from '@/components/FluentDesign'
import FluentDesignItem from '@/components/FluentDesignItem'

export default {
  components: {
    FluentDesign,
    FluentDesignItem
  },
  data() {
    return {
      switchName: '',
      userInfo: {}
    }
  },
  methods: {
    logout() {
      this.$store.commit('setToken', '')
      this.$router.push({ path: '/login' })
      this.$notice({
        type: 'success',
        title: '退出登录'
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
  },
  created() {
    getUserInfo().then(res => {
      if (res.ok) {
        this.userInfo = res.data
      }
    })
  }
}
</script>

<style scoped>
.mgt {
  position: relative;
  overflow: hidden;
  padding-left: 160px;
}

.mgt .line-w {
  height: 2px;
  margin: 15px 20px;
  background-color: rgba(255, 255, 255, 0.1);
}

.mgt-side-bar {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  width: 160px;
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

.mgt [class*='route'] {
  transition: 0.5s;
}

.mgt-content {
  padding-top: 50px;
}

.mgt-content-body {
  padding: 15px;
}

.mgt-content-head {
  display: flex;
  justify-content: space-between;
  position: fixed;
  right: 0;
  top: 0;
  left: 160px;
  height: 50px;
  line-height: 50px;
  padding: 0 15px;
  backdrop-filter: blur(5px);
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid var(--divider);
  z-index: 99;
}

.mgt-content-head-item {
  padding: 0 15px;
}

.mgt-content-head-item:hover {
  background-color: var(--divider);
}

.user-icon {
  margin-right: 5px;
}

.user-options {
  height: 30px;
  line-height: 30px;
  padding: 0 12px;
  cursor: pointer;
}

.user-options:hover {
  background-color: rgba(255, 255, 255, 0.1);
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
