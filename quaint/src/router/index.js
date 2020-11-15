import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    meta: {
      title: 'Quaint',
      keepAlive: true
    }
  },
  {
    path: '/blog',
    component: () => import('@/views/blog/Blog.vue'),
    meta: {
      title: 'Blog',
      keepAlive: true,
      requireLogin: true
    }
  },
  {
    path: '/article',
    component: () => import('@/views/article/Article'),
    meta: {
      title: '文章详情',
      keepAlive: true,
      requireLogin: true
    }
  },
  {
    path: '/login',
    component: () => import('@/views/login/Login'),
    meta: {
      title: '登录/注册'
    }
  },
  {
    path: '/management',
    component: () => import('@/views/management/Management'),
    meta: {
      title: '管理系统',
      requireLogin: true
    },
    children: [
      {
        path: 'user',
        component: () => import('@/views/management/MgtUser'),
        meta: {
          title: '用户信息',
          requireLogin: true,
          idx: 1
        }
      },
      {
        path: 'chart',
        component: () => import('@/views/management/MgtChart'),
        meta: {
          title: '数据分析',
          requireLogin: true,
          idx: 2
        }
      },
      {
        path: 'articles',
        component: () => import('@/views/management/ArticlesList'),
        meta: {
          title: '文章管理',
          requireLogin: true,
          idx: 3
        }
      },
      {
        path: 'catalog',
        component: () => import('@/views/management/BlogCatalog/BlogCatalog'),
        meta: {
          title: '编排目录',
          requireLogin: true,
          idx: 4
        }
      },

      {
        path: 'write',
        component: () => import('@/views/edit/Edit'),
        meta: {
          title: '新增文章',
          requireLogin: true,
          idx: 5
        }
      }
    ]
  },
  {
    path: '/edit',
    component: () => import('@/views/edit/Edit'),
    meta: {
      title: '编辑',
      requireLogin: true
    }
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (to.meta.title === '文章详情') {
        return {
          x: 0,
          y: window.innerHeight
        }
      } else {
        return {
          x: 0,
          y: 0
        }
      }
    }
  }
})

export default router
