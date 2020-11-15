<template>
  <div ref="chart" class="time-chart"></div>
</template>

<script>
export default {
  props: {
    list: Array
  },
  data() {
    return {
      chart: null,
      textStyle: {
        fontFamily: 'Ubuntu',
        fontWeight: 'normal',
        color: '#4a4a4a'
      }
    }
  },
  computed: {
    option() {
      return {
        color: [this.$store.state.color.c1],
        title: {
          text: 'Time',
          left: 'left',
          textStyle: this.textStyle
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{b}: {c}篇',
          axisPointer: {
            type: 'line'
          }
        },
        grid: {
          left: '10px',
          right: '40px',
          top: '60px',
          bottom: '10px',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: this.time.map(item => item.name),
            nameTextStyle: this.textStyle
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        axisLabel: {
          fontFamily: 'Ubuntu',
          fontWeight: 'normal',
          color: '#4a4a4a',
          // formatter: (value, index) => {
          //   if (value > 100) {
          //     return this.$dateFormatter(value, '-', 2)
          //   }
          //   return value
          // }
        },
        series: [
          {
            type: 'line',
            smooth: true,
            data: this.time,
            areaStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: this.$store.state.color.c1
                },
                {
                  offset: 1,
                  color: '#fff'
                }
              ])
            }
          }
        ]
      }
    },
    time() {
      const arr = []
      const first = new Date(this.list[0].time)
      const last = new Date(this.list[this.list.length - 1].time)
      let year = last.getFullYear()
      let month = last.getMonth() + 1
      const m = (first.getFullYear() - last.getFullYear()) * 12 + (first.getMonth() - last.getMonth())

      for (let i = 0; i <= m; i++) {
        const name = [year, month].join('-')
        arr.push({
          name: name,
          value: 0
        })
        if (month === 12) {
          year++
          month = 1
        } else {
          month++
        }
      }

      this.list.forEach(item => {
        const time = new Date(item.time)
        const month = [time.getFullYear(), time.getMonth() + 1].join('-')
        let i = arr.findIndex(i => i.name === month)
        arr[i].value++
      })
      return arr
    }
  },
  mounted() {
    this.chart = this.$echarts.init(this.$refs.chart)
    this.chart.on('click', params => {
      const time = params.name.split('-')
      this.$emit('addFilters', {
        key: 'time',
        name: [time[0], time[1] < 10 ? '0' + time[1] : time[1]].join('-')
      })
    })
  },
  watch: {
    list() {
      console.log(this.time)
      this.chart.setOption(this.option)
    }
  }
}
</script>

<style></style>
