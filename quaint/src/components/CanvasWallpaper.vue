<template>
  <div @dblclick="changeIndex" class="canvas">
    <canvas ref="static"></canvas>
    <canvas ref="dynamic"></canvas>
  </div>
</template>

<script>
import { Particle, Space, Desert } from '../common/canvas'
import ColorCalc from '../common/color'
let timer
export default {
  data() {
    return {
      sCtx: null,
      dCtx: null,
      index: 0
    }
  },
  mounted() {
    this.initCanvas()
    window.onresize = () => {
      this.initCanvas()
    }
  },
  methods: {
    changeIndex() {
      if (this.$store.state.wallpaper >= 2) {
        this.$store.commit('setWallpaper', 0)
      } else {
        this.$store.commit('setWallpaper', parseInt(this.$store.state.wallpaper) + 1)
      }
      // console.log(this.index)
      // this.$store.commit('setWallpaper', this.index)
      this.setWallpaper(this.$store.state.wallpaper)()
    },
    setWallpaper(index) {
      window.cancelAnimationFrame(timer)
      return [this.drawParticle, this.drawSpace, this.drawDesert][index]
    },
    initCanvas() {
      // this.W = window.innerWidth * 1.5
      // this.H = window.innerHeight * 1.5
      this.W = this.$refs.static.parentNode.offsetWidth * 1.5
      this.H = this.$refs.static.parentNode.offsetHeight * 1.5
      this.$refs.static.width = this.W
      this.$refs.static.height = this.H
      this.$refs.dynamic.width = this.W
      this.$refs.dynamic.height = this.H
      this.sCtx = this.$refs.static.getContext('2d')
      this.dCtx = this.$refs.dynamic.getContext('2d')
      this.setWallpaper(this.$store.state.wallpaper)()
    },
    drawParticle() {
      this.$refs.dynamic.style.zIndex = 0
      const color = new ColorCalc(this.$store.state.color.c1)
      const loh = color.loh(50)
      this.dCtx.clearRect(0, 0, this.W, this.H)
      const particle = new Particle({
        count: 60,
        W: this.W,
        H: this.H,
        color: [this.$store.state.color.c1, loh]
      })
      particle.sRender(this.sCtx)
      let move = () => {
        this.dCtx.clearRect(0, 0, this.W, this.H)
        particle.balls.forEach((item, index) => {
          item.x += item.vx
          item.y += item.vy
          for (let j = index + 1; j < particle.balls.length; j++) {
            Particle.drawLine(this.dCtx, item, particle.balls[j])
            Particle.click(item, particle.balls[j])
            Particle.spring(item, particle.balls[j])
          }
          if (item.x - item.r < 0 || item.x + item.r > this.W) {
            item.vx = -item.vx
          } else if (item.y - item.r < 0 || item.y + item.r > this.H) {
            item.vy = -item.vy
          }
          item.render(this.dCtx)
        })
        timer = requestAnimationFrame(move)
      }
      move()
    },
    drawSpace() {
      this.$refs.dynamic.style.zIndex = 0
      this.sCtx.clearRect(0, 0, this.W, this.H)
      const color = new ColorCalc(this.$store.state.color.c1)
      const diff1 = color.diff()
      const diff2 = color.diff()
      const diff3 = color.diff()
      const loh = color.loh(50)
      const sun = new ColorCalc(this.$store.state.color.c1).separate().bright > 50 ? 'rgb(0,35,113)' : 'rgb(255,187,57)'
      let space = new Space({
        x: this.W * 0.8,
        y: this.H * 0.2,
        W: this.W,
        H: this.H,
        color: this.$store.state.color.c1,
        difColor: loh,
        sun: sun,
        astronaut: {
          x: this.W * 0.2,
          y: this.H * 0.4,
          jet: 400,
          jetStyle: loh
        },
        orbital: [
          {
            R: this.W * 0.25,
            speed: 0.0012,
            stars: [
              {
                fillStyle: diff1,
                r: 6,
                angle: 0,
                strokeStyle: loh,
                lineWidth: 2
              },
              {
                fillStyle: diff1,
                r: 10,
                angle: 4.4,
                strokeStyle: loh,
                lineWidth: 4
              },
              {
                fillStyle: diff2,
                r: 20,
                angle: 2,
                strokeStyle: loh
              },
              {
                fillStyle: diff2,
                r: 8,
                angle: 2.5,
                strokeStyle: loh,
                lineWidth: 4
              },
              {
                fillStyle: diff3,
                r: 13,
                angle: 5,
                strokeStyle: loh
              }
            ]
          },
          {
            R: this.W * 0.4,
            speed: 0.0006,
            stars: [
              {
                fillStyle: diff3,
                r: 24,
                angle: 1.2,
                strokeStyle: loh
              },
              {
                fillStyle: diff3,
                r: 8,
                angle: 1.8,
                strokeStyle: loh
              },
              {
                fillStyle: diff3,
                r: 18,
                angle: 2.6,
                strokeStyle: loh,
                lineWidth: 18
              },
              {
                fillStyle: diff1,
                r: 18,
                angle: 6,
                strokeStyle: loh,
                lineWidth: 15
              },
              {
                fillStyle: diff1,
                r: 8,
                angle: 4
              },
              {
                fillStyle: diff2,
                r: 26,
                angle: 3.1,
                strokeStyle: loh
              }
            ]
          },
          {
            R: this.W * 0.7,
            speed: 0.0002,
            stars: [
              {
                fillStyle: diff2,
                r: 26,
                angle: 3.2,
                strokeStyle: loh
              },
              {
                fillStyle: diff2,
                r: 16,
                angle: 3.6,
                strokeStyle: loh
              },
              {
                fillStyle: diff2,
                r: 35,
                angle: 5.8,
                strokeStyle: loh
              },
              {
                fillStyle: diff3,
                r: 20,
                angle: 2.4,
                strokeStyle: loh
              },
              {
                fillStyle: diff3,
                r: 12,
                angle: 0,
                strokeStyle: loh,
                lineWidth: 14
              },
              {
                fillStyle: diff1,
                r: 18,
                angle: 4.7
              },
              {
                fillStyle: diff1,
                r: 22,
                angle: 1.6,
                strokeStyle: loh,
                lineWidth: 20
              },
              {
                fillStyle: diff1,
                r: 8,
                angle: 0.4,
                strokeStyle: loh,
                lineWidth: 12
              }
            ]
          }
        ]
      })
      space.init(this.sCtx)
      let move = () => {
        this.dCtx.clearRect(0, 0, this.W, this.H)

        space.renderBalls.forEach(star => {
          // console.log(star)
          star.x = star.X + star.R * Math.cos(star.angle)
          star.y = star.Y + star.R * Math.sin(star.angle)
          star.angle += star.speed
          star.angle %= Math.PI * 2
          star.render(this.dCtx)
        })
        if (space.renderAstronaut.x > this.W + space.renderAstronaut.jet) {
          space.renderAstronaut.x = -60
        }
        space.renderAstronaut.x += 0.5
        space.renderAstronaut.render(this.dCtx)
        timer = requestAnimationFrame(move)
      }
      move()
    },
    drawDesert() {
      this.$refs.dynamic.style.zIndex = -1
      this.sCtx.clearRect(0, 0, this.W, this.H)
      const color = new ColorCalc(this.$store.state.color.c1)
      const heaviest = color.heavy(80)
      const heavy = color.heavy(30)
      const lighter = color.lighter(20)
      const lightest = color.lighter(80)
      const desert = new Desert({
        W: this.W,
        H: this.H,
        fillStyle: [heavy, this.$store.state.color.c1, lightest],
        moon: {
          x: this.W * 0.8,
          y: this.H * 0.2,
          d: 100,
          fillStyle: lightest
        },
        sunshine: {
          x: this.W * 0.44,
          y: this.H * 0.7,
          r: 800,
          W: this.W,
          H: this.H,
          fillStyle: ['rgba(255,255,255,0.2)', 'rgba(255,255,255,0)']
        },
        stars: {
          stars: [],
          fillStyle: lightest
        },
        cactus: {
          x: this.W * 0.74,
          y: this.H * 0.91,
          fillStyle: heaviest,
          H: 100,
          W: 12
        },
        mountains: [
          {
            start: [0, this.H * 0.7],
            end: [this.W * 0.8, this.H],
            tops: [[this.W * 0.2, this.H * 0.68]],
            H: this.H,
            fillStyle: [lighter]
          },
          {
            start: [this.W * 0.2, this.H * 0.9],
            end: [this.W, this.H * 0.5],
            tops: [
              [this.W * 0.7, this.H * 0.66],
              [this.W * 0.75, this.H * 0.85]
            ],
            H: this.H,
            fillStyle: [this.$store.state.color.c1]
          },
          {
            start: [0, this.H * 0.82],
            end: [this.W, this.H * 0.82],
            tops: [[this.W / 2, this.H * 0.84]],
            H: this.H,
            fillStyle: [heavy, heaviest]
          }
        ]
      })
      for (let i = 0; i < 500; i++) {
        const r = Math.random() + 1
        const d = Math.random() * 1000 + 50
        const speed = (d / this.W) * 0.003
        const angle = Math.random() * 2 * Math.PI
        const x = 928 + d * Math.sin(angle)
        const y = 690 + d * Math.cos(angle)
        desert.stars.stars.push({ x, y, r, d, speed, angle })
      }
      desert.init(this.sCtx)
      let move = () => {
        this.dCtx.clearRect(0, 0, this.W, this.H)
        desert.stars.stars.forEach(item => {
          item.angle += item.speed
          item.angle %= Math.PI * 2
          item.x = this.W * 0.6 + item.d * Math.cos(item.angle)
          item.y = this.H * 0.8 + item.d * Math.sin(item.angle)
        })
        desert.render(this.dCtx)
        timer = requestAnimationFrame(move)
      }
      move()
    }
  }
}
</script>

<style>
.canvas {
  position: relative;
  height: 100vh;
}

.canvas canvas {
  position: absolute;
  top: 0;
  width: 100%;
}
</style>
