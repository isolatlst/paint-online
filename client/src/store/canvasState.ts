import {makeAutoObservable} from "mobx";

class CanvasState {
    canvas: HTMLCanvasElement = null as unknown as HTMLCanvasElement
    undoList = [] as Array<string>
    redoList = [] as Array<string>

    constructor() {
        makeAutoObservable(this)
    }

    setCanvas(canvas: HTMLCanvasElement) {
        this.canvas = canvas
    }

    pushToUndo(data: string) {
        this.undoList.push(data)
    }

    pushToRedo(data: string) {
        this.redoList.push(data)
    }

    undoAndRedoHandler(listLength: number, listName: 'undoList' | 'redoList', reverseList: 'undoList' | 'redoList') {
        const ctx = this.canvas.getContext('2d')
        if (listLength > 0) {
            let dataURL = this[listName].pop()
            this[reverseList].push(this.canvas.toDataURL())
            let img = new Image()
            img.src = dataURL!
            img.onload = () => {
                ctx!.clearRect(0, 0, this.canvas.width, this.canvas.height)
                ctx!.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            }
        } else {
            console.log('Is not real')
        }
    }

    undo() {
        this.undoAndRedoHandler(this.undoList.length, 'undoList', 'redoList')
    }

    redo() {
        this.undoAndRedoHandler(this.redoList.length, 'redoList', 'undoList')
    }
}

export default new CanvasState()