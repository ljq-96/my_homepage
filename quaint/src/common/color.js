class ColorCalc {
  constructor(rgb) {
    this.color = rgb || 'rgb(0, 0, 0)'
  }
  separate() {
    // 分解字符串为对象
    const colorReg = /\((.*?)\)/
    const c = colorReg.exec(this.color)[1].split(',')
    return {
      red: parseInt(c[0]),
      green: parseInt(c[1]),
      blue: parseInt(c[2]),
      bright: (parseInt(c[0]) * 299 + parseInt(c[1]) * 587 + parseInt(c[2]) * 114) / 2550
    }
  }
  heavy(nub) {
    // 加深
    let { red, green, blue } = this.separate()
    red = red > nub ? red - nub : 0
    green = green > nub ? green - nub : 0
    blue = blue > nub ? blue - nub : 0
    return `rgb(${red},${green},${blue})`
  }
  lighter(nub) {
    // 变浅
    let { red, green, blue } = this.separate()
    red = red + nub > 255 ? 255 : red + nub
    green = green + nub > 255 ? 255 : green + nub
    blue = blue + nub > 255 ? 255 : blue + nub
    return `rgb(${red},${green},${blue})`
  }
  loh(nub) {
    // 根据原来颜色的亮度 决定加深还是变浅
    const { bright } = this.separate()
    if (bright > 50) {
      return this.heavy(nub)
    } else {
      return this.lighter(nub)
    }
  }
  inverse() {
    // 反色
    let { red, green, blue } = this.separate()
    red = 255 - red
    green = 255 - green
    blue = 255 - blue
    return `rgb(${red},${green},${blue})`
  }
  grey() {
    // 灰度
    const { red, green, blue } = this.separate()
    const grey = Math.round((red * 299 + green * 587 + blue * 114 + 500) / 1000)
    return `rgb(${grey},${grey},${grey})`
  }
  opacity(nub) {
    // 透明度
    let { red, green, blue } = this.separate()
    return `rgb(${red},${green},${blue},${nub})`
  }
  mix(color, per) {
    // 与另一种颜色混合
    let { red, green, blue } = this.separate()
    const c = new ColorCalc(color).separate()
    red += c.red * per
    green += c.green * per
    blue += c.blue * per
    red /= 2
    green /= 2
    blue /= 2
    return `rgb(${red},${green},${blue})`
  }
  diff() {
    // 返回一个与当前颜色有区分度的颜色
    let { bright } = this.separate()
    bright = bright >= 50 ? bright - 31 : bright + 31
    return `hsl(${Math.random() * 360},${Math.random() * 100}%,${bright}%)`
  }
  static random() {
    return `rgb(${Math.ceil(Math.random() * 180 + 40)},${Math.ceil(Math.random() * 180 + 40)},${Math.ceil(
      Math.random() * 180 + 40
    )})`
  }
}

export default ColorCalc
