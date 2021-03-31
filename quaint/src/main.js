import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import echarts from 'echarts'
import notice from './common/notice'
import request from '@/network/request'
import day from 'dayjs'
import 'highlight.js/styles/atom-one-light.css'
import QTag from './components/other/QTag.vue'
import QCard from './components/other/QCard.vue'
import QButton from './components/button/QButton.vue'
import QButtonGroup from './components/button/QButtonGroup.vue'
import QTable from './components/table/QTable.vue'
import QPage from './components/other/QPage.vue'
import QSwitch from './components/form/QSwitch.vue'

Vue.component('q-card', QCard)
Vue.component('q-tag', QTag)
Vue.component('q-button', QButton)
Vue.component('q-button-group', QButtonGroup)
Vue.component('q-table', QTable)
Vue.component('q-page', QPage)
Vue.component('q-switch', QSwitch)

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
  if (to.meta.needLogin && !store.state.token) {
    next({ path: '/login' })
  } else {
    next()
  }
})
