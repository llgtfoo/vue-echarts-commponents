/*
 * @Descripttion: 'tooltop滚动'
 * @Author: lilong(lilong@hztianque.com)
 * @Date: 2020-07-24 15:46:19
 * @LastEditTime: 2020-07-24 15:47:35
 */
class doAnimation {
  constructor(echartChart) {
    this.chart = echartChart
    this.intervalId = null
    this.showMovie = true
  }
  animate = () => {
    if (this.chart) {
      let i = 0
      const options = this.chart.getOption()
      const { series } = options
      const dom = this.chart._dom
      dom.style.visibility = 'visible'
      var length = 0 //eslint-disable-line
      if (series[0].data) {
        length = series.map((item) => item.data.length).reduce((i, t) => (i > t ? i : t), 0)
      }
      this.chart.on('mouseover', _ => {
        console.log(this)
        this.showMovie = false
        for (let f = 0; f < series.length; f++) {
          this.chart.dispatchAction({
            type: 'downplay',
            seriesIndex: f,
          })
        }
        this.chart.dispatchAction({
          type: 'highlight',
          dataIndex: _.dataIndex,
        })
      })
      this.chart.on('mouseout', () => {
        this.showMovie = true
      })
      this.intervalId = setInterval(() => {
        if (!this.showMovie) { return }
        if (i >= length) {
          i = 0
        }
        if (i === 0) {
          // dom.style.transition = 'none'
          // dom.style.visibility = 'hidden'
          // dom.style.marginLeft = '100%'
          setTimeout(() => {
            // dom.style.transition = 'all 1s ease 0.5s'
            setTimeout(() => {
              // dom.style.visibility = 'visible'
              // dom.style.marginLeft = '0'
            }, 100)
          }, 50)
        }
        for (let f = 0; f < series.length; f++) {
          for (let j = 0; j < length; j++) {
            this.chart.dispatchAction({
              type: 'downplay',
              seriesIndex: f,
              dataIndex: j,
            })
          }
          this.chart.dispatchAction({
            type: 'highlight',
            seriesIndex: f,
            dataIndex: i,
          })
          this.chart.dispatchAction({
            type: 'showTip',
            seriesIndex: f,
            dataIndex: i,
          })
        }
        i++
      }, 2500)
    }
  }
  destory = () => {
    clearInterval(this.intervalId)
    this.chart = null
  }
}

export default doAnimation
