import request from './request'

export function getUserInfo() {
  return request({
    url: '/api/user/info',
    method: 'post'
  })
}
