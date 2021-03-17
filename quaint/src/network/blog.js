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

// 更新文章
export function updateBlog(data) {
  return request({
    url: '/api/blog/update',
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

// 读文件
export function readBlog(data) {
  return request({
    url: '/api/blog/read',
    method: 'post',
    data
  })
}

// 测试标题可用
export function testBlog(data) {
  return request({
    url: '/api/blog/test',
    method: 'post',
    data
  })
}

// 获取样式
export function blogStyle(params) {
  return request({
    url: '/api/blog/style',
    method: 'get',
    params
  })
}