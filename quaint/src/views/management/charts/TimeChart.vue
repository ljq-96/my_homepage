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
      console.log(this.list)
      return {
        color: [this.$store.state.color.css()],
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
            data: this.list.map(item => item.name),
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
          color: '#4a4a4a'
        },
        series: [
          {
            type: 'line',
            smooth: true,
            data: this.list,
            areaStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: this.$store.state.color.css()
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
    }
  },
  mounted() {
    this.chart = this.$echarts.init(this.$refs.chart)
    this.chart.on('click', params => {
      const time = params.name.split('-')
      this.$emit('addFilters', {
        key: 'create_time',
        label: '日期',
        name: [time[0], time[1] < 10 ? '0' + time[1] : time[1]].join('-')
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
