<template>
  <fluent-design v-slot="param" :borderColor="'rgba(255, 255, 255, 0.8)'" :width="3" class="color-select blur">
    <div class="preset">
      <fluent-design-item :param="param" v-for="item in colors" :key="item">
        <div class="preset-item" @click="setColor(item)" :style="{ backgroundColor: item }">
          <span v-show="item === $store.state.color.c1" class="iconfont icon-check"></span>
        </div>
      </fluent-design-item>
    </div>
    <div class="use-color">
      <input @input="hexUpdate" type="text" v-model="hex" />
      <span v-show="toRgb(currentColor) !== $store.state.color.c1" @click="saveColor" class="iconfont icon-save1"></span>
    </div>
    <fluent-design-item :param="param" :isRotate="false">
      <div class="preview" :style="{ backgroundColor: toRgb(currentColor) }"></div>
    </fluent-design-item>
    <div class="select-progress">
      <div class="select-r">
        <div
          class="progress"
          :style="{
            background: `linear-gradient(to right, ${toRgb([0, currentColor[1], currentColor[2]])}, ${toRgb([
              255,
              currentColor[1],
              currentColor[2]
            ])})`
          }"
        >
          <span
            @mousedown="dragDown(0, $event)"
            :style="{ left: btnPosition[0] + 'px', backgroundColor: toRgb(currentColor) }"
          ></span>
        </div>
        <input @input="rgbUpdate(0, $event)" type="text" :value="currentColor[0]" maxlength="3" />
      </div>
      <div class="select-g">
        <div
          class="progress"
          :style="{
            backgroundImage: `linear-gradient(to right, ${toRgb([currentColor[0], 0, currentColor[2]])}, ${toRgb([
              currentColor[0],
              255,
              currentColor[2]
            ])})`
          }"
        >
          <span
            ref="btn"
            @mousedown="dragDown(1, $event)"
            :style="{ left: btnPosition[1] + 'px', backgroundColor: toRgb(currentColor) }"
          ></span>
        </div>
        <input @input="rgbUpdate(1, $event)" type="text" :value="currentColor[1]" maxlength="3" />
      </div>
      <div class="select-b">
        <div
          class="progress"
          :style="{
            backgroundImage: `linear-gradient(to right, ${toRgb([currentColor[0], currentColor[1], 0])}, ${toRgb([
              currentColor[0],
              currentColor[1],
              255
            ])})`
          }"
        >
          <span
            @mousedown="dragDown(2, $event)"
            :style="{ left: btnPosition[2] + 'px', backgroundColor: toRgb(currentColor) }"
          ></span>
        </div>
        <input @input="rgbUpdate(2, $event)" type="text" :value="currentColor[2]" maxlength="3" />
      </div>
    </div>
  </fluent-design>
</template>

<script>
import FluentDesign from '../FluentDesign'
import FluentDesignItem from '../FluentDesignItem'
export default {
  components: {
    FluentDesign,
    FluentDesignItem
  },
  data() {
    return {
      colors: [
        'rgb(255,112,67)',
        'rgb(255,167,38)',
        'rgb(139,195,74)',
        'rgb(38,166,154)',
        'rgb(0,188,212)',
        'rgb(66,165,245)',
        'rgb(92,107,192)',
        'rgb(126,87,194)',
        'rgb(120,144,156)',

        'rgb(244,81,30)',
        'rgb(251,140,0)',
        'rgb(104,159,56)',
        'rgb(0,137,123)',
        'rgb(0,151,167)',
        'rgb(30,136,229)',
        'rgb(57,73,171)',
        'rgb(94,53,177)',
        'rgb(84,110,122)',

        'rgb(216,67,21)',
        'rgb(230,81,0)',
        'rgb(51,105,30)',
        'rgb(0,105,92)',
        'rgb(0,96,100)',
        'rgb(21,101,192)',
        'rgb(40,53,147)',
        'rgb(69,39,160)',
        'rgb(55,71,79)'
      ],
      currentColor: [0, 0, 0],
      btnPosition: [0, 0, 0],
      maxDistance: 0,
      hex: ''
    }
  },
  methods: {
    setColor(item) {
      this.currentColor = this.toArr(item)
      this.saveColor()
      this.setPosition()
      this.setHex()
    },
    dragDown(index, e) {
      let X = e.clientX
      let elX = e.target.offsetLeft
      e.target.style.transition = '0s'
      document.onmousemove = e => {
        let cX = e.clientX
        let distance = cX - X + elX
        if (distance >= this.maxDistance) {
          distance = this.maxDistance
        } else if (distance <= 0) {
          distance = 0
        }
        this.currentColor[index] = Math.ceil((distance / this.maxDistance) * 255)
        this.$set(this.btnPosition, index, distance)
        this.setHex()
      }
      document.onmouseup = () => {
        document.onmousemove = null
        e.target.style.transition = ''
      }
    },
    rgbUpdate(index, e) {
      if (e.target.value) {
        this.currentColor[index] = e.target.value.replace(/[\D]/g, '') < 255 ? e.target.value.replace(/[\D]/g, '') : 0
      } else {
        this.currentColor[index] = 0
      }
      this.setPosition()
      this.setHex()
    },
    hexUpdate() {
      if (/^#?[0-9a-fA-F]{6}/.test(this.hex)) {
        this.currentColor = this.toArr(this.hex)
      }
    },
    setPosition() {
      this.currentColor.forEach((item, index) => {
        this.$set(this.btnPosition, index, (item / 255) * this.maxDistance)
      })
    },
    setHex() {
      this.hex =
        '#' + this.toHex(this.currentColor[0]) + this.toHex(this.currentColor[1]) + this.toHex(this.currentColor[2])
    },
    saveColor() {
      this.$store.commit('setColor', this.toRgb(this.currentColor))
      this.$emit('initCanvas')
    }
  },
  computed: {
    toArr() {
      return function(str) {
        if (str.length > 8) {
          return str
            .replace(/\s/g, '')
            .match(/\((.*?)\)/)[1]
            .split(',')
        } else {
          let temp = str.replace('#', '')
          return [parseInt(temp.slice(0, 2), 16), parseInt(temp.slice(2, 4), 16), parseInt(temp.slice(4, 6), 16)]
        }
      }
    },
    toRgb() {
      return function(arr) {
        return `rgb(${arr.join(',')})`
      }
    },
    toHex() {
      return function(nub) {
        if (parseInt(nub).toString(16).length === 1) {
          return '0' + parseInt(nub).toString(16)
        } else {
          return parseInt(nub).toString(16)
        }
      }
    }
  },
  created() {
    this.currentColor = this.toArr(this.$store.state.color.c1)
    this.setHex()
  },
  mounted() {
    const el = this.$refs.btn
    this.maxDistance = el.parentNode.offsetWidth - el.offsetWidth
    this.setPosition()
  }
}
</script>

<style>
.color-select {
  position: fixed;
  right: -500px;
  top: 50px;
  width: 500px;
  height: 100vh;
  padding: 20px;
  transition: 0.4s;
  z-index: 10;
}

.color-select .preset {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 20px;
}

.color-select .preset > div {
  margin: 2px 0;
}

.color-select .preset-item {
  width: 47px;
  height: 47px;
  line-height: 47px;
  text-align: center;
  color: #fff;
}

.use-color {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 20px;
  margin-bottom: 4px;
}

.use-color input {
  font-family: FiraCode;
  background-color: transparent;
  border: none;
  outline: none;
}

.use-color .iconfont {
  font-size: 20px;
}

.preview {
  height: 120px;
}

.select-progress > div {
  display: flex;
  align-items: center;
  margin: 20px 2px;
}

.select-progress .progress {
  position: relative;
  height: 4px;
  flex-grow: 1;
  margin-right: 20px;
}

.select-progress .progress span {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: chocolate;
  transition: 0.4s;
}

.select-progress input {
  width: 65px;
  height: 30px;
  text-align: center;
  font-family: FiraCode;
  outline: none;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background-color: transparent;
}
</style>
