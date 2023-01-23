const express = require('express')
const app = express()
const WSServer = require('express-ws')(app)
const aWss = WSServer.getWss() // получить пользователей

const PORT = process.env.PORT || 3001

app.listen(PORT, () => console.log(`Server start at ${PORT} port`))

app.ws('/', (ws, req) => {
    ws.on('message', (msg) => {
        msg = JSON.parse(msg)
        switch (msg.method) {
            case 'connection':
                connectionHandler(ws, msg)
                break
            case 'draw':
                broadcastConnection(ws, msg)
                break
        }
    })
})


const connectionHandler = (ws, msg) => {
    ws.id = msg.id              // id пользователя - id открытого холста
    broadcastConnection(ws, msg)
}

const broadcastConnection = (ws, msg) => {
    aWss.clients.forEach(client => {
        if (client.id === msg.id) {
            client.send(JSON.stringify(msg))
        }
    })
}