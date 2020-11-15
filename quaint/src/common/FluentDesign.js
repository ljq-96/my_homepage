class FluentDesign {
  constructor(el, props) {
    this.el = typeof el === 'string' ? document.querySelector(el) : el
    this.size = 0
    this.width = 0
    this.color = '#fff'
    this.child = null
    Object.assign(this, props)
    this.init()
  }
  init() {
    if (this.child) {
      this.children = this.el.querySelectorAll(this.child.name || this.child)
      this.innerSize = this.child.size || this.size
      this.innerColor = this.child.color || this.color
      this.children.forEach(item => {
        item.style.border = `${this.width}px solid transparent`
      })
      this.borderLight()
      if (typeof this.child !== 'string') {
        this.children.forEach(item => {
          this.backgroundLight(item)
        })
      }
    } else {
      this.backgroundLight(this.el)
    }
  }
  backgroundLight(el) {
    el.addEventListener('mouseover', e => this.drawBck(e, el))
    el.addEventListener('mousemove', e => this.drawBck(e, el))
    el.addEventListener('mouseout', () => (el.style.backgroundImage = ''))
  }
  borderLight() {
    this.el.addEventListener('mouseover', e => {
      this.children.forEach(item => {
        if (this.layout(e, item) <= this.size + item.offsetWidth) {
          this.drawBod(e, item)
        }
      })
    })
    this.el.addEventListener('mousemove', e => {
      this.children.forEach(item => {
        if (this.layout(e, item) <= this.size + item.offsetWidth) {
          this.drawBod(e, item)
        }
      })
    })
    this.el.addEventListener('mouseleave', () => this.children.forEach(item => (item.style.borderImage = '')))
  }
  layout(e, el) {
    const { left, top } = el.getBoundingClientRect()
    const centerX = left + el.offsetWidth / 2
    const centerY = top + el.offsetHeight / 2
    return Math.sqrt(Math.pow(Math.abs(e.clientX - centerX), 2) + Math.pow(Math.abs(e.clientY - centerY), 2))
  }
  drawBck(e, el) {
    const { left, top } = el.getBoundingClientRect()
    const x = e.clientX - left
    const y = e.clientY - top
    el.style.backgroundImage = `radial-gradient(circle ${this.innerSize}px at ${x}px ${y}px, ${this.innerColor}, transparent)`
  }
  drawBod(e, el) {
    const { left, top } = el.getBoundingClientRect()
    const x = e.clientX - left
    const y = e.clientY - top
    el.style.borderImage = `radial-gradient(circle ${this.size}px at ${x}px ${y}px, ${this.color}, transparent) ${this.width}`
  }
}

export default FluentDesign