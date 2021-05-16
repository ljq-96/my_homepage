<template>
  <div class="mgt">
    <q-menu :defaultActive="defaultActive">
      <q-menu-item name="/quaint/home">
        <q-icon icon="home"></q-icon> Home
      </q-menu-item>
      <q-menu-item name="/quaint/blog">
        <q-icon icon="read"></q-icon> Blog
      </q-menu-item>
      <div class="line-w"></div>
      <div v-for="item in routes" :key="item.path">
        <q-sub-menu v-if="item.children" :defaultOpen="true">
          <template #title>
            <q-icon :icon="item.meta.icon"></q-icon> {{ item.name }}
          </template>
          <q-menu-item
            :name="`/management/${item.path}/${j.path}`"
            v-for="j in item.children"
            :key="j.path"
          >
            <q-icon :icon="j.meta.icon"></q-icon> {{ j.name }}
          </q-menu-item>
        </q-sub-menu>
        <q-menu-item v-else :name="`/management/${item.path}`">
          <q-icon :icon="item.meta.icon"></q-icon> {{ item.name }}
        </q-menu-item>
      </div>

      <!-- <q-menu-item name="/quaint/home">
        <q-icon icon="home"></q-icon> Home
      </q-menu-item>
      <q-menu-item name="/quaint/blog">
        <q-icon icon="read"></q-icon> Blog
      </q-menu-item>
      <div class="line-w"></div>
      <q-menu-item name="/management/user">
        <q-icon icon="user"></q-icon> 用户信息
      </q-menu-item>
      <q-sub-menu :defaultOpen="true">
        <template #title> <q-icon icon="control"></q-icon> 文章管理 </template>
        <q-menu-item name="/management/chart">数据分析</q-menu-item>
        <q-menu-item name="/management/articles">文章汇总</q-menu-item>
        <q-menu-item name="/management/catalog">编排目录</q-menu-item>
        <q-menu-item name="/management/write">新增文章</q-menu-item>
      </q-sub-menu>
      <q-menu-item name="/management/bookmark">
        <q-icon icon="star"></q-icon> 书签管理
      </q-menu-item> -->
    </q-menu>
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
      userInfo: {},
      routes: [],
      defaultActive: this.$route.path
    }
  },
  methods: {
    logout() {
      this.$store.commit('setToken', '')
      this.$router.push({ path: '/login' })
      this.routes = []
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
    this.routes = this.$router.options.routes.find(
      item => item.path === '/management'
    ).children
    getUserInfo().then(res => {
      if (res.ok) {
        this.userInfo = res.data
        // if (res.data.status === 1) {
        //   const routes = {
        //     path: 'admin',
        //     name: '管理员',
        //     component: () => import('./space'),
        //     meta: {
        //       icon: 'cluster'
        //     },
        //     children: [
        //       {
        //         path: 'user',
        //         name: '用户管理',
        //         component: () => import('./admin/AdminUser.vue'),
        //         meta: {}
        //       }
        //     ]
        //   }
        // }
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

.q-menu {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
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
