import request from './request'

// 目录之外的文章
export function getCatalogOut() {
  return request({
    url: '/api/catalog/out',
    method: 'get'
  })
}

// 目录之内的文章
export function getCatalogIn(params) {
  return request({
    url: '/api/catalog/in',
    method: 'get',
    params
  })
}

// 目录排序
export function sortCatalog(data) {
  return request({
    url: '/api/catalog/sort',
    method: 'post',
    data
  })
}

// 移入或移出目录
export function changeCatalogStatus(data) {
  return request({
    url: '/api/catalog/status',
    method: 'post',
    data
  })
}
