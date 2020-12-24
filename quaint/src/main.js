import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import echarts from 'echarts'
import notice from './common/notice'
import request from '@/network/request'
import day from 'dayjs'

Vue.use(notice)
Vue.prototype.$echarts = echarts
Vue.prototype.$request = request
Vue.prototype.$bus = new Vue()
Vue.filter('formatDate', function(data, format) {
  return day(data).format(format)
})
Vue.config.productionTip = false

let meta = document.createElement('meta')
meta.name = 'referrer'
meta.content = 'never'
document.getElementsByTagName('head')[0].appendChild(meta)
document.title = 'Quaint'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
    next()
  }
  if (to.meta.requireLogin) {
    if (store.state.token) {
      next()
    } else {
      next({ path: '/login' })
    }
  } else {
    next()
  }
})
