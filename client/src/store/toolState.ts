import {makeAutoObservable} from "mobx";

type Tool = {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D | Object

    mouseDown?: boolean
    strokeColor: string | undefined
    lineWidth: number | undefined
}

class ToolState {
    tool: Tool | null = null

    constructor() {
        makeAutoObservable(this)
    }

    setTool(tool: Tool) {
        this.tool = tool
    }

    setStrokeColor(color: string) {
        if (this.tool) {
            this.tool.strokeColor = color
        }
    }

    setLineWidth(width: number) {
        if (this.tool) {
            this.tool.lineWidth = width
        }
    }
}

export default new ToolState()