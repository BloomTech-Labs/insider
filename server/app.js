require('dotenv').config();

const fs = require('fs');
const express = require('express');

const { server, io } = require('./server');
const { messagesFeed } = require('./models/models');
// Imports server.js and app.js creates a connection containing the routes and middleware

// Serve static files from the React app

io.sockets.on('connection', (socket) => {
  const sendMessages = () => {
    fs.readFile(
      path.join(__dirname, '../server/models/messages/messages.json'),
      'utf8',
      (err, data) => {
        if (err) console.log(err);
        socket.emit('message-feed', data);
      },
    );
  };
  
  sendMessages();
  fs.watch(
    path.join(__dirname, '../server/models/messages/messages.json'),
    (event, targetfile) => {
      sendMessages();
    },
  );
});

const PORT = process.env.PORT || 3030;

server.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

module.exports = server;
