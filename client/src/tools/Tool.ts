export default class Tool {
    canvas: HTMLCanvasElement
    ctx: any

    set strokeColor(color: string) {
        this.ctx.strokeStyle = color
    }

    set lineWidth(width: number) {
        this.ctx.lineWidth = width
    }


    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        this.destroyEvents()
        if (this.ctx.strokeStyle === '#ffffff') {
            this.ctx.strokeStyle = '#000000'
        }
    }

    destroyEvents() {
        this.canvas.onmouseup = null
        this.canvas.onmousedown = null
        this.canvas.onmousemove = null

        this.canvas.ontouchend = null
        this.canvas.ontouchstart = null
        this.canvas.ontouchmove = null
    }
}