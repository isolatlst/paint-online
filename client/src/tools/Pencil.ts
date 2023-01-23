import Tool from "./Tool";
import canvasState from "../store/canvasState";


export default class Pencil extends Tool {
    mouseDown: boolean = false

    constructor(canvas: HTMLCanvasElement, socket: Object, sessionId: string) {
        super(canvas, socket, sessionId);
        this.listen()
    }

    listen() {
        this.canvas.onmouseup = this.onUp.bind(this)
        this.canvas.onmousedown = this.onDown.bind(this)
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)

        this.canvas.ontouchend = this.onUp.bind(this)
        this.canvas.ontouchstart = this.onDown.bind(this)
        this.canvas.ontouchmove = this.touchMoveHandler.bind(this)
    }


    touchMoveHandler(e: TouchEvent) {
        this.onMove(e.touches[0].pageX - this.canvas.offsetLeft, e.touches[0].pageY - this.canvas.offsetTop)
    }

    mouseMoveHandler(e: MouseEvent) {
        this.onMove(e.pageX - this.canvas.offsetLeft, e.pageY - this.canvas.offsetTop)
    }

    static draw(ctx: any, x: number, y: number, color: string) {
        const temp = ctx.strokeStyle
        ctx.strokeStyle = color
        ctx.lineTo(x, y)
        ctx.stroke()
        ctx.strokeStyle = temp
    }

    onUp() {
        this.mouseDown = false
        //@ts-ignore
        canvasState.socket.send(JSON.stringify({
            method: 'draw',
            id: canvasState.sessionId,
            figure: {
                type: 'finish',
            }
        }))
    }

    onMove(x: number, y: number) {
        if (this.mouseDown) {
            // @ts-ignore
            canvasState.socket.send(JSON.stringify({
                method: 'draw',
                id: canvasState.sessionId,
                figure: {
                    type: 'pencil',
                    x: x,
                    y: y,
                    color: this.ctx.strokeStyle
                }
            }))
        }
    }

    onDown() {
        this.mouseDown = true
        this.ctx.beginPath()
    }
}