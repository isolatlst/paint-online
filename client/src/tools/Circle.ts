import Tool from "./Tool";


export default class Circle extends Tool {
    mouseDown: boolean = false
    startX: number = 0
    startY: number = 0
    currentX: number = 0
    currentY: number = 0

    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        this.listen()
    }

    listen() {
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)

        this.canvas.ontouchend = this.touchEndHandler.bind(this)
        this.canvas.ontouchstart = this.touchStartHandler.bind(this)
        this.canvas.ontouchmove = this.touchMoveHandler.bind(this)
    }

    touchEndHandler() {
        this.onEnd()
    }

    mouseUpHandler() {
        this.onEnd()
    }

    touchStartHandler(e: TouchEvent) {
        this.onDown(e.touches[0].pageX - this.canvas.offsetLeft, e.touches[0].pageY - this.canvas.offsetTop)
    }

    mouseDownHandler(e: MouseEvent) {
        this.onDown(e.pageX - this.canvas.offsetLeft, e.pageY - this.canvas.offsetTop)
    }

    touchMoveHandler(e: TouchEvent) {
        this.onMove(e.touches[0].pageX - this.canvas.offsetLeft, e.touches[0].pageY - this.canvas.offsetTop)
    }

    mouseMoveHandler(e: MouseEvent) {
        this.onMove(e.pageX - this.canvas.offsetLeft, e.pageY - this.canvas.offsetTop)
    }

    draw() {
        const width = this.currentX - this.startX
        const height = this.currentY - this.startY
        const radius = Math.pow((Math.pow(width,2) + Math.pow(height, 2)), 0.5)
        this.ctx.arc(this.startX, this.startY, radius, 0, 2*Math.PI)
        this.ctx.stroke()
    }
    onEnd (){
        this.mouseDown = false
        this.draw()
    }
    onMove(x: number, y: number) {
        if (this.mouseDown) {
            this.currentX = x
            this.currentY = y
        }
    }
    onDown (x: number, y: number){
        this.mouseDown = true
        this.ctx.beginPath()
        this.startX = x
        this.startY = y
    }
}