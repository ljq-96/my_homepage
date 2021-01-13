import Vue from 'vue'
import Vuex from 'vuex'
import request from '../network/request'
import chroma from 'chroma-js'

console.log(chroma('white').luminance(0.5))

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
      state.color = chroma(color)
      state.color.c2 = chroma(color).alpha(0.2)
      state.color.c3 = chroma(color).alpha(0.06)
      document.body.style.setProperty('--color', color)
      document.body.style.setProperty('--colorOpc1', state.color.alpha(0.06))
      document.body.style.setProperty('--colorOpc2', state.color.alpha(0.2))
      document.body.style.setProperty('--colorLum1', state.color.luminance(0.85))
      document.body.style.setProperty('--colorLum2', state.color.luminance(0.7))
      document.body.style.setProperty('--colorLum3', state.color.luminance(0.6))
      document.body.style.setProperty('--colorLum4', state.color.luminance(0.3))
      document.body.style.setProperty('--colorLum5', state.color.luminance(0.2))
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
