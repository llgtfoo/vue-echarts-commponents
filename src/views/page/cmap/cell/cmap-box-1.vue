<!--
 * @Author: llgtfoo@163.com
 * @Date: 2020-07-08 23:49:14
 * @LastEditTime: 2020-07-08 23:55:58
 * @LastEditors: user
 * @Description: 
 * @FilePath: \vue-echarts-commponents\src\views\page\cmap\cell\cmap-box-1.vue
 -->
<template>
  <div class='china-container' :id='sid' />
</template>
<script>
import CMap from '@/assets/lib/CMap-2/src/index.js';
export default {
  props: {
    sid: {
      type: String,
      default: () => 'china1',
    },
    source: {
      type: Object,
      default: () => {
        return {}
      },
    },
    colorDic: {
      type: Object,
      default: () => {
        return {
          areaLineColor: '#538df7',
          areaFillColor: 'transparent',
          cityLineColor: '#243e6a',
          cityFillColor: 'rgba(0, 0, 0, .4)',
          cityHoverColor: 'rgba(83, 141, 247, .2)',
          cityHoldColor: 'rgba(83, 141, 247, .4)',
          cityNameNormalColor: '#fff',
          cityNameHoverColor: '#4fff5f',
        }
      },
    },
  },
  data() {
    return {
      source2: {},
      option:{}
    }
  },
  watch: {
    source() {
      this.init()
    },
  },
  mounted() {
    if (JSON.stringify(this.source) !== '{}') {
      this.init()
    }
  },
  methods: {
    mapHistory(data) {
      myMap.history.push({
        key: data.index,
        // 新边界
        boundary: this.source2.araeData,
        // 新区块
        blocks: this.source2.citysArr,
        // 新的地图专有信息
        usrData: {
          mapName: Math.random()
            .toString(16)
            .slice(2),
          id: new Date(),
        },
      });
    },
    init() {
      const options = {
        el: `#${this.sid}`,
        usrData: {
          mapName: '',
          id: 1,
          points: {
            安徽: {
              r: 10,
              color: '#f90',
            },
          },
        },
        map: {
          // 边界
          boundary: {
            // 边界数据
            // data: china.araeData,
            // 样式
            style: {
              lineWidth: 8,
              strokeStyle: this.colorDic.areaLineColor,
              fillStyle: this.colorDic.areaFillColor,
            },
          },
          // 块
          blocks: {
            // 块数据
            // data: china.citysArr,
            // 是否可以选择 [multiple|single|false(默认)]
            selectedMode: 'single',
            point: {
              // 个数
              size: {
                min: 1,
                max: 5,
              },
              // 大小，半径
              r: [2, 3],
              // 是否要有波纹（todo）
              pop: true,
              // 点的颜色
              color: ['#fff', '#4fff5f'],
              // 处理函数
              fun: (block) => {
                // console.log(index, block, usrData);
                // 对单个点进行控制
                if (block.name === '安徽') {
                  return usrData.points['安徽'];
                }
              },
              // 是否要有迁徙效果, all 都有, auto 随机
              // * 设置了此，则默认会有点 (todo)
              migration: 'all',
            },
            // 区块名字效果设置
            cityName: {
              normal: {
                fillStyle: this.colorDic.cityNameNormalColor,
                font: '1em "Microsoft Yahei"',
              },
              hover: {
                fillStyle: this.colorDic.cityNameHoverColor,
                font: '1.5em "Microsoft Yahei"',
              },
              // 定位
              move: {
                x: 10,
                y: 10,
              },
              // 文字与宽度比例
              txtVSWidth: 3,
            },
            style: {
              lineWidth: 3,
              strokeStyle: this.colorDic.cityLineColor,
              fillStyle: this.colorDic.cityFillColor,
              hoverColor: this.colorDic.cityHoverColor,
              holdColor: this.colorDic.cityHoldColor,
            },
          },
        },
        callback: {
          click: (data) => {
            // console.log(evt, data)
            const area = data.child
            if (area) {
              this.$http.get(`/cmap/${area}`)
                .then(res => {
                  if (res.state && res.data) {
                    this.source2 = res.data
                    this.mapHistory(data)
                  }
                })
                .catch(err => {
                  console.log(err)
                  this.$fetchMock(`/static/mock/cmap/${area}.json`)
                    .then(res => {
                      this.source2 = res
                      this.mapHistory(data)
                    })
                })
            }
          },
          // 鼠标移动事件
          mousemove: () => {
            // console.log(evt, data);
          },
        },
      };
      this.option=options
      options.map.boundary.data = this.source.araeData;
      options.map.blocks.data = this.source.citysArr;
      window.myMap = new CMap(options);
      myMap.init();
      myMap.fadeIn();
      // const rng = document.querySelector('input[type=range]');
      // rng.addEventListener(
      //   'mousedown',
      //   () => {
      //     rng.addEventListener('mousemove', rngEvt);
      //   },
      //   false
      // );
      // rng.addEventListener(
      //   'mouseup',
      //   () => {
      //     rng.removeEventListener('mousemove', rngEvt);
      //   },
      //   false
      // );
      // function rngEvt() {
      //   myMap.scaleMap(rng.value);
      // }
      // // 取生成的值
      // rng.value = myMap.history.map[0].mapScale;
      // const go = document.getElementById('go');
      // const forward = document.getElementById('forward');
      // const back = document.getElementById('back');
      // back.addEventListener(
      //   'click',
      //   () => {
      //     myMap.history.back();
      //   },
      //   false
      // );
      // forward.addEventListener('click', () => {
      //   myMap.history.forward();
      // });
      // go.addEventListener('keyup', evt => {
      //   if (evt.keyCode === 13 || evt.which === 13) {
      //     myMap.history.go(evt.target.value);
      //   }
      // });
    },
  },
};
</script>
<style lang='scss' scoped>
.china-container {
  width: 100%;
  height: 100%;
}
</style>


