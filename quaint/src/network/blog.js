import request from './request.js'

export function getArticles() {
  return request({
    url: '/articles'
  })
}

export function getSticky() {
  return request({
    url: '/sticky'
  })
}

export function getDemo() {
  return request({
    url: '/demo'
  })
}

export function getTags() {
  return request({
    url: '/tag'
  })
}
