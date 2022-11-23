import Pencil from "./Pencil";


export default class Eraser extends Pencil {
    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
    }

    draw(x: number, y: number) {
        this.ctx.strokeStyle = '#ffffff'
        this.ctx.lineTo(x, y)
        this.ctx.stroke()
    }


}