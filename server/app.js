require('dotenv').config();

const fs = require('fs');
const express = require('express');
const path = require('path');

const { server, io } = require('./server');
const { messagesFeed } = require('./models/models');
// Imports server.js and app.js creates a connection containing the routes and middleware

// Serve static files from the React app
if (process.env.DEV !== 'development') {
  server.use(express.static(path.join(__dirname, '../client/build')));

  // The "catchall" handler: for any request that doesn't
  // match one above, send back React's index.html file.
  server.get('*', (req, res) => {
    messagesFeed();
    res
      .status(404)
      .sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

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
