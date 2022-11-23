import Tool from "./Tool";


export default class Pencil extends Tool {
    mouseDown: boolean = false


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
        this.mouseDown = false
    }

    mouseUpHandler() {
        this.mouseDown = false
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

    draw(x: number, y: number) {
        this.ctx.lineTo(x, y)
        this.ctx.stroke()
    }

    onMove(x: number, y: number) {
        if (this.mouseDown) {
            this.draw(x, y)
        }
    }
    onDown (x: number, y: number){
        this.mouseDown = true
        this.ctx.beginPath()
        this.ctx.moveTo(x, y)
    }
}