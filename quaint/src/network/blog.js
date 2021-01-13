import request from './request'

// 获取文章列表
export function getBlogList(params) {
  return request({
    url: 'api/blog',
    method: 'get',
    params
  })
}

// 新增文章
export function createBlog(data) {
  return request({
    url: '/api/blog/create',
    method: 'post',
    data
  })
}

// 删除文章
export function deleteBlog(data) {
  return request({
    url: '/api/blog/delete',
    method: 'post',
    data
  })
}

// 获取文章标签
export function getBlogTags() {
  return request({
    url: '/api/blog/tags',
    method: 'get'
  })
}
