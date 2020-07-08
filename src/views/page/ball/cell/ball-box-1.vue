<!--
 * @Author: llgtfoo@163.com
 * @Date: 2020-07-08 23:25:46
 * @LastEditTime: 2020-07-08 23:41:25
 * @LastEditors: user
 * @Description: 
 * @FilePath: \vue-echarts-commponents\src\views\page\ball\cell\ball-box-1.vue
 -->
 <template>
  <div class='ball-container' ref='ball' />
</template>
<script>
export default {
  name: 'BallStyle1',
  props: {
    sid: {
      type: String,
      default: () => 'ball1',
    },
    source: {
      type: [Array, Object],
      default: () => {
        return [0.1, 0.3, 0.5, 0.8]
      },
    },
    radius: {
      type: String,
      defalut: '80%',
    },
    colorDic: {
      type: Object,
      default: () => {
        return {
          fillColor: ['#2A458D', '#215EBF', '#248AE1', '#43B0F5'],
          borderColor: '#156ACF',
          bgColor: '#E0F6FE',
        }
      },
    },
  },
  data() {
    return {
      chart: null,
      option: {},
    }
  },
  watch: {
    source(newVal) {
      if (this.chart === null) {
        this.chart = this.initChart()
      }
      this.updateChart(newVal)
    },
  },
  mounted() {
    this.chart = this.initChart()
    this.updateChart(this.source)
  },
  methods: {
    initChart() {
      const el = this.$refs.ball
      const _chart = this.$echarts.init(el)
      return _chart
    },
    initData(source) {
      if (Object.prototype.toString.call(source) === '[object Object]') {
        const _indicatorValue = []
        Object.entries(source).forEach((value) => {
          _indicatorValue.push(value)
          return _indicatorValue
        })
      } else if (source && Object.prototype.toString.call(source) === '[object Array]') {
        return source
      }
    },
    updateChart(source) {
      const data = this.initData(source)
      this.option = {
        series: [{
          type: 'liquidFill',
          data: data,
          radius: this.radius,
          color: this.colorDic.fillColor,
          backgroundStyle: {
            borderWidth: 0,
            borderColor: 'transparent',
            color: this.colorDic.bgColor,
          },
          outline: {
            show: true,
            borderDistance: 10,
            itemStyle: {
              borderWidth: 5,
              borderColor: this.colorDic.borderColor,
              shadowBlur: 0,
              shadowColor: 'rgba(255, 0, 0, 1)',
            },
          },
        }],
      }
      this.chart.setOption(this.option)
    },
  },
}
</script>
<style lang="scss" scoped>
.ball-container{
  width: 100%;
  height: 100%;
}
</style>


