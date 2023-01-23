import Tool from "./Tool";
import canvasState from "../store/canvasState";


export default class Rect extends Tool {
    mouseDown: boolean = false
    startX: number = 0
    startY: number = 0
    currentX: number = 0
    currentY: number = 0

    constructor(canvas: HTMLCanvasElement, socket: Object, sessionId: string) {
        super(canvas, socket, sessionId)
        this.listen()
    }

    listen() {
        this.canvas.onmouseup = this.onEnd.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)

        this.canvas.ontouchend = this.onEnd.bind(this)
        this.canvas.ontouchstart = this.touchStartHandler.bind(this)
        this.canvas.ontouchmove = this.touchMoveHandler.bind(this)
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

    static draw(ctx: any, x: number, y: number, w: number, h: number, color: string) {
        const temp = ctx.strokeStyle
        ctx.strokeStyle = color
        ctx.strokeRect(x, y, w, h)
        ctx.strokeStyle = temp
    }

    onEnd() {
        this.mouseDown = false
        // @ts-ignore
        canvasState.socket.send(JSON.stringify({
            method: 'draw',
            id: canvasState.sessionId,
            figure: {
                type: 'rect',
                x: this.startX,
                y: this.startY,
                width: this.currentX - this.startX,
                height: this.currentY - this.startY,
                color: this.ctx.strokeStyle
            }
        }))
    }

    onMove(x: number, y: number) {
        if (this.mouseDown) {
            this.currentX = x
            this.currentY = y
        }
    }

    onDown(x: number, y: number) {
        this.mouseDown = true
        this.ctx.beginPath()
        this.startX = x
        this.startY = y
    }
}