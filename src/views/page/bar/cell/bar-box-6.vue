<!--
 * @Descripttion: ''
 * @Author: lilong(lilong@hztianque.com)
 * @Date: 2020-07-09 15:50:20
 * @LastEditTime: 2020-07-10 00:04:50
--> 
<template>
  <div class="charts-wrapper" ref="bar6" />
</template>
<script>
// import _lodash_sortBy from 'lodash/sortBy'
export default {
  props: {
    source: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      chart: null,
      option: {},
      end: 0,
      timeOut: null,
      stopMove: false,
       dataArr : [
          [30, 32, 31, 100, 20, 50, 40, 20, 100],
          [20, 32, 101, 100, 20, 20, 40, 30, 20]
        ],
        dataY : [
          "东坡区",
          "彭山区",
          "仁寿区",
          "啊龙",
          "ya",
          "圣楠",
          "洁",
          "11",
          "222"
        ],
    };
  },
  watch: {
    source: function(newSource) {
      if (this.chart === null) {
        this.chart = this.initCharts();
      }
      // console.log(newSource,'newSource')
      this.updateCharts(newSource);
    }
  },
  mounted() {
    this.chart = this.initCharts();
    if (this.source) {
      this.updateCharts(this.source);
    }
  },
  methods: {
    initCharts() {
      const el = this.$refs.bar6;
      const charts = this.$echarts.init(el);
      return charts;
    },
    initData(source) {
      if (
        source &&
        Object.prototype.toString.call(source) === "[object Object]"
      ) {
        const _xAxisData = [];
        const _seriesData = [];
        Object.entries(source).forEach(([key, value]) => {
          _xAxisData.push(key);
          _seriesData.push(value);
        });
        return {
          xAxis: _xAxisData,
          seriesData: _seriesData
        };
      } else if (
        source &&
        Object.prototype.toString.call(source) === "[object Array]"
      ) {
        const _xAxisData = [];
        const _seriesData = [];
        source.forEach(item => {
          _xAxisData.push(Object.values(item)[0]);
          _seriesData.push(Object.values(item)[1]);
        });
        return {
          xAxis: _xAxisData,
          seriesData: _seriesData
        };
      }
    },
     updateCharts() {
      if (this.dataY.length < 5) {
        this.end = this.dataY.length - 1;
      } else {
        this.end = 4;
      }
      let result = [];
      // let seriesIndex=0;
      for (let key in this.dataArr) {
        //遍历数组的每一项
        this.dataArr[key].forEach((value, index) => {
          if (this.isBlank(result[index])) {
            result[index] = 0;
          }
          result[index] += value;
        });
      }
      this.option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ["在管", "在外"],
          icon: "roundRect",
          textStyle: {
            color: ["#b2e2ff"],
            fontSize: 14,
            fontWeight: "bold"
          }
        },
        grid: {
          top: "10%",
          left: "1%",
          right: "4%",
          bottom: "1%",
          containLabel: true
        },
        dataZoom: [
          {
            yAxisIndex: 0,
            show: false,
            type: "slider", // 这个 dataZoom 组件是 slider 型 dataZoom 组件
            startValue: 0, // 从头开始。
            endValue: this.end // 一次性展示五个。
          }
        ],
        xAxis: {
          type: "value",
          axisLine: {
            show: false,
            lineStyle: {
              color: "rgba(178,226,255,0.5)" // 颜色
            }
          },
          axisLabel: {
            show: false,
            fontSize: 14,
            color: "rgba(178,226,255,1)",
            fontWeight: "bold"
          },
          splitLine: { show: false }
        },
        yAxis: {
          type: "category",
          data: this.dataY,
          axisLabel: {
            fontSize: 16,
            color: "rgba(178,226,255,1)",
            fontWeight: "bold"
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "rgba(178,226,255,0.5)" // 颜色
            }
          },
          axisTick:{ //y轴刻度线
		         show:false
        },
        },
        series: [
          {
            name: "在管",
            type: "bar",
            stack: "总量",
            barWidth: 30,
            itemStyle: {
              normal: {
                color: "#37A2DA"
              }
            },
            z: 10,
            data: this.dataArr[0]
          },
          {
            name: "在外",
            type: "bar",
            stack: "总量",
            itemStyle: {
              normal: {
                color: "#FFDB5C"
              }
            },
            data: this.dataArr[1]
          },
          {
            type: "bar",
            name: "总数",
            barGap: "-100%",
            barWidth: 30,
            itemStyle: {
              normal: {
                color: "rgba(255, 255, 255, 0)"
              }
            },
            z: -10,
            label: {
              normal: {
                show: true,
                position: "right",
                color: "rgba(191,228,255,1)",
                fontSize: 14,
                padding: [0, 0, 0, 20],
                formatter: "{c}人",
                fontWeight: "bold"
              }
            },
            data: result
          }
        ]
      };
      this.chart.setOption(this.option);
      this.chart.on('mouseover',this.stop)
      this.chart.on('mouseout',this.goMove)
      this.autoMove()
    },
    //判断值是否存在函数
     isBlank(val) {
        if (val == null || val == "") {
            return true;
        }
    },
    //自动滚动
    autoMove() {
      this.timeOut = setInterval(() => {
        clearInterval(this.timeOut)
        // 每次向后滚动一个，最后一个从头开始。
        if(this.stopMove){ return }
        if (
          Number(this.option.dataZoom[0].endValue) ===
          this.dataY.length - 1
        ) {
          this.option.dataZoom[0].endValue = this.end;
          this.option.dataZoom[0].startValue = 0;
        } else {
          this.option.dataZoom[0].endValue =
            this.option.dataZoom[0].endValue + 1;
          this.option.dataZoom[0].startValue =
            this.option.dataZoom[0].startValue + 1;
        }
        this.chart.setOption(this.option);
      }, 3000);
    },
    //停止滚动
    stop() {
      console.log(11);
      this.stopMove=true
      clearInterval(this.timeOut);
    },
    //继续滚动
    goMove() {
      console.log(333333);
       this.stopMove=false
      this.autoMove();
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