import React from 'react'
import '../styles/toolbar.scss'
import Pencil from "../tools/Pencil";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Rect from "../tools/Rect";
import Circle from "../tools/Circle";
import Eraser from "../tools/Eraser";
import Line from "../tools/Line";

const ToolBar = () => {
    return (
        <div className='toolbar'>
            <button className='toolbar__btn pencil' onClick={()=>toolState.setTool(new Pencil(canvasState.canvas, canvasState.socket, canvasState.sessionId))}/>
            <button className='toolbar__btn rect' onClick={()=>toolState.setTool(new Rect(canvasState.canvas, canvasState.socket, canvasState.sessionId))}/>
            <button className='toolbar__btn circle' onClick={()=>toolState.setTool(new Circle(canvasState.canvas, canvasState.socket, canvasState.sessionId))}/>
            <button className='toolbar__btn eraser' onClick={()=>toolState.setTool(new Eraser(canvasState.canvas, canvasState.socket, canvasState.sessionId))}/>
            <button className='toolbar__btn line' onClick={()=>toolState.setTool(new Line(canvasState.canvas, canvasState.socket, canvasState.sessionId))}>
                <span></span>
            </button>
            <label className='toolbar__btn palette'>
                <input type="color" onChange={e=>{
                    toolState.setStrokeColor(e.target.value)
                }}/>
            </label>
            <button className='toolbar__btn undo' onClick={()=>canvasState.undo()}/>
            <button className='toolbar__btn redo' onClick={()=>canvasState.redo()}/>
            <button className='toolbar__btn save'/>
        </div>
    );
};

export default ToolBar;