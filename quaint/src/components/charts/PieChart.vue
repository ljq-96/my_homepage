<template>
  <div class="pie-chart">
    <canvas @mouseover="mouseover" ref="canvas">111</canvas>
  </div>
</template>

<script>
import Color from '@/common/color'
export default {
  props: {
    list: Array,
    width: Number,
    height: Number
  },
  data() {
    return {
      ctx: null,
      pieList: [],
      color: new Color(this.$store.state.color)
    }
  },
  watch: {
    list() {
      let sum = 0
      let pass = 0
      const arr = []
      this.list.forEach(item => (sum += item.info))
      for (let i = 0; i < this.list.length; i++) {
        const radian = (this.list[i].info / sum) * 2 * Math.PI
        if (pass <= Math.PI * 1.6) {
          this.pieList.push({
            sRadian: pass,
            radian: radian,
            tag: this.list[i].title,
            count: this.list[i].info
          })
        } else {
          break
        }
        pass += radian
      }
      this.pieList.push({
        sRadian: pass,
        radian: 2 * Math.PI - pass
      })
      this.drawPie()
    }
  },
  methods: {
    init() {
      const canvas = this.$refs.canvas
      canvas.width = this.width
      canvas.height = this.height
      this.ctx = canvas.getContext('2d')
    },
    drawSector(ctx, props) {
      const { x, y, r, sRadian, radian, color } = props
      ctx.save()
      ctx.beginPath()
      ctx.fillStyle = this.$store.state.color
      ctx.strokeStyle = '#fff'
      ctx.lineWidth = 4
      ctx.moveTo(x, y)
      ctx.lineTo(x + r * Math.cos(sRadian), y + r * Math.sin(sRadian))
      ctx.arc(x, y, r, sRadian, radian + sRadian, false)
      ctx.lineTo(x, y)
      ctx.fill()
      ctx.stroke()
      ctx.restore()
    },
    drawPie() {
      this.pieList.forEach((item, index) => {
        this.drawSector(this.ctx, {
          x: this.width / 2,
          y: this.height / 2,
          r: this.width * 0.4,
          sRadian: item.sRadian,
          radian: item.radian,
          color: new Color(this.$store.state.color).loh(index * 10)
        })
      })
      this.ctx.beginPath()
      this.ctx.fillStyle = '#fff'
      this.ctx.arc(this.width / 2, this.height / 2, this.width * 0.2, 0, Math.PI * 2)
      this.ctx.fill()
    },
    mouseover() {
      this.drawPie()
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style></style>
