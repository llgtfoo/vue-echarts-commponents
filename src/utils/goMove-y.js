/*
 * @Descripttion: ''
 * @Author: lilong(lilong@hztianque.com)
 * @Date: 2020-07-24 15:19:42
 * @LastEditTime: 2020-07-24 15:45:26
 */
class doMove {
  constructor(charts, option, end, length) {
    this.chart = charts
    this.timeOut = null//定时器
    this.end = end//默认初始显示几个
    this.dataLength = length//数据长度
    this.option = option//echarts选项
    this.stopMove = false
  }
  autoMove() {
    this.move()
    this.chart.on('mouseover', () => {
      this.stopMove = true
      clearInterval(this.timeOut)//鼠标移入
    })
    this.chart.on('mouseout', () => {//鼠标移出
      this.stopMove = false
      this.move();
    })
  }
  move() {
    console.log(1)
    setInterval(() => {
      clearInterval(this.timeOut)
      // 每次向后滚动一个，最后一个从头开始。
      if (this.stopMove) { return }
      if (
        Number(this.option.dataZoom[0].endValue) ===
        this.dataLength - 1
      ) {
        this.option.dataZoom[0].endValue = this.end;
        this.option.dataZoom[0].startValue = 0;
      } else {
        console.log(2)
        this.option.dataZoom[0].endValue =
          this.option.dataZoom[0].endValue + 1;
        this.option.dataZoom[0].startValue =
          this.option.dataZoom[0].startValue + 1;
      }
      console.log(this.option, '==========')
      this.chart.setOption(this.option);
    }, 3000);
  }
  destory() {
    clearInterval(this.timeOut)
    this.chart = null
  }
}

export default doMove