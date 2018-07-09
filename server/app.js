require('dotenv').config();

const express = require('express');
const path = require('path');
const { server, io } = require('./server');
// Imports server.js and app.js creates a connection containing the routes and middleware

// Serve static files from the React app
if (process.env.DEV !== 'development') {
  server.use(express.static(path.join(__dirname, '../client/build')));

  // The "catchall" handler: for any request that doesn't
  // match one above, send back React's index.html file.
  server.get('*', (req, res) => {
    res
      .status(404)
      .sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

const PORT = process.env.PORT || 3030;

io.sockets.on('connection', (socket) => {
  console.log('someone connected');
  socket.emit('message-feed', { message: 'Cow goes moo' });
});

server.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

module.exports = server;
