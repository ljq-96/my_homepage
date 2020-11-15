import Vue from 'vue'
import Vuex from 'vuex'
import request from '../network/request'
import Color from '@/common/color'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: window.localStorage.getItem('token') || '',
    user: '',
    color: {},
    wallpaper: window.localStorage.getItem('wallpaper') || 0,
    onSetting: false,
    isPageDown: false
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      window.localStorage.setItem('token', token)
    },
    setUser(state, data) {
      state.user = data
    },
    setColor(state, color) {
      const themeColor = new Color(color)
      state.color.c1 = color
      state.color.c2 = themeColor.opacity(0.2)
      state.color.c3 = themeColor.opacity(0.06)
      document.body.style.setProperty('--color', color)
      document.body.style.setProperty('--_backColor', state.color.c2)
      document.body.style.setProperty('--backColor', state.color.c3)
      window.localStorage.setItem('color', color)
    },
    setWallpaper(state, index) {
      state.wallpaper = index
      window.localStorage.setItem('wallpaper', index)
    },
    changeSetting(state) {
      state.onSetting = !state.onSetting
    },
    changePageDirection(state, boolean) {
      state.isPageDown = boolean
    }
  },
  actions: {
    getUser(context) {
      request({
        url: '/user'
      }).then(res => {
        context.state.user = res
      })
    }
  },
  modules: {},
  getters: {}
})
