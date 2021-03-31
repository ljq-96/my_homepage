export const throttle = (fn, delay) => {
  let lastTime = 0
  return (...args) => {
    let nowTime = Date.now()
    if (nowTime - lastTime > delay) {
      fn.call(this, ...args)
      lastTime = nowTime
    }
  }
}

export const debounce = (fn, delay) => {
  let timer = null
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.call(this, ...args)
    }, delay)
  }
}

export const tree = (fn, arr) => {
  arr.forEach(item => {
    fn(item)
    item.children.length && tree(fn, item.children)
  })
}
