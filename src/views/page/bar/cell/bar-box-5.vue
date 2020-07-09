<!--
 * @Descripttion: ''
 * @Author: lilong(lilong@hztianque.com)
 * @Date: 2020-07-09 15:50:20
 * @LastEditTime: 2020-07-09 23:43:03
--> 
<template>
  <div class="charts-wrapper" ref="bar5" />
</template>
<script>
// import _lodash_sortBy from 'lodash/sortBy'
export default {
  props: {
    source: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      chart: null,
      option: {},
      end:0,
      timeOut:null,
      stopMove:false,
      dataList:{}
    };
  },
  watch: {
    source: function(newSource) {
      if (this.chart === null) {
        this.chart = this.initCharts();
      }
      // console.log(newSource,'newSource')
      this.updateCharts(newSource)
    }
  },
  mounted() {
    this.chart = this.initCharts();
    if(this.source){
    this.updateCharts(this.source);
    }
  },
  methods: {
    initCharts() {
      const el = this.$refs.bar5;
      const charts = this.$echarts.init(el);
      return charts;
    },
     initData(source) {
      if (source && Object.prototype.toString.call(source) === '[object Object]') {
        const _xAxisData = []
        const _seriesData = []
        Object.entries(source).forEach(([key, value]) => {
          _xAxisData.push(key)
          _seriesData.push(value)
        })
        return {
          xAxis: _xAxisData,
          seriesData: _seriesData,
        }
      } else if (source && Object.prototype.toString.call(source) === '[object Array]') {
        const _xAxisData = []
        const _seriesData = []
        source.forEach(item => {
          _xAxisData.push(Object.values(item)[0])
          _seriesData.push(Object.values(item)[1])
        })
        return {
          xAxis: _xAxisData,
          seriesData: _seriesData,
        }
      }
    },
    async updateCharts(source) {
      if(!source||source.length===0) {return }
     this.dataList= await this.initData(source)
      if (this.dataList.seriesData.length < 5) {
        this.end = this.dataList.seriesData.length - 1;
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
          data: this.dataList.xAxis
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
            barWidth: 30,
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
            data: this.dataList.seriesData
          }
        ]
      }
      this.chart.setOption(this.option)
      this.chart.on('mouseover',this.stop)
      this.chart.on('mouseout',this.goMove)
      this.autoMove()
    },
    autoMove(){
         this.timeOut=setInterval(()=>{
            // clearInterval(this.timeOut)
        // 每次向后滚动一个，最后一个从头开始。
        if(this.stopMove){ return }
        if (Number(this.option.dataZoom[0].endValue) === this.dataList.seriesData.length-1) {
             this.option.dataZoom[0].endValue = this.end;
             this.option.dataZoom[0].startValue = 0;
        } else {
             this.option.dataZoom[0].endValue =  this.option.dataZoom[0].endValue + 1;
             this.option.dataZoom[0].startValue =  this.option.dataZoom[0].startValue + 1;
        }
        this.chart.setOption(this.option)
    }, 2000);
    },
    stop(){
      console.log(11)
      this.stopMove=true
      clearInterval(this.timeOut)
    },
    goMove(){
      console.log(333333)
       this.stopMove=false
       this.autoMove()
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