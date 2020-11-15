class Ball {
  constructor(props) {
    this.x = 0
    this.y = 0
    this.r = 20
    this.fillStyle = 'rgba(0, 0, 0, 0)'
    this.strokeStyle = 'rgba(0, 0, 0, 0)'
    this.lineWidth = 1
    Object.assign(this, props)
  }
  creatPath(ctx) {
    ctx.beginPath()
    ctx.arc(0, 0, this.r, 0, 2 * Math.PI)
  }
  render(ctx) {
    ctx.save()
    ctx.fillStyle = this.fillStyle
    ctx.strokeStyle = this.strokeStyle
    ctx.lineWidth = this.lineWidth
    ctx.translate(this.x, this.y)
    this.creatPath(ctx)
    ctx.fill()
    ctx.stroke()
    ctx.restore()
  }
}

class Astronaut {
  constructor(props) {
    this.x = 0
    this.y = 0
    this.jet = 500
    this.peopleStyle = 'rgb(255,255,255)'
    this.jetStyle = 'rgb(0,0,0)'
    Object.assign(this, props)
  }
  creatBody(ctx) {
    ctx.save()
    ctx.fillStyle = this.peopleStyle
    ctx.lineJoin = 'round'
    ctx.translate(this.x, this.y)
    ctx.beginPath()
    ctx.arc(-10, 0, 10, Math.PI * 0.5, Math.PI * 1.9)
    ctx.quadraticCurveTo(-19, -10, -8, 10)
    ctx.moveTo(-20, 3)
    ctx.quadraticCurveTo(-20, 8, -26, 10)
    ctx.lineTo(-42, 7)
    ctx.quadraticCurveTo(-47, 6, -50, 3)
    ctx.lineTo(-74, 0)
    ctx.lineTo(-80, 2)
    ctx.lineTo(-75, -5)
    ctx.lineTo(-20, -5)
    ctx.closePath()
    ctx.fill()
    ctx.restore()
  }
  creatJet(ctx) {
    ctx.save()
    ctx.fillStyle = this.jetStyle
    ctx.translate(this.x, this.y)
    ctx.beginPath()
    ctx.arc(-27, -4, 8, Math.PI * 1.5, Math.PI * 2)
    ctx.lineTo(-40, -4)
    ctx.lineTo(-44, -12)
    ctx.closePath()
    ctx.moveTo(-48, -5)
    ctx.lineTo(-this.jet, -8)
    ctx.lineTo(-51, -11)
    ctx.closePath()
    ctx.moveTo(-10, 0)
    ctx.arc(-10, 0, 10, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }
  render(ctx) {
    this.creatJet(ctx)
    this.creatBody(ctx)
  }
}

class Mountain {
  constructor(props) {
    this.start = [0, 0]
    this.end = [0, 0]
    this.tops = []
    this.H = 0
    this.fillStyle = []
    Object.assign(this, props)
  }
  render(ctx) {
    const grd = ctx.createLinearGradient(this.start[0], this.start[1], this.start[0], this.H)
    this.fillStyle.forEach((item, index) => {
      grd.addColorStop(index / this.fillStyle.length, item)
    })
    ctx.save()
    ctx.beginPath()
    ctx.moveTo(this.start[0], this.start[1])
    this.tops.forEach(item => {
      ctx.lineTo(item[0], item[1])
    })
    ctx.lineTo(this.end[0], this.end[1])
    ctx.lineTo(this.end[0], this.H)
    ctx.lineTo(0, this.H)
    ctx.fillStyle = grd
    ctx.fill()
    ctx.restore()
  }
}

class Moon {
  constructor(props) {
    this.x = 0
    this.y = 0
    this.d = 100
    this.rotate = Math.PI / 4
    this.fillStyle = 'rgb(0,0,0)'
    Object.assign(this, props)
  }
  render(ctx) {
    ctx.fillStyle = this.fillStyle
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.rotate)
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.quadraticCurveTo(this.d / 2, this.d * 1, this.d, 0)
    ctx.quadraticCurveTo(this.d / 2, this.d * 0.5, 0, 0)
    ctx.fill()
    ctx.rotate(-this.rotate)
    ctx.restore()
  }
}

class Sunshine {
  constructor(props) {
    this.x = 0
    this.y = 0
    this.W = 1000
    this.H = 1000
    this.r = 100
    this.fillStyle = ['rgba(255,255,255,1)', 'rgba(0,0,0,.1)']
    Object.assign(this, props)
  }
  render(ctx) {
    const grd = ctx.createRadialGradient(this.x, this.y, 10, this.x, this.y, this.r)
    this.fillStyle.forEach((item, index) => {
      grd.addColorStop(index / this.fillStyle.length, item)
    })
    ctx.fillStyle = grd
    ctx.fillRect(0, 0, this.W, this.H)
  }
}

class Stars {
  constructor(props) {
    this.stars = []
    this.fillStyle = 'rgb(255,255,255)'
    Object.assign(this, props)
  }
  render(ctx) {
    this.stars.forEach(item => {
      ctx.save()
      ctx.beginPath()
      ctx.arc(item.x, item.y, item.r, 0, 2 * Math.PI)
      ctx.fillStyle = this.fillStyle
      ctx.fill()
      ctx.restore()
    })
  }
}

class Cactus {
  constructor(props) {
    this.x = 0
    this.y = 0
    this.H = 100
    this.W = 10
    this.fillStyle = 'rgb(0,0,0)'
    Object.assign(this, props)
  }
  render(ctx) {
    ctx.save()
    ctx.beginPath()
    ctx.moveTo(this.x, this.y)
    ctx.lineTo(this.x, this.y - this.H)
    ctx.moveTo(this.x, this.y - this.H / 4)
    ctx.quadraticCurveTo(this.x + 2 * this.W, this.y - this.H / 8, this.x + 2 * this.W, this.y - this.H / 2)
    ctx.moveTo(this.x, this.y - this.H / 2)
    ctx.quadraticCurveTo(this.x - 2 * this.W, this.y - this.H / 2, this.x - 2 * this.W, this.y - this.H * 0.7)
    ctx.moveTo(this.x, this.y - this.H * 0.7)
    ctx.quadraticCurveTo(this.x + 2 * this.W, this.y - this.H * 0.6, this.x + 1.5 * this.W, this.y - this.H * 0.9)
    ctx.lineCap = 'round'
    ctx.lineWidth = this.W
    ctx.strokeStyle = this.fillStyle
    ctx.stroke()
    ctx.restore()
  }
}

class Particle {
  constructor(props) {
    this.count = 30
    this.mouseX = 0
    this.mouseY = 0
    this.W = 0
    this.H = 0
    this.balls = []
    Object.assign(this, props)
    this.init()
  }
  init() {
    for (let i = 0; i < this.count; i++) {
      this.push(Math.random() * this.W, Math.random() * this.H)
    }
  }
  push(x, y) {
    const size = Math.random() * 1 + 2
    this.balls.push(
      new Ball({
        x: x,
        y: y,
        r: size,
        m: size,
        vx: (0.5 - Math.random()) * (Math.random() * 2 + 0.2),
        vy: (0.5 - Math.random()) * (Math.random() * 2 + 0.2),
        fillStyle: '#ffffff'
      })
    )
  }
  sRender(ctx) {
    const grd = ctx.createLinearGradient(0, 0, this.W, this.H)
    grd.addColorStop(0, this.color[0])
    grd.addColorStop(1, this.color[1])
    ctx.fillStyle = grd
    ctx.fillRect(0, 0, this.W, this.H)
  }
  static spring(a, b) {
    let dx = b.x - a.x
    let dy = b.y - a.y
    let d = Math.sqrt(dx ** 2 + dy ** 2)
    if (d < 150) {
      let aX = dx * 0.00005
      let aY = dy * 0.00005
      a.vx += aX / a.m
      a.vy += aY / a.m
      b.vx -= aX / b.m
      b.vy -= aY / b.m
    }
  }
  static drawLine(ctx, a, b) {
    let d = Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2)
    ctx.save()
    ctx.lineWidth = 1.5 * Math.max(0, 1 - d / 150)
    ctx.globalAlpha = 1.5 * Math.max(0, 1 - d / 150)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)'
    ctx.beginPath()
    ctx.lineTo(a.x, a.y)
    ctx.lineTo(b.x, b.y)
    ctx.stroke()
    ctx.restore()
  }
  static click(a, b) {
    let dx = b.x - a.x
    let dy = b.y - a.y
    let dist = Math.sqrt(dx ** 2 + dy ** 2)
    if (dist < a.r + b.r) {
      let angle = Math.atan2(dy, dx)
      let sin = Math.sin(angle)
      let cos = Math.cos(angle)

      // 以a为参照物，设定a的中心点为旋转基点
      let x1 = 0
      let y1 = 0
      let x2 = dx * cos + dy * sin
      let y2 = dy * cos - dx * sin

      // 旋转a和b的速度
      let vx1 = a.vx * cos + a.vy * sin
      let vy1 = a.vy * cos - a.vx * sin
      let vx2 = b.vx * cos + b.vy * sin
      let vy2 = b.vy * cos - b.vx * sin

      // 求出a和b碰撞之后的速度
      let vx1Final = ((a.m - b.m) * vx1 + 2 * b.m * vx2) / (a.m + b.m)
      let vx2Final = ((b.m - a.m) * vx2 + 2 * a.m * vx1) / (a.m + b.m)

      // 处理两个小球碰撞之后，将它们进行归位
      let lep = a.r + b.r - Math.abs(x2 - x1)

      x1 = x1 + (vx1Final < 0 ? -lep / 2 : lep / 2)
      x2 = x2 + (vx2Final < 0 ? -lep / 2 : lep / 2)

      b.x = a.x + (x2 * cos - y2 * sin)
      b.y = a.y + (y2 * cos + x2 * sin)
      a.x = a.x + (x1 * cos - y1 * sin)
      a.y = a.y + (y1 * cos + x1 * sin)

      a.vx = vx1Final * cos - vy1 * sin
      a.vy = vy1 * cos + vx1Final * sin
      b.vx = vx2Final * cos - vy2 * sin
      b.vy = vy2 * cos + vx2Final * sin
    }
  }
}

class Space {
  constructor(props) {
    this.x = 0
    this.y = 0
    this.W = 0
    this.H = 0
    this.orbital = []
    this.renderBalls = []
    Object.assign(this, props)
  }
  init(ctx) {
    const grd = ctx.createRadialGradient(this.x, this.y, 10, this.x, this.y, 1300)
    grd.addColorStop(0, this.sun)
    grd.addColorStop(0.06, this.difColor)
    grd.addColorStop(1, this.color)
    ctx.fillStyle = grd
    ctx.fillRect(0, 0, this.W, this.H)
    this.orbital.forEach(item => {
      new Ball({
        x: this.x,
        y: this.y,
        r: item.R,
        fillStyle: 'rgba(0, 0, 0, 0)',
        strokeStyle: this.difColor,
        lineWidth: 2
      }).render(ctx)
    })
    this.orbital.forEach(item => {
      item.stars.forEach(star => {
        const { fillStyle, diff1, r, angle, strokeStyle, lineWidth } = star
        this.renderBalls.push(
          new Ball({
            fillStyle,
            diff1,
            r,
            angle,
            strokeStyle,
            lineWidth,
            R: item.R,
            X: this.x,
            Y: this.y,
            speed: item.speed
          })
        )
      })
    })
    this.renderAstronaut = new Astronaut(this.astronaut)
  }
}

class Desert {
  constructor(props) {
    this.W = 0
    this.H = 0
    this.fillStyle = []
    Object.assign(this, props)
  }
  init(ctx) {
    ctx.beginPath()
    this.mountains.forEach(item => new Mountain(item).render(ctx))
    new Sunshine(this.sunshine).render(ctx)
    new Cactus(this.cactus).render(ctx)
    new Moon(this.moon).render(ctx)
    this.items = new Stars(this.stars)
  }
  render(ctx) {
    const grd = ctx.createLinearGradient(0, 0, 0, this.H)
    this.fillStyle.forEach((item, index) => {
      grd.addColorStop(index / this.fillStyle.length, item)
    })
    ctx.fillStyle = grd
    ctx.fillRect(0, 0, this.W, this.H)
    this.items.render(ctx)
  }
}

export { Particle, Space, Desert }
