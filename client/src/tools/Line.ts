import Tool from "./Tool";


export default class Line extends Tool {
    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        this.listen()
    }

    listen() {
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)

        this.canvas.ontouchend = this.touchEndHandler.bind(this)
        this.canvas.ontouchstart = this.touchStartHandler.bind(this)
    }

    touchEndHandler(e: TouchEvent) {
        this.onEnd(e.touches[0].pageX - this.canvas.offsetLeft, e.touches[0].pageY - this.canvas.offsetTop)
    }

    mouseUpHandler(e: MouseEvent) {
        this.onEnd(e.pageX - this.canvas.offsetLeft, e.pageY - this.canvas.offsetTop)
    }

    touchStartHandler(e: TouchEvent) {
        this.onDown(e.touches[0].pageX - this.canvas.offsetLeft, e.touches[0].pageY - this.canvas.offsetTop)
    }

    mouseDownHandler(e: MouseEvent) {
        this.onDown(e.pageX - this.canvas.offsetLeft, e.pageY - this.canvas.offsetTop)
    }

    draw(x: number, y: number) {
        this.ctx.lineTo(x, y)
        this.ctx.stroke()
    }

    onEnd(x: number, y: number) {
        this.draw(x, y)
    }

    onDown(x: number, y: number) {
        this.ctx.beginPath()
        this.ctx.moveTo(x, y)
    }
}