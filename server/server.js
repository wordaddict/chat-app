const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', {
    from: "Tosin",
    text: "I love you guys",
    createdAt: 8
  })

  socket.on('createEmail', (newEmail) => {
    console.log('createEmail', newEmail);
  })

  socket.on('createMessage', (message) => {
    console.log('Message created', message);
  });

  socket.on('disconnect', () => {
    console.log('Client Disconnected');
  });
});


server.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});
