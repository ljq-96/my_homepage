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
          text: 'Words',
          left: 'left',
          textStyle: this.textStyle
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{b}千字: {c}篇',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '10px',
          right: '40px',
          top: '40px',
          bottom: '10px',
          containLabel: true
        },
        xAxis: [
          {
            name: '千字',
            nameGap: 6,
            type: 'category',
            data: this.words.map(item => item.name),
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: this.words.map(item => item.value)
          }
        ]
      }
    },
    words() {
      const arr = [
        {
          name: '0~2',
          value: 0
        },
        {
          name: '2~4',
          value: 0
        },
        {
          name: '4~6',
          value: 0
        },
        {
          name: '6~8',
          value: 0
        },
        {
          name: '8~10',
          value: 0
        },
        {
          name: '10~12',
          value: 0
        },
        {
          name: '12+',
          value: 0
        }
      ]
      this.list.forEach(item => {
        const i = Math.floor(item.words / 2000)
        arr[i > 6 ? 6 : i].value++
      })
      return arr
    }
  },
  mounted() {
    this.chart = this.$echarts.init(this.$refs.chart)
    this.chart.on('click', params => {
      this.$emit('addFilters', {
        key: 'words',
        name: params.name + '千字'
      })
    })
  },
  watch: {
    list() {
      this.chart.setOption(this.option)
    }
  }
}
</script>

<style></style>
