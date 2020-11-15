import axios from 'axios'

export default function request(config) {
  //  创建实例
  const instance = axios.create({
    baseURL: 'http://127.0.0.1:4000',
    timeout: 5000
  })
  // 拦截器
  instance.interceptors.request.use(
    config => {
      if (!config.url.match(/heweather/)) {
        const token = window.localStorage.getItem('token')
        if (token) {
          config.headers.Authorization = token
        }
      }
      return config
    },
    err => {
      return err
    }
  )
  instance.interceptors.response.use(
    result => {
      return result.data
    },
    err => {
      let originalRequest = err.config
      if (err.code === 'ECONNABORTED' && err.message.indexOf('timeout') !== -1 && !originalRequest._retry) {
        // eslint-disable-next-line
        return Promise.reject('请检查网络再重新连接')
      }
      return Promise.reject(err)
    }
  )
  // 发送网络请求
  return instance(config)
}
