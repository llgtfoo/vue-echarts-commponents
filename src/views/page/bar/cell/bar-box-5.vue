<!--
 * @Descripttion: ''
 * @Author: lilong(lilong@hztianque.com)
 * @Date: 2020-07-09 15:50:20
 * @LastEditTime: 2020-07-09 17:57:02
--> 
<template>
  <div class="charts-wrapper" ref="bar5" />
</template>
<script>
// import _lodash_sortBy from 'lodash/sortBy'
export default {
  props: {
    chartId: {
      type: String,
      default: "horizontal-bar-charts"
    },
    source: {
      type: Array,
      default: () => []
    },
    colorDic: {
      type: Object,
      default: () => {
        return {
          fillColor: [
            "rgba(164,24,77,0.9)",
            "rgba(154,53,18,0.9)",
            "rgba(156,88,14,0.9)",
            "rgba(49,68,168,0.9)"
          ],
          borderColor: ["#d92b75", "#ca5637", "#cb7729", "#425ad8"]
        };
      }
    }
  },
  data() {
    return {
      chart: null,
      option: {},
      end:0,
      timeOut:null,
    };
  },
  watch: {
    source: function(newSource) {
      if (this.chart === null) {
        this.chart = this.initCharts();
      }
      this.updateCharts(newSource);
    }
  },
  mounted() {
    this.chart = this.initCharts();
    this.updateCharts(this.source);
  },
  methods: {
    initCharts() {
      const el = this.$refs.bar5;
      const charts = this.$echarts.init(el);
      return charts;
    },
    updateCharts() {
      const data = [600, 720, 510, 400, 720, 510, 400, 400, 720, 510, 400, 300]
      const dataX = ['市中区', '任城区', '金乡县', '嘉祥县', '汶上县', '泗水县', '梁山县', '曲阜市', '兖州区', '高新区', '太白新区', '济宁经济技术开发区'];
      if (dataX.length < 5) {
        this.end = dataX.length - 1;
      } else {
        this.end = 4;
      }
      this.option = {
        grid: {
          left: "0%",
          right: "3%",
          bottom: "0%",
          top: "5%",
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          padding: 10,
          backgroundColor: "rgba(0, 0, 0, .8)"
        },
        dataZoom: [
          {
            // yAxisIndex: 0,
            show: false,
            type: "slider", // 这个 dataZoom 组件是 slider 型 dataZoom 组件
            startValue: 0, // 从头开始。
            endValue: this.end // 一次性展示五个。
          }
        ],
        xAxis: {
          axisLabel: {
            // rotate:45,
            textStyle: {
              color: "#fff",
              fontSize: 12
            },
            formatter: function(value, index) {
              return value.replace(/(.{4})/g, "$1\n");
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          data: dataX
        },
        yAxis: {
          type: "value",
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: "#fff"
            }
          },
          axisLabel: {
            textStyle: {
              color: "#fff",
              fonSize: 12
            }
          }
        },
        series: [
          {
            type: "bar",
            name: "人口",
            // barWidth: 30,
            itemStyle: {
              normal: {
                color: "#1890FF"
              }
            },
            label: {
              //图形上的文本标签
              normal: {
                show: true,
                position: "top",
                textStyle: {
                  color: "#fff",
                  fontStyle: "normal",
                  fontFamily: "微软雅黑",
                  fontSize: 13
                }
              }
            },
            data: data
          }
        ]
      }
      this.chart.setOption(this.option)
      this.chart.on('mousemove',this.stop)
      this.autoMove(data)
    },
    autoMove(data){
         this.timeOut=setInterval(()=>{
            clearInterval(this.timeOut)
        // 每次向后滚动一个，最后一个从头开始。
        if (this.option.dataZoom[0].endValue === data.length) {
             this.option.dataZoom[0].endValue = this.end;
             this.option.dataZoom[0].startValue = 0;
        } else {
             this.option.dataZoom[0].endValue =  this.option.dataZoom[0].endValue + 1;
             this.option.dataZoom[0].startValue =  this.option.dataZoom[0].startValue + 1;
        }
        this.chart.setOption(this.option)
    }, 3000);
    },
    stop(){
      console.log(11)
      clearInterval(this.timeOut)
    }
  }
};
</script>

<style scoped>
.charts-wrapper {
  height: 100%;
  width: 100%;
}
</style>