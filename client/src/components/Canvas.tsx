import React, {useEffect, useRef} from 'react'
import '../styles/canvas.scss'
import {observer} from "mobx-react-lite";
import canvasState from "../store/canvasState";
import Pencil from "../tools/Pencil";
import toolState from "../store/toolState";

const Canvas = observer(() => {
    const canvas = useRef( null)

    useEffect(() => {
        if (canvas.current) {
            canvasState.setCanvas(canvas.current)
            toolState.setTool(new Pencil(canvas.current))
        }
    }, [])

    const MouseDownHandler = () => {
        // @ts-ignore
        canvasState.pushToUndo(canvas.current.toDataURL())
    }

    return (
        <div className='canvas'>
            <canvas ref={canvas} width={600} height={500}
            onMouseDown={MouseDownHandler}></canvas>
        </div>
    );
});

export default Canvas;