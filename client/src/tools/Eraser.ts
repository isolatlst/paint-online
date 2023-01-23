import Pencil from "./Pencil";


export default class Eraser extends Pencil {
    socket: any
    sessionId: any

    constructor(canvas: HTMLCanvasElement, socket: Object, sessionId: string) {
        super(canvas, socket, sessionId);
    }

    draw(x: number, y: number) {
        this.ctx.strokeStyle = '#ffffff'
        this.ctx.lineTo(x, y)
        this.ctx.stroke()
    }


}