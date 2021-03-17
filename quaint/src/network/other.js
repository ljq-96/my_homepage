import request from './request'

export function getWeibo() {
  return request({
    url: '/api/weibo',
    method: 'get'
  })
}
