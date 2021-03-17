<template>
  <div ref="chart" class="tag-chart"></div>
</template>

<script>
export default {
  props: {
    list: Array
  },
  data() {
    return {
      chart: null
    }
  },
  computed: {
    option() {
      return {
        title: {
          text: 'Tags',
          left: 'left',
          textStyle: {
            fontFamily: 'Ubuntu',
            fontWeight: 'normal'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} 篇'
        },
        visualMap: {
          show: false,
          right: 'right',
          bottom: '10px',
          min: 0,
          max: this.list[0].value * 1.5,
          inRange: {
            color: this.$store.state.color.css(),
            colorLightness: [0.2, 0.6]
          }
        },
        series: [
          {
            name: 'Tag',
            type: 'pie',
            radius: ['20%', '70%'],
            center: ['50%', '50%'],
            data: this.list,
            roseType: 'radius',
            // selectedMode: 'single',
            label: {
              color: '#4a4a4a'
            },
            labelLine: {
              lineStyle: {
                color: '#4a4a4a'
              },
              smooth: 0.2,
              length: 10,
              length2: 20
            },
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function() {
              return Math.random() * 500
            }
          }
        ]
      }
    }
  },
  mounted() {
    this.chart = this.$echarts.init(this.$refs.chart)
    this.chart.on('click', params => {
      this.$emit('addFilters', {
        key: 'tags',
        label: '标签',
        name: params.name
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
