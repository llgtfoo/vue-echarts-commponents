
/**
 * @name 绘制所有区块
 */
export function drawAllBoundary () {
    let currentMap = this.history.map[this.history.index]

    this.clearCanvasCtx()
    // 区
    this.drawBlockBoundary(currentMap)
    // 边界
    this.drawMainBoundary(currentMap)
    // 点
    this.drawBlockPoints(currentMap)
    // 城市名
    this.drawText(currentMap)
    
    this.ctx.setTransform(1, 0, 0, 1, 0, 0)
    this.hitCtx.setTransform(1, 0, 0, 1, 0, 0)
}

/**
 * @name 绘制内部区块
 * @param {Object} obj 绘制的区块信息
 */
export function drawBoundary (obj, ctxs, style) {
    let l = obj._coordinates.length

    for (let i = 0; i < l; i++) {
        let ctx = this.drawLine(
            this.ctx,
            obj._coordinates[i],
            obj.style
        )

        this.drawLine(
            this.hitCtx,
            obj._coordinates[i],
            obj.hitStyle
        )
    }
}

/**
 * 绘制主要边界
 */
export function drawMainBoundary (map) {
    this.drawBoundary(map.boundary)
}

/**
 * 绘制区块边界
 */
export function drawBlockBoundary (map) {
    let l = map.blocks.length

    for (let i = 0; i < l; i++) {
        this.drawBoundary( map.blocks[i] )
    }
}

/**
 * @name 绘制圆
 * @param {Object} ctx canvas 对象
 * @param {Object} option 设置
 * @param {Objetc} style 样式
 */
export function drawArc (ctx, option, style) {
    ctx = this.setCtxState(style, ctx)
    ctx.arc(
        option.x, // x
        option.y, // y
        option.r, // R 半径
        option.s, // 开始角度
        option.e, // 结束角度
        option.d  // 顺时针(false)
    )
    ctx.fill()
    ctx.closePath()
    ctx.restore()
}

/**
 * @name 绘制名字
 */
export function drawText (map, ctx = this.ctx) {
    
    let cityName = this.options.map.blocks.cityName
    if (!cityName) return

    let Obj = map.blocks
    let move = cityName.move || {x: 0, y: 0}

    for (let i = 0, l = map.blocks.length;i < l; i++) {
        let city = Obj[i]
        let style = city.nameStyle.normal
        let width = city.width * map.mapScale
        let txtWidth = ctx.measureText(city.name).width

        if (city.name) {
            if (map.mouseMoveIndex === i) {
                style = city.nameStyle.hover
            }
            
            if (txtWidth < width / this.textVsWidth || city.index === map.mouseMoveIndex) {
                let x = city.centroid.x * map.mapScale + move.x
                let y = city.centroid.y * map.mapScale + move.y
                
                ctx.save()
                ctx = this.setCtxState(style, ctx)
                ctx.textAlign = cityName.align || 'center'
                ctx.textBaseline = "middle"		
                ctx.fillText(city.name, x, y)		
                ctx.restore()
            }
        }
    }
}

/**
 * 中心坐标 
 */
export function drawCenterLine () {
    this.ctx.beginPath()
    this.ctx.strokeStyle = 'red'
    this.ctx.moveTo(0, this.ctxH/2)
    this.ctx.lineTo(this.ctxW, this.ctxH/2)
    this.ctx.stroke()

    this.ctx.beginPath()
    this.ctx.strokeStyle = 'red'
    this.ctx.moveTo(this.ctxW/2,0)
    this.ctx.lineTo(this.ctxW/2, this.ctxH)
    this.ctx.stroke()
}

/**
 * 绘制区块中随机点
 */
export function drawBlockPoints (map) {
    const data = map.blocks

    if (!map.hasPoint) return map

    for (let i = 0, l = data.length; i < l; i++) {
        let _W = data[i].width * map.mapScale

        data[i]._point.forEach(point => {
            // 当宽度大于5倍点半径时，点才显示
            if (_W > point.r * 5) {
                this.drawArc(
                    this.ctx,
                    {
                        x: point.x,
                        y: point.y,
                        r: point.r,
                        s: 0,
                        e: Math.PI * 2,
                        d: false
                    },
                    {
                        fillStyle: point.color
                    }
                )
            }
        })
    }
}


/**
 * @name 绘制线
 * @param {Object} ctx - canvas 对象
 * @param {Array} data - 绘制的线
 * @param {Object} style - 绘制的样式
 */
export function drawLine (ctx, data, style) {
    ctx = this.setCtxState(style, ctx)

    for (let i = 0, l = data.length; i < l; i++) {
        let x = data[i][0]
        let y = data[i][1]
        if (i === 0) {
            ctx.moveTo(x, y)
        } else {
            ctx.lineTo(x, y)
        }
    }
    
    ctx.lineJoin = 'round'
    ctx.stroke()
    ctx.fill()
    ctx.closePath()

    return ctx
}

/**
 * 
 * @param {object} map 地图
 * @param {number} x x轴偏移量
 * @param {number} y y轴偏移量
 */
export function translateCtx (map, x = 0, y = 0) {
    let X = (this.ctxW - map.boundary.width * map.mapScale)/ 2 + x
    let Y = (this.ctxH - map.boundary.height * map.mapScale)/ 2 + y

    this.clearCanvasCtx()
    this.ctx.translate(X, Y)
    this.hitCtx.translate(X, Y)
}
