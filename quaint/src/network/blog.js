import request from './request'

export function createBlog(data) {
  return request({
    url: '/api/blog/create',
    method: 'post',
    data
  })
}

export function deleteBlog(data) {
  return request({
    url: '/api/blog/delete',
    method: 'post',
    data
  })
}