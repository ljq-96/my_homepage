import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home'
import Main from '../views/Main'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/quaint/home'
  },
  {
    path: '/quaint',
    component: Main,
    children: [
      {
        path: 'home',
        component: Home,
        meta: {
          title: 'Quaint'
        }
      },
      {
        path: 'blog',
        component: () => import('@/views/blog/Blog'),
        meta: {
          title: 'Blog',
          needLogin: true
        }
      },
      {
        path: 'article/:id',
        component: () => import('@/views/article/Article'),
        meta: {
          title: '文章详情',
          needLogin: true
        }
      }
    ]
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
    name: '管理系统',
    component: () => import('@/views/management/Management'),
    meta: {
      title: '管理系统',
      needLogin: true
    },
    children: [
      {
        path: 'user',
        name: '用户信息',
        component: () => import('@/views/management/MgtUser'),
        meta: {
          title: '用户信息',
          needLogin: true,
          icon: 'user'
        }
      },
      {
        path: 'article',
        name: '文章管理',
        component: () => import('../views/management/space.vue'),
        meta: {
          needLogin: true,
          icon: 'control'
        },
        children: [
          {
            path: 'chart',
            name: '数据分析',
            component: () => import('@/views/management/MgtChart'),
            meta: {
              title: '数据分析',
              needLogin: true
            }
          },
          {
            path: 'list',
            name: '文章管理',
            component: () => import('@/views/management/ArticlesList'),
            meta: {
              title: '文章管理',
              needLogin: true
            }
          },
          {
            path: 'catalog',
            name: '编排目录',
            component: () =>
              import('@/views/management/BlogCatalog/BlogCatalog'),
            meta: {
              title: '编排目录',
              needLogin: true
            }
          },
          {
            path: 'write',
            name: '新增文章',
            component: () => import('@/views/edit/Edit'),
            meta: {
              title: '新增文章',
              needLogin: true
            }
          }
        ]
      },
      {
        path: 'bookmark',
        name: '书签管理',
        component: () => import('@/views/management/MgtBookmark'),
        meta: {
          title: '书签管理',
          needLogin: true,
          icon: 'star'
        }
      }
    ]
  },
  {
    path: '/edit/:id',
    component: () => import('@/views/edit/Edit'),
    meta: {
      title: '编辑',
      needLogin: true
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
          y: window.innerHeight - 50
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
