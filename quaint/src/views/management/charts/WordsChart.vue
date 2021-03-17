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
        color: [this.$store.state.color.css()],
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
            data: this.list.map(item => item.name),
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
            data: this.list.map(item => item.value)
          }
        ]
      }
    }
  },
  mounted() {
    this.chart = this.$echarts.init(this.$refs.chart)
    this.chart.on('click', params => {
      this.$emit('addFilters', {
        key: 'words',
        label: '字数',
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
