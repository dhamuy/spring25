const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  content: { type: String }
});

const messageModel = mongoose.model("Message", messageSchema);

let users = [];

app.get('/messages', async function(req, res){
  res.json(await messageModel.find());
});


app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  const now = new Date().getMilliseconds();
  users = [...users, now];

  socket.emit('chat message', `Welcome! ${now} You successfully connected to chat room.`);

  socket.on('chat message', function(msg) {
    const message = new messageModel();
    message.content = msg;
    message.save().then(() => {
      io.emit('chat message', msg);
    });
  });
});

server.listen(3000, async function() {
  await mongoose.connect("mongodb+srv://dylanhamuy:<password>@dylanhamuy.aej7u.mongodb.net/?retryWrites=true&w=majority&appName=dylanhamuy");
  const messages = await messageModel.find();
  console.log("Messages:", messages);
  console.log('listening on *:3000');
});
