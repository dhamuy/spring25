const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

let users = [];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    const now = new Date().getMilliseconds()
    users = [...users, now]

    socket.emit('chat message', `Welcome! ${now} You successfully conected to chat room.`)
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });

server.listen(3000, () => {
  console.log('listening on *:3000');
});