import React, {useEffect, useRef, useState} from 'react'
import '../styles/canvas.scss'
import {observer} from "mobx-react-lite";
import canvasState from "../store/canvasState";
import Pencil from "../tools/Pencil";
import Modal from "./Modal";
import {useParams} from "react-router-dom";
import toolState from "../store/toolState";
import Rect from "../tools/Rect";

const Canvas = observer(() => {
    const canvas = useRef(null)
    const usernameRef = useRef(null)
    const [isModalOpen, closeModal] = useState(true)
    const params = useParams()

    useEffect(() => {
        if (canvas.current) {
            canvasState.setCanvas(canvas.current)
        }
    }, [])

    useEffect(() => {
        if (canvasState.username) {
            const socket = new WebSocket(canvasState.serverURL)

            canvasState.setSocket(socket)
            canvasState.setSessionId(params.id!)
            toolState.setTool(new Pencil(canvas.current!, canvasState.socket, canvasState.sessionId))

            socket.onopen = () => { //при подключении
                socket.send(JSON.stringify({
                    id: params.id,
                    username: canvasState.username,
                    method: 'connection'
                }))
            }
            socket.onmessage = (event) => { //при отправке сообщения с сервера
                const msg = JSON.parse(event.data)
                switch (msg.method) {
                    case 'connection':
                        console.log(`Пользователь с ником ${msg.username} подключён`)
                        break

                    case 'draw':
                        drawHandler(msg)
                        break

                    default:
                        break

                }
            }
        }
    }, [canvasState.username])

    const drawHandler = (msg: any) => {
        const figure = msg.figure
        // @ts-ignore
        const ctx = canvas.current.getContext('2d')
        switch (figure.type) {
            case 'pencil':
                Pencil.draw(ctx, figure.x, figure.y, figure.color)
                break
            case 'rect':
                Rect.draw(ctx, figure.x, figure.y, figure.width, figure.height, figure.color)
                break
            case 'finish':
                ctx.beginPath()
                break
        }
    }

    const mouseDownHandler = () => {
        // @ts-ignore
        canvasState.pushToUndo(canvas.current.toDataURL())
    }

    const connectionHandler = () => {
        // @ts-ignore
        canvasState.setUsername(usernameRef.current.value)
        closeModal(false)
    }

    return (
        <div className='canvas'>
            <Modal isModalOpen={isModalOpen} usernameRef={usernameRef} closeModal={connectionHandler}/>
            <canvas ref={canvas} width={600} height={500}
                    onMouseDown={mouseDownHandler}>
            </canvas>
        </div>
    );
});

export default Canvas;