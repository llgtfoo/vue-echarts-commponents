<!--
 * @Descripttion: '实时预警主页面的Echarts地图'
 * @Author: lilong(lilong@hztianque.com)
 * @Date: 2020-06-06 15:50:54
 * @LastEditTime: 2020-07-24 16:49:53
-->
<template>
  <div class="map_item" ref="mapItem" />
</template>

<script>
import echarts from 'echarts'
import sichuan from './CMap-2/demo/Data/sichuan.json'
export default {
  props: {
    source: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
    },
  },
  data() {
    return {
      chart: null,
      // eslint-disable-next-line no-unused-vars
      imageDomZ:
        'image://data:image/png;base64,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',
      // eslint-disable-next-line no-unused-vars
      imageDomC:
        'image://data:image/png;base64,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',
      // eslint-disable-next-line no-unused-vars
      imageDomH:
        'image://data:image/png;base64,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',
      dataTooltip: [], //tooltip数据,
      //模拟数据
      simulatedData: [
        { name: '成都市', value: 11, nowEvent: 111, overEvent: 2222, type: '高发区域预警' },
        { name: '绵阳市', value: 11, nowEvent: 121, overEvent: 222, type: '突发事件预警' },
        { name: '达州市', value: 11, nowEvent: 141, overEvent: 22322, type: '突发事件预警' },
        { name: '雅安市', value: 11, nowEvent: 111, overEvent: 2222, type: '高发区域预警' },
        { name: '阿坝藏族羌族自治州', value: 11, nowEvent: 111, overEvent: 0, type: '突发事件预警' },
        { name: '凉山彝族自治州', value: 11, nowEvent: 'data', overEvent: 22, type: '突发事件预警' },
        { name: '甘孜藏族自治州', value: 11, nowEvent: 111, overEvent: 2222, type: '突发事件预警' },
        { name: '广安市', value: 11, nowEvent: 111, overEvent: 22322, type: '重点人员预警' },
        { name: '巴中市', value: 11, nowEvent: 111, overEvent: 22322, type: '突发事件预警' },
        { name: '眉山市', value: 11, nowEvent: 111, overEvent: 22, type: '突发事件预警' },
      ],
      timeOut: null,
      //地图各区域名字
      dataMap: [
        { name: '成都市' },
        { name: '绵阳市' },
        { name: '自贡市' },
        { name: '攀枝花市' },
        { name: '泸州市' },
        { name: '德阳市' },
        { name: '广元市' },
        { name: '遂宁市' },
        { name: '内江市' },
        { name: '乐山市' },
        { name: '资阳市' },
        { name: '宜宾市' },
        { name: '南充市' },
        { name: '达州市' },
        { name: '雅安市' },
        { name: '阿坝藏族羌族自治州' },
        { name: '凉山彝族自治州' },
        { name: '甘孜藏族自治州' },
        { name: '广安市' },
        { name: '巴中市' },
        { name: '眉山市' },
      ],
    }
  },
  computed: {},
  watch: {
    source: {
      handler() {
        this.updateCharts()
      },
      deep: true,
    },
  },
  mounted() {
    this.chart = this.initCharts()
    this.updateCharts()
    this.fetchData()
    window.addEventListener('resize', () => this.chart.resize(), false)
  },
  methods: {
    //获取容器dom
    initCharts() {
      const myChart = echarts.init(this.$refs.mapItem)
      return myChart
    },
    //渲染数据
    updateCharts() {
      const _that = this
      this.chart.clear()
      // this.chart.resize()
      echarts.registerMap('SICHUAN', sichuan)
      //扎点位置
      const geoCoordMap = {
        '成都市': [104.065735, 30.659462],
        '绵阳市': [104.741722, 31.96402],
        '自贡市': [104.773447, 29.352765],
        '攀枝花市': [101.716007, 26.580446],
        '泸州市': [105.45336, 28.38934],
        '德阳市': [104.208651, 31.427991],
        '广元市': [105.829757, 32.433668],
        '遂宁市': [105.571331, 30.513311],
        '内江市': [105.066138, 29.78708],
        '乐山市': [103.761263, 29.582024],
        '资阳市': [104.941917, 30.322211],
        '宜宾市': [104.630825, 28.460189],
        '南充市': [106.082974, 31.695281],
        '达州市': [107.502262, 31.209484],
        '雅安市': [102.702033, 29.997722],
        '阿坝藏族羌族自治州': [102.221374, 31.899792],
        '凉山彝族自治州': [102.258746, 27.886762],
        '甘孜藏族自治州': [99.963815, 30.050663],
        '广安市': [106.633369, 30.656398],
        '巴中市': [106.953669, 31.858809],
        '眉山市': [103.831788, 30.048318],
      }
      const geoCoordMapH = {
        '成都市': [103.565735, 30.659462],
        '绵阳市': [105.041722, 31.56402],
        '自贡市': [105.173447, 29.252765],
        '攀枝花市': [101.816007, 26.880446],
        '泸州市': [105.75336, 28.08934],
        '德阳市': [104.508651, 31.227991],
        '广元市': [106.229757, 32.633668],
        '遂宁市': [105.271331, 30.613311],
        '内江市': [105.266138, 29.58708],
        '乐山市': [103.261263, 29.082024],
        '资阳市': [105.341917, 30.322211],
        '宜宾市': [104.930825, 28.760189],
        '南充市': [106.682974, 31.295281],
        '达州市': [107.902262, 31.709484],
        '雅安市': [102.702033, 30.797722],
        '阿坝藏族羌族自治州': [103.221374, 31.899792],
        '凉山彝族自治州': [102.858746, 27.886762],
        '甘孜藏族自治州': [100.963815, 30.050663],
        '广安市': [106.233369, 30.556398],
        '巴中市': [107.253669, 32.198809],
        '眉山市': [104.31788, 30.048318],
      }
      const geoCoordMapC = {
        '成都市': [104.465735, 30.659462],
        '绵阳市': [104.441722, 32.56402],
        '自贡市': [104.473447, 29.552765],
        '攀枝花市': [101.416007, 26.980446],
        '泸州市': [105.45336, 28.88934],
        '德阳市': [104.908651, 31.027991],
        '广元市': [105.709757, 32.033668],
        '遂宁市': [105.571331, 31.013311],
        '内江市': [104.566138, 29.78708],
        '乐山市': [103.761263, 29.082024],
        '资阳市': [104.641917, 30.322211],
        '宜宾市': [104.430825, 28.960189],
        '南充市': [106.082974, 30.995281],
        '达州市': [107.902262, 32.209484],
        '雅安市': [102.402033, 29.497722],
        '阿坝藏族羌族自治州': [102.81374, 32.399792],
        '凉山彝族自治州': [101.258746, 28.186762],
        '甘孜藏族自治州': [99.963815, 31.050663],
        '广安市': [106.933369, 30.456398],
        '巴中市': [106.953669, 32.558809],
        '眉山市': [103.131788, 29.748318],
      }

      //重点人员扎点数据
      const dataZ = [
        { name: '成都市', value: 11, nowEvent: 111, overEvent: 2222, type: '突发事件预警' },
        { name: '绵阳市', value: 2, nowEvent: 121, overEvent: 222, type: '突发事件预警' },
        { name: '自贡市', value: 3, nowEvent: 111, overEvent: 2222, type: '重点人员预警' },
        { name: '攀枝花市', value: 4, nowEvent: 111, overEvent: 2222, type: '高发区域预警' },
        { name: '泸州市', value: 5, nowEvent: 111, overEvent: 2252, type: '重点人员预警' },
        { name: '德阳市', value: 7, nowEvent: 111, overEvent: 22622, type: '突发事件预警' },
        { name: '广元市', value: 8, nowEvent: 131, overEvent: 2222, type: '高发区域预警' },
        { name: '遂宁市', value: 99, nowEvent: 111, overEvent: 2222, type: '突发事件预警' },
        { name: '内江市', value: 100, nowEvent: 111, overEvent: 2242, type: '突发事件预警' },
        { name: '乐山市', value: 87, nowEvent: 111, overEvent: 2222, type: '高发区域预警' },
        { name: '资阳市', value: 65, nowEvent: 111, overEvent: 222, type: '突发事件预警' },
        { name: '宜宾市', value: 434, nowEvent: 111, overEvent: 22322, type: '重点人员预警' },
        { name: '南充市', value: 33, nowEvent: 111, overEvent: 2222, type: '高发区域预警' },
        { name: '达州市', value: 234, nowEvent: 141, overEvent: 22322, type: '突发事件预警' },
        { name: '雅安市', value: 44, nowEvent: 111, overEvent: 2222, type: '突发事件预警' },
        { name: '阿坝藏族羌族自治州', value: 67, nowEvent: 111, overEvent: 0, type: '高发区域预警' },
        { name: '凉山彝族自治州', value: 76, nowEvent: 'data', overEvent: 22, type: '重点人员预警' },
        { name: '甘孜藏族自治州', value: 87, nowEvent: 111, overEvent: 2222, type: '高发区域预警' },
        { name: '广安市', value: 78, nowEvent: 111, overEvent: 22322, type: '重点人员预警' },
        { name: '巴中市', value: 98, nowEvent: 111, overEvent: 22322, type: '突发事件预警' },
        { name: '眉山市', value: 54, nowEvent: 111, overEvent: 22, type: '突发事件预警' },
      ]
      //突发事件扎点数据
      const dataH = [
        { name: '雅安市', value: 9, nowEvent: 111, overEvent: 2222, type: '突发事件预警' },
        { name: '阿坝藏族羌族自治州', value: 4, nowEvent: 111, overEvent: 0, type: '重点人员预警' },
        { name: '凉山彝族自治州', value: 5, nowEvent: 'data1', overEvent: 33, type: '突发事件预警' },
        { name: '甘孜藏族自治州', value: 65, nowEvent: 111, overEvent: 2222, type: '突发事件预警' },
        { name: '广安市', value: 333, nowEvent: 111, overEvent: 22322, type: '重点人员预警' },
        { name: '巴中市', value: 33, nowEvent: 111, overEvent: 22322, type: '高发区域预警' },
        { name: '眉山市', value: 32, nowEvent: 111, overEvent: 22, type: '高发区域预警' },
      ]
      //高发区域扎点数据
      const dataC = [
        { name: '成都市', value: 121, nowEvent: 111, overEvent: 2222, type: '突发事件预警' },
        { name: '绵阳市', value: 131, nowEvent: 121, overEvent: 222, type: '高发区域预警' },
        { name: '自贡市', value: 33, nowEvent: 111, overEvent: 2222, type: '高发区域预警' },
        { name: '达州市', value: 44, nowEvent: 141, overEvent: 22322, type: '重点人员预警' },
        { name: '雅安市', value: 55, nowEvent: 111, overEvent: 2222, type: '高发区域预警' },
        { name: '阿坝藏族羌族自治州', value: 22, nowEvent: 111, overEvent: 0, type: '突发事件预警' },
        { name: '凉山彝族自治州', value: 88, nowEvent: 'data2', overEvent: 33, type: '高发区域预警' },
      ]

      // eslint-disable-next-line no-unused-vars
      const max = 480, min = 9 // todo
      // eslint-disable-next-line no-unused-vars
      const maxSize4Pin = 100, minSize4Pin = 20

      const convertData = function (el, data) {
        const res = []
        for (let i = 0; i < data.length; i++) {
          const geoCoord = el[data[i].name]
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord,
              valueNumber: data[i].value,
              nowEvent: data[i].nowEvent,
              overEvent: data[i].overEvent,
              type: data[i].type,
            })
          }
        }
        return res
      }
      const option = {
        color: ['#FBC903', '#4AFFF3', '#FF4D4D' ],
        legend: {
          icon: 'stack',
          show: true,
          bottom: 10,
          right: 25,
          orient: 'vertical',
          textStyle: {
            color: '#fff',
          },
          itemWidth: 10,
          itemHeight: 10,
          symbolKeepAspect: true,
        },
        tooltip: {
          show: true,
          trigger: 'item',
          //eslint-disable-next-line no-unused-vars
          position: function (point, params, dom, rect, size) {
            // 固定在顶部
            // console.log(point, params)
            if (params.data) {
              if (params.data.name === '攀枝花市') {
                return [point[0], point[1] - 150]
              } else {
                return false
              }
            }
          },
          formatter: function () {
            const params = {}
            // eslint-disable-next-line prefer-destructuring
            params.data = _that.dataTooltip[0]
            // console.log(params.data.name)
            if (params.data) {
              // console.log(params.data.name)
              const htmlFirst = `<div class="map_tips">
               <div class="tips_item_name">
                  <p>${params.data.name}</p>
                  <p>
                  <span>${params.data.type}</span>`
              const htmlEnd = `  </p>
               </div>
               <div class="tips_item_number">
                  <p>当前上报事件：<span>${params.data.nowEvent}</span>件</p>
                  <p>
                     超出告警事件：<span>${params.data.overEvent}</span>件
                  </p>
               </div>
            </div>`
              let html = ''
              if (params.data.overEvent >= 50) {
                html = `<span class='warningRed'>红色预警</span>`
              } else if (params.data.overEvent === 0) {
                html = `<span class='warning'>正常预警</span>`
              } else {
                html = ` <span class='warningOrange'>橙色预警</span>`
              }
              //  console.log(params)
              return htmlFirst + html + htmlEnd
            }
          },
        },
        geo: {
          map: 'SICHUAN',
          show: true,
          roam: false,
          zoom: 1.2,
          label: {
            normal: {
              show: false,
            },
            emphasis: {
              show: false,
            },
          },
          itemStyle: {
            normal: {
              areaColor: '#2A324A',
              borderColor: '#82DFFF', //线
              shadowColor: '#092f8f', //外发光
              shadowBlur: 10,
              borderWidth: 1,
            },
            emphasis: {
              areaColor: '#2F6697', //悬浮区背景
            },
          },
        },
        series: [
          {
            type: 'map',
            map: 'SICHUAN',
            zoom: 2.2,
            geoIndex: 0,
            aspectScale: 0.75, //长宽比
            showLegendSymbol: false, // 存在legend时显示
            label: {
              normal: {
                show: false,
              },
              emphasis: {
                show: false,
                textStyle: {
                  color: '#fff',
                },
              },
            },
            roam: true,
            itemStyle: {
              normal: {
                areaColor: '#031525',
                borderColor: '#82DFFF',
              },
              emphasis: {
                areaColor: '#2B91B7',
              },
            },
            animation: false,
            data: _that.dataMap,
            // data: dataZ,

          },
          //扎点
          {
            name: '重点人员预警',
            type: 'scatter',
            coordinateSystem: 'geo',
            zoom: 2.2,
            symbol: _that.imageDomZ,
            // eslint-disable-next-line no-unused-vars
            symbolSize: [15, 25],
            label: {
              normal: {
                position: 'insideTop',
                show: true,
                textStyle: {
                  color: '#000',
                  fontSize: 10,
                  fontWeight: 'bold',
                },
                formatter(value) {
                  return value.data.valueNumber
                },
              },
            },
            data: convertData(geoCoordMap, dataZ),
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke',
            },
            hoverAnimation: true,
            zlevel: 1,
            tooltip: {
              show: true,
              trigger: 'item',
              //eslint-disable-next-line no-unused-vars
              position: function (point, params, dom, rect, size) {
                // 固定在顶部
                // console.log(point, params)
                if (params.data) {
                  if (params.data.name === '攀枝花市') { return [point[0], point[1] - 150] } else {
                    return false
                  }
                }
              },
              formatter: function (params) {
                // console.log(params.data.name)
                if (params.data) {
                  // console.log(params.data.name)
                  const htmlFirst = `<div class="map_tips">
               <div class="tips_item_name">
                  <p>${params.data.name}</p>
                  <p>
                  <span>${params.data.type}</span>`
                  const htmlEnd = `  </p>
               </div>
               <div class="tips_item_number">
                  <p>当前上报事件：<span>${params.data.nowEvent}</span>件</p>
                  <p>
                     超出告警事件：<span>${params.data.overEvent}</span>件
                  </p>
               </div>
            </div>`
                  let html = ''
                  if (params.data.overEvent >= 50) {
                    html = `<span class='warningRed'>红色预警</span>`
                  } else if (params.data.overEvent === 0) {
                    html = `<span class='warning'>正常预警</span>`
                  } else {
                    html = ` <span class='warningOrange'>橙色预警</span>`
                  }
                  //  console.log(params)
                  return htmlFirst + html + htmlEnd
                }
              },
            },
          },
          {
            name: '突发事件预警',
            type: 'scatter',
            coordinateSystem: 'geo',
            zoom: 2.2,
            symbol: _that.imageDomH,
            // eslint-disable-next-line no-unused-vars
            symbolSize: [15, 25],
            label: {
              normal: {
                position: 'insideTop',
                show: true,
                textStyle: {
                  color: '#000',
                  fontSize: 10,
                  fontWeight: 'bold',
                },
                formatter(value) {
                  return value.data.valueNumber
                },
              },
            },
            data: convertData(geoCoordMapH, dataH),
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke',
            },
            hoverAnimation: true,
            zlevel: 1,
            tooltip: {
              show: true,
              trigger: 'item',
              //eslint-disable-next-line no-unused-vars
              position: function (point, params, dom, rect, size) {
                // 固定在顶部
                // console.log(point, params)
                if (params.data) {
                  if (params.data.name === '攀枝花市') { return [point[0], point[1] - 150] } else {
                    return false
                  }
                }
              },
              formatter: function (params) {
                // console.log(params.data.name)
                if (params.data) {
                  // console.log(params.data.name)
                  const htmlFirst = `<div class="map_tips">
               <div class="tips_item_name">
                  <p>${params.data.name}</p>
                  <p>
                  <span>${params.data.type}</span>`
                  const htmlEnd = `  </p>
               </div>
               <div class="tips_item_number">
                  <p>当前上报事件：<span>${params.data.nowEvent}</span>件</p>
                  <p>
                     超出告警事件：<span>${params.data.overEvent}</span>件
                  </p>
               </div>
            </div>`
                  let html = ''
                  if (params.data.overEvent >= 50) {
                    html = `<span class='warningRed'>红色预警</span>`
                  } else if (params.data.overEvent === 0) {
                    html = `<span class='warning'>正常预警</span>`
                  } else {
                    html = ` <span class='warningOrange'>橙色预警</span>`
                  }
                  //  console.log(params)
                  return htmlFirst + html + htmlEnd
                }
              },
            },
          },
          {
            name: '高发区域预警',
            type: 'scatter',
            coordinateSystem: 'geo',
            zoom: 2.2,
            symbol: _that.imageDomC,
            // eslint-disable-next-line no-unused-vars
            symbolSize: [15, 25],
            label: {
              normal: {
                position: 'insideTop',
                show: true,
                textStyle: {
                  color: '#000',
                  fontSize: 10,
                  fontWeight: 'bold',
                },
                formatter(value) {
                  return value.data.valueNumber
                },
              },
            },
            data: convertData(geoCoordMapC, dataC),
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke',
            },
            hoverAnimation: true,
            zlevel: 1,
            tooltip: {
              show: true,
              trigger: 'item',
              //eslint-disable-next-line no-unused-vars
              position: function (point, params, dom, rect, size) {
                // 固定在顶部
                // console.log(point, params)
                if (params.data) {
                  if (params.data.name === '攀枝花市') { return [point[0], point[1] - 150] } else {
                    return false
                  }
                }
              },
              formatter: function (params) {
                // console.log(params.data.name)
                if (params.data) {
                  // console.log(params.data.name)
                  const htmlFirst = `<div class="map_tips">
               <div class="tips_item_name">
                  <p>${params.data.name}</p>
                  <p>
                  <span>${params.data.type}</span>`
                  const htmlEnd = `  </p>
               </div>
               <div class="tips_item_number">
                  <p>当前上报事件：<span>${params.data.nowEvent}</span>件</p>
                  <p>
                     超出告警事件：<span>${params.data.overEvent}</span>件
                  </p>
               </div>
            </div>`
                  let html = ''
                  if (params.data.overEvent >= 50) {
                    html = `<span class='warningRed'>红色预警</span>`
                  } else if (params.data.overEvent === 0) {
                    html = `<span class='warning'>正常预警</span>`
                  } else {
                    html = ` <span class='warningOrange'>橙色预警</span>`
                  }
                  //  console.log(params)
                  return htmlFirst + html + htmlEnd
                }
              },
            },
          },
        ],
      }
      this.chart.setOption(option, true)
    },
    //弹窗出现
    async showTooltipAction() {
      await this.chart.dispatchAction({
        type: 'showTip', //默认显示江苏的提示框
        seriesIndex: 0, //这行不能省
        // dataIndex: 0,
        name: this.dataTooltip[0]['name'],
        // eslint-disable-next-line no-unused-vars
        position: function (point, params, dom, rect, size) {
          // 固定在顶部
          if (params.data) {
            if (params.data.name === '攀枝花市') {
              return [point[0], point[1] - 150]
            } else if (params.data.name === '凉山彝族自治州') {
              return [point[0] + 40, point[1] - 30]
            } else {
              return false
            }
          }
        },
      })
      await this.chart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        // dataIndex: this.dataTooltip.length ? 0 : -1,
        name: this.dataTooltip[0]['name'],
      })
      await setTimeout(() => {
        this.chart.dispatchAction({
          type: 'hideTip',
        })
        this.chart.dispatchAction({
          type: 'downplay',
        })
        this.updateCharts()//地图数据刷新
        this.$emit('mapChange')//触发列表刷新
      }, 3000)
    },
    //取数据
    fetchData() {
      this.timeOut = setInterval(() => {
        this.dataTooltip = []
        const s = Math.floor(Math.random() * 20)
        const el = this.simulatedData[s]
        console.log(s)
        if (el) {
          this.dataTooltip.push(el)
        }
        //获取到数据显示弹窗
        if (this.dataTooltip.length > 0) {
          // this.chart.clear()
          // this.updateCharts()
          this.showTooltipAction()//有数据过来时，弹窗出现
        }
      }, 3000)

    },
  },
}
</script>

<style lang='scss' scoped>
.map_item {
  width: 100%;
  height: 100%;
}
/deep/.map_tips {
  z-index:999;
  position: absolute;
  width: 350px;
  top: 0;
  left: 0px;
  height: 120px;
  background: url("../../../../assets/imgs/tipBg@2x.png") no-repeat;
//   transform: rotateZ(0deg);
  background-size: 100% 100%;
  padding: 20px;
  .tips_item_name {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 40px;
    p {
      font-family: PingFang SC;
      line-height: 25px;
      color: rgba(255, 255, 255, 1);
    }
    > p {
      font-size: 16px;
      font-weight: bold;
      span {
        font-size: 14px;
        font-weight: normal;
        padding: 4px 10px;
        line-height: 38px;
        box-sizing: border-box;
        &:first-of-type {
          background: rgba(137, 230, 254, 0.2);
          border-radius: 2px;
        }
      }
      .warningRed {
        margin-left: 10px;
        background: rgba(255, 77, 77, 0.2);
        border: 1px solid rgba(255, 77, 77, 1);
        border-radius: 2px;
        color: rgba(255, 77, 77, 1);
      }
      .warningOrange {
        margin-left: 10px;
        background: rgba(236, 141, 88, 0.2);
        border: 1px solid #ec8d58;
        border-radius: 2px;
        color: #ec8d58;
      }
      .warning {
        margin-left: 10px;
        background: rgba(137, 230, 254, 0.2);
        border: none;
        border-radius: 2px;
        color: #fff;
      }
    }
  }
  .tips_item_number {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 40px;
    > p {
      font-size: 12px;
      font-family: PingFangSC-Regular;
      line-height: 20px;
      color: rgba(255, 255, 255, 1);
    }
  }
}
</style>