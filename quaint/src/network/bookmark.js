import request from './request'

// 获取书签
export function getBookmark() {
  return request({
    url: '/api/bookmark',
    method: 'get'
  })
}

// 排序书签
export function sortBookmark(data) {
  return request({
    url: '/api/bookmark/sort',
    method: 'post',
    data
  })
}

// 修改或新增书签
export function updateBookmark(data) {
  return request({
    url: '/api/bookmark/update',
    method: 'post',
    data
  })
}

// 删除书签
export function deleteBookmark(data) {
  return request({
    url: '/api/bookmark/delete',
    method: 'post',
    data
  })
}